import { NextFunction, Request, Response } from 'express';
import { ProductModel , Product } from '../models/Product.model';


const Product = new ProductModel();

export const index = async (req: Request, res: Response) => {
    const results = await Product.index();
    res.send(results);
  }
  
  //create
  
  export const create = async (req: Request, res: Response , next: NextFunction) => {
   try{
  
    const ProductModel : Product = {
      name : req.body.name,
      price: req.body.price,
    };
  
    
    const Users = await Product.create(ProductModel);
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
      const product = await Product.show(id);
      res.send(product);
    } catch (error) {
      res.status(401).json(error);
    }
  };
 
  
  //Update
  export const updateProduct = async (req: Request, res: Response , next: NextFunction) => {
    try{
     
      req.body.id=req.params.id
    
      const Users = await Product.update(req.body);
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
  
  export const deleteProduct = async (req: Request, res: Response , next: NextFunction) => {
    try{
      const Users = await Product.delete(req.params.id as unknown as string);
    res.json({
      status:'SUCCESS',
      data : Users,
      massage: 'User delete Successfully'
    
    });
     
     } catch(err){
      next(err);
     }
    }
  