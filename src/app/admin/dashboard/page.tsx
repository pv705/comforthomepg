'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  totalInquiries: number;
  newInquiries: number;
  totalRooms: number;
  availableRooms: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/bookings').then((r) => r.json()),
      fetch('/api/inquiries').then((r) => r.json()),
      fetch('/api/rooms').then((r) => r.json()),
    ]).then(([bookings, inquiries, rooms]) => {
      const bookingList = Array.isArray(bookings) ? bookings : [];
      const inquiryList = Array.isArray(inquiries) ? inquiries : [];
      const roomList = Array.isArray(rooms) ? rooms : [];
      setStats({
        totalBookings: bookingList.length,
        pendingBookings: bookingList.filter((b: any) => b.status === 'Pending').length,
        confirmedBookings: bookingList.filter((b: any) => b.status === 'Confirmed').length,
        totalInquiries: inquiryList.length,
        newInquiries: inquiryList.filter((i: any) => i.status === 'New').length,
        totalRooms: roomList.length,
        availableRooms: roomList.filter((r: any) => r.status === 'available').length,
      });
      setRecentBookings(bookingList.slice(0, 5));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand" />
      </div>
    );
  }

  const statCards = [
    { label: 'Total Bookings', value: stats?.totalBookings, color: 'bg-blue-500', link: '/admin/bookings' },
    { label: 'Pending Bookings', value: stats?.pendingBookings, color: 'bg-yellow-500', link: '/admin/bookings' },
    { label: 'Confirmed', value: stats?.confirmedBookings, color: 'bg-green-500', link: '/admin/bookings' },
    { label: 'New Inquiries', value: stats?.newInquiries, color: 'bg-purple-500', link: '/admin/inquiries' },
    { label: 'Total Rooms', value: stats?.totalRooms, color: 'bg-indigo-500', link: '/admin/rooms' },
    { label: 'Available Rooms', value: stats?.availableRooms, color: 'bg-teal-500', link: '/admin/rooms' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {statCards.map((card, i) => (
          <Link
            key={i}
            href={card.link}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-3 h-3 ${card.color} rounded-full mb-3`} />
            <div className="text-3xl font-bold text-gray-900">{card.value}</div>
            <div className="text-sm text-gray-500">{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-brand text-sm font-medium hover:underline">
            View All
          </Link>
        </div>
        {recentBookings.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No bookings yet</div>
        ) : (
          <div className="divide-y">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{booking.guestName}</div>
                  <div className="text-sm text-gray-500">
                    {booking.room?.name} • {new Date(booking.checkInDate).toLocaleDateString('en-IN')}
                  </div>
                </div>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
