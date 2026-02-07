const express = require("express");
const Product = require("../model/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Validasi input product
const validateProduct = (req, res, next) => {
    const { name, price, description, imgUrl, quantity } = req.body;

    if (!name || !price || !description || !imgUrl) {
        return res.status(400).json({ 
            error: "Name, price, description, and imgUrl are required" 
        });
    }

    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ 
            error: "Price must be a positive number" 
        });
    }

    if (quantity && (typeof quantity !== 'number' || quantity < 0)) {
        return res.status(400).json({ 
            error: "Quantity must be a non-negative number" 
        });
    }

    next();
};

// CREATE - hanya admin/authorized user
router.post("/", authMiddleware, validateProduct, async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
});

// READ ALL - public
router.get("/", async (req, res, next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        next(err);
    }
});

// READ ONE - public
router.get("/:id", async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        next(err);
    }
});

// UPDATE - hanya authorized user
router.put("/:id", authMiddleware, validateProduct, async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        next(err);
    }
});

// DELETE - hanya authorized user
router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
