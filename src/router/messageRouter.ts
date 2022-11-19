import { Router } from 'express';
import { messageController } from "../controller";

const router: Router = Router();

router.post('/', messageController.createMessage);

export default router;