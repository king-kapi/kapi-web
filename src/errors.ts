import { NextFunction, Request, Response } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    if (process.env.NODE_ENV !== "development")
      console.error(`${err.name}: ${err.message}`);
    else
      console.error(err.stack);
    res.status(500).send({
      ...err,
      name: err.name,
      message: err.message
    });
  } else
    next();
};

export default errorHandler;