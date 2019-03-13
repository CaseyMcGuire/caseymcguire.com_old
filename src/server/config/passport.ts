import {Application, Request} from "express-serve-static-core";
import {PassportStatic} from "passport";
import { IVerifyOptions, Strategy }from "passport-local";
import PostgresUserDaoImpl from "../dao/user/impl/PostgresUserDaoImpl";
import DaoFactory, {DaoType} from "../dao/DaoFactory";
const session = require('express-session');
import * as bcrypt from "bcryptjs";
import User from "../models/User";

export default function configurePassport(app: Application, passport: PassportStatic) {

  if (!process.env.SESSION_SECRET) {
    console.log("Must set SESSION_SECRET environment variable");
    process.exit(1);
  }

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());


  passport.deserializeUser(async (id: number, done) => {
    const userDao = DaoFactory.get<PostgresUserDaoImpl>(DaoType.USER);
    try {
      const user = await userDao.getUserById(id);
      done(null, user);
    }
    catch(e) {
      done(e);
    }
  });

  passport.serializeUser((user: User, done) => {
    done(null, user.id);
  });

  const LocalStrategy = Strategy;

  passport.use("login", new LocalStrategy({
      // by default, local strategy uses username and password
      usernameField: 'email',
      passwordField: 'password'
    },
    async (username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
      const userDao = DaoFactory.get<PostgresUserDaoImpl>(DaoType.USER);
      try {
        const user = await userDao.getUserByEmail(username);
        if (!user) {
          return done(null, null, {message: "No user found"});
        }
        user.validPassword(password, (err, success) => {
          if (err) {
            return done(err);
          }
          else if (!success) {
            return done(null, null, {message: "invalid password"});
          }
          else {
            return done(null, user);
          }
        })
      }
      catch(e) {
        done(e);
      }

  }));

  passport.use("signup", new LocalStrategy({
      usernameField: 'email',
      passReqToCallback: true
    },
    async (req: Request, email: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
      const userDao = DaoFactory.get<PostgresUserDaoImpl>(DaoType.USER);
      try {
        const user = await userDao.getUserByEmail(email);
        if (user) {
          return done(null, user);
        }
        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) {
            return done(err);
          }
          const user = new User(email, hash);
          try {
            await userDao.saveUser(user);
          } catch (e) {
            done(e);
          }
        })
      }
      catch(e) {
        done(e);
      }
    }));
}