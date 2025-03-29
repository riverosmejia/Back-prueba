"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserS = void 0;
const appDataSource_1 = require("../../config/appDataSource");
const Credential_1 = require("../../entities/Credential");
const loginUserS = (identifier, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentialRepository = appDataSource_1.AppDataSource.getRepository(Credential_1.Credential);
        // Buscar la credencial del usuario por username
        const credential = yield credentialRepository.findOne({
            where: { username: identifier },
            relations: ["user"], // Cargar la relación con User
        });
        if (!credential || !credential.user) {
            return null;
        }
        // Verificar la contraseña sin bcrypt
        if (credential.password !== password) {
            return null;
        }
        // Retornar solo los datos necesarios del usuario
        return {
            id: credential.user.id,
            name: credential.user.name,
            email: credential.user.email,
            birthdate: credential.user.birthdate,
            nDni: credential.user.nDni,
        };
    }
    catch (error) {
        console.error("Error en el servicio de login:", error);
        throw new Error("Error al intentar autenticar al usuario");
    }
});
exports.loginUserS = loginUserS;
