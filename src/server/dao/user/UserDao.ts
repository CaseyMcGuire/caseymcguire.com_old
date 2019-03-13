import User from "../../models/User";
import {Dao} from "../Dao";

export interface UserDao extends Dao {
  getUserByEmail(email: string): Promise<User>;
  getUserById(id: number): Promise<User>;
  saveUser(user: User): Promise<void>;
}