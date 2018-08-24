import PostgresDatabaseManagerImpl from "../db/PostgresDatabaseManagerImpl";
import {Dao} from "./Dao";
import { Map } from "immutable";
import PostgresUserDaoImpl from "./user/impl/PostgresUserDaoImpl";
import PostgresPostDaoImpl from "./post/impl/PostgresPostDaoImpl";
import DatabaseManager from "../db/DatabaseManager";

export enum DaoType {
  USER,
  POST
}

export default class DaoFactory {

  private static daos: Map<DaoType, Dao>;

  static initialize() {
    const databaseManager: DatabaseManager = new PostgresDatabaseManagerImpl();

    DaoFactory.daos = Map<DaoType, Dao>()
      .set(DaoType.USER, new PostgresUserDaoImpl(databaseManager))
      .set(DaoType.POST, new PostgresPostDaoImpl(databaseManager));
  }

  public static get<DAO extends Dao>(daoType: DaoType): DAO {
    return this.daos.get(daoType) as DAO;
  }
}

DaoFactory.initialize();