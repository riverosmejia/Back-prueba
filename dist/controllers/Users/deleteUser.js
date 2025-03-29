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
exports.deleteUser = void 0;
const deleteUser_1 = require("../../services/User/deleteUser");
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Ahora obtenemos el ID desde los parámetros
        const userId = parseInt(id);
        console.log(id);
        yield (0, deleteUser_1.deleteUserS)(userId);
        res.status(200).json({ message: "Usuario eliminado... como mis ganas de vivir" });
    }
    catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});
exports.deleteUser = deleteUser;
