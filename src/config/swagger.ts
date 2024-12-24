import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',  // Asegúrate de que esta línea esté correctamente configurada
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'API para la gestión de tareas',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Cambia el URL si tu API está en otro puerto o dominio
      },
    ],
  },
  apis: ['./src/routes/**/*.ts'], // Ruta donde estarán tus archivos de rutas
};

// Generar especificación Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();

// Ruta para acceder a la documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swaggerSpec;