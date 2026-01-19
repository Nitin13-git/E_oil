import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined' && error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const register = (data: { email: string; password: string; name: string }) =>
  api.post('/api/auth/register', data);

export const login = (email: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);
  return api.post('/api/auth/login', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};

export const getMe = () => api.get('/api/auth/me');

// Products
export const getProducts = (params?: Record<string, unknown>) =>
  api.get('/api/products', { params });

export const getProduct = (id: string) => api.get(`/api/products/${id}`);

export const getCategories = () => api.get('/api/products/categories');

export const createProduct = (data: Record<string, unknown>) =>
  api.post('/api/products', data);

export const updateProduct = (id: string, data: Record<string, unknown>) =>
  api.put(`/api/products/${id}`, data);

export const deleteProduct = (id: string) => api.delete(`/api/products/${id}`);

export const compareProducts = (ids: string[]) =>
  api.post('/api/products/compare', ids);

// Cart
export const getCart = () => api.get('/api/cart');

export const addToCart = (productId: string, quantity = 1) =>
  api.post(`/api/cart/add?product_id=${productId}&quantity=${quantity}`);

export const updateCartItem = (productId: string, quantity: number) =>
  api.put(`/api/cart/update?product_id=${productId}&quantity=${quantity}`);

export const removeFromCart = (productId: string) =>
  api.delete(`/api/cart/remove/${productId}`);

export const clearCart = () => api.delete('/api/cart/clear');

// Orders
export const createOrder = (data: Record<string, unknown>) =>
  api.post('/api/orders', data);

export const getOrders = () => api.get('/api/orders');

export const getOrder = (id: string) => api.get(`/api/orders/${id}`);

export const updateOrderStatus = (id: string, status: string) =>
  api.put(`/api/orders/${id}/status`, { status });

// Admin
export const getAdminStats = () => api.get('/api/admin/stats');

export const getAllOrders = (params?: Record<string, unknown>) =>
  api.get('/api/admin/orders', { params });

export const getAllUsers = (params?: Record<string, unknown>) =>
  api.get('/api/admin/users', { params });

export const updateUserRole = (id: string, role: string) =>
  api.put(`/api/admin/users/${id}/role?role=${role}`);

export const deleteUser = (id: string) => api.delete(`/api/admin/users/${id}`);

// Contact
export const submitContact = (data: { name: string; email: string; message: string }) =>
  api.post('/api/contact', data);

export const getContacts = (params?: Record<string, unknown>) =>
  api.get('/api/contact', { params });

export const deleteContact = (id: string) => api.delete(`/api/contact/${id}`);

export default api;
