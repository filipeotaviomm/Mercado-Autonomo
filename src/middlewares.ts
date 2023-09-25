import { NextFunction, Request, Response } from "express";
import { market } from "./database";

export const isProductNameUnique = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const nameProduct = market.some((product) => product.name === req.body.name);

  if (nameProduct) {
    return res.status(409).json({ message: "Product already registered." });
  }

  next();
};

export const isProductIdValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idProduct = market.some(
    (product) => product.id === Number(req.params.productId)
  );

  if (!idProduct) {
    return res.status(404).json({ message: "Product not found." });
  }

  next();
};

// esse middleware funciona, mas como não foi pedido, ele não passa nos testes do insomnia

// export const isRequestBodyValid = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (
//     !req.body.name ||
//     !req.body.price ||
//     !req.body.weight ||
//     !req.body.section ||
//     !req.body.calories
//   ) {
//     return res.status(422).json({ error: "Missing body parameters" });
//   }
//   next();
// };
