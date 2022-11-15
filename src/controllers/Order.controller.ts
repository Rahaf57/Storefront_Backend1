import { NextFunction, Request, Response } from 'express';
import { Orders , OrderModel, Order_Products } from '../models/Order.model';

const Orders =new OrderModel();

export const UserOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res
        .status(400)
        .send('Error, missing or malformed parameters. id required');
    }
    const order = await Orders.getUserOrder(id);
    res.send(order);
  } catch (error) {
    res.status(401).json(error);
  }
  }
export const index = async (req: Request, res: Response) => {
    const results = await Orders.index();
    res.send(results);
  }
  
  //create
  
  export const create = async (req: Request, res: Response , next: NextFunction) => {
   try{
  
    const orderModel : Orders = {
      user_id: req.body.user_id,
      status_order: req.body.status_order,
      order_id: 0
    };
  
    
    const Users = await Orders.create(orderModel);
  res.json({
    status:'SUCCESS',
    data : Users,
    massage: 'User created Successfully'
  
  });
   
   } catch(err){
    next(err);
   }
   
  };

   export const createProductToOrder = async (req: Request, res: Response) => {
    try {
      

       const order_id = Number(req.params.order_id);
       const product_id= Number (req.params.product_id);
       const quantity= Number( req.params.quantity )
     
      if (!order_id || !product_id || !quantity ) {
        return res
          .status(400)
          .send('Error, missing or malformed parameters. id required');
      }
      const order = await Orders.getProductOrder(order_id || product_id||quantity);
      res.send(order);
    } catch (error) {
      res.status(401).json(error);
    }
    }


  export const show = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (!id) {
        return res
          .status(400)
          .send('Error, missing or malformed parameters. id required');
      }
      const order = await Orders.show(id);
      res.send(order);
    } catch (error) {
      res.status(401).json(error);
    }
  };

  
 
  
  //Update
  export const updateOrder = async (req: Request, res: Response , next: NextFunction) => {
    try{
     
      req.body.id=req.params.id
    
      const Update = await Orders.update_Order(req.body);
    res.json({
      status:'SUCCESS',
      data : Update,
      massage: 'User Updated Successfully'
    
    });
     
     } catch(err){
      next(err);
     }
    };

    export const update_Order_Product = async (req: Request, res: Response , next: NextFunction) => {
      try{
       
        req.body.order_id=req.params.Order_id;
        req.body.product_id=req.params.product_id;
        req.body.quantity=req.params.quantity
      
        const UPDATE = await Orders.update_Order_Product(req.body);
      res.json({
        status:'SUCCESS',
        data : UPDATE,
        massage: 'User Updated Successfully'
      
      });
       
       } catch(err){
        next(err);
       }
      };
    //Delete
  
  export const deleteOrder = async (req: Request, res: Response , next: NextFunction) => {
    try{
      const Users = await Orders.delete(req.params.id as unknown as string);
    res.json({
      status:'SUCCESS',
      data : Users,
      massage: 'User delete Successfully'
    
    });
     
     } catch(err){
      next(err);
     }
    }
  
