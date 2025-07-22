# Poon Hill Travel Management System

A comprehensive travel management system built with **Next.js 14**, **NestJS**, **Prisma**, and **MySQL**. This system provides a complete solution for managing travel packages, destinations, activities, blogs, and bookings with a powerful admin panel.

## 🚀 **Features**

### **Frontend (Next.js 14)**
- 🏠 **Public Website**: Modern, responsive travel website
- 🔐 **Admin Panel**: Comprehensive management dashboard
- 📱 **Responsive Design**: Mobile-first approach
- 🎨 **Modern UI**: Built with Tailwind CSS and shadcn/ui
- ⚡ **Performance**: Server-side rendering and optimization

### **Backend (NestJS)**
- 🔌 **REST API**: Well-structured RESTful endpoints
- 🔒 **Authentication**: JWT-based auth with role management
- 📝 **Validation**: Comprehensive input validation
- 📊 **Database**: Prisma ORM with MySQL
- 📖 **Documentation**: Swagger/OpenAPI integration
- 🛡️ **Security**: Guards, pipes, and middleware

### **Core Modules**
- 🏞️ **Destinations**: Manage travel destinations
- 🎯 **Activities**: Adventure and tour activities
- 📦 **Packages**: Complete travel packages
- 📝 **Blogs**: Content management system
- ✍️ **Authors**: Blog author management
- ⭐ **Reviews**: Customer reviews and ratings
- 🎠 **Carousels**: Homepage sliders and banners
- 📋 **Bookings**: Reservation management
- ❓ **FAQ**: Frequently asked questions

## 🛠️ **Tech Stack**

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod
- **State Management**: React Context/Hooks
- **Rich Text Editor**: CKEditor 5

### **Backend**
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: class-validator
- **Documentation**: Swagger
- **File Upload**: Multer + Sharp

## 📁 **Project Structure**

```
poonhill/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── activities/      # Activities module
│   │   ├── auth/           # Authentication
│   │   ├── authors/        # Blog authors
│   │   ├── blogs/          # Blog management
│   │   ├── booking/        # Reservations
│   │   ├── carousels/      # Homepage sliders
│   │   ├── destinations/   # Travel destinations
│   │   ├── faq/           # FAQ management
│   │   ├── packages/      # Travel packages
│   │   ├── prisma/        # Database service
│   │   ├── reviews/       # Customer reviews
│   │   ├── seo/          # SEO management
│   │   ├── site-info/    # Site configuration
│   │   ├── upload/       # File uploads
│   │   └── utils/        # Shared utilities
│   ├── prisma/           # Database schema
│   └── uploads/          # File storage
├── frontend/             # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── (frontend)/  # Public pages
│   │   │   └── admin/       # Admin panel
│   │   ├── components/      # Reusable components
│   │   ├── constants/       # App constants
│   │   ├── lib/            # Utilities
│   │   └── utils/          # Helper functions
│   └── public/           # Static assets
└── README.md
```

## ⚙️ **Setup Instructions**

### **Prerequisites**
- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### **Backend Setup**

1. **Clone and Navigate**
   ```bash
   git clone <repository-url>
   cd poonhill/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/poonhill"
   JWT_SECRET="your-secret-key"
   CORS_ORIGIN="http://localhost:3000"
   PORT=8080
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed  # Optional: seed data
   ```

5. **Start Development Server**
   ```bash
   npm run start:dev
   ```

### **Frontend Setup**

1. **Navigate to Frontend**
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your `.env.local` file:
   ```env
   NEXT_PUBLIC_BASE_URL="http://localhost:8080"
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔗 **API Endpoints**

### **Authentication**
- `POST /api/auth` - User login
- `POST /api/auth/verify` - Verify OTP
- `POST /api/auth/create-admin` - Create admin user

### **Content Management**
- `GET|POST|PATCH|DELETE /api/activities` - Activities CRUD
- `GET|POST|PATCH|DELETE /api/destinations` - Destinations CRUD
- `GET|POST|PATCH|DELETE /api/packages` - Packages CRUD
- `GET|POST|PATCH|DELETE /api/blogs` - Blogs CRUD
- `GET|POST|PATCH|DELETE /api/authors` - Authors CRUD

### **Media & Files**
- `POST /api/upload` - File upload
- `DELETE /api/upload/:id` - Delete file

### **Public API**
- `GET /api/activities/nav-items` - Navigation data
- `GET /api/destinations/top` - Featured destinations
- `GET /api/reviews` - Customer reviews

## 🔐 **Authentication & Authorization**

### **User Roles**
- **ADMIN**: Full system access
- **AUTHOR**: Blog management access
- **USER**: Public user (bookings, reviews)

### **Protected Routes**
- Admin panel routes require authentication
- Write operations require appropriate roles
- File uploads require authentication

## 📊 **Database Schema**

Key entities and relationships:

- **Users**: Authentication and role management
- **Activities**: Adventure categories
- **Destinations**: Travel locations linked to activities
- **Packages**: Complete travel offerings
- **Blogs**: Content with author relationships
- **Authors**: Blog writers with profiles
- **Media**: File management for images
- **SEO**: Meta information for all content
- **Bookings**: Customer reservations

## 🎨 **Admin Panel Features**

### **Dashboard**
- Overview statistics
- Recent activities
- Quick actions

### **Content Management**
- **Dynamic Forms**: Reusable form components
- **Data Tables**: Sortable, searchable tables
- **Rich Text Editor**: CKEditor integration
- **Image Upload**: Drag & drop with preview
- **SEO Management**: Meta tags and schema

### **User Management**
- Author profiles
- Role assignments
- Activity tracking

## 🚀 **Development Guidelines**

### **Code Standards**
- **TypeScript**: Strict type checking
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Conventional Commits**: Commit message format

### **Backend Patterns**
- **Module Structure**: Feature-based organization
- **DTOs**: Input validation with class-validator
- **Guards**: Authentication and authorization
- **Interceptors**: Response formatting
- **Exception Filters**: Error handling

### **Frontend Patterns**
- **Component Structure**: Atomic design principles
- **Custom Hooks**: Reusable logic
- **Error Boundaries**: Error handling
- **Loading States**: User feedback
- **Form Validation**: Zod schemas

## 📝 **Available Scripts**

### **Backend**
```bash
npm run start:dev      # Development server
npm run build          # Production build
npm run start:prod     # Production server
npm run lint           # Code linting
npm run test           # Run tests
```

### **Frontend**
```bash
npm run dev           # Development server
npm run build         # Production build
npm run start         # Production server
npm run lint          # Code linting
npm run type-check    # TypeScript checking
```

## 🔧 **Environment Variables**

### **Backend (.env)**
```env
DATABASE_URL=          # MySQL connection string
JWT_SECRET=           # JWT signing secret
CORS_ORIGIN=          # Allowed origins
PORT=                 # Server port
```

### **Frontend (.env.local)**
```env
NEXT_PUBLIC_BASE_URL= # Backend API URL
```

## 📚 **API Documentation**

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8080/api-docs`
- **API JSON**: `http://localhost:8080/api-docs-json`

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Follow coding standards
4. Write tests for new features
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 **Support**

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API documentation

---

**Built with ❤️ for the travel industry** 