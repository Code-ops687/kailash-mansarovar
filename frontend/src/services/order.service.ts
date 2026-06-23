import { apiClient } from '../lib/api-client';

export const createOrder = async (orderData: any) => {
  const response = await apiClient.post('/orders', orderData);
  return response.data.data;
};

export const getOrders = async (restaurantId?: string, status?: string) => {
  let url = '/orders';
  const params = new URLSearchParams();
  if (restaurantId) params.append('restaurantId', restaurantId);
  if (status) params.append('status', status);
  if (params.toString()) url += `?${params.toString()}`;
  
  const response = await apiClient.get(url);
  return response.data.data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const response = await apiClient.patch(`/orders/${id}/status`, { status });
  return response.data.data;
};
