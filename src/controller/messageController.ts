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
    getCategoryMessage
};

export default messageController;
