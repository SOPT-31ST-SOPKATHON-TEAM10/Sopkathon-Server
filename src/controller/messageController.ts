import { Request, Response } from "express";
import { messageService } from "../service";
import { MessageCreateDTO } from "../interfaces/MessageCreateDTO";
import { responseMessage, statusCode } from "../constants";
import { success, fail } from "../constants/response";

const createMessage = async (req: Request, res: Response) => {
    const messageCreateDTO:MessageCreateDTO = req.body;

    const data = await messageService.createMessage(messageCreateDTO);

    if (!data) {
        return res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }
    return res.status(statusCode.CREATED).send(success(statusCode.CREATED, responseMessage.SUCCESS_CREATE_MESSAGE, data));
};

const getMessageDetail = async (req: Request, res: Response) => {
    const { messageId } = req.params;

    // 메시지 id 안들어옴
    if (!messageId) {
        return res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    const data = await messageService.getMessageDetail(+messageId);

     // 메시지 존재하지 않음
    if (!data) {
        return res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, responseMessage.NO_MESSAGE));
    }

    // 성공
    return res.status(statusCode.OK).send(success(statusCode.OK, responseMessage.SUCCESS_GET_MESSAGE_DETAIL, data));
}

const getCategoryMessage = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const nickname = req.query.nickname as string;
    const isOpened = req.query.isopened as string;

    const data = await messageService.getCategoryMessage(Number(categoryId),nickname,Number(isOpened));

    if (!data) {
        return res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }
    return res.status(statusCode.CREATED).send(success(statusCode.CREATED, responseMessage.SUCCESS_CREATE_MESSAGE, data));
};

const messageController = {
    createMessage,
    getMessageDetail,
    getCategoryMessage
};

export default messageController;
