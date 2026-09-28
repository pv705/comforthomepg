'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { whatsappLink } from '@/lib/contact';

const LeadContext = createContext<(interest: string) => void>(() => {});
const dismissedKey = 'comfort-home-intro-dismissed';

export function LeadButton({ children, interest = 'General room inquiry', className = 'btn-primary' }: {
  children: React.ReactNode; interest?: string; className?: string;
}) {
  const open = useContext(LeadContext);
  return <button type="button" className={className} onClick={() => open(interest)}>{children}</button>;
}

export default function LeadCapture({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const welcomed = useRef(false);
  const busy = useRef(false);
  const [interest, setInterest] = useState('Help me find a room');
  const [form, setForm] = useState({ name: '', phone: '', website: '' });
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [error, setError] = useState('');
  const isAdmin = pathname.startsWith('/admin');

  const open = useCallback((value: string) => {
    if (busy.current) return;
    opener.current = document.activeElement as HTMLElement;
    setInterest(value);
    setStatus('idle');
    setError('');
    dialog.current?.showModal();
    document.body.classList.add('lead-open');
  }, []);

  const close = useCallback(() => {
    dialog.current?.close();
    document.body.classList.remove('lead-open');
    try { sessionStorage.setItem(dismissedKey, 'yes'); } catch { /* Storage may be disabled. */ }
    opener.current?.focus();
  }, []);

  useEffect(() => {
    if (isAdmin) { close(); return; }
    if (welcomed.current) return;
    try { if (sessionStorage.getItem(dismissedKey)) return; } catch { /* Still allow browsing. */ }
    welcomed.current = true;
    open('Help me find a room');
  }, [isAdmin, open, close]);

  useEffect(() => () => document.body.classList.remove('lead-open'), []);

  const message = `Hi Comfort Home PG! I looked at your PG and would like to know more.\nName: ${form.name.trim()}\nPhone: ${form.phone.trim()}\nInterested in: ${interest}\nPage: ${pathname}`;

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true;
    setStatus('saving');
    setError('');
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, subject: interest, message: `Callback requested. Interest: ${interest}. Page: ${pathname}. Visitor agreed to be contacted about their stay.` }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'We could not save your request.');
      setStatus('saved');
      try { sessionStorage.setItem(dismissedKey, 'yes'); } catch { /* No personal data stored. */ }
    } catch (cause) {
      setStatus('error');
      setError(cause instanceof Error && cause.name !== 'TimeoutError' ? cause.message : 'The connection timed out. Please try again.');
    } finally { busy.current = false; }
  }

  return <LeadContext.Provider value={open}>
    {children}
    {!isAdmin && <dialog ref={dialog} className="lead-dialog" aria-labelledby="lead-title" aria-describedby="lead-description"
      onCancel={(event) => { event.preventDefault(); close(); }} onClose={() => document.body.classList.remove('lead-open')}>
      <button type="button" className="dialog-close" aria-label="Close inquiry form" onClick={close}>×</button>
      <div className="lead-accent" aria-hidden="true">ch<span>↗</span></div>
      {status === 'saved' ? <div className="space-y-5">
        <p className="eyebrow">YOU’RE ON THE LIST</p>
        <h2 id="lead-title" className="display-small">Let’s find your<br />kind of home.</h2>
        <p id="lead-description">Your details are saved for the PG admin. You can also send your request directly on WhatsApp.</p>
        <a className="btn-primary w-full" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">Continue on WhatsApp ↗</a>
        <p className="text-xs text-slate-500">WhatsApp opens a draft. Tap Send there to deliver it.</p>
        <button className="text-link" onClick={close}>Back to exploring →</button>
      </div> : <>
        <p className="eyebrow">A LITTLE HELLO, A BETTER MATCH</p>
        <h2 id="lead-title" className="display-small">Your next chapter<br />starts here.</h2>
        <p id="lead-description" className="mt-3 mb-6 text-slate-600">Leave your name and number. Our PG team can help with rooms, rates and a visit.</p>
        <form onSubmit={submit} className="space-y-4">
          <label className="block"><span className="label">Your name</span><input autoFocus required name="name" autoComplete="name" minLength={2} maxLength={100} className="input-field" placeholder="What should we call you?" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label className="block"><span className="label">Contact number</span><input required name="phone" type="tel" autoComplete="tel" maxLength={24} pattern="[+0-9 ()-]{10,24}" className="input-field" placeholder="Your mobile number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
          <div className="sr-only" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></label></div>
          <p className="interest-tag">Interested in: {interest}</p>
          <p className="text-xs leading-relaxed text-slate-500">By requesting a callback, you agree to share these details with Comfort Home PG so they can contact you about your stay. Browsing is always optional.</p>
          {status === 'error' && <div role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{error} Your request has not been saved.
            <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="mt-2 block underline">Send these details on WhatsApp instead ↗</a>
          </div>}
          <button disabled={status === 'saving'} className="btn-primary w-full" type="submit">{status === 'saving' ? 'Saving your request…' : 'Request a callback →'}</button>
          <button type="button" onClick={close} className="w-full py-2 text-sm text-slate-600 hover:text-brand">Just looking? Keep exploring</button>
        </form>
      </>}
    </dialog>}
  </LeadContext.Provider>;
}
