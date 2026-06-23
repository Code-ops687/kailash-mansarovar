# 🍽️ Kailash Mansarovar - Restaurant Management System & Digital QR Menu

A production-ready full-stack restaurant management system with digital QR-based menu ordering, real-time order tracking, and comprehensive admin dashboards for Kailash Mansarovar restaurant.

## ✨ Features

### 👥 Customer Features
- 📱 Digital QR Menu with responsive design
- 🔍 Advanced search and filtering by category, price, veg/non-veg
- 🛒 Shopping cart with add-ons and special instructions
- 💳 Secure checkout with multiple payment options (Cash, Card, UPI)
- 📍 Real-time order tracking and notifications
- ⭐ Ratings, reviews and customer feedback
- ❤️ Favorites/Wishlist management
- 🔔 Push notifications for order updates
- 📱 Mobile-first responsive design
- 🌙 Dark mode support

### 👨‍💼 Staff Dashboards

**Kitchen Staff Dashboard:**
- Live order management
- Accept/reject orders
- Track cooking progress (Pending → Preparing → Ready)
- Add cooking notes
- Mark orders as completed

**Cashier Dashboard:**
- Live orders and bills
- GST calculation
- Apply discounts and coupons
- Multiple payment methods
- Print invoices
- Payment history

**Waiter Portal:**
- Table management
- Take orders
- Communicate with kitchen
- Manage customer requests

**Manager Dashboard:**
- Staff performance tracking
- Sales analytics
- Customer feedback
- Inventory alerts
- Reports generation

### 🏢 Admin Dashboard
- 📊 Comprehensive analytics and KPIs
- 💰 Revenue and sales reports
- 📈 Peak hours analysis
- 🍽️ Menu management (CRUD operations)
- 📂 Category management
- 🏪 Table and QR code management
- 👥 Staff management and roles
- 📦 Inventory management
- 🎟️ Coupon and offer management
- ⚙️ Restaurant settings

## 🛠️ Tech Stack

### Frontend
- **React** 18+ with TypeScript
- **Vite** for lightning-fast builds
- **Tailwind CSS** for modern styling
- **shadcn/ui** for accessible components
- **Zustand** for state management
- **Socket.IO Client** for real-time updates
- **Zod** for schema validation
- **Axios** for HTTP requests
- **React Router** for navigation
- **React Query** for data fetching

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **PostgreSQL** with Prisma ORM
- **JWT** for authentication
- **Socket.IO** for real-time communication
- **Cloudinary** for image storage
- **Zod** for input validation
- **Bcrypt** for password hashing
- **Dotenv** for environment management

### Database
- **PostgreSQL** (relational database)
- **Prisma** (ORM)
- **Redis** (optional - for caching)

### DevOps & Deployment
- **Docker** for containerization
- **Docker Compose** for local development
- **GitHub Actions** for CI/CD
- **Vercel** for frontend deployment
- **Railway/Render** for backend deployment

## 📁 Project Structure

```
kailash-mansarovar/
├── client/                           # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/              # Reusable common components
│   │   │   ├── menu/                # Menu-related components
│   │   │   ├── cart/                # Shopping cart components
│   │   │   ├── auth/                # Authentication components
│   │   │   └── dashboard/           # Dashboard components
│   │   ├── pages/
│   │   │   ├── customer/            # Customer pages
│   │   │   ├── admin/               # Admin dashboard pages
│   │   │   ├── staff/               # Staff portal pages
│   │   │   └── auth/                # Auth pages
│   │   ├── layouts/                 # Layout wrappers
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── stores/                  # Zustand state stores
│   │   ├── services/                # API and Socket.IO services
│   │   ├── utils/                   # Utility functions
│   │   ├── types/                   # TypeScript interfaces
│   │   ├── styles/                  # Global styles
│   │   ├── assets/                  # Images, icons, fonts
│   │   └── App.tsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── postcss.config.cjs
│   ├── .env.example
│   └── package.json
│
├── server/                           # Node.js + Express Backend
│   ├── src/
│   │   ├── controllers/             # Request handlers
│   │   ├── routes/                  # API routes
│   │   ├── middleware/              # Custom middleware
│   │   ├── services/                # Business logic
│   │   ├── validators/              # Zod validation schemas
│   │   ├── types/                   # TypeScript interfaces
│   │   ├── utils/                   # Utility functions
│   │   ├── config/                  # Configuration
│   │   ├── socket/                  # Socket.IO handlers
│   │   ├── constants/               # App constants
│   │   └── index.ts
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema
│   │   └── migrations/              # DB migrations
│   ├── .env.example
│   ├── tsconfig.json
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── shared/                           # Shared types and constants
│   ├── types/
│   │   ├── user.ts
│   │   ├── menu.ts
│   │   ├── order.ts
│   │   └── common.ts
│   ├── constants/
│   │   └── index.ts
│   └── validators/
│
├── docker-compose.yml
├── .gitignore
├── .env.example
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- PostgreSQL >= 14
- npm or yarn
- Git

### Installation & Setup

#### 1. Clone Repository
```bash
git clone https://github.com/Code-ops687/kailash-mansarovar.git
cd kailash-mansarovar
```

#### 2. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure .env with your database URL
# POSTGRES_URL=postgresql://user:password@localhost:5432/kailash_db

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npm run seed

# Start development server
npm run dev
```

