import { Request, Response } from "express";
import { responseMessage, statusCode } from "../constants";
import { fail, success } from "../constants/response";
import { userService } from "../service";

const createUser = async (req: Request, res: Response) => {
    const { nickname } = req.body;

    if (!nickname) {
        return res.status(statusCode.BAD_REQUEST)
        .send(fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    const user = await userService.findUserByNickname(nickname);

    // 유저 중복 조회
    if (user.length > 0) {
        return res.status(statusCode.BAD_REQUEST)
        .send(fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_NICKNAME))
    }

    const data = await userService.createUser(nickname);

    // 유저 생성 성공
    return res.status(statusCode.CREATED)
         .send(success(statusCode.CREATED, responseMessage.SUCCESS_CREATE_USER, data));

}

const userController = {
    createUser,
};

export default userController;
