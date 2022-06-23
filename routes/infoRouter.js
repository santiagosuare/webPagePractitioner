const express = require("express");
const router = express.Router();
const numCPUs = require("os").cpus().length;
const LOG = require("../logs/logs");

router.get("/", (req, res) => {
  try {
    LOG.info("InfoRouter : Enviada respuesta a la petición");
    res.send(
      `Carpeta del Proyecto : ${process.argv[1]}` +
        `<br>` +
        `Sistema Operativo: ${process.platform}` +
        `<br>` +
        `Node Version: ${process.versions.node}` +
        `<br>` +
        `Memoria: ${process.memoryUsage.rss()}` +
        `<br>` +
        `Proceso pid: ${process.pid}` +
        `<br>` +
        `Numero de CPUs: ${numCPUs}`
    );
  } catch (error) {
    LOG.error(`Error: ${error}`);
  }
});

module.exports = router;
