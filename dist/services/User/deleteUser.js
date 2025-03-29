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
exports.deleteUserS = void 0;
const UserRepository_1 = __importDefault(require("../../repositories/UserRepository"));
const deleteUserS = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserRepository_1.default.findOneBy({ id });
    if (user) {
        yield UserRepository_1.default.remove(user); // Eliminar el usuario
    }
    else {
        throw new Error("Usuario no encontrado");
    }
});
exports.deleteUserS = deleteUserS;
