import { Orders  ,Order_Products } from "../../models/Order.model";
import app from '../../index'
import config from '../../models/config';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { USERS , UsersModel} from "../../models/Users.model";


const request = supertest(app);

const userModel = new UsersModel()
const User : USERS ={
    firstname: "Rahaf",
    lastname: "M",
    email:"RAHAF@GMAIL.COM",
    password : 'rahaf10759876',
    
}

const order : Orders ={
    order_id: 1,
    user_id: 1,
    status_order : 'complated'
}

const OrderProducts : Order_Products = {
    order_id: 1,
    product_id:1,
    quantity: 10
  }



  let loggedUser: USERS;

  const getToken = (user: USERS) => {
  
    const token =jwt.sign({user},config.TOKEN_SECRET as unknown as string)
  
    return token;
  }
  
    describe ('Order Controller' , () =>{

  it('create order', async function () {

     const r = await  userModel.create(User)
    
     
        const response = await request
          .post('/api/Order')
          .send({
            user_id:r.id,
            status_order: "active"
          })
          
          expect(response.status).toEqual(200);
      });
      
  it('index orders', async function () {
        const response = await request
          .get('/api/Order/')
          .set('authorization', `${getToken(loggedUser)}`);
          expect(response.status).toEqual(200);
      });

  it('show orders By user', async function () {
        const response  =await request
          .get('/api/Order/1')
          expect(response.status).toEqual(200);
      });
 
  it('update orders', async function () {
        const response   =await request
          .put('/api/Order/1')
          .send({
            status_order : 'complated'
          })

          expect(response.status).toEqual(200);
      });

      it('Add Product To Order', async function () {
        const response  =await request
          .post('/api/Order/OrderProduct')
          .send({
            order_id :1,
            product_id:1,
            quantity: 70
          })
          .set('authorization', `${getToken(loggedUser)}`);
          expect(response.status).toEqual(200);
      });


  it('update OrdersProduct', async function () {
        const response  =await request
          .put('/api/Order/product/1')
          .send({
            product_id:1,
            quantity: 70
          })
          .set('authorization', `${getToken(loggedUser)}`);
          expect(response.status).toEqual(200);
      });

      
 it (' get OrderProduct' , async function () {
    const response  =await request
    .get('/api/Order/OrderProduct/1')
    .set('authorization', `${getToken(loggedUser)}`);
    expect(response.status).toEqual(200);
});

      it('get UserOrder', async function () {
        const response  =await request
          .get('/api/Order/userOrder/1')
          .set('authorization', `${getToken(loggedUser)}`);
          expect(response.status).toEqual(200);
      });



  it('delete order', async function () {

  
        const response   =await request
          .delete('/api/Order/2')
          expect(response.status).toEqual(200);
      })

    });

 
    describe('Testing Users Endpoints.', () => {
        // test Get user with TOKEN
        it('GET test user with TOKEN', async () => {
            
          const response = await request
            .get('/api/users')
            .set('authorization', `${getToken(loggedUser)}`);
          expect(response.status).toBe(200);
    });
    });