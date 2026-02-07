const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./model/Product");

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Sample products
    const products = [
      {
        name: "Laptop Gaming ROG",
        price: 15000000,
        quantity: 10,
        description: "High performance gaming laptop dengan RTX 4060, Intel i7-13700H, 16GB RAM, 512GB SSD",
        imgUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop"
      },
      {
        name: "iPhone 15 Pro Max",
        price: 18000000,
        quantity: 15,
        description: "Latest iPhone dengan A17 Pro chip, Dynamic Island, Pro camera system, 1TB storage",
        imgUrl: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop"
      },
      {
        name: "Samsung Galaxy S24",
        price: 12000000,
        quantity: 20,
        description: "Flagship Android phone dengan Snapdragon 8 Gen 3, 6.1 inch AMOLED, 50MP camera",
        imgUrl: "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop"
      },
      {
        name: "MacBook Pro M3",
        price: 20000000,
        quantity: 8,
        description: "Powerful laptop untuk professional dengan M3 Pro chip, 16GB RAM, 512GB SSD",
        imgUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop"
      },
      {
        name: "iPad Air",
        price: 8000000,
        quantity: 12,
        description: "Versatile tablet dengan M1 chip, 10.9 inch display, 256GB storage, Apple Pencil compatible",
        imgUrl: "https://images.unsplash.com/photo-1527622927191-746fdf4b4c5e?w=500&h=500&fit=crop"
      },
      {
        name: "Apple Watch Series 9",
        price: 5000000,
        quantity: 25,
        description: "Smart watch dengan S9 chip, Always-On Retina display, health & fitness tracking",
        imgUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
      },
      {
        name: "Sony WH-1000XM5 Headphones",
        price: 4500000,
        quantity: 30,
        description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
        imgUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
      },
      {
        name: "Dell XPS 13",
        price: 12000000,
        quantity: 14,
        description: "Ultra-portable laptop dengan Intel i7, 16GB RAM, 512GB NVMe SSD, beautiful FHD display",
        imgUrl: "https://images.unsplash.com/photo-1587829191301-e8140a7a5c7d?w=500&h=500&fit=crop"
      },
      {
        name: "Google Pixel 8 Pro",
        price: 11000000,
        quantity: 18,
        description: "Google's flagship with Tensor G3, exceptional camera AI, 6.7 inch OLED, 256GB storage",
        imgUrl: "https://images.unsplash.com/photo-1577720643272-265c5e1b6f93?w=500&h=500&fit=crop"
      },
      {
        name: "Nintendo Switch OLED",
        price: 5500000,
        quantity: 22,
        description: "Gaming console with beautiful OLED screen, 64GB storage, dockable handheld",
        imgUrl: "https://images.unsplash.com/photo-1613033822406-b1f5a8f926c2?w=500&h=500&fit=crop"
      }
    ];

    await Product.insertMany(products);
    console.log("✅ Successfully seeded 10 products!");
    console.log("\nProducts added:");
    products.forEach((p, idx) => {
      console.log(`${idx + 1}. ${p.name} - Rp ${p.price.toLocaleString('id-ID')}`);
    });

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedProducts();
