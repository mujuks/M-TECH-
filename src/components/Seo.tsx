import { useEffect } from 'react';

type SeoProps = {
  title: string;
  description: string;
};

export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = title;

    const set = (selector: string, attr: 'name' | 'property', key: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    set('meta[name="description"]', 'name', 'description', description);
    set('meta[property="og:title"]', 'property', 'og:title', title);
    set('meta[property="og:description"]', 'property', 'og:description', description);
    set('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    set('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  }, [title, description]);

  return null;
}
