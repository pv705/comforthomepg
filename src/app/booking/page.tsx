'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Room {
  id: number;
  name: string;
  type: string;
  acPrice: number;
  nonAcPrice: number;
  description: string;
  amenities: string[];
  images: { url: string }[];
  availableRooms: number;
  status: string;
}

function BookingForm() {
  const searchParams = useSearchParams();
  const preselectedRoom = searchParams.get('room');

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    roomId: preselectedRoom || '',
    guestName: '',
    phone: '',
    email: '',
    checkInDate: '',
    checkOutDate: '',
    roomType: 'AC',
    message: '',
    website: '', // honeypot
  });

  useEffect(() => {
    fetch('/api/rooms')
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const { website, ...data } = form;
      if (website) return; // bot detected

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || 'Failed to submit booking');
        return;
      }

      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Request Submitted!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in Comfort Home PG. We have received your booking request
              and will contact you within 24 hours to confirm availability.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-2">What happens next?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">1.</span>
                  We will verify room availability for your selected dates
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">2.</span>
                  Our team will call/WhatsApp you to confirm the booking
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">3.</span>
                  You can visit the property before final confirmation
                </li>
              </ul>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/" className="btn-primary">
                Back to Home
              </Link>
              <a
                href="https://wa.me/919654975075?text=Hi%2C%20I%20just%20submitted%20a%20booking%20request"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Book Your Room</h1>
          <p className="text-gray-600">Fill in the details below and we&apos;ll confirm your booking within 24 hours.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Room Selection */}
            <div>
              <label className="label">Select Room Type *</label>
              {loading ? (
                <div className="animate-pulse bg-gray-200 h-12 rounded-lg" />
              ) : (
                <select
                  required
                  value={form.roomId}
                  onChange={(e) => setForm({ ...form, roomId: e.target.value })}
                  className="input-field"
                >
                  <option value="">Choose a room type</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id} disabled={room.status !== 'available'}>
                      {room.name} — ₹{room.nonAcPrice.toLocaleString()} - ₹{room.acPrice.toLocaleString()}/month
                      {room.status !== 'available' ? ' (Unavailable)' : ''}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Room Type (AC/Non-AC) */}
            <div>
              <label className="label">AC Preference *</label>
              <div className="flex gap-4">
                <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${form.roomType === 'AC' ? 'border-brand bg-brand/5' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="radio"
                    name="roomType"
                    value="AC"
                    checked={form.roomType === 'AC'}
                    onChange={(e) => setForm({ ...form, roomType: e.target.value })}
                    className="sr-only"
                  />
                  <span className="text-2xl">❄️</span>
                  <span className="font-medium">AC Room</span>
                </label>
                <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${form.roomType === 'Non-AC' ? 'border-brand bg-brand/5' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="radio"
                    name="roomType"
                    value="Non-AC"
                    checked={form.roomType === 'Non-AC'}
                    onChange={(e) => setForm({ ...form, roomType: e.target.value })}
                    className="sr-only"
                  />
                  <span className="text-2xl">🌿</span>
                  <span className="font-medium">Non-AC Room</span>
                </label>
              </div>
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Check-in Date *</label>
                <input
                  type="date"
                  required
                  value={form.checkInDate}
                  onChange={(e) => setForm({ ...form, checkInDate: e.target.value })}
                  className="input-field"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="label">Check-out Date *</label>
                <input
                  type="date"
                  required
                  value={form.checkOutDate}
                  onChange={(e) => setForm({ ...form, checkOutDate: e.target.value })}
                  className="input-field"
                  min={form.checkInDate || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Guest Details */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-4">Your Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.guestName}
                    onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="input-field"
                    placeholder="+91 XXXXX XXXXX"
                    pattern="[0-9+]{10,15}"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="label">Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="label">Any special requirements? (Optional)</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="input-field"
                rows={3}
                placeholder="Any specific requirements or questions..."
              />
            </div>

            {/* Honeypot - hidden from real users */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Booking Request'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">Loading...</div>}>
      <BookingForm />
    </Suspense>
  );
}
