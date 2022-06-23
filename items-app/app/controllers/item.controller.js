const db = require("../models");
const Product = db.products;

exports.getProducts = async (req, res) => {
  const q = req.query.q;

  let query = {};

  try {
    let products;

    if (Object.keys(query).length === 0) {
      products = await Product.find();
    } else {
      products = await Product.find(query);
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getProductBySlugname = async (req, res) => {
  try {
    const product = await Product.findOne({ slugName: req.params.slugName });
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({
      message: "Product not found",
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    let productAux = { ...req.body };
    productAux.slugName = productAux.name.toLowerCase().replace(/ /g, "-");

    const product = await Product.create(productAux);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createProductBulk = async (req, res) => {
  try {
    let products = [];
    let errors = [];
    for (let i = 0; i < req.body.length; i++) {
      try {
        let productAux = { ...req.body[i] };
        productAux.slugName = productAux.name.toLowerCase().replace(/ /g, "-");
        await Product.create(productAux);
        products.push(productAux);
      } catch (error) {
        errors.push(error);
      }
    }

    res.status(201).json({ products, errors });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Product deleted",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.patchProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
