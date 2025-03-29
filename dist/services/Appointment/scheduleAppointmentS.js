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
exports.scheduleAppointmentS = void 0;
const moment_1 = __importDefault(require("moment"));
const Appointment_1 = require("../../entities/Appointment");
const AppointmentRepository_1 = __importDefault(require("../../repositories/AppointmentRepository"));
const scheduleAppointmentS = (newAppointment) => __awaiter(void 0, void 0, void 0, function* () {
    if (!newAppointment.userId) {
        return "Error: El usuario debe estar autenticado para agendar un turno.";
    }
    const formattedTime = (0, moment_1.default)(newAppointment.time, "HH:mm", true);
    if (!formattedTime.isValid()) {
        return "Error: El formato de la hora no es válido. Debe ser HH:mm.";
    }
    const appointmentDate = (0, moment_1.default)(newAppointment.date, "YYYY-MM-DD", true);
    const dayOfWeek = appointmentDate.day(); //el day me salvó  la vida
    if (dayOfWeek === 6 || dayOfWeek === 0) {
        return "Error: No se pueden agendar turnos los fines de semana.";
    }
    // horario de atención ficticio (como mi pareja :,D)
    const openingTime = (0, moment_1.default)("09:00", "HH:mm");
    const closingTime = (0, moment_1.default)("17:00", "HH:mm");
    // Verifica que el horario esté dentro del horario de atención
    if (!formattedTime.isBetween(openingTime, closingTime, undefined, "[]")) {
        return "Error: El horario de atención es de 09:00 a 17:00.";
    }
    //ahora si creemos el turno perru >:P
    const appointment = AppointmentRepository_1.default.create({
        user: { id: newAppointment.userId },
        date: newAppointment.date,
        time: formattedTime.format("HH:mm"),
        status: Appointment_1.AppointmentStatus.ACTIVE,
        Asunto: newAppointment.Asunto,
    });
    // Guarda el turno
    const result = (yield AppointmentRepository_1.default.save(appointment));
    return result;
});
exports.scheduleAppointmentS = scheduleAppointmentS;
