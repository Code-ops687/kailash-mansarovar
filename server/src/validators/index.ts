import { z } from 'zod';

// Auth Validators
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Invalid password'),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  phone: z.string().optional(),
  avatar: z.string().url().optional(),
});

// Menu Validators
export const createMenuItemSchema = z.object({
  categoryId: z.string().min(1),
  name: z.string().min(2),
  description: z.string().optional(),
  basePrice: z.number().positive(),
  discount: z.number().min(0).max(100).optional(),
  itemType: z.enum(['VEG', 'NON_VEG', 'VEGAN']),
  spiceLevel: z.enum(['MILD', 'MEDIUM', 'SPICY', 'VERY_SPICY']),
  preparationTime: z.number().positive().optional(),
  isAvailable: z.boolean().optional(),
  isVegan: z.boolean().optional(),
  ingredients: z.string().optional(),
  allergens: z.string().optional(),
});

export const updateMenuItemSchema = createMenuItemSchema.partial();

export const createCategorySchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  icon: z.string().optional(),
});

// Order Validators
export const createOrderSchema = z.object({
  tableNumber: z.number().optional(),
  items: z.array(
    z.object({
      menuItemId: z.string(),
      quantity: z.number().positive(),
      addOns: z.array(z.string()).optional(),
      specialInstructions: z.string().optional(),
    })
  ),
  specialNotes: z.string().optional(),
  couponCode: z.string().optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['PENDING', 'ACCEPTED', 'PREPARING', 'READY', 'SERVED', 'COMPLETED', 'CANCELLED']),
});

// Payment Validators
export const createPaymentSchema = z.object({
  orderId: z.string(),
  paymentMethod: z.enum(['CASH', 'CARD', 'UPI', 'WALLET']),
  amount: z.number().positive(),
});

// Review Validators
export const createReviewSchema = z.object({
  menuItemId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

// Coupon Validators
export const createCouponSchema = z.object({
  code: z.string().min(3).toUpperCase(),
  description: z.string().optional(),
  discountType: z.enum(['PERCENTAGE', 'FIXED_AMOUNT']),
  discountValue: z.number().positive(),
  minOrderAmount: z.number().optional(),
  maxDiscount: z.number().optional(),
  usageLimit: z.number().optional(),
  startDate: z.string().datetime(),
  expiryDate: z.string().datetime(),
});

export const applyCouponSchema = z.object({
  couponCode: z.string(),
});

// Address Validators
export const createAddressSchema = z.object({
  street: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().min(5),
  country: z.string().min(2),
  isDefault: z.boolean().optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type CreateCouponInput = z.infer<typeof createCouponSchema>;
