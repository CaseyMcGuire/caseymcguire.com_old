import {Pool, QueryResult} from "pg";
import DatabaseManager from "./DatabaseManager";

export default class PostgresDatabaseManagerImpl implements DatabaseManager {

  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.MY_SITE_USER,
      host: process.env.MY_SITE_HOST,
      database: process.env.MY_SITE_DATABASE,
      password: process.env.MY_SITE_PASSWORD
    });
  }

  query(text: string, params: any[], callback: (err: Error | undefined, result?: any[]) => void) {
    this.pool.query(text, params, (err, result) => {
      if (err) {
        callback(err);
      }
      callback(undefined, result.rows);
    });
  }

}