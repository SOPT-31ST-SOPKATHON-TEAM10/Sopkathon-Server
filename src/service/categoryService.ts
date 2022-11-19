import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface CategoryMessageCountDTO {
  category: CategoryDTO,
  messageCount: number
}

interface CategoryDTO {
  id: number,
  name: string
}

const getCategory = async (nickname: string) => {

  const user = await prisma.user.findFirst({
    where: {
      nickname: nickname,
    },
  });

  const isOpened: number = 1

  const data = await prisma.category.findMany({
    include: {
      Message: {
        where: { 
          is_opened: 0,
          receiver_id: user?.id 
        }
      }
      
    }
  
  });

  return data.map((item) => {
    const categoryInfo: CategoryDTO = {
      id: item.id,
      name: item.name
    }

    const t: CategoryMessageCountDTO = {
      category: categoryInfo,
      messageCount: item.Message.length
    } 
    return t
  })

  return data;
}

const categoryService = {
  getCategory,
};

export default categoryService;
