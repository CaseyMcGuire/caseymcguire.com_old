import User from "../../models/User";
import {Dao} from "../Dao";

export interface UserDao extends Dao {
  getUser(email: string, callback: (err?: Error, user?: User) => void): void;
  saveUser(user: User, callback: (err: Error | undefined) => void): void;
}