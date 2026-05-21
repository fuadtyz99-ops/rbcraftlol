import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, Clock, ShieldCheck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Globe, value: '99.9%', label: 'Server Uptime' },
  { icon: Clock, value: '<5s', label: 'Deploy Time' },
  { icon: ShieldCheck, value: 'Anti-Cheat', label: 'Protection' },
]

export default function ServerPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.from(imgRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      }
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="server"
      ref={sectionRef}
      className="relative bg-[#0A0A0A] py-[120px]"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-rc-gold mb-4">
            SERVER PREVIEW
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-2">
            Lihat Dunia
          </h2>
          <h2 className="font-display font-bold text-4xl md:text-5xl gradient-text">
            RainbowCraft
          </h2>
        </div>

        {/* Image */}
        <div
          ref={imgRef}
          className="border border-white/10 overflow-hidden mb-12"
          style={{ aspectRatio: '16/9' }}
        >
          <img
            src="/server-preview.jpg"
            alt="RainbowCraft Server Preview"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.label}
                className="flex items-center gap-4 bg-rc-card border border-white/5 p-6"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-rc-purple/10">
                  <Icon size={24} className="text-rc-purple" />
                </div>
                <div>
                  <p className="font-display font-bold text-2xl text-white">
                    {s.value}
                  </p>
                  <p className="font-body text-sm text-rc-muted">{s.label}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Server Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-rc-card border border-white/5 p-6">
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Java Edition
            </h3>
            <p className="font-mono text-sm text-rc-muted">
              IP: main.rainbowcraft.my.id
            </p>
            <p className="font-body text-sm text-rc-muted mt-2">
              Versi 1.20+
            </p>
          </div>
          <div className="bg-rc-card border border-white/5 p-6">
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Bedrock Edition
            </h3>
            <p className="font-mono text-sm text-rc-muted">
              IP: main.rainbowcraft.my.id
            </p>
            <p className="font-mono text-sm text-rc-muted">
              Port: 25354
            </p>
          </div>
          <div className="bg-rc-card border border-white/5 p-6">
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Mode
            </h3>
            <p className="font-body text-sm text-rc-muted">
              Survival Economy
            </p>
            <p className="font-body text-sm text-rc-muted">
              Crossplay Java & Bedrock
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
