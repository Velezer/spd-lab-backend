const express = require("express");
const Product = require("../model/Product");

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
});

// READ ALL
router.get("/", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// READ ONE
router.get("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.sendStatus(404);
    res.json(product);
});

// UPDATE
router.put("/:id", async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(product);
});

// DELETE
router.delete("/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

module.exports = router;
