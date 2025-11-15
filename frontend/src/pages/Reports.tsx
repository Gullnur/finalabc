import { useEffect, useState } from 'react';
import { reportService } from '../services/reportService';
import { DailySalesReport, ExpenseSummary, ExpenseCategory } from '../types';
import { format } from 'date-fns';

const Reports = () => {
  const [salesReports, setSalesReports] = useState<DailySalesReport[]>([]);
  const [expenseReports, setExpenseReports] = useState<ExpenseSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'sales' | 'expenses'>('sales');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [salesData, expensesData] = await Promise.all([
        reportService.getSalesReports(),
        reportService.getExpenseReports(),
      ]);
      setSalesReports(salesData);
      setExpenseReports(expensesData);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryText = (category: ExpenseCategory) => {
    switch (category) {
      case ExpenseCategory.SALARY:
        return 'Maaş';
      case ExpenseCategory.RENT:
        return 'İcarə';
      case ExpenseCategory.SUPPLIES:
        return 'Təchizat';
      case ExpenseCategory.UTILITIES:
        return 'Kommunal';
      case ExpenseCategory.MARKETING:
        return 'Marketinq';
      case ExpenseCategory.OTHER:
        return 'Digər';
      default:
        return category;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd.MM.yyyy');
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Yüklənir...</div>
      </div>
    );
  }

  const totalSales = salesReports.reduce((sum, report) => sum + report.totalSales, 0);
  const totalExpenses = expenseReports.reduce((sum, report) => sum + report.totalAmount, 0);

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hesabatlar</h1>
        <p className="mt-2 text-sm text-gray-600">Satış və xərc hesabatları</p>
      </div>

      <div className="mb-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('sales')}
              className={`${
                activeTab === 'sales'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Satış Hesabatları
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`${
                activeTab === 'expenses'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Xərc Hesabatları
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'sales' && (
        <div>
          <div className="mb-4 bg-white shadow rounded-lg p-4">
            <div className="text-lg font-medium text-gray-900">
              Ümumi Satış: <span className="text-green-600">{totalSales.toFixed(2)} ₼</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Ümumi Miqdar: {salesReports.reduce((sum, report) => sum + report.totalQuantity, 0)}
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {salesReports.length === 0 ? (
                <li className="px-6 py-4 text-center text-gray-500">Hesabat yoxdur</li>
              ) : (
                salesReports.map((report) => (
                  <li key={report.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{formatDate(report.date)}</h3>
                        <p className="text-sm text-gray-500">Miqdar: {report.totalQuantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium text-green-600">
                          {report.totalSales.toFixed(2)} ₼
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'expenses' && (
        <div>
          <div className="mb-4 bg-white shadow rounded-lg p-4">
            <div className="text-lg font-medium text-gray-900">
              Ümumi Xərclər: <span className="text-red-600">{totalExpenses.toFixed(2)} ₼</span>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {expenseReports.length === 0 ? (
                <li className="px-6 py-4 text-center text-gray-500">Hesabat yoxdur</li>
              ) : (
                expenseReports.map((report) => (
                  <li key={report.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {getCategoryText(report.category)}
                        </h3>
                        <p className="text-sm text-gray-500">Say: {report.count}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium text-red-600">
                          {report.totalAmount.toFixed(2)} ₼
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;


