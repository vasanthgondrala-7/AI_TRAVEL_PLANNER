import app from "./app";
import { connectDB } from "./config/db";
import {
  validateEnv,
  env
} from "./config/env";

const startServer = async () => {
  try {

    validateEnv();

    await connectDB();

    app.listen(
      Number(env.PORT),
      () => {
        console.log(
          `🚀 Server Running On Port ${env.PORT}`
        );
      }
    );

  } catch (error) {

    console.error(
      "Failed To Start Server",
      error
    );

    process.exit(1);
  }
};

startServer();