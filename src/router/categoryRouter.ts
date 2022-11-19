import { Router } from 'express';
import { categoryController } from '../controller';

const router: Router = Router();

// * 카테고리 조회
router.get('/', categoryController.getCategory);

export default router;