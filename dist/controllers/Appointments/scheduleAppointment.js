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
exports.scheduleAppointment = void 0;
const scheduleAppointmentS_1 = require("../../services/Appointment/scheduleAppointmentS");
const scheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAppointment = req.body; // Asegúrate de que el cuerpo tenga el formato correcto
    const createdAppointment = yield (0, scheduleAppointmentS_1.scheduleAppointmentS)(newAppointment);
    res.status(201).json(createdAppointment);
});
exports.scheduleAppointment = scheduleAppointment;
