import { ErrorRequestHandler } from "express";

export function errorMiddleware(err: ErrorRequestHandler, req, res, next) {
  if (err.toString().includes("UnauthorizedError")) {
    res.send({
      code: 4,
      msg: "登录生效,请重新登陆",
      data: null,
    });
    return;
  }
  res.status(200).send({
    code: 2,
    msg: err.toString().split("Error: ")[1],
    data: null,
  });
}
