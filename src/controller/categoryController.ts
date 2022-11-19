import { Request, Response } from "express";
import { responseMessage, statusCode } from "../constants";
import { fail, success } from "../constants/response";
import { categoryService } from "../service";

// * 카테고리 별 메시지 수 조회
const getCategory = async (req: Request, res: Response) => {
  
    const nickname  = req.query.nickname as string;
    const data = await categoryService.getCategory(nickname);

    if (!nickname) {
        return res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
    }
    
    // 성공
    return res.status(statusCode.OK)
    .send(success(statusCode.OK, responseMessage.SUCCESS_GET_CATEGORY, data));

}

const categoryController = {
    getCategory,
};

export default categoryController;
