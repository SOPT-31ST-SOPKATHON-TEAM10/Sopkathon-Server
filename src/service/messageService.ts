import { Category, Message, PrismaClient } from '@prisma/client';
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

const getMessageDetail = async (messageId: number) => {
    const data = await prisma.message.findUnique({
        where: {
            id: messageId
        },
        include: {
            Category: true
        }
    })

    return data
}

const getCategoryMessage = async (categoryId:number, nickname:string, isOpened:number) => {
    const user = await prisma.user.findFirst({
        where:{
            nickname: nickname
        }
    })

    if(!user) return;

    if(isOpened == 2){
        const data = await prisma.message.findMany({
            where:{
                category_id: categoryId,
                receiver_id: user.id
            }
        })
        return data;
    } 

    const data = await prisma.message.findMany({
        where:{
            category_id: categoryId,
            receiver_id: user.id,
            is_opened: isOpened
        }
    })
    return data;
}


const messageService = {
    createMessage,
    getMessageDetail,
    getCategoryMessage
};

export default messageService;
