import { ItemSchema, ItemType } from "shared/schema/item";
import { PaginationType } from "shared/schema/pagination";
import { prismaClient } from "../prisma/client";
import { PrismaClient } from "@prisma/client";

class ItemService {
  constructor(protected prismaClient: PrismaClient) {}

  async getAll(pagination?: PaginationType) {
    return prismaClient.item.findMany({
      take: pagination?.limit,
      skip: pagination?.skip,
    });
  }

  async getById(id: number) {
    return prismaClient.item.findUnique({
      where: {
        id,
      },
    });
  }

  async create(item: ItemType) {
    // check the input
    ItemSchema.parse(item);
    return prismaClient.item.create({
      data: {
        ...item,
        // override if any
      },
    });
  }

  async update(id: number, item: ItemType) {
    ItemSchema.parse(item);
    return prismaClient.item.update({
      where: {
        id,
      },
      data: item,
    });
  }

  async delete(id: number) {
    return prismaClient.item.delete({
      where: {
        id,
      },
    });
  }
}

export const itemService = new ItemService(prismaClient);
