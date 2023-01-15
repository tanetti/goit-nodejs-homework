const app = require("./src/app");
const { dbConnection } = require("./src/services/dbConnection");
require("dotenv").config();

const dbConnectionUrl = process.env.DB_CONNECTION_URL;
const appPort = process.env.APP_PORT || 3000;

const startServer = async (dbConnectionUrl, appPort) => {
  await dbConnection(dbConnectionUrl);

  app.listen(appPort, () => {
    console.log(`\x1b[34mServer running. Use our API on port: ${appPort}`);
  });
};

console.log("Application starting...");

startServer(dbConnectionUrl, appPort);
