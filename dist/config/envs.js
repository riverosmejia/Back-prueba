"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_DROPSCHEMA = exports.DB_LOGGING = exports.DB_SYNCHRONIZE = exports.DATABASE = exports.DB_HOST = exports.DB_PORT = exports.DB_TYPE = exports.DB_PASSWORD = exports.DB_USERNAME = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : 3000;
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_TYPE = "postgres";
exports.DB_PORT = process.env.DB_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : undefined;
exports.DB_HOST = process.env.DB_HOST;
exports.DATABASE = process.env.DATABASE;
exports.DB_SYNCHRONIZE = process.env.DB_SYNCHRONIZE
    ? process.env.DB_SYNCHRONIZE === "true"
    : true;
exports.DB_LOGGING = process.env.DB_LOGGING
    ? process.env.DB_LOGGING === "true"
    : false;
exports.DB_DROPSCHEMA = process.env.DB_DROPSCHEMA
    ? process.env.DB_DROPSCHEMA === "true"
    : false;
