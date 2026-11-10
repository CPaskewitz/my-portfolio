/**
 * Corvian Labs "uplink" section. Mirrors corvianlabs.com (app/data/services.ts there);
 * update both together.
 */

export const corvian = {
  name: 'Corvian Labs',
  url: 'https://www.corvianlabs.com',
  contactUrl: 'https://www.corvianlabs.com/contact',
  mark: '/corvian/corvianlabs-mark-white-160.png',
  raven: '/corvian/raven-still.webp',
  backdrop: '/corvian/backdrop.webp',
  backdropMobile: '/corvian/backdrop-mobile.webp',
  tagline: 'Websites and web apps that help Ontario businesses ship.',
  intro:
    'My one-person web design and development studio in Cambridge, Ontario. I build websites, booking systems and custom web apps for small businesses, clinics, non-profits and startups across Kitchener-Waterloo, Guelph and beyond.',
  nameNote: 'The name comes from the crow: intelligence, adaptability and problem-solving.',
} as const;

export interface CorvianService {
  slug: string;
  name: string;
  short: string;
}

export const corvianServices: CorvianService[] = [
  { slug: 'websites', name: 'Website design & development', short: 'Fast, accessible websites designed around your customers and your search traffic.' },
  { slug: 'web-apps', name: 'Custom web apps & software', short: 'Booking systems, customer portals, dashboards and admin tools built to fit how your business actually runs.' },
  { slug: 'chatbots', name: 'AI chatbots & help assistants', short: 'A help chat on your website that answers from your own content, in your own branding.' },
  { slug: 'consulting', name: 'Consulting & software advice', short: 'A second set of eyes on your site, store or software, and help deciding what to keep, connect or replace.' },
  { slug: 'care-plans', name: 'Maintenance & care plans', short: 'Updated, backed up, monitored and improving each month without hiring a developer.' },
];

export const corvianPrinciples: string[] = [
  'Fixed quotes, no scope creep',
  'You own everything',
  'Built to be maintained',
  'Direct communication',
];
