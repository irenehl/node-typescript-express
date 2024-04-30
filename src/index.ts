import 'express-async-errors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import {
  apiKeyMiddleware,
  httpLoggerMiddleware,
  healthMiddleware,
  errorHandlerMiddleware,
  connection,
  logger,
  swaggerSpec
} from './config';
import { EnvVars } from './types';
import { employeeRouter, departmentRouter } from './routes';

const PORT = EnvVars.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middlewares
app.use(apiKeyMiddleware);
app.use(httpLoggerMiddleware);

// Routes
app.use('/employees', employeeRouter);
app.use('/departments', departmentRouter);
app.get('/health', healthMiddleware);

app.use(errorHandlerMiddleware);

(async () => {
  try {
    await connection();
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    logger.error(message);
  }
})();
