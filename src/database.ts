import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME ,Env ,DB_NAME_TEST } = process.env;

let client = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: Env === 'dev' ? DB_NAME : DB_NAME_TEST,

})

console.log(Env);



export default client;