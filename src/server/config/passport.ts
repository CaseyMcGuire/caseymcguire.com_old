import {Application} from "express-serve-static-core";
import {PassportStatic} from "passport";
import { IVerifyOptions, Strategy }from "passport-local";
import PostgresUserDaoImpl from "../dao/user/impl/PostgresUserDaoImpl";
import PostgresDatabaseManager from "../db/PostgresDatabaseManager";
const session = require('express-session');

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


  passport.deserializeUser((user, done) => done(null, user));
  passport.serializeUser((user, done) => done(null, user));

  const LocalStrategy = Strategy;

  passport.use("login", new LocalStrategy({
      // by default, local strategy uses username and password
      usernameField: 'email',
      passwordField: 'password'
    },
    (username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
      const userDao = new PostgresUserDaoImpl(new PostgresDatabaseManager());
      userDao.getUser(username, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, null, {message: "No user found"});
        }

        if (!user.validPassword(password)) {
          return done(null, null, {message: "invalid password"});
        }

        return done(null, user);
      })
  }));
}