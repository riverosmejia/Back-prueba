import server from "./server";
import { PORT } from "./config/envs";
import { PreLoadData } from "./helpers/preloadData";
import { AppDataSource } from "./config/appDataSource";

AppDataSource.initialize()
  .then(async () => {
    console.log("Conexión a la base de datos realizada con éxito");

    //PreLoadData();

    server.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });
