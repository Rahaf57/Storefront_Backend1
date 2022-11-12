import OrderModel from "../../models/Order.model";
import ProductModel from "../../models/Product.model";
import UsersModel, { USERS } from "../../models/Users.model";


const User = new UsersModel();
const Product = new ProductModel();

const user :USERS  = {
    firstname: "RAHAFI-TEST",
    lastname: "A-test",
    email:"raahafi0@hotmail.com",
    password : "rahaf028"
};

const test_product ={
    
    name: "Product1",
    price: 46.20
}

export const createTestUser =  async  (test: string) => {

user.email = test + user.email;
const savedUser = await User.create(user);

return savedUser
};

export const createTesProduct =  async  () => {

   
    const savedProduct = await Product.create(test_product);
    
    return savedProduct
};

