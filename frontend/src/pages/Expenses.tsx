import { useEffect, useState } from 'react';
import { operationService } from '../services/operationService';
import { Expense, ExpenseCategory } from '../types';
import { format } from 'date-fns';

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: 0,
    category: ExpenseCategory.OTHER,
    expenseDate: new Date().toISOString().slice(0, 16),
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await operationService.getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await operationService.createExpense({
        description: formData.description,
        amount: formData.amount,
        category: formData.category,
        expenseDate: new Date(formData.expenseDate).toISOString(),
      });
      setShowModal(false);
      setFormData({
        description: '',
        amount: 0,
        category: ExpenseCategory.OTHER,
        expenseDate: new Date().toISOString().slice(0, 16),
      });
      fetchExpenses();
    } catch (error) {
      console.error('Error creating expense:', error);
      alert('Xərc yaradılmadı');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu xərci silmək istədiyinizə əminsiniz?')) {
      return;
    }
    try {
      await operationService.deleteExpense(id);
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Xərc silinmədi');
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
      return format(new Date(dateString), 'dd.MM.yyyy HH:mm');
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

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Xərclər</h1>
          <p className="mt-2 text-sm text-gray-600">Xərc siyahısı və idarəetmə</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          + Yeni Xərc
        </button>
      </div>

      <div className="mb-4 bg-white shadow rounded-lg p-4">
        <div className="text-lg font-medium text-gray-900">
          Ümumi Xərclər: <span className="text-red-600">{totalExpenses.toFixed(2)} ₼</span>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {expenses.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">Xərc yoxdur</li>
          ) : (
            expenses.map((expense) => (
              <li key={expense.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{expense.description}</h3>
                        <p className="text-sm text-gray-500">{getCategoryText(expense.category)}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-sm font-medium text-red-600">
                        Məbləğ: {expense.amount.toFixed(2)} ₼
                      </span>
                      <span className="text-sm text-gray-500">{formatDate(expense.expenseDate)}</span>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Yeni Xərc</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Təsvir</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Kateqoriya</label>
                      <select
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as ExpenseCategory })}
                      >
                        <option value={ExpenseCategory.SALARY}>Maaş</option>
                        <option value={ExpenseCategory.RENT}>İcarə</option>
                        <option value={ExpenseCategory.SUPPLIES}>Təchizat</option>
                        <option value={ExpenseCategory.UTILITIES}>Kommunal</option>
                        <option value={ExpenseCategory.MARKETING}>Marketinq</option>
                        <option value={ExpenseCategory.OTHER}>Digər</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Məbləğ</label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tarix</label>
                      <input
                        type="datetime-local"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.expenseDate}
                        onChange={(e) => setFormData({ ...formData, expenseDate: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Yadda saxla
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Ləğv et
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;


