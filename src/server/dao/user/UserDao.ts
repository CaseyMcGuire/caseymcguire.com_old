import User from "../../models/User";
import {Dao} from "../Dao";

export interface UserDao extends Dao {
  getUserByEmail(email: string, callback: (err?: Error, user?: User) => void): void;
  getUserById(id: number, callback: (err: Error | undefined, user?: User) => void): void;
  saveUser(user: User, callback: (err: Error | undefined) => void): void;
}