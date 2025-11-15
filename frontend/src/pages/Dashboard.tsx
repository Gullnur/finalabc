import { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import { customerService } from '../services/customerService';
import { operationService } from '../services/operationService';
import { reportService } from '../services/reportService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalSales: 0,
    totalExpenses: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, customers, sales, expenses, salesReports] = await Promise.all([
          productService.getProducts(),
          customerService.getCustomers(),
          operationService.getSales(),
          operationService.getExpenses(),
          reportService.getSalesReports(),
        ]);

        const totalSalesAmount = sales
          .filter((s) => s.status === 'COMPLETED')
          .reduce((sum, sale) => sum + sale.price * sale.quantity, 0);

        const totalExpensesAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

        setStats({
          totalProducts: products.length,
          totalCustomers: customers.length,
          totalSales: sales.length,
          totalExpenses: expenses.length,
          totalRevenue: totalSalesAmount - totalExpensesAmount,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Yüklənir...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="mt-2 text-lg text-gray-600">Ümumi statistikalar və performans göstəriciləri</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden shadow-xl rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">Məhsullar</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.totalProducts}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">📦</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 overflow-hidden shadow-xl rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium uppercase tracking-wide">Müştərilər</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.totalCustomers}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">👥</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 overflow-hidden shadow-xl rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium uppercase tracking-wide">Satışlar</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.totalSales}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-rose-600 overflow-hidden shadow-xl rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium uppercase tracking-wide">Xərclər</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.totalExpenses}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">💸</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`bg-gradient-to-br ${stats.totalRevenue >= 0 ? 'from-emerald-500 to-teal-600' : 'from-orange-500 to-red-600'} overflow-hidden shadow-xl rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`${stats.totalRevenue >= 0 ? 'text-emerald-100' : 'text-orange-100'} text-sm font-medium uppercase tracking-wide`}>
                  Gəlir
                </p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {stats.totalRevenue >= 0 ? '+' : ''}{stats.totalRevenue.toFixed(2)} ₼
                </p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">📊</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

