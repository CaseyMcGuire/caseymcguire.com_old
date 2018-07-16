import {Pool, QueryResult} from "pg";

export default class PostgresDatabaseManager {

  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool();
  }

  query(text: string, params: any[], callback: (err: Error, result: QueryResult) => void) {
    this.pool.query(text, params, callback);
  }

}