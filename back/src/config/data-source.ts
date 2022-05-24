import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_USER_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/../entities/**/*{.ts,.js}`],
  migrations: [`${__dirname}/../migration/**/*{.ts,.js}`],
  subscribers: [`${__dirname}/../subscriber/**/*{.ts,.js}`],
});
