export default () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  type: process.env.DB_TYPE,
  apiKey: process.env.API_KEY,
  remoteCsv: process.env.REMOTE_CSV,
  secretKey: process.env.SECRET_KEY,
  expiredToken: process.env.EXPIRED_TOKEN,
  urlConverter: process.env.URL_CONVERTER,
  app: {
    env: process.env.ENVIRONMENT,
    port: process.env.NODE_PORT,
    reqLimit: process.env.REQ_LIMIT,
  },
});
