import { Product , ProductModel } from "../../models/Product.model";
import app from '../../index'
import config from '../../models/config';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { USERS } from "../../models/Users.model";
import { createTestUser } from "../helpers/testModel";

const request = supertest(app);

const store = new ProductModel();

const test_product : Product ={
    
    name: "Product1",
    price: 46.20
}

let user: USERS;

const getToken = (user: USERS) => {

  const token =jwt.sign({user},config.TOKEN_SECRET as unknown as string)

  return token;
}


    describe("Product Model", () => {
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

   

    it ('create method should add a Product' , async()=>{
        const result = await store.create(test_product);
        test_product.id=result.id
        expect(result).toEqual({
       id:result.id,name:result.name,price:result.price
        });
    });


      it('index method should return a list of Products', async () => {
        const result = await store.index();
        expect(result).toEqual(result);
    });

    it('show method should return the correct Product', async () => {
        const result = await store.show(1);
        expect(result).toEqual(result);
    });

    describe('Testing Users Endpoints.', () => {
        // test Get user with TOKEN
        it('GET test user with TOKEN', async () => {
            
            user = await createTestUser('product');

          const response = await request
            .get('/api/Product')
            .set('authorization', `${getToken(user)}`);
          expect(response.status).toBe(200);
    });
});

    it('Update method the Product', async () => {
        test_product.name="P3"
        test_product.price=80;

        const result = await store.update(test_product);
        
        expect(result).toEqual(test_product);
 
    });

    it('delete method should remove the Product', async () => {

        const id = test_product.id || -1;
        if(id == -1) throw new Error("Product dose not have id to delete");

        const result = await store.delete(id.toString());
        
      expect(result).toBe(result);
 
    });
    

    });
