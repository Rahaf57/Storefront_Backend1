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
    products? : Order_Products[]
  }
 
  
  export class OrderModel {

    
    async getUserOrder(Order_id:number): Promise<Orders > {
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
     async index(): Promise<Orders[]> {
       try {
   
         const conn = await client.connect();
         const sql = 'SELECT * FROM Orders';
         const result = await conn.query(sql );
         conn.release();
       //  console.log(result)
   
         return result.rows;
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

     async AddProductToOrder(OP:Order_Products): Promise<Order_Products> {
      try {
  
        const sql = `INSERT INTO Order_Products( Order_id ,product_id, quantity) VALUES ( $1 , $2 , $3) RETURNING *`;
        const conn = await client.connect();
        
        const result = await conn.query(sql ,[OP.order_id , OP.product_id , OP.quantity]);
        conn.release();
  
        return result.rows[0];
      } catch (err) {
          throw new Error( `Unable to create  ${err}`);
      }
    }
    
    async GetOrderProducts(Order_id: number): Promise<Order_Products[]> {
      try {
  
        const sql = `SELECT * FROM Order_Products WHERE order_id = $1`;
        const conn = await client.connect();
        
        const result = await conn.query(sql ,[Order_id]);
        conn.release();
  
        return result.rows;
      } catch (err) {
          throw new Error( `Unable to get products order  ${err}`);
      }
    }

   
     async show(user_id: number): Promise<Orders[]> {
      try {
        const connection = await client.connect();
        const sql = 'SELECT * FROM Orders WHERE user_id=($1)';
        const result = await connection.query(sql, [user_id]);

        connection.release();
        return result.rows;
      } catch (error) {
        throw new Error( ` ${error}` );
      }
    }
    
     async update_Order(o:Orders): Promise<Orders> {
       try {
     const sql = 'UPDATE Orders SET status_order=$1 WHERE order_id=$2';

     const conn = await client.connect()
   
     const result = await conn.query(sql ,[o.status_order ,o.order_id])
     conn.release()
   
     return result.rows[0];
   
       } catch (err) {
         throw new Error( `Unable to Updated order ${err}`);
       }
   }

   async update_Order_Product(OP:Order_Products): Promise<Order_Products> {
    try {
  const sql = 'UPDATE Order_Products SET quantity = $1 WHERE order_id = $2 AND product_id= $3';
  
  const conn = await client.connect()

  const result = await conn.query(sql ,[OP.quantity, OP.order_id , OP.product_id])
  conn.release()

  return result.rows[0];

    } catch (err) {
      throw new Error( `Unable to Updated order product ${err}`);
    }
}
   //Delete                                                                                        
     async delete(Order_id: string): Promise<Orders> {
       try {
     const sql = 'DELETE FROM Orders WHERE order_id=($1)'
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