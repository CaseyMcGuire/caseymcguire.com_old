import {UserDao} from "../UserDao";
import User from "../../../models/User";
import UserTableRow from "../../../db/tables/UserTableRow";
import DatabaseManager from "../../../db/DatabaseManager";

export default class PostgresUserDaoImpl implements UserDao {

  private static readonly GET_USER_BY_EMAIL = "SELECT * FROM users WHERE email = $1";

  constructor(private readonly databaseManager: DatabaseManager) {}

  getUser(email: string, callback: (err: Error | undefined, user?: User) => void): void {
    this.databaseManager.query(PostgresUserDaoImpl.GET_USER_BY_EMAIL, [email], (err?: Error, result?: any[]) => {
      if (err || !result || result.length === 0) {
        return callback(err);
      }
      const userTableRow = result[0] as UserTableRow;
      const user = this.convertRowToUser(userTableRow);
      return callback(undefined, user);
    });
  }

  private convertRowToUser(userTableRow: UserTableRow): User {
    return new User(userTableRow.email, userTableRow.password);
  }

}