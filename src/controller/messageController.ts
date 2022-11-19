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
    const data = await messageService.getMessageDetail(+messageId);
    return res.status(statusCode.OK).send(success(statusCode.OK, responseMessage.SUCCESS_GET_MESSAGE_DETAIL, data));
}

const messageController = {
    createMessage,
    getMessageDetail
};

export default messageController;
