"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepository = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Appointment_1 = require("../entities/Appointment");
const Credential_1 = require("../entities/Credential");
const envs_1 = require("./envs");
exports.AppDataSource = new typeorm_1.DataSource({
    type: envs_1.DB_TYPE,
    host: envs_1.DB_HOST,
    port: envs_1.DB_PORT,
    username: envs_1.DB_USERNAME, // Updated variable name
    password: envs_1.DB_PASSWORD, // Updated variable name
    database: envs_1.DATABASE,
    synchronize: envs_1.DB_SYNCHRONIZE,
    logging: envs_1.DB_LOGGING,
    dropSchema: envs_1.DB_DROPSCHEMA,
    entities: [User_1.User, Appointment_1.Appointment, Credential_1.Credential],
    subscribers: [],
    migrations: [],
    ssl: true,
});
const getRepository = (entity) => {
    return exports.AppDataSource.getRepository(entity);
};
exports.getRepository = getRepository;
