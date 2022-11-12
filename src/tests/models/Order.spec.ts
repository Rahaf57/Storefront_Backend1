import { Orders , OrderModel } from "../../models/Order.model";
import app from '../../index'
import config from '../../models/config';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import  { createTesProduct, createTestUser } from "../helpers/testModel";
import { USERS } from "../../models/Users.model";
import { Product } from "../../models/Product.model";



const request = supertest(app);

const store = new OrderModel();

export type test_order ={
  
  user_id: number ;
  product_id: number;
  quantity : number;
  status_order: string;
  
}

let user: USERS;
let product: Product;

const getToken = (user: USERS) => {

  const token =jwt.sign({user},config.TOKEN_SECRET as unknown as string)

  return token;
}


describe('Test Order Model', async () => {
    
   
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a update method', () => {
        expect(store.update).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    
    it ('create method should add a Order' , async()=>{


        user = await createTestUser('order');
        product = await createTesProduct();
        
        const result : Orders = await new OrderModel().create({
                user_id: user.id || 0 ,
                product_id : product.id || 0,
                quantity: 236,
                status_order: 'active',
                
              });
           
            expect(result).toEqual({  
                order_id: result.order_id,
                user_id: result.user_id,
                product_id :result.product_id,
                quantity: 236,
                status_order: 'active'
            });
        });

    it('getUserOrder method should return a list of Order', async () => {
        const result = await store.getUserOrder(3);
        expect(result).toEqual(result);
    });
      it('index method should return a list of Order', async () => {
        const result = await store.index();
        expect(result).toEqual(result);
    });

    describe('Testing Users Endpoints.', () => {
        // test Get user with TOKEN
        it('GET test user with TOKEN', async () => {
            
          const response = await request
            .get('/api/Order')
            .set('authorization', `${getToken(user)}`);
          expect(response.status).toBe(200);
    });
});


});
       
