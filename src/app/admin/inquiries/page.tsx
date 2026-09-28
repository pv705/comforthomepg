'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';

interface Inquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = () => {
    setLoading(true);
    setError('');
    const url = filter === 'all' ? '/api/inquiries' : `/api/inquiries?status=${filter}`;
    fetch(url)
      .then(async (r) => {
        if (!r.ok) throw new Error(r.status === 401 ? 'Please sign in again to see inquiries.' : 'Could not load inquiries. Please retry.');
        const data = await r.json();
        if (!Array.isArray(data)) throw new Error('Unexpected response. Please retry.');
        return data;
      })
      .then((data) => {
        setInquiries(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((cause) => {
        setError(cause.message);
        setInquiries([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInquiries();
  }, [filter]);

  const updateStatus = async (id: number, status: string) => {
    setBusy(true);
    setError('');
    try {
    const response = await fetch(`/api/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Could not update this inquiry. Please try again.');
    fetchInquiries();
    setSelectedInquiry(null);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Update failed.'); }
    finally { setBusy(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
    const response = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Could not delete this inquiry. Please try again.');
    fetchInquiries();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Delete failed.'); }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
          <p className="text-gray-500">Visitor callbacks, room interests and visit requests · latest 200</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'New', 'Contacted', 'Resolved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-brand text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status === 'all' ? 'All' : status}
            </button>
          ))}
        </div>
      </div>

      {error && <div role="alert" className="bg-red-50 text-red-800 p-4 mb-4 rounded-lg">{error} <button className="underline" onClick={fetchInquiries}>Retry</button></div>}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand" />
        </div>
      ) : !error && inquiries.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="text-gray-400 text-lg">No inquiries found</div>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-wrap gap-4 items-start justify-between">
                <div className="flex-1 min-w-0 break-words">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{inquiry.name}</h3>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        inquiry.status === 'New'
                          ? 'bg-blue-100 text-blue-800'
                          : inquiry.status === 'Contacted'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    {inquiry.subject} • {new Date(inquiry.createdAt).toLocaleDateString('en-IN')}
                  </div>
                  <p className="text-gray-700">{inquiry.message}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm">
                    <a href={`tel:${inquiry.phone}`} className="text-brand hover:underline">
                      {inquiry.phone}
                    </a>
                    {inquiry.email && <a href={`mailto:${inquiry.email}`} className="text-brand hover:underline">
                      {inquiry.email}
                    </a>}
                    <a href={`https://wa.me/${inquiry.phone.replace(/\D/g, '').length === 10 ? '91' : ''}${inquiry.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${inquiry.name}, this is Comfort Home PG following up on your inquiry: ${inquiry.subject}.`)}`} target="_blank" rel="noopener noreferrer" className="text-brand underline">Reply on WhatsApp ↗</a>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => setSelectedInquiry(inquiry)}
                    className="text-brand text-sm font-medium hover:underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(inquiry.id)}
                    className="text-red-500 text-sm font-medium hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90dvh] overflow-y-auto" role="dialog" aria-modal="true" aria-label="Inquiry details">
            {error && <p role="alert" className="p-4 text-red-800">{error}</p>}
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Inquiry Details</h2>
              <button
                aria-label="Close inquiry details"
                onClick={() => setSelectedInquiry(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Name</div>
                  <div className="font-medium">{selectedInquiry.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Subject</div>
                  <div className="font-medium">{selectedInquiry.subject}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <a href={`tel:${selectedInquiry.phone}`} className="text-brand font-medium">
                    {selectedInquiry.phone}
                  </a>
                </div>
                <div>
                    <div className="text-sm text-gray-500">Email (optional)</div>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-brand font-medium">
                    {selectedInquiry.email || 'Not provided'}
                  </a>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Message</div>
                <div className="bg-gray-50 rounded-lg p-3 text-sm">{selectedInquiry.message}</div>
              </div>
            </div>
            <div className="p-6 border-t flex gap-3">
              {selectedInquiry.status === 'New' && (
                <button
                  onClick={() => updateStatus(selectedInquiry.id, 'Contacted')}
                  disabled={busy}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
                >
                  Mark Contacted
                </button>
              )}
              {selectedInquiry.status !== 'Resolved' && (
                <button
                  onClick={() => updateStatus(selectedInquiry.id, 'Resolved')}
                  disabled={busy}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  Mark Resolved
                </button>
              )}
              <button
                onClick={() => setSelectedInquiry(null)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
