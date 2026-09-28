'use client';

import { useEffect, useState } from 'react';

interface Booking {
  id: number;
  guestName: string;
  phone: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  status: string;
  message: string;
  createdAt: string;
  room: {
    name: string;
    type: string;
  };
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const fetchBookings = () => {
    const url = filter === 'all' ? '/api/bookings' : `/api/bookings?status=${filter}`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchBookings();
    setSelectedBooking(null);
  };

  const filteredBookings = bookings;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-500">Manage all booking requests</p>
        </div>
        <div className="flex gap-2">
          {['all', 'Pending', 'Confirmed', 'Cancelled'].map((status) => (
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

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand" />
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="text-gray-400 text-lg">No bookings found</div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guest</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{booking.guestName}</div>
                      <div className="text-sm text-gray-500">{booking.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{booking.room?.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(booking.checkInDate).toLocaleDateString('en-IN')} —{' '}
                      {new Date(booking.checkOutDate).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{booking.roomType}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          booking.status === 'Confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="text-brand text-sm font-medium hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
              <button
                onClick={() => setSelectedBooking(null)}
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
                  <div className="text-sm text-gray-500">Guest Name</div>
                  <div className="font-medium">{selectedBooking.guestName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium">{selectedBooking.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{selectedBooking.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Room Type</div>
                  <div className="font-medium">{selectedBooking.room?.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Check-in</div>
                  <div className="font-medium">
                    {new Date(selectedBooking.checkInDate).toLocaleDateString('en-IN')}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Check-out</div>
                  <div className="font-medium">
                    {new Date(selectedBooking.checkOutDate).toLocaleDateString('en-IN')}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">AC Preference</div>
                  <div className="font-medium">{selectedBooking.roomType}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      selectedBooking.status === 'Confirmed'
                        ? 'bg-green-100 text-green-800'
                        : selectedBooking.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {selectedBooking.status}
                  </span>
                </div>
              </div>
              {selectedBooking.message && (
                <div>
                  <div className="text-sm text-gray-500 mb-1">Message</div>
                  <div className="bg-gray-50 rounded-lg p-3 text-sm">{selectedBooking.message}</div>
                </div>
              )}
            </div>
            <div className="p-6 border-t flex gap-3">
              {selectedBooking.status === 'Pending' && (
                <>
                  <button
                    onClick={() => updateStatus(selectedBooking.id, 'Confirmed')}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(selectedBooking.id, 'Cancelled')}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
              {selectedBooking.status !== 'Pending' && (
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
