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
exports.loginUser = void 0;
const LoginUserS_1 = require("../../services/User/LoginUserS");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: 'Nombre de usuario y contraseña son requeridos' });
            return; //para aquí malvado;
        }
        const credential = yield (0, LoginUserS_1.loginUserS)(username, password);
        if (!credential) {
            res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            return; //para aquí malvado;
        }
        res.status(200).json(credential);
    }
    catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});
exports.loginUser = loginUser;
