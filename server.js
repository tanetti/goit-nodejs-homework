const app = require("./app");
require("dotenv").config();

const appPort = process.env.APP_PORT || 3000;

app.listen(appPort, () => {
  console.log(`Server running. Use our API on port: ${appPort}`);
});
