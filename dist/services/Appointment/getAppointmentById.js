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
exports.getAppointmentByIdS = void 0;
const AppointmentRepository_1 = __importDefault(require("../../repositories/AppointmentRepository"));
const getAppointmentByIdS = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield AppointmentRepository_1.default.findOne({
        where: { id },
        relations: ['user'], // Cargar la relación con el usuario
    });
    if (appointment) {
        return {
            id: appointment.id,
            date: appointment.date,
            time: appointment.time, // Almacena como string
            user: appointment.user, // ID del usuario relacionado
            status: appointment.status === 'active', // Convierte a booleano
            Asunto: appointment.Asunto
        };
    }
    return null; // Retorna null si no se encuentra la cita
});
exports.getAppointmentByIdS = getAppointmentByIdS;
