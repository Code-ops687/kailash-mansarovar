export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  KITCHEN_STAFF: 'KITCHEN_STAFF',
  CASHIER: 'CASHIER',
  WAITER: 'WAITER',
} as const;

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  PREPARING: 'PREPARING',
  READY: 'READY',
  SERVED: 'SERVED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
} as const;

export const PAYMENT_METHOD = {
  CASH: 'CASH',
  CARD: 'CARD',
  UPI: 'UPI',
  WALLET: 'WALLET',
} as const;

export const SPICE_LEVEL = {
  MILD: 'MILD',
  MEDIUM: 'MEDIUM',
  SPICY: 'SPICY',
  VERY_SPICY: 'VERY_SPICY',
} as const;

export const ITEM_TYPE = {
  VEG: 'VEG',
  NON_VEG: 'NON_VEG',
  VEGAN: 'VEGAN',
} as const;

export const NOTIFICATION_TYPE = {
  ORDER_STATUS: 'ORDER_STATUS',
  PAYMENT: 'PAYMENT',
  SYSTEM: 'SYSTEM',
  PROMOTION: 'PROMOTION',
} as const;

export const SOCKET_EVENTS = {
  // Connection
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  
  // Order events
  ORDER_CREATED: 'order:created',
  ORDER_ACCEPTED: 'order:accepted',
  ORDER_REJECTED: 'order:rejected',
  ORDER_PREPARING: 'order:preparing',
  ORDER_READY: 'order:ready',
  ORDER_SERVED: 'order:served',
  ORDER_COMPLETED: 'order:completed',
  ORDER_CANCELLED: 'order:cancelled',
  
  // Kitchen events
  KITCHEN_ACCEPT_ORDER: 'kitchen:accept_order',
  KITCHEN_REJECT_ORDER: 'kitchen:reject_order',
  KITCHEN_UPDATE_STATUS: 'kitchen:update_status',
  
  // Notification events
  NOTIFICATION: 'notification',
  NOTIFICATION_READ: 'notification:read',
  
  // Error events
  ERROR: 'error',
} as const;

export const JWT_CONFIG = {
  ACCESS_TOKEN_EXPIRE: '15m',
  REFRESH_TOKEN_EXPIRE: '7d',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;
