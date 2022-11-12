import { NextFunction, Request, Response } from 'express';
import config from '../models/config';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response , next: NextFunction) => {

    const token = req.headers.authorization;
    console.log(token)

    if(token) {

      const decoded = jwt.verify(token ,config.TOKEN_SECRET as unknown as string )
    
    if(decoded) return next();

    }

    return res.status(401).send("Please login!");
    }
    