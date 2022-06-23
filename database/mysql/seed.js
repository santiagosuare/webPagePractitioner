const { config } = require("./config");
const knex = require("knex")(config);
const { products } = require("./products");
const LOG = require("../../logs/logs");

const seedDatabaseProductsMySQL = async () => {
  try {
    LOG.info(
      "SeedDatabaseProductsMySQL : Iniciando la creación de la base de datos"
    );
    const existTableProducts = await knex.schema.hasTable("PRODUCTS");
    if (existTableProducts) {
      await knex.schema.dropTable("PRODUCTS");
    }
    await knex.schema.createTable("PRODUCTS", (table) => {
      table.string("id", 40).primary();
      table.string("name", 20).nullable(false);
      table.float("price").nullable(false);
      table.string("url", 300).nullable(false);
    });
    await knex("PRODUCTS").insert(products);
    await knex.destroy();
    LOG.info("SeedDatabaseProductsMySQL : Base de datos creada con éxito");
  } catch (error) {
    LOG.error(`Error: ${error}`);
  }
};

seedDatabaseProductsMySQL();
