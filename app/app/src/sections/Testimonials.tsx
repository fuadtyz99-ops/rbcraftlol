import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    text: 'Seru banget main di RainbowCraft! Komunitasnya ramah dan banyak event.',
    author: 'Fajar',
    role: 'Player',
  },
  {
    text: 'Sistem economynya balance, gak ada yang terlalu OP. Recommended!',
    author: 'Bima',
    role: 'Player',
  },
  {
    text: 'Adminnya responsif, server stabil, dan crossplaynya lancar.',
    author: 'Dinda',
    role: 'Player',
  },
  {
    text: 'Server paling ramah yang pernah saya mainkan. Eventnya seru-seru!',
    author: 'Rizky',
    role: 'Player',
  },
  {
    text: 'Rank systemnya adil, gak P2W. Grindable semua. Mantap!',
    author: 'Aulia',
    role: 'Player',
  },
  {
    text: 'Dari awal reset season sampai sekarang, server tetap stabil.',
    author: 'Nugroho',
    role: 'Player',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !labelRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Duplicate for seamless loop
  const allTestimonials = [...testimonials, ...testimonials]

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0A0A] py-20 overflow-hidden"
      style={{ zIndex: 2 }}
    >
      <div className="text-center mb-12">
        <p
          ref={labelRef}
          className="font-mono text-xs uppercase tracking-[0.1em] text-rc-gold"
        >
          TESTIMONI PEMAIN
        </p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="marquee-track flex gap-6 w-max">
          {allTestimonials.map((t, i) => (
            <div
              key={`${t.author}-${i}`}
              className="bg-rc-card border border-white/5 p-6 min-w-[320px] max-w-[320px] shrink-0"
            >
              <p className="font-body text-sm text-white/80 leading-relaxed mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 flex items-center justify-center font-display font-bold text-sm"
                  style={{
                    background: `linear-gradient(135deg, #9B59B6, #E67E22)`,
                  }}
                >
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="font-body text-sm text-white font-medium">
                    {t.author}
                  </p>
                  <p className="font-mono text-xs text-rc-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
