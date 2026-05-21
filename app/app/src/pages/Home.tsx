import BlockTerrain from '@/components/BlockTerrain'
import Navbar from '@/components/Navbar'
import Hero from '@/sections/Hero'
import Features from '@/sections/Features'
import Ranks from '@/sections/Ranks'
import ServerPreview from '@/sections/ServerPreview'
import Testimonials from '@/sections/Testimonials'
import CTA from '@/sections/CTA'
import Footer from '@/sections/Footer'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      {/* 3D Block Terrain - Fixed Background */}
      <BlockTerrain />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative">
        {/* Hero - transparent background so 3D scene shows through */}
        <Hero />

        {/* Content sections with solid background */}
        <Features />
        <Ranks />
        <ServerPreview />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </div>
  )
}
