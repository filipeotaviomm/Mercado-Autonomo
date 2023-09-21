import express from "express";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updatePartialProduct,
} from "./logics";
import {
  isProductIdValid,
  isProductNameUnique,
  isRequestBodyValid,
} from "./middlewares";

const app = express();
app.use(express.json());

app.get("/products", getProducts);
app.post("/products", isRequestBodyValid, isProductNameUnique, createProduct); //Verificação de nome existente
app.get("/products/:productId", isProductIdValid, getOneProduct); //Verificação se o id buscado existe
app.patch(
  "/products/:productId",
  isProductIdValid,
  isProductNameUnique,
  updatePartialProduct
); //Verificação de nome existente / Verificação se o id buscado existe
app.delete("/products/:productId", isProductIdValid, deleteProduct); //Verificação se o id buscado existe

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
