import { Router } from 'express';
import { userController } from '../controller';

const router: Router = Router();

// * 유저 생성 
router.post('/', userController.createUser);

export default router;