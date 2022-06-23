const ProductModel = require("../models/product.model");
const Producto = new ProductModel();
const faker = require("faker");
const LOG = require("../logs/logs");
faker.locale = "es";
const { commerce, image } = faker;

module.exports = {
  getProductsTest: async (req, res) => {
    const products = [];
    try {
      for (let i = 0; i < 5; i++) {
        const product = {
          name: commerce.product(),
          price: commerce.price(),
          url: image.technics(100, 100, true),
        };
        products.push(product);
      }
      LOG.info("ProductController : Enviada respuesta a la petición");
      res.status(200).send({
        status: 200,
        data: products,
        message: "products was obtained successfully",
      });
    } catch (error) {
      LOG.error(`Error: ${error}`);
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  createProduct: async (req, res) => {
    try {
      const id = await Producto.save(req.body);
      LOG.info("ProductController : Enviada respuesta a la petición");
      res.status(200).send({
        status: 200,
        data: {
          id,
        },
        message: "product was added successfully",
      });
    } catch (error) {
      LOG.error(`Error: ${error}`);
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  getProducts: async (req, res) => {
    try {
      const data = await Producto.getAll();
      LOG.info("ProductController : Enviada respuesta a la petición");
      res.render("products", {
        name: "products",
        products: data,
      });
      /* res.status(200).send({
          status: 200,
          data,
          message: 'products was obtained successfully',
        }); */
    } catch (error) {
      LOG.error(`Error: ${error}`);
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  getProductById: async (req, res) => {
    const idProduct = req.params.id;
    try {
      const data = await Producto.getById(idProduct);
      LOG.info("ProductController : Enviada respuesta a la petición");
      res.status(200).send({
        status: 200,
        data,
        message: "product was obtained successfully",
      });
    } catch (error) {
      LOG.error(`Error: ${error}`);
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  updateProductById: async (req, res) => {
    const idProduct = req.params.id;
    const product = req.body;
    try {
      const data = await Producto.updateById(idProduct, product);
      LOG.info("ProductController : Enviada respuesta a la petición");
      res.status(200).send({
        status: 200,
        data,
        message: "product was updated successfully",
      });
    } catch (error) {
      LOG.error(`Error: ${error}`);
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  deleteProductById: async (req, res) => {
    const idProduct = req.params.id;
    try {
      await Producto.deleteById(idProduct);
      LOG.info("ProductController : Enviada respuesta a la petición");
      res.status(200).send({
        status: 200,
        data: {
          id: idProduct,
        },
        message: "product was detele successfully",
      });
    } catch (error) {
      LOG.error(`Error: ${error}`);
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },

  randomProduct: async (req, res) => {
    let num = req.query.cant;
    if (Object.keys(req.query).length === 0) {
      LOG.info("ProductController : Enviada respuesta a la petición");
      return res.send({
        port: process.port,
        pid: process.pid,
        num: req.query.cant,
        numDefault: "100.000.000",
        random: Math.floor(Math.random() * 100000000),
      });
    } else {
      LOG.error(`Error: ${error}`);
      return res.send({
        num: req.query.cant,
        random: Math.floor(Math.random() * num),
      });
    }
  },
};
