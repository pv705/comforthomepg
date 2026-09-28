import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

interface RoomCardProps {
  room: {
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
  };
}

export default function RoomCard({ room }: RoomCardProps) {
  const imageUrl = room.images?.[0]?.url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600';

  return (
    <div className="card group">
      <div className="relative h-56 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
            {room.type}
          </span>
        </div>
        {room.status === 'available' && (
          <div className="absolute top-4 right-4">
            <span className="bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
              Available
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{room.name}</h3>
        <p className="text-gray-500 mb-4">{room.description}</p>

        <div className="flex gap-4 mb-4">
          <div className="flex-1 bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">Non-AC</div>
            <div className="text-lg font-bold text-gray-900">{formatCurrency(room.nonAcPrice)}</div>
            <div className="text-xs text-gray-500">per month</div>
          </div>
          <div className="flex-1 bg-brand/5 rounded-lg p-3 text-center border border-brand/20">
            <div className="text-xs text-brand mb-1">AC</div>
            <div className="text-lg font-bold text-brand">{formatCurrency(room.acPrice)}</div>
            <div className="text-xs text-gray-500">per month</div>
          </div>
        </div>

        <ul className="space-y-2 mb-6">
          {room.amenities.map((amenity, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {amenity}
            </li>
          ))}
        </ul>

        <Link
          href={`/booking?room=${room.id}`}
          className="btn-primary w-full text-center"
        >
          Book This Room
        </Link>
      </div>
    </div>
  );
}
