const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, default: "Raynott" },
    category: { type: String, default: "Electronics" },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
