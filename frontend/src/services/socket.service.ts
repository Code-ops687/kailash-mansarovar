import { io, Socket } from 'socket.io-client';

const URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(URL, {
        autoConnect: true,
      });

      this.socket.on('connect', () => {
        console.log('Connected to socket server');
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinKitchen(restaurantId: string) {
    if (this.socket) {
      this.socket.emit('joinKitchen', restaurantId);
    }
  }

  joinOrder(orderId: string) {
    if (this.socket) {
      this.socket.emit('joinOrder', orderId);
    }
  }

  onNewOrder(callback: (order: any) => void) {
    if (this.socket) {
      this.socket.on('newOrder', callback);
    }
  }

  onOrderUpdated(callback: (order: any) => void) {
    if (this.socket) {
      this.socket.on('orderUpdated', callback);
    }
  }

  onStatusUpdated(callback: (data: { status: string }) => void) {
    if (this.socket) {
      this.socket.on('statusUpdated', callback);
    }
  }

  off(event: string) {
    if (this.socket) {
      this.socket.off(event);
    }
  }
}

export const socketService = new SocketService();
