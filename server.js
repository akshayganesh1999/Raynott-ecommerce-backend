const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const seedAdmin = require("./seeder/adminSeeder");

dotenv.config();
connectDB();

seedAdmin();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

app.get("/", (req, res) => {
  res.send("Raynott E-Tech API running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
