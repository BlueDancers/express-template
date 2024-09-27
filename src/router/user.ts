import express, { Router } from "express";
import { resp } from "../utils";
import { jwtSecret } from "../config";
import jwt from "jsonwebtoken";

/**
 * 用户模块
 */
export class UserRouter {
  router: Router;
  constructor() {
    this.router = express.Router();
    this.init();
  }
  init() {
    // 示例路由
    resp(this.router, {
      path: "/list",
      methods: "post",
      fun: async (req, resp) => {
        return "我是user模块的test！";
      },
    });
    resp(this.router, {
      methods: "post",
      path: "/login",
      fun: async (req, resp) => {
        // 登录逻辑
        // .......
        // 生成token jwtSecret自行管理
        const token = jwt.sign({ _id: 'xxxxxxxx' }, jwtSecret, {
          expiresIn: 3600 * 24 * 30, // 30天
        });
        // 放入响应头
        resp.setHeader("Access-Control-Expose-Headers", "Authorization");
        resp.setHeader("Authorization", "Bearer " + token);
        return "";
      },
    });
  }
}
