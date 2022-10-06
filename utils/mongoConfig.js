const {
  PORT = 3005,
  // eslint-disable-next-line no-unused-vars
  NODE_ENV = 'develop',
  MONGO_ADDR = 'localhost',
  MONGO_PORT = '27017',
  DB_NAME = 'moviesdb',
} = process.env;

const mongoServer = `mongodb://${MONGO_ADDR}:${MONGO_PORT}/${DB_NAME}`;

module.exports = { mongoServer, PORT };
