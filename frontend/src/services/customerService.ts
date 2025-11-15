import api from './api';
import { Customer } from '../types';

export const customerService = {
  getCustomers: async (): Promise<Customer[]> => {
    const response = await api.get<Customer[]>('/api/customers');
    return response.data;
  },

  getCustomerById: async (id: number): Promise<Customer> => {
    const response = await api.get<Customer>(`/api/customers/${id}`);
    return response.data;
  },

  createCustomer: async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
    const response = await api.post<Customer>('/api/customers', customer);
    return response.data;
  },

  updateCustomer: async (id: number, customer: Partial<Customer>): Promise<Customer> => {
    const response = await api.put<Customer>(`/api/customers/${id}`, customer);
    return response.data;
  },

  deleteCustomer: async (id: number): Promise<void> => {
    await api.delete(`/api/customers/${id}`);
  },
};

