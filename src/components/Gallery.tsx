import { LeadButton } from './LeadCapture';

export default function Gallery() {
  return <div className="rounded-2xl border p-8 text-center"><h3 className="text-xl mb-3">See the real space</h3><p className="mb-5">Ask our team for current property photos before you visit.</p><LeadButton interest="Please send current room photos">Request room photos ↗</LeadButton></div>;
}
