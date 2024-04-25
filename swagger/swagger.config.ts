import swaggerJSDoc from "swagger-jsdoc";

const definition = {
  swagger: "2.0",
  info: {
    title: "API Turnos-Medico",
    version: "1.0.0",
  },
  tags: [
    {
      name: "Pacientes",
      description: "Endpoints relacionados con los pacientes",
    },
  ],
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Por favor, introduzca el token Bearer",
    },
  },
  produces: ["application/json"],
};

const options = {
  definition,
  apis: ["dist/swagger/pacientes.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
