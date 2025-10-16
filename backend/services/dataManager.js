const azureBlobService = require('./azureBlobService');

class DataManager {
  constructor() {
    this.initialized = false;
    this.users = [];
    this.orders = [];
    this.products = [];
    
    // Initialize with default data
    this.defaultUsers = [
      { 
        _id: 'u1', 
        name: 'Admin User', 
        email: 'admin@rxshops.com', 
        role: 'admin', 
        createdAt: new Date().toISOString(),
        isActive: true
      },
      { 
        _id: 'u2', 
        name: 'Rahul Sharma', 
        email: 'rahul.sharma@example.com', 
        role: 'user', 
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        isActive: true,
        phone: '+91 9876543210',
        address: {
          street: '123 MG Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          postalCode: '400001',
          country: 'India'
        }
      },
      { 
        _id: 'u3', 
        name: 'Priya Verma', 
        email: 'priya.verma@example.com', 
        role: 'user', 
        createdAt: new Date(Date.now() - 2*86400000).toISOString(),
        isActive: true,
        phone: '+91 9876543211',
        address: {
          street: '456 Brigade Road',
          city: 'Bangalore',
          state: 'Karnataka',
          postalCode: '560001',
          country: 'India'
        }
      }
    ];

    this.defaultOrders = [
      { 
        _id: 'o1', 
        userId: 'u2', 
        total: 28999, 
        currency: 'INR', 
        status: 'Processing', 
        items: [
          {
            productId: '1',
            productName: 'Sony WH-1000XM4 Wireless Headphones',
            quantity: 1,
            price: 28999
          }
        ],
        placedAt: new Date(Date.now() - 3600000).toISOString(),
        shippingAddress: {
          name: 'Rahul Sharma',
          street: '123 MG Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          postalCode: '400001',
          country: 'India',
          phone: '+91 9876543210'
        }
      },
      { 
        _id: 'o2', 
        userId: 'u3', 
        total: 12499, 
        currency: 'INR', 
        status: 'Shipped', 
        items: [
          {
            productId: '4',
            productName: 'Nike Air Zoom Pegasus 40',
            quantity: 1,
            price: 9199
          },
          {
            productId: '2',
            productName: 'Premium Cotton T-Shirt',
            quantity: 1,
            price: 2099
          }
        ],
        placedAt: new Date(Date.now() - 3*3600000).toISOString(),
        shippingAddress: {
          name: 'Priya Verma',
          street: '456 Brigade Road',
          city: 'Bangalore',
          state: 'Karnataka',
          postalCode: '560001',
          country: 'India',
          phone: '+91 9876543211'
        }
      }
    ];
  }

  async initialize() {
    if (this.initialized) return;
    
    try {
      // Initialize Azure Blob container
      await azureBlobService.initializeContainer();
      
      // Load existing data from blob storage
      this.users = await azureBlobService.loadData('users', this.defaultUsers);
      this.orders = await azureBlobService.loadData('orders', this.defaultOrders);
      this.products = await azureBlobService.loadData('products', []);
      
      console.log('Data Manager initialized successfully');
      console.log(`Loaded ${this.users.length} users, ${this.orders.length} orders, ${this.products.length} products`);
      
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize Data Manager:', error);
    }
  }

  // User operations
  async getUsers() {
    await this.initialize();
    return this.users;
  }

  async addUser(userData) {
    await this.initialize();
    
    const newUser = {
      _id: this.generateId('u'),
      ...userData,
      createdAt: new Date().toISOString(),
      isActive: true
    };
    
    this.users.push(newUser);
    await this.saveUsers();
    return newUser;
  }

  async updateUser(userId, updateData) {
    await this.initialize();
    
    const userIndex = this.users.findIndex(u => u._id === userId);
    if (userIndex === -1) return null;
    
    this.users[userIndex] = { ...this.users[userIndex], ...updateData };
    await this.saveUsers();
    return this.users[userIndex];
  }

  async deleteUser(userId) {
    await this.initialize();
    
    const userIndex = this.users.findIndex(u => u._id === userId);
    if (userIndex === -1) return false;
    
    this.users.splice(userIndex, 1);
    await this.saveUsers();
    return true;
  }

  async saveUsers() {
    return await azureBlobService.saveData('users', this.users);
  }

  // Order operations
  async getOrders() {
    await this.initialize();
    
    // Enrich orders with user information
    return this.orders.map(order => ({
      ...order,
      user: this.users.find(u => u._id === order.userId) || null
    }));
  }

  async addOrder(orderData) {
    await this.initialize();
    
    const newOrder = {
      _id: this.generateId('o'),
      ...orderData,
      placedAt: new Date().toISOString(),
      status: orderData.status || 'Processing'
    };
    
    this.orders.push(newOrder);
    await this.saveOrders();
    return newOrder;
  }

  async updateOrderStatus(orderId, status) {
    await this.initialize();
    
    const orderIndex = this.orders.findIndex(o => o._id === orderId);
    if (orderIndex === -1) return null;
    
    this.orders[orderIndex].status = status;
    this.orders[orderIndex].statusUpdatedAt = new Date().toISOString();
    
    await this.saveOrders();
    return this.orders[orderIndex];
  }

  async saveOrders() {
    return await azureBlobService.saveData('orders', this.orders);
  }

  // Product operations
  async getProducts() {
    await this.initialize();
    return this.products;
  }

  async addProduct(productData) {
    await this.initialize();
    
    const newProduct = {
      _id: this.generateId('p'),
      ...productData,
      createdAt: new Date().toISOString(),
      isActive: true
    };
    
    this.products.push(newProduct);
    await this.saveProducts();
    return newProduct;
  }

  async updateProduct(productId, updateData) {
    await this.initialize();
    
    const productIndex = this.products.findIndex(p => p._id === productId);
    if (productIndex === -1) return null;
    
    this.products[productIndex] = { ...this.products[productIndex], ...updateData };
    await this.saveProducts();
    return this.products[productIndex];
  }

  async saveProducts() {
    return await azureBlobService.saveData('products', this.products);
  }

  // Stats operations
  async getStats() {
    await this.initialize();
    
    const totalUsers = this.users.length;
    const totalOrders = this.orders.length;
    const totalRevenue = this.orders.reduce((sum, order) => sum + order.total, 0);
    
    return {
      totalUsers,
      totalOrders,
      totalRevenue,
      lowStock: 5 // This would be calculated from products in a real scenario
    };
  }

  // Utility methods
  generateId(prefix = '') {
    return prefix + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  // Backup all data
  async backupData() {
    await this.initialize();
    
    const backup = {
      users: this.users,
      orders: this.orders,
      products: this.products,
      timestamp: new Date().toISOString()
    };
    
    const backupFileName = `backup-${Date.now()}`;
    return await azureBlobService.saveData(backupFileName, backup);
  }

  // Upload file (for product images, user avatars, etc.)
  async uploadFile(fileName, fileBuffer, contentType) {
    return await azureBlobService.uploadFile(fileName, fileBuffer, contentType);
  }
}

// Create and export singleton instance
const dataManager = new DataManager();
module.exports = dataManager;