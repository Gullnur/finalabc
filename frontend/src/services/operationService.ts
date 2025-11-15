import api from './api';
import { Sale, Expense } from '../types';

export const operationService = {
  getSales: async (): Promise<Sale[]> => {
    const response = await api.get<Sale[]>('/api/operations/api/sales');
    return response.data;
  },

  createSale: async (sale: Omit<Sale, 'id'>): Promise<Sale> => {
    const response = await api.post<Sale>('/api/operations/api/sales', sale);
    return response.data;
  },

  deleteSale: async (id: number): Promise<void> => {
    await api.delete(`/api/operations/api/sales/${id}`);
  },

  getExpenses: async (): Promise<Expense[]> => {
    const response = await api.get<Expense[]>('/api/operations/api/expenses');
    return response.data;
  },

  createExpense: async (expense: Omit<Expense, 'id'>): Promise<Expense> => {
    const response = await api.post<Expense>('/api/operations/api/expenses', expense);
    return response.data;
  },

  deleteExpense: async (id: number): Promise<void> => {
    await api.delete(`/api/operations/api/expenses/${id}`);
  },
};

