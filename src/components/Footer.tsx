'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LeadButton } from './LeadCapture';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;
  return <footer className="site-footer"><div className="site-container">
    <div className="footer-grid"><div><Link href="/" className="wordmark"><span className="brand-mark">ch<span>↗</span></span><span className="wordmark-text">Comfort Home<small>A PLACE FOR YOUR NEXT CHAPTER</small></span></Link><p className="mt-5">Comfortable living in Sarita Vihar, New Delhi.<br />For students. For professionals. For you.</p></div><div><p className="eyebrow">TAKE A LOOK</p><Link href="/#rooms">Rooms & rates</Link><Link href="/#amenities">Life here</Link><Link href="/#location">The neighbourhood</Link></div><div><p className="eyebrow">LET’S CONNECT</p><LeadButton className="footer-contact" interest="Please call me about room availability">Request a callback ↗</LeadButton><LeadButton className="footer-contact" interest="I would like to chat on WhatsApp">Chat on WhatsApp ↗</LeadButton><Link href="/contact">Send an inquiry →</Link></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Comfort Home PG</span><span>Find your space. Feel at home.</span></div>
  </div></footer>;
}
