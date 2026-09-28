import { LeadButton } from '@/components/LeadCapture';
import RoomIllustration from '@/components/RoomIllustration';

export default function ContactPage() {
  return <section className="site-container home-section">
    <div className="location-grid"><div><p className="eyebrow">LET’S START WITH A HELLO</p><h1 className="display-small text-5xl">A place for you.<br />A team to help.</h1><p className="mt-6 leading-relaxed text-slate-600">Have a question about living at Comfort Home PG? Leave your name and contact number and our team can help you find your fit.</p><div className="flex flex-wrap gap-3 mt-8"><LeadButton interest="General room inquiry">Request a callback ↗</LeadButton><LeadButton className="btn-secondary" interest="Schedule a property visit">Plan a visit →</LeadButton></div><p className="mt-8 text-sm text-slate-500">Sarita Vihar, New Delhi. Request the exact property pin before visiting.</p></div><div className="hero-art"><RoomIllustration /><p className="illustration-caption">Room illustration · not a property photograph</p></div></div>
  </section>;
}
