import { Router } from 'express';
import { messageController } from "../controller";

const router: Router = Router();

router.post('/', messageController.createMessage);
router.get('/:messageId', messageController.getMessageDetail);

export default router;