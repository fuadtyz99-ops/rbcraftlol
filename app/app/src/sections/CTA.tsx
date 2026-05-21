import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      const children = contentRef.current?.children
      if (children) {
        gsap.from(children[0], {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        })
        gsap.from(children[1], {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        })
        gsap.from(children[2], {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-40 overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/cta-bg.jpg)' }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative max-w-[1200px] mx-auto px-6 text-center"
      >
        <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-2">
          Tunggu Apa Lagi?
        </h2>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl gradient-text mb-6">
          Server Impianmu Hanya Sekali Klik!
        </h2>
        <p className="font-body text-rc-muted text-base max-w-[600px] mx-auto mb-10">
          Gabung dengan ribuan pemain lainnya. Build, survive, dan conquer
          bersama!
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://discord.gg/3Xu6kJEw4"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-bg text-white font-semibold text-sm px-8 py-4 hover:opacity-90 transition-opacity"
          >
            Mulai Sekarang
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
    </section>
  )
}
