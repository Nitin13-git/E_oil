'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getOrders } from '@/lib/api';
import Link from 'next/link';

interface OrderItem {
  product_id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
  created_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading, logout, isAdmin } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await getOrders();
        setOrders(res.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (authLoading) {
    return <div className="min-h-[80vh] flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="section-padding">
      <div className="container max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600 mt-1">Manage your account and view orders</p>
            </div>
            {isAdmin && (
              <Link href="/admin" className="btn-secondary">
                Admin Dashboard
              </Link>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[var(--color-muted)] rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Name</h3>
              <p className="text-gray-700">{user.name}</p>
            </div>
            <div className="bg-[var(--color-muted)] rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-700">{user.email}</p>
            </div>
            <div className="bg-[var(--color-muted)] rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Account Type</h3>
              <p className="text-gray-700 capitalize">{user.role}</p>
            </div>
          </div>

          <button onClick={handleLogout} className="mt-6 btn-secondary text-red-600 border-red-600 hover:bg-red-50">
            Logout
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>

          {loading ? (
            <p className="text-gray-600">Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You haven&apos;t placed any orders yet.</p>
              <Link href="/products" className="btn-primary">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-mono text-sm">{order.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="text-gray-900">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="font-bold text-lg">Total: Rs. {order.total.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
