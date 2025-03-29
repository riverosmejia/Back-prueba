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
exports.getAppointmentsByUserIdS = void 0;
const AppointmentRepository_1 = __importDefault(require("../../repositories/AppointmentRepository"));
const getAppointmentsByUserIdS = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield AppointmentRepository_1.default.find({
        where: {
            user: {
                id: userId, // Filtra por la relación con User
            },
        },
        relations: ['user'], // Carga la relación con el usuario
    });
    return appointments; // Devuelve los appointments encontrados
});
exports.getAppointmentsByUserIdS = getAppointmentsByUserIdS;
