const { response } = require("express");

const port = process.env.PORT || 3000;

// Swagger Configuration
const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Kavakito App API",
        version: "0.1.0",
        description:
          "Documentation for Kavakito App API",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Kavakito WebAPI",
          url: "https://kavakito.com.mx"
        },
      },
      components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT"
              }
            },
          responses: {
            UnauthorizedError: {
              description: "Access token is missing or invalid"
            }
          }  
      },
      security: [
        {
          bearerAuth: []
        }
      ],
      servers: [
        {
          url: "http://localhost:"+port+"/api",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };

  exports.options = options;