Server runs on: `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd client

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:5173`

#### 4. Access the Application
- **Customer Portal:** http://localhost:5173
- **Admin Dashboard:** http://localhost:5173/admin
- **Staff Portal:** http://localhost:5173/staff
- **API Docs:** http://localhost:5000/api-docs

## 🔐 Authentication & Roles

### User Roles
1. **Customer** - Browse menu, place orders, track orders
2. **Admin** - Full system access, analytics, settings
3. **Manager** - Staff management, sales reports, inventory
4. **Kitchen Staff** - Order preparation and management
5. **Cashier** - Payment processing and billing
6. **Waiter** - Table and order management

### JWT Token Flow
- Login returns access token (15 min) and refresh token (7 days)
- Tokens stored in httpOnly cookies
- Automatic token refresh on expiry
- Role-based middleware for route protection

## 📡 Real-time Features (Socket.IO)

```typescript
// Events
socket.on('order:created')        // New order notification
socket.on('order:status')         // Order status update
socket.on('kitchen:update')       // Kitchen progress
socket.on('notification')         // Real-time notifications
socket.emit('order:accept')       // Accept order
socket.emit('order:reject')       // Reject order
```

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/register         - Register customer
POST   /api/auth/login            - Login
POST   /api/auth/logout           - Logout
POST   /api/auth/refresh          - Refresh token
GET    /api/auth/me               - Get current user
```

### Menu Management
```
GET    /api/menu/items            - Get all menu items
GET    /api/menu/items/:id        - Get item details
GET    /api/menu/categories       - Get all categories
POST   /api/menu/search           - Search items
GET    /api/menu/items/filter     - Filter items
```

### Orders
```
POST   /api/orders                - Create order
GET    /api/orders                - Get user orders
GET    /api/orders/:id            - Get order details
PUT    /api/orders/:id            - Update order
DELETE /api/orders/:id            - Cancel order
```

### Admin APIs
```
GET    /api/admin/dashboard       - Dashboard stats
GET    /api/admin/menu            - Menu management
POST   /api/admin/menu            - Add menu item
PUT    /api/admin/menu/:id        - Update menu item
DELETE /api/admin/menu/:id        - Delete menu item
GET    /api/admin/staff           - Staff management
GET    /api/admin/orders          - All orders
GET    /api/admin/reports         - Reports and analytics
```

## 🎨 Design System

### Color Palette
- **Primary:** Gold (#D4AF37)
- **Secondary:** Black (#000000)
- **Accent:** White (#FFFFFF)
- **Background:** Off-white (#F5F5F5)
- **Text:** Dark Gray (#333333)

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔒 Security Features

- ✅ JWT authentication with secure tokens
- ✅ Role-based access control (RBAC)
- ✅ Input validation with Zod schemas
- ✅ SQL injection prevention (Prisma ORM)
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Bcrypt password hashing
- ✅ Environment variable protection
- ✅ HTTPS ready
- ✅ XSS protection
- ✅ CSRF protection

## 📊 Database Schema

Core models:
- **User** - Customer, Admin, Staff accounts
- **Restaurant** - Restaurant details
- **Table** - Dining tables with QR codes
- **Category** - Food categories
- **MenuItem** - Menu items with details
- **Order** - Customer orders
- **OrderItem** - Individual items in orders
- **Payment** - Payment transactions
- **Review** - Customer reviews
- **Inventory** - Stock management
- **Coupon** - Discount coupons
- **Offer** - Special offers
- **Notification** - User notifications

## 🧪 Testing

```bash
# Backend unit tests
cd server
npm run test

# Backend integration tests
npm run test:integration

# Frontend component tests
cd client
npm run test

# E2E tests
npm run test:e2e

# All tests with coverage
npm run test:coverage
```

## 📦 Building for Production

### Frontend Build
```bash
cd client
npm run build          # Creates dist/ folder
npm run preview        # Preview production build
```

### Backend Build
```bash
cd server
npm run build
npm start
```

### Docker Build
```bash
docker-compose up -d   # Start all services
docker-compose down    # Stop all services
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Push to main branch for auto-deployment
vercel deploy
```

### Backend (Railway/Render)
```bash
# Set environment variables in dashboard
# Connect GitHub repository
# Auto-deploy on push
```

### Environment Variables

**Backend (.env):**
```
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
NODE_ENV=production
PORT=5000
```

**Frontend (.env):**
```
VITE_API_URL=https://api.example.com
VITE_SOCKET_URL=https://api.example.com
```

## 📝 Code Style & Conventions

- **TypeScript** for all files
- **ESLint** for linting
- **Prettier** for formatting
- **Husky** for git hooks
- **Conventional Commits** for commit messages

## 📄 License

MIT License - See LICENSE file for details

## 👥 Support & Contribution

- 📧 Email: support@kailashmansarovar.com
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

## 🏆 Built With ❤️ for Kailash Mansarovar Restaurant

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Status:** In Development
