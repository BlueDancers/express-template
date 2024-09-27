import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret, whiteList } from "../config/index";
import { inter } from "../utils";
/**
 * 鉴权中间件
 */
export function jwtMiddleware() {
  const middleware = (req: Request, resp: Response, next: NextFunction) => {
    if (whiteList.includes(req.url)) {
      console.log("白名单跳过鉴权");
      return next();
    }
    if (!req.headers.authorization) {
      resp.send(inter(4, "登录失败了,请重新登录", null));
    } else {
      let module = req.url.split("/")[1];
      const token = (req.headers.authorization + "").split(" ")[1];
      try {
        jwt.verify(token, jwtSecret);
      } catch (error) {
        resp.send(inter(4, "登录失败了,请重新登录2", null));
      }
      return next();
    }
  };
  return middleware;
}
