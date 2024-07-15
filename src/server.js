const http = require("http");
const app = require("./app");
const { Sequelize } = require("sequelize");

require("dotenv").config();
const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

//  mongo db connection
const sequelize = new Sequelize("stock", "postgres", "marshal2020", {
  host: "localhost",
  dialect: "postgres",
  port: 5433,
});

sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
});

// listening to request
server.listen(8000, () => {
  console.log("the server is running on port " + PORT);
});
