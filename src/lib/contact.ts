export const contactPhone = '919654975075';

export function whatsappLink(message: string) {
  return `https://wa.me/${contactPhone}?text=${encodeURIComponent(message)}`;
}
