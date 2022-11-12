import { NextFunction, Request, Response } from 'express';
import { UsersModel , USERS } from '../models/Users.model';
import config from '../models/config';
import jwt from 'jsonwebtoken';

const User = new UsersModel();

export const index = async (req: Request, res: Response) => {
  const results = await User.index();
  res.send(results);
}

//create

export const create = async (req: Request, res: Response , next: NextFunction) => {
 try{

  const UserModel : USERS = {
    firstname : req.body.firstname,
    lastname: req.body.lastname,
    email:req.body.email,
    password: req.body.password
  };

  
  const Users = await User.create(UserModel);
res.json({
  status:'SUCCESS',
  data : Users,
  massage: 'User created Successfully'

});
 
 } catch(err){
  next(err);
 }
};
export const authenticate =async(req: Request, res: Response , next: NextFunction)=>{
  try{
    const {email,password}=req.body;

    const logUser = await User.authenticate(email,password);
   
    if(!logUser){
      return res.status(401).json({
        status:'error',
        massage:'the email and password do no match',
      })
    }

    const token =jwt.sign({logUser},config.TOKEN_SECRET as unknown as string)
    return res.json({
      status:'success',
      massage:'user authenticated successfully',
      token: token,
      data: logUser
    })
  } catch(err){
    return next(err)
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
    const users = await User.show(id);
    res.send(users);
  } catch (error) {
    res.status(401).json(error);
  }
};

//Update
export const updateUser = async (req: Request, res: Response , next: NextFunction) => {
  try{
   
    req.body.id=req.params.id
  
    const Users = await User.update(req.body);
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

export const deleteUser = async (req: Request, res: Response , next: NextFunction) => {
  try{
    const Users = await User.delete(req.params.id as unknown as string);
  res.json({
    status:'SUCCESS',
    data : Users,
    massage: 'User delete Successfully'
  
  });
   
   } catch(err){
    next(err);
   }
  }


 