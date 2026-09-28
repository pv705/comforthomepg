import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import RoomCard from '@/components/RoomCard';
import RoomIllustration from '@/components/RoomIllustration';
import { LeadButton } from '@/components/LeadCapture';
import Reveal from '@/components/Reveal';

export const dynamic = 'force-dynamic';

const roomGuide = [
  { id: 0, name: 'Single Occupancy', type: 'Single', acPrice: 15500, nonAcPrice: 14000, description: 'Your space. Your pace. A quiet corner to make entirely your own.', amenities: ['Private space', 'Furnished bed', 'Study desk', 'WiFi included'] },
  { id: 0, name: 'Double Sharing', type: 'Double', acPrice: 10500, nonAcPrice: 9500, description: 'A little company, a little independence. A comfortable balance.', amenities: ['Shared living', 'Furnished beds', 'Study space', 'WiFi included'] },
  { id: 0, name: 'Triple Sharing', type: 'Triple', acPrice: 7500, nonAcPrice: 6500, description: 'More room in your budget for everything you came to the city for.', amenities: ['Budget-friendly', 'Furnished beds', 'Study area', 'WiFi included'] },
];

async function getRooms() {
  try {
    return await prisma.room.findMany({ orderBy: { nonAcPrice: 'desc' } });
  } catch {
    // Published room guide stays useful during an outage; never invent availability.
    return [];
  }
}

