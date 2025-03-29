import { Request, Response } from "express";

import { createUserS } from "../../services/User/createUserS";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role, birthdate, nDni } = req.body; // Eliminar credentialsId

  try {
    const newUser = await createUserS({
      name,
      email,
      password,
      role,
      birthdate,
      nDni,
    }); // Crear el nuevo usuario

    if (typeof newUser === "string") {
      res.status(400).json({ message: newUser });
    }

    res.status(201).json(newUser); // Cambiar a 201 para indicar creación exitosa
  } catch (err) {
    const error = err as Error;
    // Manejo de errores
  }
};
