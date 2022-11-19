import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { MessageCreateDTO } from '../interfaces/MessageCreateDTO';
import dayjs from "dayjs";

const createMessage = async (messageCreateDTO:MessageCreateDTO) => {
    const requestTime = dayjs().add(9, 'hour').format();

    const user = await prisma.user.findFirst({
        where:{
            nickname: messageCreateDTO.nickname
        }
    })

    if(!user) return;

    const data = await prisma.message.create({
        data: {
            title: messageCreateDTO.title,
            artist: messageCreateDTO.artist,
            contents: messageCreateDTO.contents,
            category_id: messageCreateDTO.categoryId,
            receiver_id: user.id,
            created_at: requestTime, 
            is_opened: 0
        }
    })

    return data.id;
}

const messageService = {
    createMessage
};

export default messageService;
