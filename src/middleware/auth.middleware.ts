import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new Error("You don't have a access");
  } else {
    const decoded = jwt.verify(token, process.env.ACCESS_KEY as string);
    console.log(decoded);
    // req.user=decoded
    next();
  }
};
