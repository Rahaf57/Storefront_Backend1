import { Product  } from "../../models/Product.model";
import app from '../../index'
import config from '../../models/config';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import  {UsersModel, USERS } from "../../models/Users.model";


const request = supertest(app);
const USERS = new UsersModel();



const test_product : Product ={
    
    name: "Product1",
    price: 46.20
}

let user: USERS;

const getToken = (user: USERS) => {

  const token =jwt.sign({user},config.TOKEN_SECRET as unknown as string)

  return token;
}

describe('Product Controller', () => {

    it('create product', async function () {
        const response = await request
          .post('/api/Product')
          .send({
            name: test_product.name,
            price: test_product.price
          })
          .set('authorization', `${getToken(user)}`);
        expect(response.status).toEqual(200)
      })

      it('index products', async function () {
        const response = await request
          .get('/api/Product/')
        expect(response.status).toEqual(200)
      })

      it('show one product', async function () {
        const response = await request
          .get('/api/Product/1')
          .set('authorization', `${getToken(user)}`);
        expect(response.status).toEqual(200)
      })

      it('update product', async function () {
        const response = await request
          .patch('/api/Product/1')
          .send({
            name: "book",
            price: 879
          })
          .set('authorization', `${getToken(user)}`);
        expect(response.status).toEqual(200)
      })

      it('delete product', async function () {
        const response = await request
          .delete('/api/Product/1')
          .set('authorization', `${getToken(user)}`);
        expect(response.status).toEqual(200)
      })
 });

 