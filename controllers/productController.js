const asyncHandler = require('express-async-handler'); // Import asyncHandler
const Product = require("../models/Product");

const getProducts = asyncHandler(async (req, res) => {

    const query = {};

  const keyword = req.query.search;
  if (keyword) {
 
    query.$or = [
      { name: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ];
  }

  // 2. Category Filter
  const category = req.query.category;
  if (category && category !== 'All') {
    query.category = category;
  }

  // 3. Price Range Filter
  const price_min = req.query.price_min;
  const price_max = req.query.price_max;
  
  if (price_min || price_max) {
    query.price = {};
    if (price_min) {
      // $gte: Greater Than or Equal To
      query.price.$gte = Number(price_min);
    }
    if (price_max) {
      // $lte: Less Than or Equal To
      query.price.$lte = Number(price_max);
    }
  }

  // Execute the query using Product.find(query)
  const products = await Product.find(query);
  
  res.json(products);
});


const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  
  res.json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Product",
    brand: "Raynott",
    category: "Electronics",
    description: "Sample description",
    image: "/images/sample.jpg", 
    price: 999,
    countInStock: 10,
    user: req.user._id, 
  });

  const created = await product.save();
  res.status(201).json(created);
});


const updateProduct = asyncHandler(async (req, res) => {
  const {
    name, brand, category, description, image, price, countInStock, isFeatured,
  } = req.body;

  const product = await Product.findById(req.params.id);
  
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.name = name ?? product.name;
  product.brand = brand ?? product.brand;
  product.category = category ?? product.category;
  product.description = description ?? product.description;
  product.image = image ?? product.image;
  product.price = price ?? product.price;
  product.countInStock = countInStock ?? product.countInStock;
  product.isFeatured = isFeatured ?? product.isFeatured;
  

  const updated = await product.save();
  res.json(updated);
});


const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();
  res.json({ message: "Product removed" });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};