"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const envs_1 = require("./config/envs");
const preloadData_1 = require("./helpers/preloadData");
const appDataSource_1 = require("./config/appDataSource");
appDataSource_1.AppDataSource.initialize()
    .then(() => {
    console.log("Conexión a la base de datos establecida con éxito.");
    return (0, preloadData_1.PreLoadData)();
})
    .then(() => {
    server_1.default.listen(envs_1.PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${envs_1.PORT}`);
    });
})
    .catch((error) => {
    console.error("Error durante la inicialización:", error);
});
