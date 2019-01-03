import {Pool, QueryResult} from "pg";
import DatabaseManager from "./DatabaseManager";

export default class PostgresDatabaseManagerImpl implements DatabaseManager {

  private readonly pool: Pool;

  constructor() {
    let config;
    const { DATABASE_URL, MY_SITE_USER, MY_SITE_HOST, MY_SITE_DATABASE, MY_SITE_PASSWORD } = process.env;
    if (DATABASE_URL) {
      config = {
        connectionString: process.env.DATABASE_URL,
        ssl: true
      }
    }
    else if (MY_SITE_USER && MY_SITE_HOST && MY_SITE_DATABASE && MY_SITE_PASSWORD) {
      config = {
        user: process.env.MY_SITE_USER,
        host: process.env.MY_SITE_HOST,
        database: process.env.MY_SITE_DATABASE,
        password: process.env.MY_SITE_PASSWORD
      }
    }
    else {
      console.error("No credentials to login to database. Exiting...");
      process.exit(1);
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