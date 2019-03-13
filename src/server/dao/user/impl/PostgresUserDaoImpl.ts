import {UserDao} from "../UserDao";
import User from "../../../models/User";
import UserTableRow from "../../../db/tables/UserTableRow";
import DatabaseManager from "../../../db/DatabaseManager";

export default class PostgresUserDaoImpl implements UserDao {

  private static readonly GET_USER_BY_EMAIL = "SELECT * FROM users WHERE email = $1";
  private static readonly GET_USER_BY_ID = "SELECT * FROM users WHERE id = $1";
  private static readonly SAVE_USER = "INSERT INTO users (email, password, is_admin) VALUES ($1, $2, false)";

  constructor(private readonly databaseManager: DatabaseManager) {}

  async getUserByEmail(email: string): Promise<User> {
    try {
      const result = await this.databaseManager.query(PostgresUserDaoImpl.GET_USER_BY_EMAIL, [email]);
      if (!result || result.length === 0) {
        return Promise.reject("No user with email " + email);
      }
      return this.convertRowToUser(result[0]);
    } catch (e) {
      throw e;
    }

  }

  async getUserById(id: number): Promise<User> {
    try {
      const result = await this.databaseManager.query(PostgresUserDaoImpl.GET_USER_BY_ID, [id]);
      if (!result || result.length === 0) {
        return Promise.reject("No user with id " + id);
      }
      return this.convertRowToUser(result[0]);
    } catch (e) {
      throw e;
    }
  }


  async saveUser(user: User): Promise<void> {
    try {
      await this.databaseManager.query(PostgresUserDaoImpl.SAVE_USER, [user.email, user.password]);
      return Promise.resolve();
    } catch(e) {
      throw e;
    }
  }

  private convertRowToUser(userTableRow: UserTableRow): User {
    return new User(userTableRow.email, userTableRow.password, userTableRow.id, userTableRow.is_admin);
  }

}