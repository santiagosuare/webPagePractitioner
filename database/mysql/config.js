require("dotenv").config();

const config = {
  client: process.env.DBConfig2,
  connection: {
    host: process.env.DBHost,
    user: process.env.DBUser,
    password: process.env.DBPassword,
    database: process.env.DBName,
  },
};

module.exports = { config };
