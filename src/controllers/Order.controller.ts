import { NextFunction, Request, Response } from 'express';
import { Orders , OrderModel, Order_Products } from '../models/Order.model';

const Orders =new OrderModel();

// UserOrder
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

  // index
export const index = async (req: Request, res: Response) => {
    const results = await Orders.index();
    res.send(results);
  }
  
  //create
  
  export const create = async (req: Request, res: Response , next: NextFunction) :Promise <void>=> {
    const order : Orders ={
      user_id: req.body.user_id,
      status_order: req.body.status_order,
      order_id : req.body.order_id
    }
    try {
        const Order = await Orders.create(order)
        res.json(Order)
    } catch (error) {
     
      
        res.status(400)
        res.json(error)
    }
  }

  //createProductToOrder
export const createProductToOrder = async(req: Request,res: Response): Promise <void> => {

  const OrderProduct: Order_Products = {
      quantity: req.body.quantity,
      order_id: req.body.order_id,
      product_id: req.body.productid
  }
  try {
      const order = await Orders.AddProductToOrder(OrderProduct)
      res.json(order)

  } catch (error) {
    console.log(error);
    
      res.status(400)
      res.json(error)
  }
}

// show
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
     
      req.body.order_id=req.params.id
      
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

    //update_Order_Product

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
  

    export const GetOrderProducts = async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.id);
        if (!id) {
          return res
            .status(400)
            .send('Error, missing or malformed parameters. id required');
        }
        const order = await Orders.GetOrderProducts(id);
        res.send(order);
      } catch (error) {
        res.status(401).json(error);
      }
      }