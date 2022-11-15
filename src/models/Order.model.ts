import client from '../database';

export type Order_Products = {
    order_id: number;
    product_id:number;
    quantity: number;
  }
  
export type Orders = {
    order_id: number;
    user_id:number;
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

    async getProductOrder(Order_id:number) : Promise<Order_Products>{
      try {
  
        const conn = await client.connect();
        const sql = 'SELECT * FROM Order_Products WHERE order_id=$1';
        const result = await conn.query(sql ,[Order_id]);
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
   
         const sql = `INSERT INTO Orders( user_id ,status_order ) VALUES ( $1 , $2) RETURNING *`;
         const conn = await client.connect();
         
         const result = await conn.query(sql ,[o.user_id,o.status_order]);
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
         const {rows } = await conn.query(sql, [Order_id]);
         const result = rows[0];
         const sql_2= 'SELECT product_id, quantity FROM order_products WHERE order_id=$1';
         let result_2 = {rows };
         result_2= await conn.query(sql_2, [Order_id]);
    
         conn.release();
   
         return {
          ...result,
          products:result_2}

       } catch (err) {
           throw new Error(`${err}`);
       }
     }
   
     async update_Order(o:Orders): Promise<Orders> {
       try {
     const sql = 'UPDATE Orders SET status_order=$1 WHERE id=$2';
     
     const conn = await client.connect()
   
     const result = await conn.query(sql ,[o.status_order])
     conn.release()
   
     return result.rows[0];
   
       } catch (err) {
         throw new Error( `Unable to Updated order ${err}`);
       }
   }

   async update_Order_Product(OP:Order_Products): Promise<Orders> {
    try {
  const sql = 'UPDATE Order_Products SET quantity = $1 WHERE Order_id = $2 && product_id= $3';
  
  const conn = await client.connect()

  const result = await conn.query(sql ,[OP.order_id, OP.product_id , OP.quantity])
  conn.release()

  return result.rows[0];

    } catch (err) {
      throw new Error( `Unable to Updated order ${err}`);
    }
}
   //Delete                                                                                        
     async delete(Order_id: string): Promise<Orders> {
       try {
     const sql = 'DELETE FROM Orders WHERE id=($1)'
     const conn = await client.connect()
     const result = await conn.query(sql, [Order_id])

     const sql2= 'DELETE FROM order_products WHERE order_id=($1)';
     const connection = await client.connect();
     await connection.query(sql2, [Order_id]);
     conn.release()
   
     return result.rows[0];
   
       } catch (err) {
           throw new Error(`Could not delete Orders ${Order_id}. Error: ${err}`)
       }
   }
   
  }
  export default OrderModel;