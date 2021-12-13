import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: true,
};

// export const typeORMConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'postgres',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   entities: [`${__dirname}/../**/*.entity.{js,ts}`],
//   synchronize: true,
// };
