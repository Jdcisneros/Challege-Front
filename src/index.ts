import swaggerUi from 'swagger-ui-express';

import cors from "cors";
import express from "express";
import todoRoutes from "./routes/todoRoutes";
import sequelize from "./config/db";
import dotenv from "dotenv";

import swaggerSpec from './config/swagger'


dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const testPort = process.env.NODE_ENV === "test" ? 4000 : PORT;

app.use(express.json());
app.use(cors());

app.use("/api/todo", todoRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
sequelize.sync({ alter: true });

// Cambia el puerto para las pruebas

export const server = app.listen(testPort, () => {
  console.log(`Server running on port ${testPort}`);
});
