require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");

const errorHandler = require("./middleware/errorHandler");

const app = express();


const rawOrigins = process.env.CLIENT_ORIGIN || "";
const allowedOrigins = rawOrigins.split(",").map(o => o.trim()).filter(Boolean);
const allowAll = allowedOrigins.includes("*");

const start = async () => {
    try {
        await connectDB(); // <-- block startup

        const allowedOrigins = process.env.CLIENT_ORIGIN
            ? process.env.CLIENT_ORIGIN.split(",")
            : [];

        app.use(cors({
            origin: function (origin, callback) {
                // Allow server-to-server, Postman, curl, mobile apps
                if (!origin) return callback(null, true);

                // If wildcard is set → allow everything
                if (allowAll) {
                    return callback(null, true);
                }

                // Normal whitelist check
                if (allowedOrigins.includes(origin)) {
                    return callback(null, true);
                }

                return callback(new Error("Not allowed by CORS"));
            },
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
            credentials: true
        }));

        // app.options("*", cors());

        app.use(express.json());

        app.get("/", (req, res) => {
            res.status(200).json({ status: "ok" });
        });


        app.use("/api/auth", require("./route/auth.route"));
        app.use("/api/products", require("./route/product.route"));
        app.use(errorHandler);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log("CORS allowed origins:", allowedOrigins);
        });
    } catch (err) {
        console.error("Application failed to start", err);
        process.exit(1);
    }
};

start();
