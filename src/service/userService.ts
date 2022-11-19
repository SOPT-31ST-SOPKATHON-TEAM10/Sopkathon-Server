import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createUser = async (nickname: string) => {
    const data = await prisma.user.create({
        data: {
            nickname,
        },
    });

    return data;
}

const findUserByNickname = async (nickname: string) => {
    const data = await prisma.user.findMany({
        where: {
            nickname: nickname,
        }
    })
    return data;
}

const userService = {
    createUser, 
    findUserByNickname,
};

export default userService;
