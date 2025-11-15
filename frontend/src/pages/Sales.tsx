import { useEffect, useState } from 'react';
import { operationService } from '../services/operationService';
import { Sale, SaleStatus } from '../types';
import { format } from 'date-fns';

const Sales = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    quantity: 1,
    price: 0,
    customerName: '',
    saleDate: new Date().toISOString().slice(0, 16),
    status: SaleStatus.COMPLETED,
  });

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const data = await operationService.getSales();
      setSales(data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await operationService.createSale({
        productName: formData.productName,
        quantity: formData.quantity,
        price: formData.price,
        customerName: formData.customerName,
        saleDate: new Date(formData.saleDate).toISOString(),
        status: formData.status,
      });
      setShowModal(false);
      setFormData({
        productName: '',
        quantity: 1,
        price: 0,
        customerName: '',
        saleDate: new Date().toISOString().slice(0, 16),
        status: SaleStatus.COMPLETED,
      });
      fetchSales();
    } catch (error) {
      console.error('Error creating sale:', error);
      alert('Satış yaradılmadı');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu satışı silmək istədiyinizə əminsiniz?')) {
      return;
    }
    try {
      await operationService.deleteSale(id);
      fetchSales();
    } catch (error) {
      console.error('Error deleting sale:', error);
      alert('Satış silinmədi');
    }
  };

  const getStatusColor = (status: SaleStatus) => {
    switch (status) {
      case SaleStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case SaleStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case SaleStatus.CANCELED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: SaleStatus) => {
    switch (status) {
      case SaleStatus.COMPLETED:
        return 'Tamamlandı';
      case SaleStatus.PENDING:
        return 'Gözləyir';
      case SaleStatus.CANCELED:
        return 'Ləğv edildi';
      default:
        return status;
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

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Satışlar</h1>
          <p className="mt-2 text-sm text-gray-600">Satış siyahısı və idarəetmə</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          + Yeni Satış
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {sales.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">Satış yoxdur</li>
          ) : (
            sales.map((sale) => (
              <li key={sale.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{sale.productName}</h3>
                        <p className="text-sm text-gray-500">Müştəri: {sale.customerName}</p>
                      </div>
                      <span className={`ml-4 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(sale.status)}`}>
                        {getStatusText(sale.status)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-sm text-gray-600">Miqdar: {sale.quantity}</span>
                      <span className="text-sm text-gray-600">Qiymət: {sale.price.toFixed(2)} ₼</span>
                      <span className="text-sm font-medium text-gray-900">
                        Ümumi: {(sale.price * sale.quantity).toFixed(2)} ₼
                      </span>
                      <span className="text-sm text-gray-500">{formatDate(sale.saleDate)}</span>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDelete(sale.id)}
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Yeni Satış</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Məhsul adı</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.productName}
                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Müştəri adı</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Miqdar</label>
                        <input
                          type="number"
                          required
                          min="1"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Qiymət</label>
                        <input
                          type="number"
                          required
                          min="0"
                          step="0.01"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tarix</label>
                      <input
                        type="datetime-local"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.saleDate}
                        onChange={(e) => setFormData({ ...formData, saleDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as SaleStatus })}
                      >
                        <option value={SaleStatus.COMPLETED}>Tamamlandı</option>
                        <option value={SaleStatus.PENDING}>Gözləyir</option>
                        <option value={SaleStatus.CANCELED}>Ləğv edildi</option>
                      </select>
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

export default Sales;


