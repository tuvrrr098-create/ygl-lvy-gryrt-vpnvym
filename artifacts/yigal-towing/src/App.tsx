import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Bike,
  Check,
  ChevronDown,
  CircleAlert,
  Clock3,
  Crosshair,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Menu,
  Navigation,
  Phone,
  Route,
  Send,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route as WouterRoute, Switch, Router as WouterRouter, useLocation } from 'wouter';

const queryClient = new QueryClient();
const phone = '052-253-6758';
const whatsappNumber = '972522536758';
const quickMessage = 'שלום יגאל, נתקעתי עם האופנוע/קטנוע וצריך גרירה. אשמח לעזרה.';

function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(message: string) {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
}

function Logo() {
  return (
    <a href="#top" className="flex min-w-0 items-center gap-3" data-testid="link-logo">
      <img src="/client-work/logo-clean.png" alt="גרר יגאל — שירותי גרירת אופנועים" className="h-12 w-12 shrink-0 object-contain" />
      <span className="min-w-0 leading-none">
        <strong className="block truncate text-[19px] font-black tracking-tight text-[#f5f3ec]">גרר יגאל</strong>
        <span className="mt-1 block truncate text-[10px] font-bold tracking-[.08em] text-[#a9adb0]">גרירת אופנועים וקטנועים 24/6</span>
      </span>
    </a>
  );
}

