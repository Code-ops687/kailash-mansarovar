export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
};

export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ERROR: 'error',
  ORDER_STATUS: 'order:status',
  ORDER_CREATED: 'order:created',
  NOTIFICATION: 'notification',
  TABLE_STATUS: 'table:status',
};

export const ROLES = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  KITCHEN_STAFF: 'KITCHEN_STAFF',
  CASHIER: 'CASHIER',
  WAITER: 'WAITER',
};
