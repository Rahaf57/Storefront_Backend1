import { Router } from 'express';
import * as controllers from '../../controllers/Product.controller';
import { authMiddleware } from '../../Middleware/middlware';



const route = Router();
route.route('/').get( controllers.index).post(authMiddleware,controllers.create);
route.route('/:id').delete( controllers.deleteProduct).patch(controllers.updateProduct).get(controllers.show);



export default route;