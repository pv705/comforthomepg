'use client';
import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { LeadButton } from './LeadCapture';
import RoomIllustration from './RoomIllustration';

export default function RoomCard({ room }: { room: {
  name: string; type: string; acPrice: number; nonAcPrice: number;
  description: string; amenities: string[] | string;
} }) {
  const [ac, setAc] = useState(false);
  let amenities: string[] = [];
  try {
    const value = typeof room.amenities === 'string' ? JSON.parse(room.amenities) : room.amenities;
    if (Array.isArray(value)) amenities = value.filter((item): item is string => typeof item === 'string');
  } catch { /* Invalid stored amenities should not take down the page. */ }
  return <article className={`room-card room-${room.type.toLowerCase()}`}>
    <div className="room-card-art"><span className="room-kind">{room.type === 'Single' ? 'YOUR OWN LITTLE WORLD' : room.type === 'Double' ? 'BETTER TOGETHER' : 'BIG PLANS, SMALLER RENT'}</span><RoomIllustration shared={room.type !== 'Single'} /><span className="room-art-caption">Room illustration</span></div>
    <div className="room-card-body"><h3>{room.name}</h3><p className="room-description">{room.description}</p>
      <div className="room-toggle" role="group" aria-label={`${room.name} cooling preference`}><button aria-pressed={!ac} onClick={() => setAc(false)}>Non-AC</button><button aria-pressed={ac} onClick={() => setAc(true)}>AC comfort</button></div>
      <div className="room-price" aria-live="polite">{formatCurrency(ac ? room.acPrice : room.nonAcPrice)}<span>/ person / month</span></div>
      <ul>{amenities.slice(0, 4).map((amenity) => <li key={amenity}><span aria-hidden="true">✓</span> {amenity}</li>)}</ul>
      <LeadButton className="room-inquire" interest={`${room.name} · ${ac ? 'AC' : 'Non-AC'}`}>Ask about this room <span aria-hidden="true">↗</span></LeadButton>
    </div>
  </article>;
}
