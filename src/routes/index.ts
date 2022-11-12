
import express from 'express';

import UsersRoute from './api/Users.route';

import ProductRoute from './api/Product.route'
import OrderRoute from './api/Order.route'

const routes = express.Router();

routes.use('/Users', UsersRoute);
routes.use('/Product',ProductRoute);
routes.use('/Order', OrderRoute);



export default routes;