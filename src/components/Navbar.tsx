'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LeadButton } from './LeadCapture';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;
  const links = [['/#rooms', 'The rooms'], ['/#amenities', 'The everyday'], ['/#location', 'The neighbourhood']];
  return <header className="site-header"><nav className="site-container nav-inner" aria-label="Main navigation">
    <Link href="/" className="wordmark" aria-label="Comfort Home PG home"><span className="brand-mark">ch</span><span className="wordmark-text">Comfort Home<small>SARITA VIHAR · PAYING GUEST</small></span></Link>
    <div className="hidden lg:flex items-center gap-8">{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}<LeadButton interest="Schedule a property visit">Come say hello ↗</LeadButton></div>
    <button className="lg:hidden menu-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? 'Close ×' : 'Menu ☰'}</button>
  </nav>{open && <div id="mobile-menu" className="mobile-nav site-container">{links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<div onClick={() => setOpen(false)}><LeadButton interest="Schedule a property visit">Come say hello ↗</LeadButton></div></div>}</header>;
}
