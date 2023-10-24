import { Prisma, PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production")
  globalThis.prisma = new PrismaClient();

const categoryWithBillboard = Prisma.validator<Prisma.CategoryDefaultArgs>()({
  include: {
    billboard: true,
  },
});

const productsWithInfo = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    category: true,
    size: true,
    color: true,
  },
});
export default prismadb;

export type CategoryWithBillboard = Prisma.CategoryGetPayload<
  typeof categoryWithBillboard
>;

export type ProductWithInfo = Prisma.ProductGetPayload<typeof productsWithInfo>;
