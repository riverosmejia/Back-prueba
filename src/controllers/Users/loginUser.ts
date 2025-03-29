import { Request, Response } from "express";
import { loginUserS } from "../../services/User/LoginUserS";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      res
        .status(400)
        .json({ message: "Nombre de usuario y contraseña son requeridos" });
      return;
    }

    const credential = await loginUserS(identifier, password);

    if (!credential) {
      res.status(401).json({ message: "Usuario o contraseña incorrectos" });
      return;
    }

    // Formatear la respuesta
    const response = {
      login: true,
      user: {
        id: credential.id,
        name: credential.name,
        email: credential.email,
        birthdate: credential.birthdate,
        nDni: credential.nDni,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: (error as Error).message,
    });
  }
};
