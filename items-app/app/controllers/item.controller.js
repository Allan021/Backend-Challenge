const db = require("../models");
const Product = db.products;

exports.getProducts = async (req, res) => {
  const q = req.query.q;
  console.log(q);
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

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
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
