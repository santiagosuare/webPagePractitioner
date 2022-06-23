const knex = require("knex");
const uuidv4 = require("uuid").v4;
const { config } = require("../database/mysql/config");
const LOG = require("../logs/logs");

class Product {
  constructor() {
    this.nameTable = "PRODUCTS";
    this.database = knex(config);
  }

  async getAllProductsTest() {
    try {
      let data = await this.database.from(this.nameTable).select("*");
      data = JSON.parse(JSON.stringify(data));
      return data;
    } catch (error) {
      LOG.error(`Error: ${error}`);
      throw Error("Base de datos no conectada: " + error.message);
    }
  }

  async save(product) {
    try {
      if (!product || typeof product !== "object") {
        throw Error("The product is required");
      }
      if (Object.keys(product).length === 0) {
        throw Error("The product is required in the object");
      }

      const newProduct = {
        id: uuidv4(),
        ...product,
      };
      await this.database.from(this.nameTable).insert(newProduct);
      return newProduct;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getById(id) {
    try {
      if (!id || typeof id !== "string") {
        throw Error("Id invalid");
      }
      let data = await this.database
        .from(this.nameTable)
        .select("*")
        .where("id", id);
      data = JSON.parse(JSON.stringify(data));
      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async updateById(id, product) {
    try {
      if (!id || typeof id !== "string") {
        throw Error("Id invalid");
      }
      await this.database.from(this.nameTable).where("id", id).update(product);
      return product;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getAll() {
    try {
      let data = await this.database.from(this.nameTable).select("*");
      data = JSON.parse(JSON.stringify(data));
      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async deleteById(id) {
    try {
      if (!id || typeof id !== "string") {
        throw Error("Id invalid");
      }
      await this.database.from(this.nameTable).where("id", id).del();
      return "Product was deleted successfully";
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = Product;
