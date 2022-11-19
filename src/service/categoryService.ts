import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getCategory = async (nickname: string) => {
  const data = await prisma.category.findMany({});

  return data;
}

const categoryService = {
  getCategory,
};

export default categoryService;
