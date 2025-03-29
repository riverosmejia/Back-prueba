import { Credential } from "../../entities/Credential";
import { validateCredentialS } from "../Credential/validateCredentialS";

export const loginUserS = async (
  identifier: string,
  password: string
): Promise<Credential | null> => {
  // Validar las credenciales
  const credential = await validateCredentialS(identifier, password);

  if (!credential) {
    return null; // Si las credenciales no son válidas, retornar null
  }

  return credential; // Retornar el usuario o null si no se encuentra
};
