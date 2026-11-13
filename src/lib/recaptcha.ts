/**
 * Google reCAPTCHA v2 ("I'm not a robot" checkbox) for the contact form.
 *
 * EmailJS verifies the token server-side (template Settings → reCAPTCHA, with the secret key). The widget
 * writes its token into a hidden `g-recaptcha-response` field inside the form, which `emailjs.sendForm`
 * sends along. The site key is public by design; it only works on cpaskewitz.com (set in the reCAPTCHA
 * admin console), so the widget does not render on localhost.
 *
 * The script is loaded on demand (when the form nears the viewport), so Google's code and cookies are
 * not on the page for visitors who never reach the contact section. CSP hosts for it live in vercel.json.
 */

export const RECAPTCHA_SITE_KEY = '6LcIwB4uAAAAAEpbd0-00Emi40w8zu-1vsYCIWuS';

type RenderOptions = {
  sitekey: string;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact';
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
};

export type Grecaptcha = {
  render: (el: HTMLElement, opts: RenderOptions) => number;
  getResponse: (id?: number) => string;
  reset: (id?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
    __onRecaptchaLoad?: () => void;
  }
}

let loading: Promise<Grecaptcha> | null = null;

export function loadRecaptcha(): Promise<Grecaptcha> {
  if (loading) return loading;
  loading = new Promise<Grecaptcha>((resolve, reject) => {
    if (window.grecaptcha?.render) {
      resolve(window.grecaptcha);
      return;
    }
    window.__onRecaptchaLoad = () => {
      if (window.grecaptcha) resolve(window.grecaptcha);
      else reject(new Error('reCAPTCHA loaded without grecaptcha'));
    };
    const s = document.createElement('script');
    s.src = 'https://www.google.com/recaptcha/api.js?onload=__onRecaptchaLoad&render=explicit';
    s.async = true;
    s.defer = true;
    s.onerror = () => {
      loading = null; // allow a retry (e.g. after a network blip)
      reject(new Error('reCAPTCHA script failed to load'));
    };
    document.head.appendChild(s);
  });
  return loading;
}
