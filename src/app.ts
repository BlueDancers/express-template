import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";
import { UserRouter } from "./router/user";
import { jwtMiddleware } from "./middleware/jwt";
import { errorMiddleware } from "./middleware/error";
import { dataBaseinit } from "./database";

async function init() {
  dataBaseinit();
  const app = express();
  app.use(cors());
  app.use(express.json()); // 让express支持解析传入请求中的 JSON 数据
  app.use(jwtMiddleware()); // 全局中间件必须放在所有请求的前面，否则无效

  // 启动
  app.listen(3000, () => {
    console.log(`App is running at http://localhost:3000`);
    app.use("/user", new UserRouter().router);
    app.use(errorMiddleware);
  });
}
init();
