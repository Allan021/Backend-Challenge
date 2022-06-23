module.exports = (app) => {
  const products = require("../controllers/item.controller.js");
  const router = require("express").Router();

  router.get("/", products.getProducts);
  router.get("/:id", products.getProductById);
  router.post("/", products.createProduct);
  router.patch("/:id", products.patchProduct);

  app.use("/api/items", router);
};
