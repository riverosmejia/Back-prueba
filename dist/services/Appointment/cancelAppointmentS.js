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
exports.cancelAppointmentS = void 0;
const Appointment_1 = require("../../entities/Appointment");
const AppointmentRepository_1 = __importDefault(require("../../repositories/AppointmentRepository"));
const cancelAppointmentS = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield AppointmentRepository_1.default.findOneBy({ id });
    if (appointment) {
        appointment.status = Appointment_1.AppointmentStatus.CANCELLED; // Cambia el estado a "cancelled"
        const result = yield AppointmentRepository_1.default.save(appointment);
        return result;
    }
    return null;
});
exports.cancelAppointmentS = cancelAppointmentS;
