import { NextFunction, Request, Response } from 'express';
import { Orders , OrderModel } from '../models/Order.model';

const Orders=new OrderModel();

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
      quantity : req.body.quantity,
      status_order: req.body.status_order,
      user_id : req.body.user_id,
      product_id :req.body.product_id,
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
    
      const Users = await Orders.update(req.body);
    res.json({
      status:'SUCCESS',
      data : Users,
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
  