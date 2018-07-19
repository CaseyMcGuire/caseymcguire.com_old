import {Pool, QueryResult} from "pg";

export default class PostgresDatabaseManager {

  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.MY_SITE_USER,
      host: process.env.MY_SITE_HOST,
      database: process.env.MY_SITE_DATABASE,
      password: process.env.MY_SITE_PASSWORD
    });
  }

  query(text: string, params: any[], callback: (err?: Error, result?: QueryResult) => void) {
    this.pool.query(text, params, callback);
  }

}