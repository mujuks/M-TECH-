export const site = {
  name: 'M-TECH',
  slogan: 'Build • Design • Grow',
  tagline: 'Your Vision. Our Creativity. Digital Excellence.',
  footerSlogan: "Let's bring your ideas to life!",
  copyright: '© 2026 M-TECH. All Rights Reserved.',

  phones: [
    { label: '0112197169', display: '011 219 7169', tel: '+254112197169', kind: 'line' as const },
    { label: '0795270517', display: '079 527 0517', tel: '+254795270517', kind: 'mobile' as const },
  ],

  whatsapp: {
    display: '079 527 0517',
    international: '254795270517',
    get link() {
      return `https://wa.me/${this.international}`;
    },
    message(text: string) {
      return `https://wa.me/${this.international}?text=${encodeURIComponent(text)}`;
    },
  },

  email: 'hello@m-tech.example.com',
  location: 'Nairobi, Kenya (address coming soon)',

  social: [
    { name: 'Facebook', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'X', url: '#' },
    { name: 'YouTube', url: '#' },
  ],
} as const;

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/#services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact Us', to: '/contact' },
] as const;
