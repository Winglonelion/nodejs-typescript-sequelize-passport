import express, { Application } from 'express';
import cors from 'cors';
import api from 'api';
import swagger from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const server: Application = express();

const port = parseInt(process.env.PORT ?? '', 10) || 3003;

server.use(cors());
// server.use(logger);

server.get('/ping', (req, res) => {
  return res.send('pong');
});

server.use('/', api);

server.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`); /* eslint-disable no-console */
});

//
// ────────────────────────────────────────────────────── I ──────────
//   :::::: S W A G G E R : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────
//

const specs = swaggerJsdoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'ARMY API DOC',
      version: '1.0.0',
      description: 'Backend Document for ARMY System',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/api/routes/*.ts'],
});

server.use('/api-docs', swagger.serve, swagger.setup(specs, { explorer: true }));

export default server;
