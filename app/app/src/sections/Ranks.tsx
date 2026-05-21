import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ranks = [
  {
    name: 'Scribble',
    color: '#3498DB',
    price: 'Rp10.000',
    permissions: ['8x Claim', '20.000 Block', '8x Sethome', 'Money 25k'],
    commands: ['/clan create', '/repair', '/food', '/heal', '/kit Scribble'],
  },
  {
    name: 'Draft',
    color: '#2ECC71',
    price: 'Rp20.000',
    permissions: ['14x Claim', '30.000 Block', '14x Sethome', 'Money 50k'],
    commands: ['/ec', '/feed', '/nick', '/kit Draft'],
    bonus: 'Termasuk semua fitur Scribble',
  },
  {
    name: 'Chronicle',
    color: '#E67E22',
    price: 'Rp35.000',
    permissions: ['18x Claim', '45.000 Block', '18x Sethome', 'Money 75k'],
    commands: ['/ec', '/fly', '/nick', '/repair', '/feed', '/kit Chronicle'],
    bonus: 'Termasuk semua fitur Draft',
  },
  {
    name: 'Legend',
    color: '#E74C3C',
    price: 'Rp50.000',
    permissions: ['30x Claim', '55.000 Block', '30x Sethome', 'Money 100k'],
    commands: ['/ec', '/fly', '/nick', '/repair', '/morph', '/kit legend'],
    bonus: 'Termasuk semua fitur Chronicle',
  },
  {
    name: 'Mythos',
    color: '#9B59B6',
    price: 'Rp65.000',
    permissions: ['40x Claim', '700.000 Block', '40x Sethome', 'Money 125k'],
    commands: ['/ec', '/beezooka', '/feed', '/fly', '/repair', '/heal', '/nick', '/kit mythos'],
    bonus: 'Termasuk semua fitur Legend',
  },
  {
    name: 'Eternal',
    color: 'linear-gradient(90deg, #E74C3C, #E67E22, #F1C40F, #2ECC71, #3498DB, #9B59B6)',
    price: 'Rp100.000',
    permissions: ['∞ Claim', '∞ Block', '999x Sethome', 'Money 999k'],
    commands: ['/ec', '/heal', '/feed', '/craft', '/fly', '/head', '/repair', '/beezooka', '/nick', '/morph', '/kit eternal'],
    bonus: 'Termasuk semua fitur Mythos (Rank tertinggi)',
  },
]

export default function Ranks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [selectedRank, setSelectedRank] = useState(0)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.from(leftRef.current, {
          x: -60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      }
      if (rightRef.current) {
        gsap.from(rightRef.current, {
          x: 60,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const rank = ranks[selectedRank]

  return (
    <section
      id="ranks"
      ref={sectionRef}
      className="relative bg-[#0A0A0A] py-[120px]"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Rank List */}
          <div ref={leftRef}>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-rc-gold mb-4">
              RANK SYSTEM
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-2">
              Naik Rank, Dapatkan
            </h2>
            <h2 className="font-display font-bold text-4xl md:text-5xl gradient-text mb-8">
              Keuntungan Lebih
            </h2>

            {/* Rank Cards */}
            <div className="flex flex-col gap-3">
              {ranks.map((r, i) => (
                <button
                  key={r.name}
                  onClick={() => setSelectedRank(i)}
                  className={`flex items-center gap-4 bg-rc-card border p-5 text-left transition-all hover:border-white/10 ${
                    selectedRank === i
                      ? 'border-white/20'
                      : 'border-white/5'
                  }`}
                >
                  <div
                    className="w-1 h-10 shrink-0"
                    style={{
                      background: r.color.includes('gradient')
                        ? r.color
                        : r.color,
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-base text-white">
                      {r.name}
                    </h3>
                  </div>
                  <span className="font-mono text-sm text-rc-gold">
                    {r.price}
                  </span>
                  <ChevronRight
                    size={18}
                    className={`text-white/40 transition-transform ${
                      selectedRank === i ? 'rotate-90' : ''
                    }`}
                  />
                </button>
              ))}
            </div>

            <a
              href="https://wa.me/083186810347"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block gradient-bg text-white font-semibold text-sm px-8 py-4 mt-8 hover:opacity-90 transition-opacity"
            >
              Beli Rank Sekarang
            </a>
          </div>

          {/* Right - Rank Details */}
          <div ref={rightRef} className="lg:pt-28">
            <div className="bg-rc-card border border-white/5 p-8 sticky top-24">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 flex items-center justify-center"
                  style={{
                    background: rank.color.includes('gradient')
                      ? rank.color
                      : `${rank.color}20`,
                  }}
                >
                  <span
                    className="font-display font-extrabold text-xl"
                    style={{
                      background: rank.color.includes('gradient')
                        ? rank.color
                        : 'none',
                      color: rank.color.includes('gradient')
                        ? 'white'
                        : rank.color,
                      WebkitBackgroundClip: rank.color.includes('gradient')
                        ? 'text'
                        : 'unset',
                      WebkitTextFillColor: rank.color.includes('gradient')
                        ? 'transparent'
                        : 'unset',
                    }}
                  >
                    {rank.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    {rank.name}
                  </h3>
                  <p className="font-mono text-rc-gold">{rank.price}</p>
                </div>
              </div>

              {/* Permissions */}
              <div className="mb-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-rc-muted mb-3">
                  Permission
                </h4>
                <ul className="space-y-2">
                  {rank.permissions.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-white/80">
                      <Check size={14} className="text-rc-green shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Commands */}
              <div className="mb-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-rc-muted mb-3">
                  Commands
                </h4>
                <div className="flex flex-wrap gap-2">
                  {rank.commands.map((c) => (
                    <span
                      key={c}
                      className="bg-white/5 border border-white/10 px-3 py-1 font-mono text-xs text-white/70"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bonus */}
              {'bonus' in rank && (
                <div
                  className="p-4 border"
                  style={{
                    borderColor: rank.color.includes('gradient')
                      ? '#9B59B640'
                      : `${rank.color}40`,
                    backgroundColor: rank.color.includes('gradient')
                      ? '#9B59B610'
                      : `${rank.color}10`,
                  }}
                >
                  <p className="text-sm text-white/70">{rank.bonus}</p>
                </div>
              )}

              <a
                href="https://wa.me/083186810347"
                target="_blank"
                rel="noopener noreferrer"
                className="block gradient-bg text-white font-semibold text-sm px-6 py-3 text-center mt-6 hover:opacity-90 transition-opacity"
              >
                Beli {rank.name}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
