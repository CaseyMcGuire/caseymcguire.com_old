import {Pool, QueryResult} from "pg";
import DatabaseManager from "./DatabaseManager";

export default class PostgresDatabaseManagerImpl implements DatabaseManager {

  private readonly pool: Pool;

  constructor() {
    let config;
    if (process.env.DATABASE_URL) {
      config = {
        connectionString: process.env.DATABASE_URL,
        ssl: true
      }
    }
    else {
      config = {
        user: process.env.MY_SITE_USER,
        host: process.env.MY_SITE_HOST,
        database: process.env.MY_SITE_DATABASE,
        password: process.env.MY_SITE_PASSWORD
      }
    }
    this.pool = new Pool(config);
  }

  query(text: string, params: any[], callback: (err: Error | undefined, result?: any[]) => void) {
    this.pool.query(text, params, (err, result) => {
      if (err || !result) {
        return callback(err);
      }
      callback(undefined, result.rows);
    });
  }

}