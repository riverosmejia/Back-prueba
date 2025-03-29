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
exports.getAllAppointmentsS = void 0;
const Appointment_1 = require("../../entities/Appointment");
const AppointmentRepository_1 = __importDefault(require("../../repositories/AppointmentRepository"));
const getAllAppointmentsS = () => __awaiter(void 0, void 0, void 0, function* () {
    // Cargar las relaciones con 'user'
    const appointments = yield AppointmentRepository_1.default.find({
        relations: ['user'], // Incluye la relación con 'user'
    });
    return appointments.map(app => ({
        id: app.id,
        user: {
            id: app.user.id,
            name: app.user.name,
            email: app.user.email
        },
        date: app.date,
        time: app.time, // Mantiene el tiempo como string (importante)
        status: app.status === Appointment_1.AppointmentStatus.ACTIVE,
        Asunto: app.Asunto
    }));
});
exports.getAllAppointmentsS = getAllAppointmentsS;
