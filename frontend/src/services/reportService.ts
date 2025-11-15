import api from './api';
import { DailySalesReport, ExpenseSummary } from '../types';

export const reportService = {
  getSalesReports: async (): Promise<DailySalesReport[]> => {
    const response = await api.get<DailySalesReport[]>('/api/reports/sales');
    return response.data;
  },

  getExpenseReports: async (): Promise<ExpenseSummary[]> => {
    const response = await api.get<ExpenseSummary[]>('/api/reports/expenses');
    return response.data;
  },
};

