import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Appointment } from "../entities/Appointment";
import { Credential } from "../entities/Credential";
import {
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USERNAME, // Updated variable name
  DB_PASSWORD, // Updated variable name
  DATABASE,
  DB_SYNCHRONIZE,
  DB_LOGGING,
  DB_DROPSCHEMA,
} from "./envs";

export const AppDataSource = new DataSource({
  type: DB_TYPE as "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME, // Updated variable name
  password: DB_PASSWORD, // Updated variable name
  database: DATABASE,
  synchronize: DB_SYNCHRONIZE,
  logging: DB_LOGGING,
  dropSchema: DB_DROPSCHEMA,
  entities: [User, Appointment, Credential],
  subscribers: [],
  migrations: [],
  ssl: true,
});

export const getRepository = <Entity>(entity: new () => Entity) => {
  return AppDataSource.getRepository(entity);
};
