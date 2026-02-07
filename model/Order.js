const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    items: [
      {
        product: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Product", 
          required: true 
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }
      }
    ],
    totalPrice: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ["pending", "completed", "cancelled"], 
      default: "pending" 
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    paymentMethod: { 
      type: String, 
      enum: ["credit_card", "bank_transfer", "e_wallet"], 
      required: true 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
