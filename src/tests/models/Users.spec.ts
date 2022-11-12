import { USERS , UsersModel } from "../../models/Users.model";
import app from '../../index'
import config from '../../models/config';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';

const user = new UsersModel();

const request = supertest(app);

const store = new UsersModel();
const test_user : USERS ={
    
    firstname: "RAHAF",
    lastname: "A",
    email:"rahaf01@hotmail.com",
    password : "rahaf028"
};

let loggedUser: USERS;

const getToken = (user: USERS) => {

  const token =jwt.sign({user},config.TOKEN_SECRET as unknown as string)

  return token;
}


    describe("Users Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a authenticate method', () => {
        expect(store.authenticate).toBeDefined();
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

   

    it ('Create should add a User' , async()=>{
        const result = await store.create(test_user)
        
        loggedUser = result;

        expect(result).toEqual(
            {
                id: result.id,
                firstname: 'RAHAF',
                lastname: 'A',
                email: 'rahaf01@hotmail.com',
                password: result.password
              }
        );

      });


      it('index method should return a list of Users', async () => {
        const result = await store.index();
        expect(result).toEqual(result);
    });

    it('show method should return the correct User', async () => {
        const result = await store.show(2);
        expect(result).toEqual(result);
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

it('delete method should remove the User', async () => {

    const id = loggedUser.id || -1;
    if(id == -1) throw new Error("User dose not have id to delete");

    const result = await store.delete(id.toString());
  expect(result).toBe(result);

    })

});