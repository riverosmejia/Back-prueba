import { Appointment, AppointmentStatus } from "../../entities/Appointment";
import appointmentRepository from "../../repositories/AppointmentRepository";
import I_AppointmentResponse from "../../DTO/I_AppointmentResponse";

export const getAllAppointmentsS = async (): Promise<
  I_AppointmentResponse[]
> => {
  // Cargar las relaciones con 'user'
  const appointments: Appointment[] = (await appointmentRepository.find({
    relations: ["user"], // Incluye la relación con 'user'
  })) as Appointment[];

  return appointments.map((app) => ({
    id: app.id,
    date: app.date,
    time: app.time, // Mantiene el tiempo como string (importante)
    status: app.status === AppointmentStatus.ACTIVE,
    Asunto: app.Asunto,
  }));
};
