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
exports.createCredentialS = void 0;
const CredentialRepository_1 = __importDefault(require("../../repositories/CredentialRepository"));
const createCredentialS = (username, password, user) => __awaiter(void 0, void 0, void 0, function* () {
    // Crear el nuevo objeto de credencial
    const newCredential = CredentialRepository_1.default.create(Object.assign({ username,
        password }, (user && { user })));
    // Guardar la nueva credencial en la base de datos
    const savedCredential = yield CredentialRepository_1.default.save(newCredential);
    return savedCredential; // Retornar la credencial guardada
});
exports.createCredentialS = createCredentialS;
