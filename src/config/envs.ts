import "dotenv/config";

export const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 3000;

export const DB_USERNAME: string | undefined = process.env.DB_USERNAME;
export const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;

export const DB_TYPE: string = "postgres";
export const DB_PORT: number | undefined = process.env.DB_PORT
  ? parseInt(process.env.DB_PORT, 10)
  : undefined;
export const DB_HOST: string | undefined = process.env.DB_HOST;
export const DATABASE: string | undefined = process.env.DATABASE;

export const DB_SYNCHRONIZE: boolean = process.env.DB_SYNCHRONIZE
  ? process.env.DB_SYNCHRONIZE === "true"
  : true;
export const DB_LOGGING: boolean = process.env.DB_LOGGING
  ? process.env.DB_LOGGING === "true"
  : false;
export const DB_DROPSCHEMA: boolean = process.env.DB_DROPSCHEMA
  ? process.env.DB_DROPSCHEMA === "true"
  : false;
