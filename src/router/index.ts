import { Router } from "express";
import userRouter from "./userRouter";
import messageRouter from "./messageRouter";
import categoryRouter from "./categoryRouter";

const router: Router = Router();

router.use("/user", userRouter);
router.use("/message", messageRouter);
router.use("/category", categoryRouter);

export default router;
