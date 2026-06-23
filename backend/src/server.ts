import app from './app';
import dotenv from 'dotenv';
import { prisma } from './app';
import http from 'http';
import { initSocket } from './websocket/socket';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log('📦 Database connected successfully');
    
    const server = http.createServer(app);
    initSocket(server);
    console.log('🔌 Socket.IO initialized');

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
}

startServer();
