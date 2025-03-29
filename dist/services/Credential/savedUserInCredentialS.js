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
exports.SavedUserInCredentialS = void 0;
const CredentialRepository_1 = __importDefault(require("../../repositories/CredentialRepository"));
const SavedUserInCredentialS = (user, credentialId) => __awaiter(void 0, void 0, void 0, function* () {
    // Buscar la credencial por su ID
    const credential = yield CredentialRepository_1.default.findOne({ where: { id: credentialId } });
    // Si la credencial no existe, lanzar un error
    if (!credential) {
        throw new Error(`Credential with ID ${credentialId} not found.`);
    }
    // Asignar el usuario a la credencial
    credential.user = user;
    // Guardar los cambios en la base de datos
    const updatedCredential = yield CredentialRepository_1.default.save(credential);
    return updatedCredential; // Retornar la credencial actualizada
});
exports.SavedUserInCredentialS = SavedUserInCredentialS;
