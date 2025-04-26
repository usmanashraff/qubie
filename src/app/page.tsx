import { Hero } from '@/components/sections/hero'
import { HowItWorks } from '@/components/sections/how-it-works'
import { WhyQubie } from '@/components/sections/why-qubie'
import { Features } from '@/components/sections/features'
import { Testimonials } from '@/components/sections/testimonials'
import { Pricing } from '@/components/sections/pricing'
import { FaqSection } from '@/components/sections/faq'
import { Footer } from '@/components/sections/footer'
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-slate-950 w-full">
    <Hero />
    <Features />
    <HowItWorks />
    <WhyQubie />
    <Testimonials />
   <Pricing />
   <FaqSection />
    <Footer /> 
  </main>
  )
}