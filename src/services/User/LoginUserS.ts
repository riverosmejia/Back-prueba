import { AppDataSource } from "../../config/appDataSource";
import { Credential } from "../../entities/Credential";
import { User } from "../../entities/User";

export const loginUserS = async (
  identifier: string,
  password: string
): Promise<User | null> => {
  try {
    const credentialRepository = AppDataSource.getRepository(Credential);

    // Buscar la credencial del usuario por username
    const credential = await credentialRepository.findOne({
      where: { username: identifier },
      relations: ["user"], // Cargar la relación con User
    });

    if (!credential || !credential.user) {
      return null;
    }

    // Verificar la contraseña sin bcrypt
    if (credential.password !== password) {
      return null;
    }

    // Retornar solo los datos necesarios del usuario
    return {
      id: credential.user.id,
      name: credential.user.name,
      email: credential.user.email,
      birthdate: credential.user.birthdate,
      nDni: credential.user.nDni,
    } as User;
  } catch (error) {
    console.error("Error en el servicio de login:", error);
    throw new Error("Error al intentar autenticar al usuario");
  }
};
