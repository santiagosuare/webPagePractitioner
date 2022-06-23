const express = require("express");
const app = express();
const router = require("./routes/main.js");
const hbs = require("express-handlebars");
const LOG = require("./logs/logs.js");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", "./public/log");
app.engine(
  "hbs",
  hbs.engine({
    defaultLayout: "main",
    layoutsDir: "./public/log/layouts",
    extname: "hbs",
  })
);

app.set("view engine", ".hbs");

app.use(express.static(__dirname + "/public"));

const server = app.listen(PORT, () => {
  LOG.info(`Servidor corriendo en el puerto ${PORT}`);
});

server.on("error", (err) => {
  LOG.error(`Error: ${err}`);
});

app.use("/", router);
