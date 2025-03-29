import { Request, Response } from "express";
import { cancelAppointmentS } from "../../services/Appointment/cancelAppointmentS";

export const cancelAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const Id = parseInt(id);
  const canceledAppointment = await cancelAppointmentS(Id);

  if (canceledAppointment) {
    res.status(200).json(canceledAppointment);
  } else {
    res.status(404).json({ message: "Turno no encontrado" });
  }
};
