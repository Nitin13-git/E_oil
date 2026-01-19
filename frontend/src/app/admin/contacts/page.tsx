'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getContacts, deleteContact } from '@/lib/api';
import toast from 'react-hot-toast';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function AdminContacts() {
  const router = useRouter();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push('/');
    }
  }, [user, authLoading, isAdmin, router]);

  const fetchContacts = async () => {
    try {
      const res = await getContacts();
      setContacts(res.data.contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && isAdmin) {
      fetchContacts();
    }
  }, [user, isAdmin]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await deleteContact(id);
      toast.success('Message deleted!');
      fetchContacts();
      setSelectedContact(null);
    } catch {
      toast.error('Failed to delete message');
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
          <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
        </div>

        {contacts.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-gray-600">No contact messages yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-bold text-gray-900">{contact.name}</h3>
                      <span className="text-gray-500 text-sm">{contact.email}</span>
                    </div>
                    <p className="text-gray-600 line-clamp-2">{contact.message}</p>
                    <p className="text-gray-400 text-sm mt-2">
                      {new Date(contact.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedContact && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Message Details</h2>
                <button onClick={() => setSelectedContact(null)} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm">From</p>
                  <p className="font-medium">{selectedContact.name}</p>
                  <p className="text-gray-600">{selectedContact.email}</p>
                </div>

                <div>
                  <p className="text-gray-600 text-sm">Date</p>
                  <p>{new Date(selectedContact.created_at).toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-gray-600 text-sm">Message</p>
                  <p className="bg-gray-50 rounded-lg p-4 mt-2">{selectedContact.message}</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="btn-primary flex-1 text-center"
                  >
                    Reply via Email
                  </a>
                  <button
                    onClick={() => handleDelete(selectedContact.id)}
                    className="btn-secondary flex-1 text-red-600 border-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
