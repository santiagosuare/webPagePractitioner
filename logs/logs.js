const log4js = require("log4js");

log4js.configure({
  appenders: {
    miLoggerFile: {
      type: "file",
      filename: "logs/logs.log",
      maxLogSize: 10485760,
      backups: 3,
      compress: true,
    },
    miLoggerConsole: {
      type: "console",
    },
  },
  categories: {
    default: {
      appenders: ["miLoggerFile", "miLoggerConsole"],
      level: "debug",
    },
  },
});

module.exports = log4js.getLogger();
