// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface VerifyRequest {
  email: string;
  code: string;
}

// Product types
export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  category: Category;
}

// Customer types
export enum CustomerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING'
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  status: CustomerStatus;
}

// Sale types
export enum SaleStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  CANCELED = 'CANCELED'
}

export interface Sale {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  customerName: string;
  saleDate: string;
  status: SaleStatus;
}

// Expense types
export enum ExpenseCategory {
  SALARY = 'SALARY',
  RENT = 'RENT',
  SUPPLIES = 'SUPPLIES',
  UTILITIES = 'UTILITIES',
  MARKETING = 'MARKETING',
  OTHER = 'OTHER'
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: ExpenseCategory;
  expenseDate: string;
}

// Report types
export interface DailySalesReport {
  id: number;
  date: string;
  totalSales: number;
  totalQuantity: number;
}

export interface ExpenseSummary {
  id: number;
  category: ExpenseCategory;
  totalAmount: number;
  count: number;
}

