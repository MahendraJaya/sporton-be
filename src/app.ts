import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route";
import categoryRoutes from "./routes/category.route";
import productRoutes from "./routes/product.route";
import bankRoutes from "./routes/bank.route";
import transactionRoutes from "./routes/transaction.route";
import { authenticate } from "./middleware/auth.middleware";
import path from "node:path";
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
const port = 3000;
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//route untuk auth
app.use("/api/auth", authRoute);

app.use("/api/transaction", transactionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/banks", bankRoutes);

app.get("/test-middleware", authenticate, (req, res) => {
  res.json({ message: "Success" });
});

export default app;
