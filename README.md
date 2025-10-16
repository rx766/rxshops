# RXshops E-commerce Platform

A full-stack e-commerce platform built with React.js, Node.js, Express, and MongoDB. Features include user authentication, product management, order tracking, payment integration, and comprehensive admin dashboard.

## 🚀 Features

### User Features
- **Authentication**: User registration, login, email verification, and password reset
- **Product Browsing**: Search, filter, and browse products by categories
- **Shopping Cart**: Add, remove, and modify cart items
- **Order Management**: Place orders, track shipments, and cancel orders
- **User Profile**: Manage personal information, addresses, and order history
- **Reviews**: Rate and review products
- **Wishlist**: Save favorite products for later

### Admin Features
- **Dashboard**: Overview of sales, orders, and inventory
- **Product Management**: Full CRUD operations for products
- **Order Management**: View, update, and track all orders
- **User Management**: Manage customer accounts and permissions
- **Stock Management**: Monitor inventory levels and low-stock alerts
- **Analytics**: Sales reports and performance metrics

### Technical Features
- **Responsive Design**: Mobile-first design with Material-UI
- **Real-time Updates**: Live order status and inventory updates
- **Payment Integration**: Stripe, PayPal, and Cash on Delivery
- **Image Upload**: Cloudinary integration for product images
- **Email Notifications**: Automated emails for orders and authentication
- **Security**: JWT authentication, password hashing, and rate limiting

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Redux Toolkit** - State management
- **Material-UI v5** - Component library
- **Axios** - HTTP client
- **React Query** - Server state management
- **Formik & Yup** - Form handling and validation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload
- **Nodemailer** - Email service

### Services & Tools
- **Cloudinary** - Image hosting and optimization
- **Stripe** - Payment processing
- **MongoDB Atlas** - Cloud database
- **Git** - Version control

## 📁 Project Structure

```
rxshops-ecom/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── config/          # Configuration files
│   ├── package.json
│   └── server.js        # Entry point
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   │   ├── common/  # Shared components
│   │   │   ├── user/    # User-specific components
│   │   │   └── admin/   # Admin-specific components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom hooks
│   │   ├── services/    # API services
│   │   ├── contexts/    # React contexts
│   │   └── utils/       # Utility functions
│   └── package.json
├── database/            # Database schemas and seeds
├── docs/               # Documentation
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rxshops-ecom.git
   cd rxshops-ecom
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   
   **Backend (.env)**
   ```bash
   cd ../backend
   cp .env.example .env
   # Edit .env file with your configuration
   ```

   **Frontend (.env)**
   ```bash
   cd ../frontend
   cp .env.example .env
   # Edit .env file with your configuration
   ```

5. **Database Setup**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in backend/.env

6. **Start the Applications**
   
   **Backend (Terminal 1)**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend (Terminal 2)**
   ```bash
   cd frontend
   npm start
   ```

7. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin Panel: http://localhost:3000/admin

### Default Admin Account
- **Email**: admin@rxshops.com
- **Password**: SecureAdminPassword123!

## 📝 API Documentation

### Authentication Endpoints
```
POST /api/v1/auth/register     # User registration
POST /api/v1/auth/login        # User login
POST /api/v1/auth/logout       # User logout
GET  /api/v1/auth/me           # Get current user
```

### Product Endpoints
```
GET    /api/v1/products        # Get all products
GET    /api/v1/products/:id    # Get single product
POST   /api/v1/products        # Create product (Admin)
PUT    /api/v1/products/:id    # Update product (Admin)
DELETE /api/v1/products/:id    # Delete product (Admin)
```

### Order Endpoints
```
GET    /api/v1/orders          # Get user orders
POST   /api/v1/orders          # Create order
GET    /api/v1/orders/:id      # Get single order
PUT    /api/v1/orders/:id      # Update order status (Admin)
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create Heroku app
2. Set environment variables
3. Deploy using Git

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the build folder

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Update connection string in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI team for the amazing component library
- MongoDB team for the excellent database
- Stripe team for seamless payment integration
- All contributors and testers

## 📞 Support

For support and questions:
- Email: support@rxshops.com
- GitHub Issues: [Create an Issue](https://github.com/yourusername/rxshops-ecom/issues)

## 🔄 Version History

- **v1.0.0** - Initial release with core e-commerce features
- **v1.1.0** - Added admin dashboard and inventory management
- **v1.2.0** - Implemented payment gateway integration

---

**RXshops** - Building the future of e-commerce 🛒