import Link from 'next/link';
import RoomCard from '@/components/RoomCard';
import Gallery from '@/components/Gallery';

async function getRooms() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'https://localhost:3000'}/api/rooms`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const rooms = await getRooms();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-700 via-brand to-brand-500 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Verified PG Accommodation</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              A room that feels like <span className="text-yellow-300">home</span>, not a hostel.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Comfort Home PG offers bright, spacious single, double and triple-sharing rooms,
              seven minutes from Sarita Vihar Metro — fully verified and built for students and
              working professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/booking" className="btn-whatsapp text-lg px-8 py-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book Now
              </Link>
              <a href="tel:+919654975075" className="btn-secondary bg-transparent text-white border-white hover:bg-white hover:text-brand text-lg px-8 py-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-brand">700m</div>
              <div className="text-gray-600">From Metro</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand">3</div>
              <div className="text-gray-600">Room Types</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand">24/7</div>
              <div className="text-gray-600">Security</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand">100%</div>
              <div className="text-gray-600">Verified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Rooms & Rates</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Every room comes furnished with a bed, WiFi and natural light — choose AC or
              Non-AC, priced simply, no hidden charges.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {rooms.length > 0 ? (
              rooms.map((room: any) => <RoomCard key={room.id} room={room} />)
            ) : (
              <>
                <RoomCard room={{
                  id: 1, name: 'Single Occupancy', type: 'Single',
                  acPrice: 15500, nonAcPrice: 14000,
                  description: 'All to yourself',
                  amenities: ['Spacious room', 'Natural light', 'Furnished bed', 'WiFi included'],
                  images: [{ url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600' }],
                  availableRooms: 2, status: 'available'
                }} />
                <RoomCard room={{
                  id: 2, name: 'Double Sharing', type: 'Double',
                  acPrice: 10500, nonAcPrice: 9500,
                  description: 'Split the rent',
                  amenities: ['Spacious & bright', 'Study desk', 'Furnished beds', 'WiFi included'],
                  images: [{ url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600' }],
                  availableRooms: 3, status: 'available'
                }} />
                <RoomCard room={{
                  id: 3, name: 'Triple Sharing', type: 'Triple',
                  acPrice: 7500, nonAcPrice: 6500,
                  description: 'Most affordable',
                  amenities: ['Large spacious room', 'Study area', 'Furnished beds', 'WiFi included'],
                  images: [{ url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600' }],
                  availableRooms: 4, status: 'available'
                }} />
              </>
            )}
          </div>
          <p className="text-center text-gray-500 mt-8 text-sm">
            * Pricing is subject to change. Confirm current rates on WhatsApp or call before booking.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">See It For Yourself</h2>
            <p className="section-subtitle">The rooms, in real light. A look inside before you visit.</p>
          </div>
          <Gallery />
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Amenities</h2>
            <p className="section-subtitle">Everything you'd write on a checklist — already ticked.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '📡', title: 'High-speed WiFi' },
              { icon: '❄️', title: 'AC / Non-AC rooms' },
              { icon: '💡', title: 'Natural light in every room' },
              { icon: '🧺', title: 'Laundry service' },
              { icon: '🍳', title: 'Common kitchen' },
              { icon: '📺', title: 'Common TV area' },
              { icon: '🔒', title: '24/7 security' },
              { icon: '📚', title: 'Study desk in every room' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="font-medium text-gray-800">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Location</h2>
            <p className="section-subtitle">Connected to everywhere that matters.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              {[
                { name: 'Sarita Vihar Metro Station (Violet Line)', distance: '~700 m' },
                { name: 'Indraprastha Apollo Hospital', distance: '~1.5 km' },
                { name: 'Jamia Millia Islamia', distance: 'nearby' },
                { name: 'Pacific Mall, Jasola', distance: '~2 km' },
                { name: 'Mathura Road (NH-44)', distance: 'direct access' },
              ].map((place, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{place.name}</div>
                    <div className="text-sm text-gray-500">{place.distance}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.674!2d77.2927!3d28.5355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMyJzA3LjgiTiA3N8KwMTcnMzMuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Comfort Home PG Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-brand-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Comfort Home</h2>
            <p className="text-xl text-white/80">Verified, secure, and actually comfortable.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Fully legalized & verified', desc: 'Registered PG accommodation — no surprises, no informal arrangements.' },
              { num: '02', title: 'Built for focus', desc: 'Every room has a study desk and natural light, made for students and working professionals.' },
              { num: '03', title: 'Simple, transparent pricing', desc: 'WiFi, furnishing and security included in the rent you see — nothing added later.' },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <div className="text-5xl font-bold text-white/20 mb-4">{item.num}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-white/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Come see the room before you decide. Visits welcome, every day.
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Comfort Home PG, Sarita Vihar, New Delhi — 110076
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/booking" className="btn-whatsapp text-lg px-8 py-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Book Now
            </Link>
            <a href="tel:+919654975075" className="btn-secondary bg-transparent text-white border-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
