
import client from '../database';
import bcrypt from 'bcrypt';
import config from './config'

const hashpassword =(password: string ) =>{         
const salt = parseInt(config.salt as string, 10 );
return bcrypt.hashSync(`${password}${config.pepper}`, salt);

}
export type USERS = {
  id?: number;
  firstname: string;
  lastname: string;
  email:string;
  password : string;
}

export class UsersModel {
    
  async index(): Promise<USERS[]> {
    try {

      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
        throw new Error(`${err}`);
    }
  }
  //Create
  async create(u:USERS): Promise<USERS> {
    try {

      const sql = `INSERT INTO Users(firstName,lastName,email,password) VALUES ($1 , $2 ,$3 , $4) RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql ,[u.firstname , u.lastname , u.email, hashpassword(u.password)]);
      conn.release();
 

      return result.rows[0];
    } catch (err) {
        throw new Error( `Unable to create  ${err}`);
    }
  }

  async show(id: number): Promise<USERS> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
        throw new Error(`${err}`);
    }
  }

  async update(u:USERS): Promise<USERS> {
    try {
  const sql = 'UPDATE Users SET firstName=$1,lastName=$2,email=$3,password=$4 WHERE id=$5';
  
  const conn = await client.connect()

  const result = await conn.query(sql ,[u.firstname , u.lastname ,u.email, hashpassword(u.password ), u.id])
  conn.release()

  return result.rows[0];

    } catch (err) {
      throw new Error( `Unable to Updated ${err}`);
    }
}
//Delete                                                                                        
  async delete (id: string): Promise<USERS> {
    try {
  const sql = 'DELETE FROM users WHERE id=($1)'
  
  const conn = await client.connect()

  const result = await conn.query(sql, [id])
  conn.release()

  return result.rows[0];

    } catch (err) {
        throw new Error(`Could not delete User ${id}. Error: ${err}`)
    }
}
async authenticate(email: string, password: string): Promise<USERS | null>{
  try{
    const conn = await client.connect();
    const sql = 'SELECT password FROM Users WHERE email=$1'
    const result = await conn.query(sql, [email]);
    if(result.rows.length){
      const hashpassword = result.rows[0].password;
      const isPasswordValid = bcrypt.compareSync(`${password}${config.pepper}` ,hashpassword )
  
      if(isPasswordValid){
        const userInfo = await conn.query('SELECT id,email,firstName,lastName FROM Users WHERE email=$1', [email])
        conn.release()
        return userInfo.rows[0];
      } else {
        return null;
      }
    } else {
      return null;
    }

  } catch(err){
    throw new Error(`Unable to login: ${(err as Error).message}`);
  }
}

}
export default UsersModel;
