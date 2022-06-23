module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      discount: { type: Number },
      imgGroup: { type: Array, required: true },
      rating: { type: Number },
      specification: { type: Array },
      brand: { type: String },
    },
    { timestamps: true }
  );
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Product = mongoose.model("product", schema);
  return Product;
};
