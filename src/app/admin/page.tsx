'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getAdminStats } from '@/lib/api';

interface Stats {
  total_users: number;
  total_products: number;
  total_orders: number;
  pending_orders: number;
  total_revenue: number;
  recent_orders: Array<{
    id: string;
    total: number;
    status: string;
    created_at: string;
  }>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push('/');
    }
  }, [user, authLoading, isAdmin, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAdminStats();
        setStats(res.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && isAdmin) {
      fetchStats();
    }
  }, [user, isAdmin]);

  if (authLoading || loading) {
    return <div className="min-h-[80vh] flex items-center justify-center">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.total_users || 0}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-600 text-sm">Total Products</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.total_products || 0}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-600 text-sm">Total Orders</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.total_orders || 0}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-[var(--color-primary)] mt-2">
              Rs. {stats?.total_revenue?.toFixed(2) || '0.00'}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/admin/products" className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="font-bold text-lg text-gray-900">Manage Products</h3>
            <p className="text-gray-600 text-sm mt-1">Add, edit, or remove products</p>
          </Link>
          <Link href="/admin/orders" className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-4">🛒</div>
            <h3 className="font-bold text-lg text-gray-900">Manage Orders</h3>
            <p className="text-gray-600 text-sm mt-1">
              {stats?.pending_orders || 0} pending orders
            </p>
          </Link>
          <Link href="/admin/users" className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="font-bold text-lg text-gray-900">Manage Users</h3>
            <p className="text-gray-600 text-sm mt-1">View and manage user accounts</p>
          </Link>
          <Link href="/admin/contacts" className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="font-bold text-lg text-gray-900">Contact Messages</h3>
            <p className="text-gray-600 text-sm mt-1">View customer inquiries</p>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
          {stats?.recent_orders && stats.recent_orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Order ID</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Total</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent_orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">{order.id.slice(0, 8)}...</td>
                      <td className="py-3 px-4">Rs. {order.total.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No recent orders</p>
          )}
        </div>
      </div>
    </div>
  );
}
