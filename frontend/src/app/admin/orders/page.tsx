'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getAllOrders, updateOrderStatus } from '@/lib/api';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  user_id: string;
  user_name?: string;
  user_email?: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  status: string;
  shipping_address: {
    full_name: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    phone: string;
  };
  created_at: string;
}

export default function AdminOrders() {
  const router = useRouter();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push('/');
    }
  }, [user, authLoading, isAdmin, router]);

  const fetchOrders = async () => {
    try {
      const params: Record<string, unknown> = {};
      if (statusFilter) params.status = statusFilter;
      const res = await getAllOrders(params);
      setOrders(res.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && isAdmin) {
      fetchOrders();
    }
  }, [user, isAdmin, statusFilter]);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success('Order status updated!');
      fetchOrders();
      setSelectedOrder(null);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (authLoading || loading) {
    return <div className="min-h-[80vh] flex items-center justify-center">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container">
        <div className="mb-8">
          <Link href="/admin" className="text-[var(--color-primary)] hover:underline mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Manage Orders</h1>
        </div>

        <div className="mb-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Order ID</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Customer</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Total</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Date</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6 font-mono text-sm">{order.id.slice(0, 8)}...</td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium">{order.user_name || 'N/A'}</p>
                      <p className="text-sm text-gray-500">{order.user_email || ''}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">Rs. {order.total.toFixed(2)}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Order Details</h2>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Order ID</p>
                    <p className="font-mono">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Date</p>
                    <p>{new Date(selectedOrder.created_at).toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 text-sm mb-2">Items</p>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 font-bold flex justify-between">
                      <span>Total</span>
                      <span>Rs. {selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 text-sm mb-2">Shipping Address</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium">{selectedOrder.shipping_address.full_name}</p>
                    <p>{selectedOrder.shipping_address.address}</p>
                    <p>{selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state} {selectedOrder.shipping_address.postal_code}</p>
                    <p>Phone: {selectedOrder.shipping_address.phone}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 text-sm mb-2">Update Status</p>
                  <div className="flex gap-2 flex-wrap">
                    {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(selectedOrder.id, status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          selectedOrder.status === status
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
