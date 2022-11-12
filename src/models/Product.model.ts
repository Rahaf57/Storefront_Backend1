import client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
    
  }
  
export class ProductModel {
 
    //Get 
     async index(): Promise<Product[]> {
       try {
   
         const conn = await client.connect();
         const sql = 'SELECT * FROM Products';
         const result = await conn.query(sql);
         conn.release();
   
         return result.rows;
       } catch (err) {
           throw new Error(`${err}`);
       }
     }
     //Create
     async create(p:Product): Promise<Product> {
       try {
   
         const sql = `INSERT INTO Products(name,price) VALUES ( $1 , $2 ) RETURNING *`;
         const conn = await client.connect();
         const result = await conn.query(sql ,[p.name , p.price]);
         conn.release();
   
         return result.rows[0];
       } catch (err) {
           throw new Error( `Unable to create  ${err}`);
       }
     }
   
     async show(id: number): Promise<Product> {
       try {
         const sql = 'SELECT * FROM Products WHERE id=($1)';
         const conn = await client.connect();
   
         const result = await conn.query(sql, [id]);
   
         conn.release();
   
         return result.rows[0];
       } catch (err) {
           throw new Error(`${err}`);
       }
     }
   
     async update(p:Product): Promise<Product> {
       try {
     const sql = 'UPDATE Products SET name=$1,price=$2 WHERE id=$3';
     
     const conn = await client.connect()
   
     const result = await conn.query(sql ,[p.name,p.price, p.id])
     conn.release()
     return p;
   
       } catch (err) {
         throw new Error( `Unable to Updated ${err}`);
       }
   }
   //Delete                                                                                        
     async delete(id: string): Promise<Product> {
       try {
     const sql = 'DELETE FROM Products WHERE id=($1)'
     
     const conn = await client.connect()
   
     const result = await conn.query(sql, [id])
     conn.release()
   
     return result.rows[0];
   
       } catch (err) {
           throw new Error(`Could not delete Product ${id}. Error: ${err}`)
       }
   }
   
  }
  export default ProductModel;