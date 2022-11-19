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

const messageController = {
    createMessage
};

export default messageController;
