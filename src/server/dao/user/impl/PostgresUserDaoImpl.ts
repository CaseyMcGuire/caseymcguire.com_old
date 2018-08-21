import PostgresDatabaseManager from "../../../db/PostgresDatabaseManager";
import {UserDao} from "../UserDao";
import User from "../../../models/User";
import {QueryResult} from "pg";
import UserTableRow from "../../../db/tables/UserTableRow";

export default class PostgresUserDaoImpl implements UserDao {

  private static readonly GET_USER_BY_EMAIL = "SELECT * FROM users WHERE email = $1";

  constructor(private readonly databaseManager: PostgresDatabaseManager) {}

  getUser(email: string, callback: (err: Error | undefined, user?: User) => void): void {
    this.databaseManager.query(PostgresUserDaoImpl.GET_USER_BY_EMAIL, [email], (err?: Error, result?: QueryResult) => {
      if (err || !result || result.rows.length === 0) {
        return callback(err);
      }
      const userTableRow = result.rows[0] as UserTableRow;
      const user = this.convertRowToUser(userTableRow);
      return callback(undefined, user);
    });
  }

  private convertRowToUser(userTableRow: UserTableRow): User {
    return new User(userTableRow.email, userTableRow.password);
  }

}