const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

/* ADD PRODUCT */
router.post("/add-product", async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);

    const { name, price, description, category, image } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const product = await Product.create({
      name,
      price,
      description,
      category,
      image,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* GET ALL PRODUCTS */
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
