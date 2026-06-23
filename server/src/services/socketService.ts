import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../constants';
import { logger } from '../utils/logger';

export class SocketService {
  static handleConnection(io: Server, socket: Socket) {
    const userId = socket.handshake.query.userId as string;
    logger.info(`User ${userId} connected`);

    socket.join(`user:${userId}`);
    socket.on(SOCKET_EVENTS.ERROR, (error) => {
      logger.error('Socket error', error);
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      logger.info(`User ${userId} disconnected`);
      socket.leave(`user:${userId}`);
    });
  }

  static emitOrderStatus(io: Server, orderId: string, status: string, userId: string) {
    io.to(`user:${userId}`).emit(SOCKET_EVENTS.ORDER_STATUS, {
      orderId,
      status,
      timestamp: new Date(),
    });
  }

  static emitOrderCreated(io: Server, order: any) {
    io.to('kitchen').emit(SOCKET_EVENTS.ORDER_CREATED, order);
  }

  static emitNotification(io: Server, userId: string, notification: any) {
    io.to(`user:${userId}`).emit(SOCKET_EVENTS.NOTIFICATION, notification);
  }

  static broadcastTableStatus(io: Server, tableNumber: number, status: string) {
    io.emit('table:status', { tableNumber, status, timestamp: new Date() });
  }
}
