import { PrismaClient } from '@prisma/client';
import { CreateMenuItemInput } from '../validators';
import { NotFoundError } from '../utils/errors';

const prisma = new PrismaClient();

export class MenuService {
  async getAllMenuItems(categoryId?: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const where: any = { isAvailable: true };
    if (categoryId) where.categoryId = categoryId;

    const [items, total] = await Promise.all([
      prisma.menuItem.findMany({
        where,
        include: { category: true, addOns: true, reviews: { select: { rating: true } } },
        skip,
        take: limit,
        orderBy: { displayOrder: 'asc' },
      }),
      prisma.menuItem.count({ where }),
    ]);

    return {
      items: items.map(item => this.formatMenuItem(item)),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  async getMenuItemById(id: string) {
    const item = await prisma.menuItem.findUnique({
      where: { id },
      include: { category: true, addOns: true, reviews: { include: { user: { select: { firstName: true, lastName: true, avatar: true } } } } },
    });

    if (!item) {
      throw new NotFoundError('Menu item not found');
    }

    return this.formatMenuItem(item);
  }

  async searchMenuItems(query: string) {
    const items = await prisma.menuItem.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
        isAvailable: true,
      },
      include: { category: true, addOns: true },
      take: 20,
    });

    return items.map(item => this.formatMenuItem(item));
  }

  async getCategories() {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
    });

    return categories;
  }

  async createMenuItem(data: CreateMenuItemInput & { restaurantId: string; image?: string }) {
    const finalPrice = data.basePrice - (data.discount || 0);

    const item = await prisma.menuItem.create({
      data: {
        ...data,
        finalPrice,
      },
      include: { category: true, addOns: true },
    });

    return this.formatMenuItem(item);
  }

  async updateMenuItem(id: string, data: Partial<CreateMenuItemInput> & { image?: string }) {
    const item = await prisma.menuItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundError('Menu item not found');

    const finalPrice = data.basePrice ? data.basePrice - (data.discount || item.discount || 0) : item.finalPrice;

    const updated = await prisma.menuItem.update({
      where: { id },
      data: { ...data, finalPrice },
      include: { category: true, addOns: true },
    });

    return this.formatMenuItem(updated);
  }

  async deleteMenuItem(id: string) {
    const item = await prisma.menuItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundError('Menu item not found');

    await prisma.menuItem.delete({ where: { id } });
    return { message: 'Menu item deleted successfully' };
  }

  private formatMenuItem(item: any) {
    return {
      ...item,
      ingredients: item.ingredients ? JSON.parse(item.ingredients) : [],
      allergens: item.allergens ? JSON.parse(item.allergens) : [],
      averageRating: item.reviews?.length > 0 ? (item.reviews.reduce((sum, r) => sum + r.rating, 0) / item.reviews.length).toFixed(1) : 0,
    };
  }
}
