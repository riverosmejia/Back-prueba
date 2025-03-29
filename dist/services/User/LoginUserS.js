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
const validateCredentialS_1 = require("../Credential/validateCredentialS");
const loginUserS = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Validar las credenciales
    const credential = yield (0, validateCredentialS_1.validateCredentialS)(username, password);
    if (!credential) {
        return null; // Si las credenciales no son válidas, retornar null
    }
    return credential; // Retornar el usuario o null si no se encuentra
});
exports.loginUserS = loginUserS;
