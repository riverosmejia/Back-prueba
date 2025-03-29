"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appDataSource_1 = require("../config/appDataSource");
const Appointment_1 = require("../entities/Appointment");
const appointmentRepository = appDataSource_1.AppDataSource.getRepository(Appointment_1.Appointment);
exports.default = appointmentRepository;