function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#d4d8d9]/15 bg-[#14181b]/95 backdrop-blur-md">
      <div className="container-wide flex h-[70px] items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-7 text-[13px] font-semibold text-[#bfc3c3] lg:flex" aria-label="ניווט ראשי">
           <a href="#client-work" className="transition-colors hover:text-[#f5d84e]" data-testid="link-client-work">עבודות מהשטח</a>
           <a href="#services" className="transition-colors hover:text-[#f5d84e]" data-testid="link-services">השירותים</a>
          <a href="#coverage" className="transition-colors hover:text-[#f5d84e]" data-testid="link-coverage">אזורי שירות</a>
          <a href="#faq" className="transition-colors hover:text-[#f5d84e]" data-testid="link-faq">שאלות נפוצות</a>
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-[#f5d84e]/30 bg-[#f5d84e]/10 px-3 py-2 text-[11px] font-bold text-[#f5d84e] sm:flex" data-testid="status-availability">
            <span className="h-2 w-2 rounded-full bg-[#f5d84e] shadow-[0_0_0_3px_rgba(245,216,78,.12)]" />
            זמין עכשיו · 24/6 · עסק שומר שבת
          </span>
          <a href={`tel:${phone}`} className="hidden h-10 items-center gap-2 border border-[#d4d8d9]/25 px-3 text-sm font-bold text-[#f5f3ec] transition-colors hover:border-[#f5d84e] hover:text-[#f5d84e] sm:flex" data-testid="link-header-phone">
            <Phone size={16} />
            <span>חייגו עכשיו</span>
          </a>
          <button type="button" onClick={onMenu} className="flex h-10 w-10 items-center justify-center border border-[#d4d8d9]/25 text-[#f5f3ec] lg:hidden" aria-label="פתיחת תפריט" data-testid="button-open-menu">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#14181b]/98 p-5 lg:hidden" dir="rtl">
      <div className="flex items-center justify-between">
        <Logo />
        <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center border border-[#d4d8d9]/25" aria-label="סגירת תפריט" data-testid="button-close-menu">
          <X size={22} />
        </button>
      </div>
      <div className="mt-20 flex flex-col gap-2 text-right">
        {[
           ['#client-work', 'עבודות מהשטח'],
           ['#services', 'השירותים'],
          ['#coverage', 'אזורי שירות'],
          ['#values', 'למה יגאל'],
          ['#faq', 'שאלות נפוצות'],
        ].map(([href, label]) => (
          <a key={href} href={href} onClick={onClose} className="border-b border-[#d4d8d9]/15 py-5 text-3xl font-black text-[#f5f3ec]" data-testid={`link-mobile-${label}`}>
            {label}<ArrowLeft className="mr-3 inline-block text-[#f5d84e]" size={24} />
          </a>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3">
        <a href={`tel:${phone}`} className="flex h-14 items-center justify-center gap-2 bg-[#f5d84e] font-black text-[#14181b]" data-testid="link-mobile-phone"><Phone size={18} /> חייגו עכשיו</a>
        <button type="button" onClick={() => openWhatsApp(quickMessage)} className="flex h-14 items-center justify-center gap-2 border border-[#f5d84e] font-black text-[#f5d84e]" data-testid="button-mobile-whatsapp"><FaWhatsapp size={22} /> WhatsApp</button>
      </div>
    </div>
  );
}

const bikeSlides = [
  {
    image: '/client-work/kawasaki.jpeg',
    alt: 'אופנוע Kawasaki קשור על נגרר',
    title: 'Kawasaki',
    detail: 'קשירה מאובטחת',
  },
  {
    image: '/client-work/bmw-r1250.jpeg',
    alt: 'אופנוע BMW R1250 קשור על נגרר',
    title: 'BMW R1250',
    detail: 'בדרך ליעד',
  },
  {
    image: '/client-work/ducati-diavel.jpeg',
    alt: 'אופנוע Ducati Diavel על נגרר',
    title: 'Ducati Diavel',
    detail: 'העמסה זהירה',
  },
];

function BikeCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % bikeSlides.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, []);

  const changeSlide = (direction: number) => {
    setActiveSlide((current) => (current + direction + bikeSlides.length) % bikeSlides.length);
  };

  const slide = bikeSlides[activeSlide];

  return (
    <div className="relative overflow-hidden border border-[#f5f3ec]/25 bg-[#101416]/75 p-2 shadow-2xl shadow-black/30 backdrop-blur-sm" dir="ltr" data-testid="bike-carousel">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#272d30]">
        <img key={slide.image} src={slide.image} alt={slide.alt} className="h-full w-full animate-[reveal_.65s_cubic-bezier(.2,.75,.25,1)] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101416]/95 via-transparent to-[#101416]/10" />
        <div className="absolute left-4 top-4 flex items-center gap-2 border border-[#f5d84e]/50 bg-[#14181b]/75 px-3 py-2 text-[11px] font-black tracking-[.12em] text-[#f5d84e] backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[#f5d84e]" />
          עבודות מהשטח
        </div>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4" dir="rtl">
          <div>
            <p className="text-2xl font-black text-[#f5f3ec] md:text-3xl">{slide.title}</p>
            <p className="mt-1 text-sm font-bold text-[#f5d84e]">{slide.detail}</p>
          </div>
          <span className="font-mono text-sm font-bold text-[#f5f3ec]/75">{String(activeSlide + 1).padStart(2, '0')} / 03</span>
        </div>
        <button type="button" onClick={() => changeSlide(1)} className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[#f5f3ec]/40 bg-[#14181b]/65 text-[#f5f3ec] transition-colors hover:border-[#f5d84e] hover:text-[#f5d84e]" aria-label="אופנוע הבא" data-testid="button-carousel-next">
          <ChevronRight size={20} />
        </button>
        <button type="button" onClick={() => changeSlide(-1)} className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[#f5f3ec]/40 bg-[#14181b]/65 text-[#f5f3ec] transition-colors hover:border-[#f5d84e] hover:text-[#f5d84e]" aria-label="אופנוע קודם" data-testid="button-carousel-previous">
          <ChevronLeft size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between px-2 pb-1 pt-3" dir="rtl">
        <p className="text-[11px] font-semibold text-[#9da3a5]">החליקו או בחרו אופנוע</p>
        <div className="flex items-center gap-2" role="tablist" aria-label="בחירת אופנוע">
          {bikeSlides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-2 transition-all ${activeSlide === index ? 'w-8 bg-[#f5d84e]' : 'w-2 bg-[#f5f3ec]/35 hover:bg-[#f5f3ec]/70'}`}
              role="tab"
              aria-selected={activeSlide === index}
              aria-label={`הצגת ${item.title}`}
              data-testid={`button-carousel-slide-${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero({ onLocate }: { onLocate: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden border-b border-[#d4d8d9]/15 pt-[70px]">
      <img src="/hero-towing.jpg" alt="גרירת אופנוע — תמונת המחשה" className="absolute inset-0 h-full w-full object-cover object-center opacity-25" />
      <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(20,24,27,.98)_5%,rgba(20,24,27,.92)_46%,rgba(20,24,27,.78)_100%)]" />
      <div className="hero-grid absolute inset-0 opacity-40" />
      <div className="relative z-10 container-wide pb-12 pt-10 md:pb-20 md:pt-14">
        <div className="reveal mb-10 flex items-center gap-5 border-b border-[#f5f3ec]/15 pb-6 md:mb-14 md:pb-8">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-[#f5d84e]/70 bg-[#14181b]/80 p-1 shadow-[0_0_35px_rgba(245,216,78,.18)] md:h-28 md:w-28">
            <img src="/client-work/logo-clean.png" alt="לוגו גרר יגאל" className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="text-[clamp(2rem,5vw,4rem)] font-black leading-none tracking-[-.04em] text-[#f5f3ec]">גרר יגאל</p>
            <p className="mt-2 text-[11px] font-bold tracking-[.18em] text-[#f5d84e] md:text-sm">שירותי גרירת אופנועים וקטנועים</p>
            <p className="mt-1 text-xs font-semibold text-[#aeb3b4]">זמין 24/6 · עסק שומר שבת</p>
          </div>
        </div>
        <div className="grid items-center gap-9 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
          <div className="order-1">
            <BikeCarousel />
          </div>
          <div className="order-2">
            <div className="reveal mb-6 flex items-center gap-3 text-[12px] font-bold tracking-[.16em] text-[#f5d84e]">
              <span className="yellow-rule" />
              שירותי דרך לאופנועים וקטנועים
            </div>
            <h1 className="display reveal reveal-delay-1 max-w-[760px] text-[clamp(3.7rem,9vw,7.7rem)] font-extrabold leading-[.84] tracking-[-.045em] text-[#f5f3ec]">
              נתקעתם עם<br /><span className="text-[#f5d84e]">האופנוע?</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-7 max-w-[570px] text-[clamp(1.2rem,2.5vw,1.6rem)] font-bold leading-[1.35] text-[#e2e3de]">
              שלחו מיקום.
              <span className="mt-1 block text-base font-normal leading-relaxed text-[#b9bdbe] md:text-lg">יגאל לוי מגיע עם גרירה מקצועית, בתיאום ברור ובקשר ישיר — במרכז, בשרון ובשפלה.</span>
            </p>
            <div className="reveal reveal-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={onLocate} className="flex h-14 items-center justify-center gap-3 bg-[#f5d84e] px-7 text-[16px] font-black text-[#14181b] transition-transform hover:-translate-y-0.5 active:translate-y-0" data-testid="button-send-location">
                <Navigation size={19} strokeWidth={2.5} />
                שלחו מיקום ב-WhatsApp
              </button>
              <a href={`tel:${phone}`} className="flex h-14 items-center justify-center gap-3 border border-[#e7e8e4]/45 bg-[#14181b]/30 px-7 text-[16px] font-black text-[#f5f3ec] backdrop-blur-sm transition-colors hover:border-[#f5d84e] hover:text-[#f5d84e]" data-testid="link-hero-phone">
                <Phone size={18} />
                052-253-6758
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[12px] font-semibold text-[#b9bdbe]">
              <span className="flex items-center gap-2"><Check size={15} className="text-[#f5d84e]" /> קשר ישיר עם יגאל</span>
              <span className="flex items-center gap-2"><Check size={15} className="text-[#f5d84e]" /> תיאום ברור</span>
              <span className="flex items-center gap-2"><Check size={15} className="text-[#f5d84e]" /> גרירה בטוחה</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] font-bold tracking-[.15em] text-[#9da3a5] md:flex">
        <span className="h-px w-12 bg-[#9da3a5]/40" /> גללו לפרטים <span className="h-px w-12 bg-[#9da3a5]/40" />
      </div>
    </section>
  );
}

function QuickAction({ onLocate }: { onLocate: () => void }) {
  return (
    <section className="relative z-10 -mt-1 border-b border-[#14181b] bg-[#f5d84e] text-[#14181b]">
      <div className="container-wide flex flex-col items-start justify-between gap-5 py-6 md:flex-row md:items-center md:py-7">
        <div>
          <p className="text-[11px] font-black tracking-[.13em] opacity-60">הפעולה הכי מהירה עכשיו</p>
          <h2 className="mt-1 text-[22px] font-black leading-tight md:text-[26px]">שלחו מיקום וקבלו מענה ישיר ב-WhatsApp</h2>
        </div>
        <button type="button" onClick={onLocate} className="flex h-12 w-full items-center justify-center gap-3 border-2 border-[#14181b] px-6 text-[15px] font-black transition-colors hover:bg-[#14181b] hover:text-[#f5d84e] md:w-auto" data-testid="button-quick-location">
          <Crosshair size={18} /> שיתוף מיקום חכם
        </button>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { number: '01', icon: Bike, title: 'גרירת אופנועים', copy: 'איסוף והעברה בטוחה של אופנועים, עם ציוד מתאים ותיאום ישיר לאורך הדרך.' },
    { number: '02', icon: Truck, title: 'גרירת קטנועים', copy: 'גרירה מסודרת לקטנועים מכל הסוגים — מהנקודה שבה נעצרתם ועד היעד שתבחרו.' },
    { number: '03', icon: Clock3, title: 'שירות 24/6', copy: 'זמינים 24 שעות ביממה, שישה ימים בשבוע. העסק שומר שבת.' },
  ];
  return (
    <section id="services" className="border-b border-[#d4d8d9]/15 bg-[#191e21] py-20 md:py-28">
      <div className="container-wide">
        <div className="grid gap-12 md:grid-cols-[.72fr_1.28fr] md:gap-20">
          <div>
            <p className="flex items-center gap-3 text-[12px] font-black tracking-[.15em] text-[#f5d84e]"><span className="yellow-rule" /> מה עושים כאן</p>
            <h2 className="display mt-5 text-[clamp(3.3rem,7vw,6rem)] font-extrabold leading-[.86] tracking-[-.04em]">פשוט.<br /><span className="text-[#aeb3b4]">מקצועי.</span><br />בזמן.</h2>
            <p className="mt-7 max-w-[330px] text-[16px] leading-8 text-[#aeb3b4]">לא צריך לחפש פתרונות כשאתם תקועים. שולחים מיקום, מדברים עם יגאל, ומתקדמים משם.</p>
          </div>
          <div className="divide-y divide-[#d4d8d9]/15 border-y border-[#d4d8d9]/15">
            {services.map(({ number, icon: Icon, title, copy }) => (
              <article key={number} className="group flex gap-5 py-7 md:gap-8 md:py-9" data-testid={`card-service-${number}`}>
                <span className="display pt-1 text-[19px] font-bold text-[#f5d84e]">{number}</span>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#d4d8d9]/30 text-[#f5d84e]">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[21px] font-black text-[#f5f3ec]">{title}</h3>
                  <p className="mt-2 max-w-[460px] text-[15px] leading-7 text-[#aeb3b4]">{copy}</p>
                </div>
                <ArrowLeft className="mt-2 shrink-0 text-[#6f7678] transition-transform group-hover:-translate-x-1 group-hover:text-[#f5d84e]" size={20} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Coverage() {
  return (
    <section id="coverage" className="overflow-hidden border-b border-[#d4d8d9]/15 bg-[#14181b] py-20 md:py-28">
      <div className="container-wide">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1fr] md:gap-20">
          <div>
            <p className="flex items-center gap-3 text-[12px] font-black tracking-[.15em] text-[#f5d84e]"><span className="yellow-rule" /> איפה אנחנו</p>
            <h2 className="display mt-5 text-[clamp(3.5rem,8vw,7rem)] font-extrabold leading-[.82] tracking-[-.04em]">אזורי<br /><span className="text-[#aeb3b4]">השירות.</span></h2>
            <p className="mt-7 max-w-[430px] text-[17px] leading-8 text-[#b9bdbe]">שירותי גרירה במרכז, בשרון ובשפלה. דברו עם יגאל כדי לתאם את האיסוף והיעד המדויקים.</p>
            <div className="mt-8 grid max-w-[440px] grid-cols-3 border-y border-[#d4d8d9]/20">
              {['המרכז', 'השרון', 'השפלה'].map((region) => <div key={region} className="border-l border-[#d4d8d9]/20 py-4 text-center text-[15px] font-bold last:border-l-0" data-testid={`text-region-${region}`}>{region}</div>)}
            </div>
          </div>
          <div className="relative flex min-h-[400px] items-center justify-center md:min-h-[520px]" data-testid="graphic-coverage-map">
            <div className="absolute h-[290px] w-[290px] rounded-full border border-[#f5d84e]/15 md:h-[410px] md:w-[410px]" />
            <div className="absolute h-[210px] w-[210px] rounded-full border border-[#f5d84e]/10 md:h-[310px] md:w-[310px]" />
            <svg className="region-map relative h-[380px] w-[250px] md:h-[480px] md:w-[315px]" viewBox="0 0 280 470" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="מפת אזורי השירות">
              <path d="M144 12L171 30L169 57L192 78L183 108L209 131L197 154L217 182L204 205L220 229L202 248L207 276L187 296L195 321L174 338L178 365L158 389L149 425L126 451L108 430L91 418L94 391L75 372L82 344L66 320L74 291L57 267L70 241L56 214L74 192L65 163L85 144L80 116L103 96L100 67L125 53L122 27L144 12Z" fill="#252c30" stroke="#697275" strokeWidth="1.5" />
              <path d="M83 143L183 108L197 154L204 205L187 224L75 192L65 163L83 143Z" fill="rgba(245,216,78,.23)" stroke="#f5d84e" strokeWidth="1.5" />
              <path d="M75 192L187 224L202 248L187 296L74 291L57 267L70 241L56 214L75 192Z" fill="#30383c" stroke="#8c9495" strokeWidth="1.5" />
              <path d="M74 291L187 296L195 321L174 338L178 365L158 389L149 425L126 451L108 430L91 418L94 391L75 372L82 344L66 320L74 291Z" fill="#242b2f" stroke="#697275" strokeWidth="1.5" />
              <circle cx="130" cy="178" r="5" fill="#f5d84e" /><circle cx="130" cy="178" r="11" stroke="#f5d84e" strokeOpacity=".35" />
              <text x="145" y="182" fill="#F3F1E9" fontSize="12" fontFamily="Heebo">המרכז</text>
              <text x="124" y="248" fill="#B9BDBE" fontSize="12" fontFamily="Heebo">השפלה</text>
              <text x="137" y="128" fill="#B9BDBE" fontSize="12" fontFamily="Heebo">השרון</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const values = [
    { icon: Phone, title: 'קשר ישיר', copy: 'מדברים עם יגאל, בלי מוקד ובלי להעביר אתכם מאדם לאדם.' },
    { icon: Route, title: 'תיאום ברור', copy: 'מהנקודה שבה אתם נמצאים ועד היעד — מתאמים ומתקדמים.' },
    { icon: ShieldCheck, title: 'שירות מקצועי', copy: 'ציוד מתאים, גישה אחראית ושקט נפשי כשזה הכי חשוב.' },
  ];
  return (
    <section id="values" className="border-b border-[#d4d8d9]/15 bg-[#e6e6df] py-20 text-[#14181b] md:py-24">
      <div className="container-wide">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div><p className="text-[12px] font-black tracking-[.15em] text-[#6c6f6d]">למה להתקשר ליגאל</p><h2 className="display mt-3 text-[clamp(3rem,7vw,5.7rem)] font-extrabold leading-[.85] tracking-[-.04em]">כשהדרך<br />נעצרת — יש פתרון.</h2></div>
          <p className="max-w-[300px] text-[15px] font-semibold leading-7 text-[#5e6261]">עזרה עניינית, בזמן, מאדם שמכיר את הדרך.</p>
        </div>
        <div className="mt-14 grid gap-px bg-[#14181b]/15 md:grid-cols-3">
          {values.map(({ icon: Icon, title, copy }, index) => (
            <article key={title} className="bg-[#e6e6df] p-7 md:p-9" data-testid={`card-value-${index}`}>
              <Icon size={28} strokeWidth={1.8} className="text-[#14181b]" />
              <h3 className="mt-9 text-[22px] font-black">{title}</h3>
              <p className="mt-3 max-w-[260px] text-[15px] leading-7 text-[#606462]">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientWork() {
  return (
    <section id="client-work" className="border-b border-[#d4d8d9]/15 bg-[#191e21] py-20 md:py-28">
      <div className="container-wide">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="flex items-center gap-3 text-[12px] font-black tracking-[.15em] text-[#f5d84e]"><span className="yellow-rule" /> עבודות מהשטח</p><h2 className="display mt-4 text-[clamp(3rem,7vw,5.8rem)] font-extrabold leading-[.85] tracking-[-.04em]">הכלים<br /><span className="text-[#aeb3b4]">שהגיעו ליעד.</span></h2></div>
          <p className="max-w-[310px] text-[13px] leading-6 text-[#aeb3b4]">תמונות וסרטון שסיפק יגאל — עבודות אמיתיות מהשטח, עם קשירה מסודרת ותשומת לב לכל כלי.</p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-[.82fr_1.18fr]">
          <figure className="group relative min-h-[480px] overflow-hidden bg-[#0e1112] lg:min-h-[610px]">
            <video controls playsInline preload="metadata" poster="/client-work/ducati-diavel.jpeg" className="h-full min-h-[480px] w-full object-cover lg:min-h-[610px]" aria-label="סרטון עבודת גרירת אופנוע מהשטח">
              <source src="/client-work/towing-video.mp4" type="video/mp4" />
              הדפדפן שלכם אינו תומך בניגון וידאו.
            </video>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14181b]/95 to-transparent px-5 pb-5 pt-16">
              <figcaption className="text-sm font-bold text-[#f5f3ec]">סרטון מהשטח <span className="mr-2 text-[#f5d84e]">/ העמסה ושינוע בטוח</span></figcaption>
            </div>
          </figure>
          <div className="grid gap-4 sm:grid-cols-2">
            <figure className="group relative min-h-[290px] overflow-hidden bg-[#272d30] sm:min-h-[300px]">
              <img src="/client-work/kawasaki.jpeg" alt="אופנוע Kawasaki קשור על נגרר — עבודה מהשטח" loading="lazy" decoding="async" className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14181b]/90 via-transparent to-transparent" />
              <figcaption className="absolute bottom-5 right-5 text-sm font-bold text-[#f5f3ec]">Kawasaki <span className="mr-2 text-[#f5d84e]">/ קשירה מאובטחת</span></figcaption>
            </figure>
            <figure className="group relative min-h-[290px] overflow-hidden bg-[#272d30] sm:min-h-[300px]">
              <img src="/client-work/bmw-r1250.jpeg" alt="אופנוע BMW R1250 קשור על נגרר — עבודה מהשטח" loading="lazy" decoding="async" className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14181b]/90 via-transparent to-transparent" />
              <figcaption className="absolute bottom-5 right-5 text-sm font-bold text-[#f5f3ec]">BMW R1250 <span className="mr-2 text-[#f5d84e]">/ בדרך ליעד</span></figcaption>
            </figure>
            <figure className="group relative min-h-[290px] overflow-hidden bg-[#272d30] sm:min-h-[300px]">
              <img src="/client-work/ducati-diavel.jpeg" alt="אופנוע Ducati Diavel על נגרר — עבודה מהשטח" loading="lazy" decoding="async" className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14181b]/90 via-transparent to-transparent" />
              <figcaption className="absolute bottom-5 right-5 text-sm font-bold text-[#f5f3ec]">Ducati Diavel <span className="mr-2 text-[#f5d84e]">/ העמסה זהירה</span></figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  ['באילו אזורים אתם נותנים שירות?', 'השירות ניתן במרכז, בשרון ובשפלה. שלחו מיקום או דברו עם יגאל כדי לבדוק תיאום לנקודה המדויקת שלכם.'],
  ['האם השירות זמין 24/6?', 'כן. אפשר ליצור קשר 24 שעות ביממה, שישה ימים בשבוע. העסק שומר שבת.'],
  ['איך מזמינים גרירה?', 'הדרך המהירה היא ללחוץ על “שלחו מיקום ב-WhatsApp”. אפשר גם להתקשר ישירות ל-052-253-6758.'],
  ['האם אתם גוררים גם קטנועים?', 'כן. השירות כולל גרירת אופנועים וקטנועים.'],
  ['מה קורה אם אין לי אפשרות לשלוח מיקום?', 'אפשר לכתוב כתובת או נקודת ציון ידנית ב-WhatsApp, ויגאל יתאם את האיסוף מולכם.'],
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-b border-[#d4d8d9]/15 bg-[#14181b] py-20 md:py-28">
      <div className="container-wide grid gap-12 md:grid-cols-[.7fr_1.3fr] md:gap-24">
        <div><p className="flex items-center gap-3 text-[12px] font-black tracking-[.15em] text-[#f5d84e]"><span className="yellow-rule" /> לפני שמתקשרים</p><h2 className="display mt-4 text-[clamp(3.2rem,7vw,5.7rem)] font-extrabold leading-[.84] tracking-[-.04em]">שאלות<br /><span className="text-[#aeb3b4]">נפוצות.</span></h2></div>
        <div className="border-t border-[#d4d8d9]/20">
          {faqs.map(([question, answer], index) => (
            <div key={question} className="border-b border-[#d4d8d9]/20" data-testid={`faq-item-${index}`}>
              <button type="button" onClick={() => setOpen(open === index ? null : index)} className="flex min-h-[72px] w-full items-center justify-between gap-5 text-right text-[17px] font-bold text-[#f5f3ec]" aria-expanded={open === index} data-testid={`button-faq-${index}`}>
                <span>{question}</span><ChevronDown size={19} className={`shrink-0 text-[#f5d84e] transition-transform ${open === index ? 'rotate-180' : ''}`} />
              </button>
              {open === index && <p className="max-w-[620px] pb-6 text-[15px] leading-7 text-[#aeb3b4]" data-testid={`text-faq-answer-${index}`}>{answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationSheet({ onClose }: { onClose: () => void }) {
  const [address, setAddress] = useState('');
  const sendAddress = () => {
    const message = address.trim() ? `שלום יגאל, אני צריך/ה גרירה. הכתובת שלי: ${address.trim()}` : quickMessage;
    openWhatsApp(message);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#090b0c]/75 p-3 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" aria-labelledby="location-title">
      <div className="w-full max-w-[520px] border border-[#d4d8d9]/25 bg-[#1b2124] p-6 shadow-2xl sm:p-8" dir="rtl">
        <div className="flex items-start justify-between gap-4">
          <div><span className="mb-4 flex h-10 w-10 items-center justify-center bg-[#f5d84e] text-[#14181b]"><MapPin size={20} /></span><h2 id="location-title" className="text-2xl font-black text-[#f5f3ec]">לא הצלחנו לקבל מיקום</h2><p className="mt-2 text-sm leading-6 text-[#aeb3b4]">אפשר לכתוב כתובת או נקודת ציון, ויגאל יחזור אליכם ב-WhatsApp.</p></div>
          <button type="button" onClick={onClose} className="text-[#aeb3b4] hover:text-[#f5f3ec]" aria-label="סגירה" data-testid="button-close-location"><X size={22} /></button>
        </div>
        <label htmlFor="address" className="mt-7 block text-sm font-bold text-[#f5f3ec]">כתובת או נקודת ציון <span className="font-normal text-[#8e9597]">(אפשר לדלג)</span></label>
        <input id="address" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="לדוגמה: כביש 4, מחלף מורשה" className="mt-2 h-14 w-full border border-[#d4d8d9]/30 bg-[#14181b] px-4 text-base text-[#f5f3ec] placeholder:text-[#687073]" data-testid="input-fallback-address" autoFocus />
        <button type="button" onClick={sendAddress} className="mt-4 flex h-14 w-full items-center justify-center gap-2 bg-[#f5d84e] font-black text-[#14181b]" data-testid="button-send-address"><Send size={18} /> שליחה ב-WhatsApp</button>
        <p className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-[#7f888a]"><CircleAlert size={15} className="mt-0.5 shrink-0" /> המיקום משותף רק אחרי אישור שלכם. לא שומרים נתוני מיקום באתר.</p>
      </div>
    </div>
  );
}

function ClosingCTA({ onLocate }: { onLocate: () => void }) {
  return (
    <section className="relative overflow-hidden bg-[#f5d84e] py-20 text-[#14181b] md:py-28">
      <div className="absolute -left-10 -top-16 display text-[24rem] font-black leading-none text-[#14181b]/[.045]">24</div>
      <div className="container-wide relative">
        <p className="text-[12px] font-black tracking-[.15em] text-[#5f5e32]">אל תישארו לבד בצד הדרך</p>
        <h2 className="display mt-5 max-w-[850px] text-[clamp(3.8rem,10vw,8.5rem)] font-extrabold leading-[.8] tracking-[-.045em]">שלחו מיקום.<br />מתקדמים.</h2>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onLocate} className="flex h-14 items-center justify-center gap-3 bg-[#14181b] px-7 text-[16px] font-black text-[#f5f3ec] transition-transform hover:-translate-y-0.5" data-testid="button-closing-location"><Navigation size={19} /> שלחו מיקום ב-WhatsApp</button>
          <a href={`tel:${phone}`} className="flex h-14 items-center justify-center gap-3 border-2 border-[#14181b] px-7 text-[16px] font-black" data-testid="link-closing-phone"><Phone size={18} /> חייגו 052-253-6758</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#101416] pb-24 pt-10 md:pb-10">
      <div className="container-wide flex flex-col justify-between gap-7 text-sm text-[#8f9698] md:flex-row md:items-end">
        <div><Logo /><p className="mt-5 text-xs text-[#687073]">גרירת אופנועים וקטנועים במרכז, בשרון ובשפלה.</p></div>
        <div className="text-right md:text-left"><p className="text-xs text-[#687073]">זמינים 24/6 · עסק שומר שבת</p><a href={`tel:${phone}`} className="mt-1 block text-lg font-black text-[#f5f3ec]" data-testid="link-footer-phone">052-253-6758</a><p className="mt-3 text-[11px] text-[#687073]">© {new Date().getFullYear()} גרר יגאל</p></div>
      </div>
    </footer>
  );
}

function BottomBar({ onLocate }: { onLocate: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d4d8d9]/15 bg-[#14181b]/95 p-3 backdrop-blur-md md:hidden" dir="rtl">
      <div className="grid grid-cols-[1fr_1.35fr] gap-2">
        <a href={`tel:${phone}`} className="flex h-12 items-center justify-center gap-2 border border-[#d4d8d9]/35 text-sm font-black text-[#f5f3ec]" data-testid="link-bottom-phone"><Phone size={17} /> חייגו</a>
        <button type="button" onClick={onLocate} className="flex h-12 items-center justify-center gap-2 bg-[#f5d84e] text-sm font-black text-[#14181b]" data-testid="button-bottom-location"><Navigation size={17} /> שלחו מיקום</button>
      </div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationSheet, setLocationSheet] = useState(false);

  useEffect(() => {
    document.title = 'יגאל לוי — גרירת אופנועים וקטנועים 24/6';
    const description = 'גרירת אופנועים וקטנועים 24/6 במרכז, בשרון ובשפלה. עסק שומר שבת. שירות מקצועי, תיאום ברור וקשר ישיר עם יגאל לוי.';
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', description);
  }, []);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationSheet(true);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        openWhatsApp(`שלום יגאל, נתקעתי עם האופנוע/קטנוע. זה המיקום שלי: ${mapsLink}`);
      },
      () => setLocationSheet(true),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  };

  return (
    <div dir="rtl" className="noise min-h-[100dvh] overflow-x-hidden bg-[#14181b] text-[#f5f3ec]">
      <Header onMenu={() => setMenuOpen(true)} />
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      <main className="bottom-safe">
        <Hero onLocate={requestLocation} />
        <QuickAction onLocate={requestLocation} />
        <ClientWork />
        <Services />
        <Coverage />
        <Values />
        <FAQ />
        <ClosingCTA onLocate={requestLocation} />
      </main>
      <Footer />
      <a href={whatsappUrl(quickMessage)} target="_blank" rel="noreferrer" className="floating-whatsapp fixed bottom-24 left-4 z-30 flex h-16 w-16 items-center justify-center rounded-full bg-[#25d366] text-[#102016] shadow-[0_10px_30px_rgba(37,211,102,.35)] ring-4 ring-[#25d366]/25 transition-transform hover:scale-110 md:bottom-6 md:left-6" aria-label="פתיחת WhatsApp" data-testid="link-floating-whatsapp"><FaWhatsapp size={34} /></a>
      <BottomBar onLocate={requestLocation} />
      {locationSheet && <LocationSheet onClose={() => setLocationSheet(false)} />}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <WouterRoute path="/" component={Home} />
        <WouterRoute component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;