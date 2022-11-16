import { USERS , UsersModel } from "../../models/Users.model";
import app from '../../index'
import config from '../../models/config';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';

const user = new UsersModel();

const request = supertest(app);
let test_user : USERS ={
    
    firstname: "RAHAF",
    lastname: "A",
    email:"rahaf0751@hotmail.com",
    password : "rahaf028"
};

let loggedUser: USERS;

const getToken = (user: USERS) => {

  const token =jwt.sign({user},config.TOKEN_SECRET as unknown as string)

  return token;
}

describe('User Controller', () => {

    beforeAll(async () => {
        test_user = await user.create(test_user)
      })

    

      it('get all users', async function () {
        const response = await request
          .get('/api/Users/')
          .set('authorization', `${getToken(loggedUser)}`);
          expect(response.status).toEqual(200)
      })

      it('get one user', async function () {
        const response = await request
          .get('/api/Users/2')
          .set('authorization', `${getToken(loggedUser)}`);
          expect(response.body.email).toEqual("rahaf0751@hotmail.com")
          expect(response.body.id).toEqual(2)

      })

      it('create new user', async function () {
        const response = await request
          .post('/api/Users')
          .send({
            firstname: "RAWAA",
            lastname: "A",
            email:"RAWAA0751@hotmail.com",
            password : "RAWAA028"
          })
          .set('authorization', `${getToken(loggedUser)}`);
          expect(response.status).toEqual(200)
      })

      it('update user', async function () {
        const response= await request
          .patch('/api/Users/1')
          .send({
            firstname: 'mlak',
            lastname: 's',
            email: 'malaaak@gmail.com',
            password: 'mallk987'
          })
          expect(response.status).toEqual(200)
      })
      
      it('delete user', async function () {
        const response = await request
          .delete('/api/Users/3')
          .set('authorization', `${getToken(loggedUser)}`);
          expect(response.status).toEqual(200)
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

describe('Testing Get Users By id Endpoints.', () => {
// test Get user by id with TOKEN
it('GET test user with TOKEN', async () => {
    
  const response = await request
    .get('/api/users/2')
    .set('authorization', `${getToken(loggedUser)}`);
  expect(response.status).toBe(200);
});
});