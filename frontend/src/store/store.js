import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import productSlice from './slices/productSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  products: productSlice,
});

const persistConfig = {
  key: 'rxshops-root',
  storage,
  whitelist: ['auth', 'cart'], // only persist auth and cart
  debug: process.env.NODE_ENV === 'development'
};

// Debug storage issues
if (process.env.NODE_ENV === 'development') {
  console.log('💾 Storage debug:', {
    host: window.location.hostname,
    storageAvailable: !!storage,
    persistConfig
  });
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
