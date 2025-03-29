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
exports.getAppointmentById = void 0;
const getAppointmentById_1 = require("../../services/Appointment/getAppointmentById");
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const appointment = yield (0, getAppointmentById_1.getAppointmentByIdS)(Number(id));
    if (appointment) {
        res.status(200).json(appointment);
    }
    else {
        res.status(404).json({ message: "Turno no encontrado" });
    }
});
exports.getAppointmentById = getAppointmentById;
