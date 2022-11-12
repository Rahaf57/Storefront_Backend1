import { Router } from 'express';
import * as controllers from '../../controllers/Users.controller';
import { Request, Response } from 'express';
import { authMiddleware } from '../../Middleware/middlware';


const route = Router();
route.route('/').get(authMiddleware,controllers.index).post(authMiddleware,controllers.create);
route.route('/:id').delete( controllers.deleteUser).patch(controllers.updateUser).get(authMiddleware,controllers.show);
route.route('/authenticate').post(controllers.authenticate);

route.route('/restriced').get( (req:Request , res:Response) => {

    res.send("Hello");
})

export default route;