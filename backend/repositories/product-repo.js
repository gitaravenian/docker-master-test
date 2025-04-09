import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return prisma.product.findMany();
};

export const createProduct = async (name) => {
  console.log('📄 Creating product with name:', name);
  const product = await prisma.product.create({
    data: { name },
  });
  console.log('✅ Prisma created:', product);
  return product;
};

