import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default () => ({
  db_postgres: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    type: process.env.DB_TYPE,
    namingStrategy: new SnakeNamingStrategy(),
  },
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  app: {
    env: process.env.ENVIRONMENT,
    port: process.env.NODE_PORT,
    reqLimit: process.env.REQ_LIMIT,
  },
});