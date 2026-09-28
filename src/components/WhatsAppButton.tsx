'use client';
import { usePathname } from 'next/navigation';
import { LeadButton } from './LeadCapture';

export default function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;
  return <div className="floating-contact"><LeadButton className="chat-pill" interest="I would like to chat on WhatsApp"><span aria-hidden="true">↗</span> Let’s chat</LeadButton></div>;
}
