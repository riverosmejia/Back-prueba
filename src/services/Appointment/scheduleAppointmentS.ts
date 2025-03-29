import moment from 'moment';
import I_Appoinment from '../../DTO/I_Appointment';
import { Appointment,AppointmentStatus} from '../../entities/Appointment';
import appointmentRepository from '../../repositories/AppointmentRepository';

export const scheduleAppointmentS = async (newAppointment: I_Appoinment): Promise<Appointment | string> => {


    if (!newAppointment.userId) {
        return 'Error: El usuario debe estar autenticado para agendar un turno.';
    }

    const formattedTime = moment(newAppointment.time, 'HH:mm', true);
    if (!formattedTime.isValid()) {
        return 'Error: El formato de la hora no es válido. Debe ser HH:mm.';
    }

    const appointmentDate = moment(newAppointment.date, 'YYYY-MM-DD', true);

    const dayOfWeek = appointmentDate.day();//el day me salvó  la vida
    
    if (dayOfWeek === 6 || dayOfWeek === 0) {
        return 'Error: No se pueden agendar turnos los fines de semana.';
    }


    
    // horario de atención ficticio (como mi pareja :,D)
    const openingTime = moment('09:00', 'HH:mm');
    const closingTime = moment('17:00', 'HH:mm');

    // Verifica que el horario esté dentro del horario de atención
    if (!formattedTime.isBetween(openingTime, closingTime, undefined, '[]')) {
        return 'Error: El horario de atención es de 09:00 a 17:00.';
    }


    //ahora si creemos el turno perru >:P
    const appointment = appointmentRepository.create({
        user: { id: newAppointment.userId },
        date: newAppointment.date,
        time: formattedTime.format('HH:mm'),
        status: AppointmentStatus.ACTIVE,
        Asunto: newAppointment.Asunto
    });

    // Guarda el turno
    const result = await appointmentRepository.save(appointment) as Appointment;

    return result;
};