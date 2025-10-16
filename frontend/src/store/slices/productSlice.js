import { createSlice } from '@reduxjs/toolkit';

// Mock products data with real images
const mockProducts = [
  {
    _id: '1',
    name: 'Sony WH-1000XM4 Wireless Headphones',
    description: 'Industry-leading noise canceling headphones with 30-hour battery life, quick charge, and premium sound quality',
    price: 349.99,
    discountPrice: 299.99,
    category: 'electronics',
    subCategory: 'audio',
    brand: 'Sony',
    images: [
      { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center', public_id: '1' }
    ],
    stock: 45,
    sku: 'SONY001',
    ratings: { average: 4.8, count: 2847 },
    colors: [{ name: 'Black', hexCode: '#000000' }, { name: 'Silver', hexCode: '#c0c0c0' }],
    sizes: ['One Size'],
    tags: ['wireless', 'bluetooth', 'noise-cancelling', 'premium'],
    isActive: true,
    isFeatured: true
  },
  {
    _id: '2',
    name: 'Premium Cotton T-Shirt',
    description: 'Ultra-soft 100% organic cotton t-shirt with modern fit. Perfect for casual wear and layering',
    price: 34.99,
    discountPrice: 24.99,
    category: 'clothing',
    subCategory: 'shirts',
    brand: 'EcoWear',
    images: [
      { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center', public_id: '2' }
    ],
    stock: 150,
    sku: 'ECO001',
    ratings: { average: 4.5, count: 1245 },
    colors: [
      { name: 'Navy', hexCode: '#1a237e' },
      { name: 'White', hexCode: '#ffffff' },
      { name: 'Charcoal', hexCode: '#424242' },
      { name: 'Forest Green', hexCode: '#2e7d32' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    tags: ['organic', 'cotton', 'casual', 'sustainable'],
    isActive: true,
    isFeatured: true
  },
  {
    _id: '3',
    name: 'iPhone 15 Pro Clear Case',
    description: 'Crystal clear protection with MagSafe compatibility. Drop tested and scratch resistant',
    price: 29.99,
    discountPrice: 19.99,
    category: 'electronics',
    subCategory: 'accessories',
    brand: 'ClearGuard',
    images: [
      { url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop&crop=center', public_id: '3' }
    ],
    stock: 300,
    sku: 'CASE001',
    ratings: { average: 4.3, count: 892 },
    colors: [
      { name: 'Clear', hexCode: 'transparent' },
      { name: 'Smoke', hexCode: '#424242' }
    ],
    sizes: ['One Size'],
    tags: ['protective', 'magsafe', 'clear', 'iphone'],
    isActive: true,
    isFeatured: true
  },
  {
    _id: '4',
    name: 'Nike Air Zoom Pegasus 40',
    description: 'Responsive cushioning and smooth ride for everyday running. Engineered mesh upper for breathability',
    price: 139.99,
    discountPrice: 109.99,
    category: 'sports',
    subCategory: 'footwear',
    brand: 'Nike',
    images: [
      { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center', public_id: '4' }
    ],
    stock: 85,
    sku: 'NIKE001',
    ratings: { average: 4.7, count: 3456 },
    colors: [
      { name: 'Black/White', hexCode: '#000000' },
      { name: 'Blue/Orange', hexCode: '#1976d2' },
      { name: 'Grey/Pink', hexCode: '#757575' }
    ],
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    tags: ['running', 'nike', 'pegasus', 'athletic'],
    isActive: true,
    isFeatured: true
  },
  {
    _id: '5',
    name: 'MacBook Air M2 Laptop',
    description: '13.6-inch Liquid Retina display, Apple M2 chip, 8GB RAM, 256GB SSD. Incredibly portable and powerful',
    price: 1199.99,
    discountPrice: 999.99,
    category: 'electronics',
    subCategory: 'computers',
    brand: 'Apple',
    images: [
      { url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center', public_id: '5' }
    ],
    stock: 25,
    sku: 'APPLE001',
    ratings: { average: 4.9, count: 1876 },
    colors: [
      { name: 'Space Grey', hexCode: '#4a4a4a' },
      { name: 'Silver', hexCode: '#c0c0c0' },
      { name: 'Gold', hexCode: '#ffd700' },
      { name: 'Midnight', hexCode: '#191970' }
    ],
    sizes: ['One Size'],
    tags: ['laptop', 'apple', 'm2', 'portable', 'premium'],
    isActive: true,
    isFeatured: true
  },
  {
    _id: '6',
    name: 'Levi\'s 501 Original Jeans',
    description: 'The original straight fit jean. Made with premium denim and classic 5-pocket styling',
    price: 89.99,
    discountPrice: 69.99,
    category: 'clothing',
    subCategory: 'jeans',
    brand: 'Levi\'s',
    images: [
      { url: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=400&fit=crop&crop=center', public_id: '6' }
    ],
    stock: 200,
    sku: 'LEVI001',
    ratings: { average: 4.6, count: 5432 },
    colors: [
      { name: 'Dark Wash', hexCode: '#1a237e' },
      { name: 'Light Wash', hexCode: '#81c784' },
      { name: 'Black', hexCode: '#000000' }
    ],
    sizes: ['28', '29', '30', '31', '32', '33', '34', '36', '38', '40'],
    tags: ['denim', 'jeans', 'classic', 'straight-fit'],
    isActive: true,
    isFeatured: false
  },
  {
    _id: '7',
    name: 'KitchenAid Stand Mixer',
    description: 'Professional 5-quart stand mixer with 10 speeds and multiple attachments. Perfect for baking enthusiasts',
    price: 429.99,
    discountPrice: 349.99,
    category: 'home-garden',
    subCategory: 'kitchen',
    brand: 'KitchenAid',
    images: [
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center', public_id: '7' }
    ],
    stock: 35,
    sku: 'KITCHEN001',
    ratings: { average: 4.8, count: 987 },
    colors: [
      { name: 'Red', hexCode: '#d32f2f' },
      { name: 'White', hexCode: '#ffffff' },
      { name: 'Silver', hexCode: '#c0c0c0' }
    ],
    sizes: ['One Size'],
    tags: ['kitchen', 'mixer', 'baking', 'appliance'],
    isActive: true,
    isFeatured: false
  },
  {
    _id: '8',
    name: 'Ray-Ban Aviator Sunglasses',
    description: 'Classic aviator sunglasses with UV protection and polarized lenses. Timeless style meets modern technology',
    price: 154.99,
    discountPrice: 129.99,
    category: 'beauty',
    subCategory: 'accessories',
    brand: 'Ray-Ban',
    images: [
      { url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center', public_id: '8' }
    ],
    stock: 120,
    sku: 'RAYBAN001',
    ratings: { average: 4.7, count: 2341 },
    colors: [
      { name: 'Gold/Green', hexCode: '#ffd700' },
      { name: 'Silver/Grey', hexCode: '#c0c0c0' },
      { name: 'Black/Black', hexCode: '#000000' }
    ],
    sizes: ['One Size'],
    tags: ['sunglasses', 'aviator', 'uv-protection', 'classic'],
    isActive: true,
    isFeatured: false
  },
  {
    _id: '9',
    name: 'Adidas Ultraboost 22 Running Shoes',
    description: 'Energy-returning cushioning and adaptive fit. Made with recycled materials for sustainable performance',
    price: 189.99,
    discountPrice: 149.99,
    category: 'sports',
    subCategory: 'footwear',
    brand: 'Adidas',
    images: [
      { url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop&crop=center', public_id: '9' }
    ],
    stock: 90,
    sku: 'ADIDAS001',
    ratings: { average: 4.6, count: 1876 },
    colors: [
      { name: 'Core Black', hexCode: '#000000' },
      { name: 'Cloud White', hexCode: '#ffffff' },
      { name: 'Solar Red', hexCode: '#f44336' }
    ],
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    tags: ['running', 'adidas', 'ultraboost', 'sustainable'],
    isActive: true,
    isFeatured: false
  },
  {
    _id: '10',
    name: 'Instant Pot Duo 7-in-1',
    description: 'Multi-functional electric pressure cooker. Pressure cook, slow cook, rice cooker, steamer, and more',
    price: 99.99,
    discountPrice: 79.99,
    category: 'home-garden',
    subCategory: 'kitchen',
    brand: 'Instant Pot',
    images: [
      { url: 'https://images.unsplash.com/photo-1556909114-4f5acfd22c1c?w=400&h=400&fit=crop&crop=center', public_id: '10' }
    ],
    stock: 150,
    sku: 'INSTANT001',
    ratings: { average: 4.5, count: 8765 },
    colors: [
      { name: 'Stainless Steel', hexCode: '#c0c0c0' }
    ],
    sizes: ['6 Qt', '8 Qt'],
    tags: ['pressure-cooker', 'kitchen', 'multi-function', 'cooking'],
    isActive: true,
    isFeatured: false
  },
  {
    _id: '11',
    name: 'The North Face Fleece Jacket',
    description: 'Warm and comfortable fleece jacket perfect for outdoor activities. Wind-resistant and breathable',
    price: 149.99,
    discountPrice: 119.99,
    category: 'clothing',
    subCategory: 'outerwear',
    brand: 'The North Face',
    images: [
      { url: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop&crop=center', public_id: '11' }
    ],
    stock: 75,
    sku: 'TNF001',
    ratings: { average: 4.4, count: 654 },
    colors: [
      { name: 'Navy', hexCode: '#1a237e' },
      { name: 'Black', hexCode: '#000000' },
      { name: 'Grey', hexCode: '#757575' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    tags: ['fleece', 'outdoor', 'jacket', 'warm'],
    isActive: true,
    isFeatured: false
  },
  {
    _id: '12',
    name: 'Samsung Galaxy Buds Pro',
    description: 'True wireless earbuds with intelligent active noise cancellation and 360 Audio technology',
    price: 199.99,
    discountPrice: 149.99,
    category: 'electronics',
    subCategory: 'audio',
    brand: 'Samsung',
    images: [
      { url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&crop=center', public_id: '12' }
    ],
    stock: 200,
    sku: 'SAMSUNG001',
    ratings: { average: 4.3, count: 1567 },
    colors: [
      { name: 'Phantom Black', hexCode: '#000000' },
      { name: 'Phantom Silver', hexCode: '#c0c0c0' },
      { name: 'Phantom Violet', hexCode: '#9c27b0' }
    ],
    sizes: ['One Size'],
    tags: ['wireless', 'earbuds', 'noise-cancelling', 'samsung'],
    isActive: true,
    isFeatured: true
  }
];

const initialState = {
  items: mockProducts,
  filteredItems: mockProducts,
  currentProduct: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    searchTerm: '',
  },
  sortBy: 'name',
  categories: ['electronics', 'clothing', 'sports', 'books', 'home-garden', 'beauty']
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProducts: (state, action) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      productSlice.caseReducers.applyFilters(state);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      productSlice.caseReducers.applySorting(state);
    },
    applyFilters: (state) => {
      let filtered = state.items;
      
      // Category filter
      if (state.filters.category) {
        filtered = filtered.filter(product => product.category === state.filters.category);
      }
      
      // Price range filter
      filtered = filtered.filter(product => {
        const price = product.discountPrice || product.price;
        return price >= state.filters.priceRange[0] && price <= state.filters.priceRange[1];
      });
      
      // Rating filter
      if (state.filters.rating > 0) {
        filtered = filtered.filter(product => product.ratings.average >= state.filters.rating);
      }
      
      // Search filter
      if (state.filters.searchTerm) {
        const searchLower = state.filters.searchTerm.toLowerCase();
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      state.filteredItems = filtered;
      productSlice.caseReducers.applySorting(state);
    },
    applySorting: (state) => {
      const sortedItems = [...state.filteredItems];
      
      switch (state.sortBy) {
        case 'price-low':
          sortedItems.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
          break;
        case 'price-high':
          sortedItems.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
          break;
        case 'rating':
          sortedItems.sort((a, b) => b.ratings.average - a.ratings.average);
          break;
        case 'name':
        default:
          sortedItems.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
      
      state.filteredItems = sortedItems;
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        priceRange: [0, 1000],
        rating: 0,
        searchTerm: '',
      };
      state.filteredItems = state.items;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setProducts,
  setCurrentProduct,
  setFilters,
  setSortBy,
  clearFilters,
  setError,
} = productSlice.actions;

export const selectProducts = (state) => state.products;
export const selectFilteredProducts = (state) => state.products.filteredItems;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectProductFilters = (state) => state.products.filters;
export const selectCategories = (state) => state.products.categories;

export default productSlice.reducer;