import { Router } from 'express';
import * as controllers from '../../controllers/Order.controller';
import { authMiddleware } from '../../Middleware/middlware';



const route = Router();
route.route('/').get( controllers.index).post(controllers.create);
route.route('/:id').delete( controllers.deleteOrder).patch(controllers.updateOrder).get(controllers.show).patch(controllers.update_Order_Product);
route.route('/userOrder/:id').get(authMiddleware,controllers.UserOrder);
route.route('/updateOrderProduct/:id').get(controllers.createProductToOrder);




export default route;