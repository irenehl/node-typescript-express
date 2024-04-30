import swaggerJsdoc from 'swagger-jsdoc';
import schemas from '../docs/schemas.json';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Technical Assessment API',
      version: '1.0.0',
      description: 'This is a simple API protected with an API key'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ],
    components: {
      schemas: schemas,
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key'
        }
      }
    },
    security: [
      {
        ApiKeyAuth: []
      }
    ]
  },
  apis: ['./**/*.ts', './**/*.json']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
