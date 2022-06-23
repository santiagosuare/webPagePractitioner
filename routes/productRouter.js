const express = require("express");
const productRouter = express.Router();

const {
  getProductsTest,
  getProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  randomProduct,
} = require("../controllers/product.controller");

productRouter.get("/productos-test", getProductsTest);

productRouter.post("/productos", createProduct);

productRouter.get("/productos", getProducts);

productRouter.get("/productos/:id", getProductById);

productRouter.put("/productos/:id", updateProductById);

productRouter.delete("/productos/:id", deleteProductById);

productRouter.get("/randoms/", randomProduct);

module.exports = productRouter;
