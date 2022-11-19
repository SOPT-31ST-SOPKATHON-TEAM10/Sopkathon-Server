import { Request, Response } from "express";
import { responseMessage, statusCode } from "../constants";
import { fail, success } from "../constants/response";
import { userService } from "../service";

const createUser = async (req: Request, res: Response) => {
    const { nickname } = req.body;
    const data = await userService.createUser(nickname);

    // const result = {
        
    // }

    // 유저 생성 성공
    return res.status(statusCode.CREATED)
         .send(success(statusCode.CREATED, responseMessage.SUCCESS_CREATE_USER, data));

}

const userController = {
    createUser,
};

export default userController;
