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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserS = void 0;
const createCredentialS_1 = require("../Credential/createCredentialS");
const savedUserInCredentialS_1 = require("../Credential/savedUserInCredentialS");
const appDataSource_1 = require("../../config/appDataSource");
const UserRepository_1 = __importDefault(require("../../repositories/UserRepository"));
const createUserS = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = appDataSource_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    yield queryRunner.startTransaction();
    try {
        // Verificar si ya existe un usuario con el mismo DNI
        const existingUser = yield UserRepository_1.default.findOne({ where: { nDni: userData.nDni } });
        if (existingUser) {
            return "este Dni ya ha sido registrado perro";
        }
        const existingUser_ = yield UserRepository_1.default.findOne({ where: { email: userData.email } });
        if (existingUser_) {
            return "este Email ya ha sido registrado perro";
        }
        // Crear el usuario
        const user = yield queryRunner.manager.save(UserRepository_1.default.create({
            name: userData.name,
            email: userData.email,
            birthdate: userData.birthdate,
            nDni: userData.nDni,
            role: userData.role,
            password: userData.password,
        }));
        // Crear la credencial asociando el userId
        const credential = yield (0, createCredentialS_1.createCredentialS)(userData.email, userData.password, null);
        // Asignar el ID de la credencial al usuario
        user.credential = credential;
        // Guardar el usuario actualizado con la credencial
        yield queryRunner.manager.save(user);
        (0, savedUserInCredentialS_1.SavedUserInCredentialS)(user, credential.id);
        // Confirmar la transacción
        yield queryRunner.commitTransaction();
        return user;
    }
    catch (error) {
        // Revertir la transacción en caso de error
        yield queryRunner.rollbackTransaction();
        throw error;
    }
    finally {
        // Liberar el QueryRunner
        yield queryRunner.release();
    }
});
exports.createUserS = createUserS;
