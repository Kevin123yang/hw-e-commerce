import "dotenv/config";
import express from "express";
import cors from "cors";
import productRoutes from "../modules/products/product.routes"
import cartRoutes from "../modules/carts/cart.routes"
import userRoutes from "../modules/users/user.routes"
import { errorMiddleWave } from "./core/errors/errorMiddleware";
import authRoutes from "../modules/auth/auth.routes";

const app = express();
const PORT = Number(process.env.PORT) || 3001;
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (_req, res) => {
  res.json({ message: "Lecture E-Commerce API is running", port: PORT });
});
app.use("/api/products", productRoutes);
app.use("/api/carts",cartRoutes );
app.use("/api/users",userRoutes );
app.use("/api/auth", authRoutes);

app.use(errorMiddleWave);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

