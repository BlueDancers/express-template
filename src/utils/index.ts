import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

/**
 * 请求的封装体
 */
export function resp(
  router: Router,
  params: {
    path;
    methods: "get" | "post";
    fun: (req: Request, resp: Response) => Promise<any>;
  }
) {
  let { fun, methods, path } = params;
  router[methods](path, async (req, resp) => {
    let res = await fun(req, resp);
    resp.send(inter(1, "操作成功", res));
  });
}

/**
 * 接口返回值封装体
 */
export function inter(
  code: number = 1,
  msg: string = "操作成功",
  data: any = null
) {
  return {
    code: code,
    msg: msg == "" ? "操作成功" : msg,
    data: data,
  };
}

/**
 * 解密jwt
 */
export function getJwtId(req: Request) {
  const token = req.headers.authorization!.split(" ")[1];
  let data: any = jwt.verify(token, jwtSecret);
  return data;
}

/**
 * 生成6位验证码
 * @returns
 */
export function generateRandomNumber() {
  var length = 6; // Math.floor(Math.random() * 3) + 6; // 随机生成 6-8 之间的数字
  var randomNumber = "";
  for (var i = 0; i < length; i++) {
    randomNumber += Math.floor(Math.random() * 10); // 随机生成一个 0-9 的数字，并拼接到 randomNumber 中
  }
  return randomNumber;
}
