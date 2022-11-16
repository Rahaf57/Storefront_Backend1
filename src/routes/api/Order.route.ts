import { Router } from 'express';
import * as controllers from '../../controllers/Order.controller';
import { authMiddleware } from '../../Middleware/middlware';



const route = Router();
route.route('/').get( controllers.index).post(controllers.create);
route.route('/:id').delete( controllers.deleteOrder).get(controllers.show);
route.route('/:id').put(controllers.updateOrder);
route.route('/product/:id').put(controllers.update_Order_Product);
route.route('/userOrder/:id').get(authMiddleware,controllers.UserOrder);
route.route('/OrderProduct/').post(controllers.createProductToOrder);
route.route('/OrderProduct/:id').get(controllers.GetOrderProducts);




export default route;