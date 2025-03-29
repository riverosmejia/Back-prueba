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
exports.PreLoadData = void 0;
const appDataSource_1 = require("../config/appDataSource");
const User_1 = require("../entities/User"); // Importa la entidad User
const Appointment_1 = require("../entities/Appointment"); // Importa la entidad Appointment
const Credential_1 = require("../entities/Credential");
const moment_1 = __importDefault(require("moment"));
const Model = (entity) => (0, appDataSource_1.getRepository)(entity);
//Datos precargados
const users = [
    {
        "name": "Juan Pérez",
        "email": "juan.perez@example.com",
        "password": "hashedpassword1",
        "birthdate": new Date("1990-01-15"),
        "nDni": 123,
        "role": "user"
    },
    {
        "name": "María García",
        "email": "maria.garcia@example.com",
        "password": "hashedpassword2",
        "birthdate": new Date("1985-03-20"),
        "nDni": 234,
        "role": "user"
    },
    {
        "name": "Carlos López",
        "email": "carlos.lopez@example.com",
        "password": "hashedpassword3",
        "birthdate": new Date("1992-07-25"),
        "nDni": 345,
        "role": "user"
    },
    {
        "name": "Ana Torres",
        "email": "ana.torres@example.com",
        "password": "hashedpassword4",
        "birthdate": new Date("1995-11-10"),
        "nDni": 456,
        "role": "user"
    }
];
const appointments = [
    {
        "userId": 1,
        "date": new Date("2024-09-30"),
        "time": (0, moment_1.default)("10:00:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active",
        "Asunto": "Consulta"
    },
    {
        "userId": 1,
        "date": new Date("2024-10-05"),
        "time": (0, moment_1.default)("11:00:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active",
        "Asunto": "Revisión"
    },
    {
        "userId": 2,
        "date": new Date("2024-10-01"),
        "time": (0, moment_1.default)("10:30:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active",
        "Asunto": "Consulta"
    },
    {
        "userId": 2,
        "date": new Date("2024-10-08"),
        "time": (0, moment_1.default)("12:00:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active",
        "Asunto": "Terapia"
    },
    {
        "userId": 3,
        "date": new Date("2024-10-02"),
        "time": (0, moment_1.default)("09:30:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active",
        "Asunto": "Consulta"
    },
    {
        "userId": 3,
        "date": new Date("2024-10-09"),
        "time": (0, moment_1.default)("14:00:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active",
        "Asunto": "Cirujía"
    },
    {
        "userId": 4,
        "date": new Date("2024-10-03"),
        "time": (0, moment_1.default)("08:00:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active",
        "Asunto": "Revisión"
    },
    {
        "userId": 4,
        "date": new Date("2024-10-10"),
        "time": (0, moment_1.default)("15:30:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active",
        "Asunto": "Consulta"
    }
];
const PreLoadData = () => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = appDataSource_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    yield queryRunner.startTransaction();
    try {
        const users_ = yield queryRunner.manager.find(User_1.User);
        if (!users_.length) {
            let usersList = [];
            for (let i = 0; i < users.length; i++) {
                //crear la credencial con la info del usuario
                const credential = yield queryRunner.manager.save(Model(Credential_1.Credential).create({
                    username: users[i].email,
                    password: users[i].password
                }));
                //crear el usuario y  metelrle la credencial de arriba
                const user = yield queryRunner.manager.save(Model(User_1.User).create({
                    name: users[i].name,
                    email: users[i].email,
                    password: users[i].password,
                    birthdate: users[i].birthdate,
                    nDni: users[i].nDni,
                    role: users[i].role,
                    credential: credential
                }));
                credential.user = user; // Relacionamos la credencial aquí
                yield queryRunner.manager.save(credential);
                /*el userList se usaba abajo en las credenciales, ya no, lo dejo por si hago una
                modificación luego, si lo dejé perdón, se me olvidó borrarlo, me perdonas?*/
                usersList.push(user);
            }
            for (let j = 0; j < appointments.length; j++) {
                // Busca al usuario por userId usando el queryRunner
                const userId = appointments[j].userId; // Obtén el userId de la cita
                const user = yield queryRunner.manager.findOne(User_1.User, { where: { id: userId } }); // Consulta directa
                if (!user) {
                    console.error(`Usuario con ID ${userId} no encontrado.`);
                    continue; // Salta al siguiente ciclo si el usuario no existe
                }
                yield queryRunner.manager.save(Model(Appointment_1.Appointment).create({
                    date: appointments[j].date,
                    time: appointments[j].time,
                    status: appointments[j].status,
                    Asunto: appointments[j].Asunto,
                    user: user
                }));
            }
            console.log("Datos precargados exitosamente con credenciales y citas.");
        }
        // Si todo es exitoso, confirma la transacción
        yield queryRunner.commitTransaction();
    }
    catch (error) {
        // Si algo falla, deshace la transacción
        yield queryRunner.rollbackTransaction();
        console.error("Error en la precarga de datos:", error);
    }
    finally {
        // Libera el QueryRunner
        yield queryRunner.release();
    }
});
exports.PreLoadData = PreLoadData;
