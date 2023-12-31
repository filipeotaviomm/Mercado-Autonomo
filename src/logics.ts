import { Request, Response } from "express";
import { market } from "./database";
import { IProduct } from "./interfaces";

export const getProducts = (_req: Request, res: Response) => {
  const sumProducts = market.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  return res.status(200).json({ total: sumProducts, products: market });
};

let lastId = 0;

export const createProduct = (req: Request, res: Response) => {
  lastId++;

  const calculateExpirationDate = (days: number) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + days);
    return currentDate.toISOString();
  };

  const expirationDate = calculateExpirationDate(365);

  const newProduct: IProduct = {
    id: lastId,
    ...req.body,
    expirationDate: expirationDate,
  };
  market.push(newProduct);

  return res.status(201).json(newProduct);
};

export const getOneProduct = (req: Request, res: Response) => {
  const product = market.find(
    (product) => product.id === Number(req.params.productId)
  );

  return res.status(200).json(product);
};

export const updatePartialProduct = (req: Request, res: Response) => {
  const product = market.find(
    (product) => product.id === Number(req.params.productId)
  );

  let productBody: Partial<IProduct> = {};

  Object.entries(req.body).forEach((entry) => {
    const [key, value] = entry;

    if (
      key === "name" ||
      key === "price" ||
      key === "weight" ||
      key === "section" ||
      key === "calories"
    ) {
      productBody[key as keyof IProduct] = value as never;
    }
  });

  const newProduct: IProduct = { ...product!, ...productBody };

  const index = market.findIndex(
    (product) => product.id === Number(req.params.productId)
  );

  market.splice(index, 1, newProduct); //ou market[index] = newProduct

  return res.status(200).json(newProduct);
};

export const deleteProduct = (req: Request, res: Response) => {
  const index = market.findIndex(
    (product) => product.id === Number(req.params.productId)
  );

  market.splice(index, 1);

  return res.status(204).json();
};
