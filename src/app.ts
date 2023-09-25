import express from "express";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updatePartialProduct,
} from "./logics";
import { isProductIdValid, isProductNameUnique } from "./middlewares";

const app = express();
app.use(express.json());

app.get("/products", getProducts);
app.post("/products", isProductNameUnique, createProduct);
app.get("/products/:productId", isProductIdValid, getOneProduct);
app.patch(
  "/products/:productId",
  isProductIdValid,
  isProductNameUnique,
  updatePartialProduct
);
app.delete("/products/:productId", isProductIdValid, deleteProduct);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
