import client from '../database';

export type Orders = {
    order_id?: number;
    user_id:number;
    product_id:number;
    quantity: number;
    status_order: string;
    
  }
  
  export class OrderModel {

    
    async getUserOrder(Order_id:number): Promise<Orders> {
      try {
  
        const conn = await client.connect();
        const sql = 'SELECT * FROM Orders WHERE user_id=$1';
        const result = await conn.query(sql ,  [Order_id]);
        conn.release();
  
        return result.rows[0];
      } catch (err) {
          throw new Error(`${err}`);
      }
    }
 
    //Get 
     async index(): Promise<Orders> {
       try {
   
         const conn = await client.connect();
         const sql = 'SELECT * FROM Orders';
         const result = await conn.query(sql );
         conn.release();
   
         return result.rows[0];
       } catch (err) {
           throw new Error(`${err}`);
       }
     }
     //Create
     async create(o:Orders): Promise<Orders> {
       try {
   
         const sql = `INSERT INTO Orders( user_id , product_id ,quantity ,status_order ) VALUES ( $1 , $2 , $3 , $4 ) RETURNING *`;
         const conn = await client.connect();
         
         const result = await conn.query(sql ,[o.user_id,o.product_id ,o.quantity,o.status_order]);
         conn.release();
   
         return result.rows[0];
       } catch (err) {
           throw new Error( `Unable to create  ${err}`);
       }
     }
   
     async show(Order_id: number): Promise<Orders> {
       try {
         const sql = 'SELECT * FROM Orders WHERE id=($1)';
         const conn = await client.connect();
   
         const result = await conn.query(sql, [Order_id]);
   
         conn.release();
   
         return result.rows[0];
       } catch (err) {
           throw new Error(`${err}`);
       }
     }
   
     async update(o:Orders): Promise<Orders> {
       try {
     const sql = 'UPDATE Orders SET quantity=$1,status_order=$2 WHERE id=$3';
     
     const conn = await client.connect()
   
     const result = await conn.query(sql ,[o.quantity,o.status_order, o.order_id])
     conn.release()
   
     return result.rows[0];
   
       } catch (err) {
         throw new Error( `Unable to Updated ${err}`);
       }
   }
   //Delete                                                                                        
     async delete(Order_id: string): Promise<Orders> {
       try {
     const sql = 'DELETE FROM Orders WHERE id=($1)'
     
     const conn = await client.connect()
   
     const result = await conn.query(sql, [Order_id])
     conn.release()
   
     return result.rows[0];
   
       } catch (err) {
           throw new Error(`Could not delete Orders ${Order_id}. Error: ${err}`)
       }
   }
   
  }
  export default OrderModel;