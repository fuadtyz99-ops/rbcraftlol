import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    const els = contentRef.current.children
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.3,
    })
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center"
      style={{ zIndex: 1 }}
    >
      <div
        ref={contentRef}
        className="relative max-w-[1200px] mx-auto px-6 pt-16"
        style={{ zIndex: 2 }}
      >
        <p
          className="font-mono text-xs uppercase tracking-[0.1em] text-rc-gold mb-6 opacity-0 translate-y-4"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
        >
          SURVIVE. BUILD. CONQUER.
        </p>
        <h1
          className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl text-white leading-[1.1] mb-2 opacity-0 translate-y-4"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)', letterSpacing: '-0.02em' }}
        >
          Minecraft
        </h1>
        <h1
          className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[1.1] mb-6 opacity-0 translate-y-4 gradient-text"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)', letterSpacing: '-0.02em' }}
        >
          RainbowCraft
        </h1>
        <p
          className="font-body text-lg text-rc-muted max-w-[480px] mb-6 opacity-0 translate-y-4"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
        >
          Server Survival Economy dengan komunitas aktif dan ramah. Crossplay
          Java dan Bedrock, rank system, dan event menarik tiap minggunya.
        </p>
        <div
          className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 font-mono text-sm text-white/80 opacity-0 translate-y-4"
        >
          <span className="text-rc-green">●</span>
          IP: main.rainbowcraft.my.id
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-10 opacity-0 translate-y-4">
          <a
            href="https://discord.gg/3Xu6kJEw4"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-bg text-white font-semibold text-sm px-8 py-4 hover:opacity-90 transition-opacity"
          >
            Gabung Sekarang
          </a>
          <a
            href="#ranks"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#ranks')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="bg-transparent border border-white/30 text-white font-semibold text-sm px-8 py-4 hover:border-white/60 transition-colors"
          >
            Lihat Rank
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  )
}
