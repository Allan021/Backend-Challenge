module.exports = (app) => {
  const products = require("../controllers/item.controller.js");
  const router = require("express").Router();

  router.get("/", products.getProducts);
  router.get("/:slugName", products.getProductBySlugname);

  router.post("/bulk", products.createProductBulk);
  router.post("/", products.createProduct);
  router.patch("/:id", products.patchProduct);
  router.delete("/:id", products.deleteProduct);

  app.use("/api/items", router);
};
