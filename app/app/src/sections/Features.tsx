import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap, Shield, TrendingUp, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Zap,
    color: '#F1C40F',
    title: 'Crossplay Java & Bedrock',
    desc: 'Main dari platform apapun, PC maupun mobile, semua bisa join!',
  },
  {
    icon: Shield,
    color: '#2ECC71',
    title: 'Protection Grief',
    desc: 'Base kamu aman dari griefing. Claim land dan build dengan tenang.',
  },
  {
    icon: TrendingUp,
    color: '#9B59B6',
    title: 'Economy Balance',
    desc: 'Sistem ekonomi yang adil. Jual beli di shop, kerjakan quest, dan kaya bareng.',
  },
  {
    icon: Users,
    color: '#E67E22',
    title: 'Komunitas Aktif',
    desc: 'Pemain aktif setiap hari. Event mingguan dan kompetisi seru!',
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
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

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative bg-[#0A0A0A] py-[120px]"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-rc-gold mb-4">
            KENAPA PILIH RAINBOWCRAFT
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Server Terbaik Untuk Komunitasmu
          </h2>
          <p className="font-body text-rc-muted text-base">
            Semua yang kamu butuhin buat main Minecraft ada di sini!
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el
                }}
                className="bg-rc-card border border-white/5 p-8 hover:border-white/10 transition-colors"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${f.color}15` }}
                >
                  <Icon size={24} style={{ color: f.color }} />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-3">
                  {f.title}
                </h3>
                <p className="font-body text-sm text-rc-muted leading-relaxed">
                  {f.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