export default async function Home() {
  const savedRooms = await getRooms();
  const rooms = savedRooms.length ? savedRooms : roomGuide;
  return <div className="home-page">
    <section className="home-hero">
      <div className="hero-orbit" aria-hidden="true" />
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> SARITA VIHAR · NEW DELHI</p>
          <h1>New city.<br />New chapter.<br /><em>Your kind of home.</em></h1>
          <p className="hero-description">For the early classes, the late projects, and everything in between. Find your own little corner of Delhi at Comfort Home PG.</p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <LeadButton interest="Help me find a room">Find my room <span aria-hidden="true">↗</span></LeadButton>
            <Link href="#rooms" className="text-link">Explore the spaces <span aria-hidden="true">↓</span></Link>
          </div>
          <div className="hero-notes"><span>Furnished & ready</span><span>Near the metro</span><span>Made for everyday living</span></div>
        </div>
        <div className="hero-art">
          <div className="art-label"><span className="live-dot" /> A SPACE TO CALL YOURS</div>
          <RoomIllustration />
          <div className="floating-note note-top"><span aria-hidden="true">☀</span> Room to breathe.</div>
          <div className="floating-note note-bottom"><span aria-hidden="true">⌂</span><div>Unpack. Settle in.<small>Make yourself at home.</small></div></div>
          <p className="illustration-caption">A little illustration of home · not a property photograph</p>
        </div>
      </div>
    </section>
    <div className="life-strip"><div className="site-container"><span>LESS HASSLE. MORE LIVING.</span><p>Move in furnished <i>✳</i> Stay connected <i>✳</i> Find your routine <i>✳</i> Feel at home</p></div></div>

    <section id="rooms" className="home-section site-container">
      <Reveal className="section-heading"><div><p className="eyebrow">FIND YOUR FIT</p><h2>A little space.<br /><em>A lot of possibility.</em></h2></div><p>Flying solo or sharing the everyday?<br />Choose a room that feels right for you.<br /><span className="text-sm">Prices shown per person, per month.</span></p></Reveal>
      <div className="room-grid">{rooms.map((room) => <Reveal key={room.type}><RoomCard room={room} /></Reveal>)}</div>
      <p className="mt-6 text-sm text-slate-500">Indicative monthly rent. Ask our team to confirm current rates, availability, deposits and inclusions before deciding.</p>
    </section>

    <section id="amenities" className="amenity-section"><div className="site-container home-section">
      <Reveal className="section-heading"><div><p className="eyebrow">THE EVERYDAY, TAKEN CARE OF</p><h2>Bring your plans.<br /><em>We’ve got the basics.</em></h2></div><p>Less time sorting the essentials.<br />More time doing your thing.</p></Reveal>
      <div className="amenity-grid">{[
        ['⌁', 'Stay connected', 'WiFi for your work, study and downtime.'],
        ['☀', 'Light & comfort', 'Furnished rooms with AC and Non-AC options.'],
        ['⌂', 'Space to unwind', 'A common TV area and shared kitchen.'],
        ['✳', 'Keep life simple', 'Laundry service and a desk for focused days.'],
      ].map(([icon, title, text]) => <Reveal key={title} className="amenity-tile"><span aria-hidden="true">{icon}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
    </div></section>

    <section id="gallery" className="site-container home-section">
      <Reveal className="visit-panel"><div className="visit-art" aria-hidden="true"><span>hello,<br /><em>home.</em></span><div className="visit-sun">✳</div></div><div className="visit-copy"><p className="eyebrow">GET THE REAL PICTURE</p><h2>See your next home.<br /><em>For yourself.</em></h2><p>No stock-photo promises. Ask the team for current room photos or come over for a visit. Get a feel for the space before you decide.</p><div className="flex flex-wrap gap-3 mt-6"><LeadButton interest="Please send current room photos">Request real photos ↗</LeadButton><LeadButton className="btn-secondary" interest="Schedule a property visit">Plan a visit →</LeadButton></div></div></Reveal>
    </section>

    <section id="location" className="location-section"><div className="site-container home-section location-grid">
      <Reveal><p className="eyebrow">YOUR CORNER OF DELHI</p><h2>Close to the city.<br /><em>Closer to your routine.</em></h2><p className="mt-5 max-w-lg">Make Sarita Vihar your base, with the Violet Line metro, Apollo Hospital and Jasola nearby.</p><a className="text-link mt-6 inline-block" href="https://www.google.com/maps/search/?api=1&query=Sarita+Vihar+New+Delhi" target="_blank" rel="noopener noreferrer">Explore the neighbourhood ↗</a><p className="text-sm text-slate-500 mt-2">Area map. Ask us for the exact property pin.</p></Reveal>
      <Reveal className="neighbourhood"><div className="metro-line" aria-hidden="true" /><p><span>METRO</span>Sarita Vihar <small>Violet Line connection</small></p><p><span>HEALTHCARE</span>Indraprastha Apollo Hospital <small>In the neighbourhood</small></p><p><span>EVERYDAY</span>Jasola & Mathura Road <small>Shopping, work and getting around</small></p><LeadButton className="text-link" interest="Please send the exact property location">Get the property pin →</LeadButton></Reveal>
    </div></section>

    <section className="site-container home-section"><Reveal className="section-heading"><div><p className="eyebrow">GOOD QUESTIONS</p><h2>A few things<br /><em>you might be wondering.</em></h2></div></Reveal><div className="faq-list">{[
      ['Can I visit before deciding?', 'Yes. Request a visit and our team will coordinate a suitable time and share the property location.'],
      ['What room options can I choose from?', 'Single occupancy, double sharing and triple sharing, with AC and Non-AC options. Contact the team to check what is currently available.'],
      ['What should I confirm before moving in?', 'Ask about the current rent, security deposit, electricity charges, meals, notice period and house rules. Our team can explain the details for your room.'],
      ['Does an inquiry reserve a room?', 'No. Sending your details starts a conversation with the PG team. Availability and a reservation must be confirmed directly.'],
    ].map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className="closing-panel"><Reveal className="site-container"><p className="eyebrow">A NEW CHAPTER IS CALLING</p><h2>Let’s make room<br />for <em>you.</em></h2><p>A quick hello is all it takes to get started.</p><LeadButton interest="I would like to discuss moving in" className="btn-coral">Let’s talk about your stay ↗</LeadButton></Reveal></section>
  </div>;
}
