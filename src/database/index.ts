import { DataSource, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column()
  username!: string;
  @Column()
  email!: string;
  @Column()
  avatar!: string;
  @Column()
  power!: number;
}

const connection = new DataSource({
  type: "mysql",
  host: "",
  port: 3306,
  database: "",
  username: "",
  password: "",
  entities: [User],
  synchronize: true,
  logging: false,
});

/**
 * 初始化
 */
async function dataBaseinit() {
  console.log("尝试链接数据库");
  try {
    await connection.initialize();
    console.log("数据库链接成功");
  } catch (err) {
    console.error("数据连接失败", err);
  }
}

export { connection, User, dataBaseinit };
