import { apiClient } from '../lib/api-client';

export const getCategories = async () => {
  const response = await apiClient.get('/categories');
  return response.data.data;
};

export const getMenuItems = async (categoryId?: string) => {
  const url = categoryId ? `/menu?categoryId=${categoryId}` : '/menu';
  const response = await apiClient.get(url);
  return response.data.data;
};
