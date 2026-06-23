"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Megaphone,
  Monitor,
  Palette,
  Search,
  Share2,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import SectionBadge from "@/app/components/shared/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    icon: ShoppingCart,
    title: "حلول التجارة الإلكترونية",
    category: "E-commerce",
    href: "/services/ecommerce",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1900&q=90&auto=format&fit=crop",
    imagePosition: "center",
    desc: "نوفرلك أفضل استراتيجيات وحلول التجارة الإلكترونية، ونساعدك في إدارة نشاطك التجاري بدقة لتحقيق زيادة حقيقية في المبيعات.",
  },
  {
    num: "02",
    icon: Monitor,
    title: "تصميم المواقع الإلكترونية",
    category: "Web Design",
    href: "/services/web-design",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1900&q=90&auto=format&fit=crop",
    imagePosition: "center",
    desc: "نصمم مواقع احترافية تعكس هوية مشروعك وتساعد العملاء على اكتشاف خدماتك ومنتجاتك بشكل واضح وجذاب.",
  },
  {
    num: "03",
    icon: Megaphone,
    title: "إدارة الحملات المدفوعة",
    category: "Paid Ads",
    href: "/services/paid-ads",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1900&q=90&auto=format&fit=crop",
    imagePosition: "center",
    desc: "نقدملك خطط إعلانية مدروسة تساعد نشاطك في الانتشار والوصول لعملاء مهتمين عبر السوشيال ميديا وجوجل.",
  },
  {
    num: "04",
    icon: Share2,
    title: "إدارة السوشيال ميديا",
    category: "Social Media",
    href: "/services/social-media",
    image:
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=1900&q=90&auto=format&fit=crop",
    imagePosition: "center",
    desc: "ندير حساباتك باحترافية، من التخطيط للمحتوى وحتى رفع التفاعل وبناء حضور قوي لعلامتك التجارية.",
  },
  {
    num: "05",
    icon: Search,
    title: "تحسين محركات البحث SEO",
    category: "SEO",
    href: "/services/seo",
    image:
      "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1900&q=90&auto=format&fit=crop",
    imagePosition: "center",
    desc: "نحسن ظهور موقعك في نتائج البحث ونساعدك توصل لعملاء جدد من خلال استراتيجية SEO واضحة وقابلة للقياس.",
  },
  {
    num: "06",
    icon: Palette,
    title: "تصميم جرافيك وموشن",
    category: "Creative",
    href: "/services/creative-design",
    image:
      "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=1900&q=90&auto=format&fit=crop",
    imagePosition: "center",
    desc: "نصمم هوية بصرية وتصميمات ثابتة ومتحركة تعبر عن مشروعك وتدي انطباع احترافي لجمهورك.",
  },
  {
    num: "07",
    icon: TrendingUp,
    title: "تحسين معدل التحويل CRO",
    category: "Growth",
    href: "/services/cro",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1900&q=90&auto=format&fit=crop",
    imagePosition: "center",
    desc: "نحلل رحلة العميل ونحسن تجربة المستخدم لزيادة نسبة التحويل من زائر إلى عميل فعلي.",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const handleCardEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const btn = card.querySelector<HTMLElement>("[data-read-btn]");
    const inner = card.querySelector<HTMLElement>("[data-read-inner]");
    const ring = card.querySelector<HTMLElement>("[data-read-ring]");
    const arrow = card.querySelector<HTMLElement>("[data-read-arrow]");
    const image = card.querySelector<HTMLImageElement>("img");
    const glow = card.querySelector<HTMLElement>("[data-card-glow]");

    if (!btn) return;

    const rect = card.getBoundingClientRect();

    gsap.killTweensOf([btn, inner, ring, arrow, image, glow]);

    gsap.set(btn, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      xPercent: -50,
      yPercent: -50,
      rotate: -12,
      scale: 0.45,
    });

    gsap.to(btn, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 0.48,
      ease: "elastic.out(1, 0.5)",
      overwrite: true,
    });

    if (inner) {
      gsap.fromTo(
        inner,
        { y: 12, scale: 0.86, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.38,
          ease: "back.out(1.8)",
          overwrite: true,
        }
      );
    }

    if (ring) {
      gsap.fromTo(
        ring,
        { rotate: -140 },
        { rotate: 360, duration: 0.82, ease: "power3.out", overwrite: true }
      );
    }

    if (arrow) {
      gsap.fromTo(
        arrow,
        { x: -7, y: 7, scale: 0.6, rotate: -45 },
        {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.4,
          ease: "back.out(2)",
          overwrite: true,
        }
      );
    }

    if (image) {
      gsap.to(image, {
        scale: 1.07,
        filter: "grayscale(0%) contrast(1.08)",
        duration: 0.85,
        ease: "power3.out",
        overwrite: true,
      });
    }

    if (glow) {
      gsap.to(glow, { opacity: 1, duration: 0.35, ease: "power3.out", overwrite: true });
    }
  };

  const handleCardMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const btn = card.querySelector<HTMLElement>("[data-read-btn]");
    const inner = card.querySelector<HTMLElement>("[data-read-inner]");
    const ring = card.querySelector<HTMLElement>("[data-read-ring]");
    const arrow = card.querySelector<HTMLElement>("[data-read-arrow]");
    const glow = card.querySelector<HTMLElement>("[data-card-glow]");

    if (!btn) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = (x - rect.width / 2) / rect.width;
    const dy = (y - rect.height / 2) / rect.height;

    gsap.to(btn, {
      x,
      y,
      rotate: dx * 16,
      duration: 0.25,
      ease: "power3.out",
      overwrite: true,
    });

    if (inner) {
      gsap.to(inner, {
        x: dx * 12,
        y: dy * 12,
        duration: 0.3,
        ease: "power3.out",
        overwrite: true,
      });
    }

    if (ring) {
      gsap.to(ring, {
        rotate: 360 + dx * 70,
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: dx * 5,
        y: dy * 5,
        duration: 0.25,
        ease: "power3.out",
        overwrite: true,
      });
    }

    if (glow) {
      gsap.to(glow, {
        x: dx * 65,
        y: dy * 65,
        opacity: 1,
        duration: 0.32,
        ease: "power3.out",
        overwrite: true,
      });
    }
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const btn = card.querySelector<HTMLElement>("[data-read-btn]");
    const inner = card.querySelector<HTMLElement>("[data-read-inner]");
    const ring = card.querySelector<HTMLElement>("[data-read-ring]");
    const arrow = card.querySelector<HTMLElement>("[data-read-arrow]");
    const glow = card.querySelector<HTMLElement>("[data-card-glow]");
    const image = card.querySelector<HTMLImageElement>("img");

    if (btn) {
      gsap.to(btn, {
        opacity: 0,
        scale: 0.45,
        rotate: -15,
        duration: 0.22,
        ease: "power2.out",
        overwrite: true,
      });
    }

    if (inner) {
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 0.22,
        ease: "power2.out",
        overwrite: true,
      });
    }

    if (ring) {
      gsap.to(ring, { rotate: 0, duration: 0.22, ease: "power2.out", overwrite: true });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.22,
        ease: "power2.out",
        overwrite: true,
      });
    }

    if (glow) {
      gsap.to(glow, {
        opacity: 0,
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
    }

    if (image) {
      gsap.to(image, {
        scale: 1,
        filter: "grayscale(100%) contrast(1)",
        duration: 0.8,
        ease: "power3.out",
        overwrite: true,
      });
    }
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", section);
        const head = section.querySelector<HTMLElement>("[data-service-head]");

        gsap.set(section.querySelectorAll("[data-read-btn]"), {
          opacity: 0,
          scale: 0.45,
          xPercent: -50,
          yPercent: -50,
          rotate: -15,
          willChange: "transform, opacity",
        });

        gsap.set(section.querySelectorAll("img"), {
          filter: "grayscale(100%) contrast(1)",
          willChange: "transform, filter",
        });

        if (head) {
          gsap.fromTo(
            head,
            { y: 50, opacity: 0, filter: "blur(10px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
                once: true,
              },
            }
          );
        }

        gsap.fromTo(
          cards,
          {
            y: 70,
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.85,
            stagger: 0.045,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              once: true,
            },
          }
        );

        gsap.set(track, {
          x: 0,
          willChange: "transform",
          force3D: true,
        });

        const getScrollAmount = () => {
          const safeEndSpace = window.innerWidth * 0.16;
          const amount = track.scrollWidth - window.innerWidth + safeEndSpace;
          return -Math.max(amount, 0);
        };

        const horizontalTween = gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.abs(getScrollAmount())}`,
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        const refreshCall = gsap.delayedCall(0.3, () => ScrollTrigger.refresh());

        return () => {
          refreshCall.kill();
          horizontalTween.kill();
        };
      });

      mm.add("(max-width: 1023px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", section);
        const head = section.querySelector<HTMLElement>("[data-service-head]");

        if (head) {
          gsap.fromTo(
            head,
            { y: 34, opacity: 0, filter: "blur(8px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 84%", once: true },
            }
          );
        }

        gsap.fromTo(
          cards,
          { y: 45, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.75,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
          }
        );
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      dir="ltr"
      className="relative min-h-screen overflow-hidden bg-[#000] py-24 lg:h-screen lg:py-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(200,0,0,0.18),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />

      <div
        data-service-head
        dir="rtl"
        className="relative z-30 mb-10 px-6 text-right lg:absolute lg:right-12 lg:top-[5vh] lg:mb-0 lg:px-0"
      >
        <SectionBadge text="خدماتنا" />

        <h2 className="mt-5 text-[clamp(3.2rem,7.2vw,7.7rem)] font-black leading-[0.88] tracking-[-0.065em] text-white">
          خدماتنا
        </h2>

        <p className="mt-6 max-w-xl text-base leading-8 text-gray-300 lg:mr-auto">
          كروت خدماتنا بقت بنفس إحساس المعرض: صور كبيرة، حركة أفقية، وزرار قراءة بيتحرك جوه الكارت.
        </p>
      </div>

      <div
        ref={trackRef}
        dir="ltr"
        className="relative z-10 flex flex-col gap-8 px-6 pt-8 lg:mt-[28vh] lg:w-max lg:flex-row lg:gap-12 lg:px-[6vw] lg:pt-0"
      >
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <Link
              key={service.num}
              href={service.href}
              data-service-card
              dir="rtl"
              onMouseEnter={handleCardEnter}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              className="group relative flex h-[58vh] min-h-[430px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#111] text-right shadow-[0_30px_90px_rgba(0,0,0,0.45)] lg:w-[52vw] lg:min-w-[720px]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale"
                  style={{ objectPosition: service.imagePosition }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/48 to-black/10" />
                <div className="absolute inset-0 bg-hook-red/0 transition-colors duration-500 group-hover:bg-hook-red/10" />

                <span
                  data-card-glow
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hook-red/20 opacity-0 blur-3xl"
                />

                <span
                  data-read-btn
                  className="pointer-events-none absolute left-1/2 top-1/2 z-[80] flex h-[132px] w-[132px] -translate-x-1/2 -translate-y-1/2 scale-50 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                >
                  <span className="absolute -inset-5 rounded-full bg-white/10 blur-2xl" />
                  <span className="absolute inset-0 rounded-full border border-white/25 bg-white/[0.94] shadow-[0_35px_110px_rgba(255,255,255,0.24)] backdrop-blur-2xl" />
                  <span className="absolute inset-[1px] rounded-full bg-[radial-gradient(circle_at_32%_24%,#fff_0%,rgba(255,255,255,0.82)_24%,rgba(255,255,255,0.54)_46%,rgba(255,255,255,0.92)_100%)]" />
                  <span className="absolute inset-[9px] rounded-full bg-[radial-gradient(circle_at_bottom,rgba(200,0,0,0.18),transparent_58%)]" />

                  <span
                    data-read-ring
                    className="absolute inset-[10px] rounded-full border border-black/10 border-t-hook-red border-r-hook-red/40"
                  />

                  <span className="absolute inset-[20px] rounded-full border border-black/5" />
                  <span className="absolute right-2 top-7 h-3.5 w-3.5 rounded-full bg-hook-red shadow-[0_0_24px_rgba(200,0,0,0.9)]" />

                  <span
                    data-read-inner
                    dir="ltr"
                    className="relative z-10 flex flex-col items-center justify-center text-black"
                  >
                    <span className="text-[10px] font-black uppercase leading-none tracking-[0.22em] text-black/55">
                      Read
                    </span>

                    <span className="mt-1 flex items-center gap-1 text-[13px] font-black uppercase leading-none tracking-[0.12em] text-black">
                      More
                      <span
                        data-read-arrow
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-hook-red text-white shadow-[0_10px_25px_rgba(200,0,0,0.35)]"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </span>
                  </span>
                </span>
              </div>

              <div className="pointer-events-none relative z-10 flex h-full w-full flex-col justify-between p-7 md:p-10">
                <div className="flex items-start justify-between gap-5">
                  <span
                    dir="ltr"
                    className="rounded-full border border-white/10 bg-black/30 px-4 py-2 font-mono text-xs font-black text-white/55 backdrop-blur-md"
                  >
                    [{service.num}]
                  </span>

                  <span
                    dir="ltr"
                    className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/65 backdrop-blur-md"
                  >
                    {service.category}
                  </span>
                </div>

                <div>
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md">
                    <Icon className="h-8 w-8 text-hook-red" />
                  </div>

                  <h3 className="max-w-3xl text-4xl font-black leading-tight tracking-[-0.045em] text-white md:text-6xl">
                    {service.title}
                  </h3>

                  <p className="mt-5 max-w-2xl text-sm leading-8 text-gray-300 md:text-base">
                    {service.desc}
                  </p>

                  <div className="mt-6 h-[1px] w-full origin-right scale-x-0 bg-white/45 transition-transform duration-700 group-hover:scale-x-100" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
