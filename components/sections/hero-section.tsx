'use client'

import { ArrowRight, Check, Circle, ShieldCheck, Heart } from 'lucide-react'
import { useContactDialog } from '@/components/shared/contact-dialog-provider'
import { useQuoteDialog } from '@/components/shared/quote-dialog-provider'
import { useTranslation } from '@/lib/i18n/hooks'
import { Button } from '@/components/ui/button'
import { HeroVideo } from '@/components/shared/hero-video'
import { Parallax } from '@/components/animations/parallax'
import { AuroraBackground } from '@/components/animations/aurora-background'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { BorderBeam } from '@/components/ui/border-beam'
import type { HeroSection as HeroSectionType } from '@/lib/types'

interface HeroSectionProps {
  hero?: HeroSectionType // Optional for backward compatibility during migration
}

/**
 * Hero section component displaying main headline, CTAs, and hero image
 * Uses translations from i18n system
 * @param hero - Optional hero section content data (for backward compatibility)
 */
export function HeroSection({ hero }: HeroSectionProps) {
  const { t, translations } = useTranslation()
  const { openDialog: openContactDialog } = useContactDialog()
  const { openDialog: openQuoteDialog } = useQuoteDialog()
  
  // Use translations if available, fallback to hero prop for backward compatibility
  const headline = t('hero.headline', hero?.headline || 'Life Insurance That Stands the Test of Time')
  const subheadline = t('hero.subheadline', hero?.subheadline || 'Protecting British Columbia families...')
  const primaryCTAText = t('hero.primaryCTA.text', hero?.primaryCTA?.text || 'Get Your Free Quote')
  const secondaryCTAText = t('hero.secondaryCTA.text', hero?.secondaryCTA?.text || 'Speak to Rajan')
  const secondaryCTAHref = t('hero.secondaryCTA.href', hero?.secondaryCTA?.href || 'tel:7788300142')
  
  // Check if secondary CTA is a phone link
  const isPhoneLink = secondaryCTAHref?.startsWith('tel:')
  
  // Get trust microcopy from translations array or fallback to hero prop
  const heroTranslations = translations?.hero
  const trustMicrocopy = 
    (heroTranslations && 
     typeof heroTranslations === 'object' && 
     'trustMicrocopy' in heroTranslations &&
     Array.isArray(heroTranslations.trustMicrocopy))
      ? heroTranslations.trustMicrocopy as string[]
      : (hero?.trustMicrocopy || [
          'No obligation quote',
          '2-minute application',
          'Instant estimates',
        ])
  
  const imageAlt = t('hero.imageAlt', hero?.imageAlt || 'Life insurance and family protection concept')
  return (
    <AuroraBackground>
      <section
        id="hero"
        className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden w-full max-w-full"
      >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-[15rem] text-primary font-serif">
          ∞
        </div>
        <div className="absolute bottom-20 right-10 text-[12rem] text-amber-500 font-serif">
          ∞
        </div>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20 animate-pulse" />
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-stretch max-w-7xl mx-auto">
          {/* Left: Content */}
          <div className="text-center lg:text-left space-y-8 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2.5 bg-slate-800/90 backdrop-blur-sm border border-cyan-400/70 rounded-full px-6 py-3 mb-6 shadow-[0_0_20px_rgba(34,211,238,0.4)] ring-1 ring-cyan-400/30" role="status" aria-label="Licensed in British Columbia">
              <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0" />
              <span className="text-cyan-300 text-sm font-medium whitespace-nowrap">
                Licensed in British Columbia
              </span>
              <Heart className="h-4 w-4 text-cyan-400 fill-cyan-400 shrink-0" />
              <span className="text-cyan-300 text-sm font-medium whitespace-nowrap">
                Serve for BC families
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight" id="hero-headline">
              {headline.split('Time')[0]}
              <AnimatedGradientText
                colorFrom="#3b82f6"
                colorTo="#f59e0b"
                className="text-transparent bg-clip-text"
              >
                {headline.includes('Time') ? 'Time' : headline.split(' ').slice(-2).join(' ')}
              </AnimatedGradientText>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl lg:max-w-none mx-auto lg:mx-0">
              {subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
              <Button 
                onClick={openQuoteDialog} 
                variant="default" 
                size="lg" 
                className="min-h-[44px] min-w-[44px] bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
              >
                {primaryCTAText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              {isPhoneLink ? (
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="min-h-[44px] min-w-[44px] border-2 border-white/80 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <a href={secondaryCTAHref}>
                    {secondaryCTAText}
                  </a>
                </Button>
              ) : (
                <Button 
                  onClick={openContactDialog} 
                  variant="outline" 
                  size="lg" 
                  className="min-h-[44px] min-w-[44px] border-2 border-white/80 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
                >
                  {secondaryCTAText}
                </Button>
              )}
            </div>

            {/* Trust Microcopy */}
            <p className="text-sm text-gray-400 flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1">
              {trustMicrocopy.map((item, index) => (
                <span key={index} className="flex items-center">
                  <Check className="text-primary mr-1 h-4 w-4" />
                  {item}
                  {index < trustMicrocopy.length - 1 && (
                    <Circle className="text-white/30 mx-2 h-1 w-1 fill-current" />
                  )}
                </span>
              ))}
            </p>
          </div>

          {/* Right: Video */}
          <Parallax speed={-0.3}>
            <div className="order-first lg:order-last flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl relative">
                <BorderBeam className="rounded-lg" />
                <HeroVideo
                  videoSrc="/hs.mp4"
                  coverImageSrc="/hs-cover-1.jpg"
                  mobileCoverImageSrc="/hs-cover-2.jpg"
                  alt={imageAlt}
                />
              </div>
            </div>
          </Parallax>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
    </AuroraBackground>
  )
}


