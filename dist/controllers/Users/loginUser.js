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
        const { identifier, password } = req.body;
        if (!identifier || !password) {
            res
                .status(400)
                .json({ message: "Nombre de usuario y contraseña son requeridos" });
            return;
        }
        const credential = yield (0, LoginUserS_1.loginUserS)(identifier, password);
        if (!credential) {
            res.status(401).json({ message: "Usuario o contraseña incorrectos" });
            return;
        }
        // Formatear la respuesta
        const response = {
            login: true,
            user: {
                id: credential.id,
                name: credential.name,
                email: credential.email,
                birthdate: credential.birthdate,
                nDni: credential.nDni,
            },
        };
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({
            message: "Error en el servidor",
            error: error.message,
        });
    }
});
exports.loginUser = loginUser;
