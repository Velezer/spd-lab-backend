module.exports = (err, req, res, next) => {
  console.error(err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ error: messages.join(", ") });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({ error: `${field} already exists` });
  }

  // Mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    error: message
  });
};

