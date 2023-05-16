require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middlewares/ErrorHandlingMiddlewares");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
    app.listen(PORT, () => console.log(`Server start on ${PORT}`));
  } catch (error) {
    console.log("connnection error", error);
  }
};

start();
