import { config } from 'dotenv';
config();
export const CONNECTION: {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
} = {
  type: process.env.DATABASE_TYPE as 'postgres',
  host: process.env.DATABASE_HOST as string,
  port: process.env.DATABASE_PORT as unknown as number,
  username: process.env.DATABASE_USERNAME as string,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_DATABASE as string,
};
