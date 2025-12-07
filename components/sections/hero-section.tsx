'use client'

import { CTAButton } from '@/components/shared/cta-button'
import { ImageWithFallback } from '@/components/shared/image-with-fallback'
import { useTranslation } from '@/lib/i18n/hooks'
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
  
  // Use translations if available, fallback to hero prop for backward compatibility
  const headline = t('hero.headline', hero?.headline || 'Life Insurance That Stands the Test of Time')
  const subheadline = t('hero.subheadline', hero?.subheadline || 'Protecting British Columbia families...')
  const primaryCTAText = t('hero.primaryCTA.text', hero?.primaryCTA?.text || 'Get Your Free Quote')
  const primaryCTAHref = t('hero.primaryCTA.href', hero?.primaryCTA?.href || '/get-quote')
  const secondaryCTAText = t('hero.secondaryCTA.text', hero?.secondaryCTA?.text || 'Speak to a BC Advisor')
  const secondaryCTAHref = t('hero.secondaryCTA.href', hero?.secondaryCTA?.href || '/contact')
  
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
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-[15rem] text-blue-500 font-serif">
          ∞
        </div>
        <div className="absolute bottom-20 right-10 text-[12rem] text-amber-500 font-serif">
          ∞
        </div>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-full px-5 py-2 mb-4">
              <span className="text-blue-500 text-sm font-medium">
                Licensed in British Columbia
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {headline.split('Time')[0]}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-amber-500">
                {headline.includes('Time') ? 'Time' : headline.split(' ').slice(-2).join(' ')}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <CTAButton cta={{ text: primaryCTAText, href: primaryCTAHref, variant: 'primary' }} />
              <CTAButton cta={{ text: secondaryCTAText, href: secondaryCTAHref, variant: 'outline' }} />
            </div>

            {/* Trust Microcopy */}
            <p className="text-sm text-gray-400 flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1">
              {trustMicrocopy.map((item, index) => (
                <span key={index} className="flex items-center">
                  <span className="text-blue-500 mr-1">✓</span>
                  {item}
                  {index < trustMicrocopy.length - 1 && (
                    <span className="text-white/30 mx-2">•</span>
                  )}
                </span>
              ))}
            </p>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            <div className="relative">
              <div className="absolute -top-10 -right-10 text-9xl text-amber-500/20 font-serif z-0">
                ∞
              </div>
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-500/20">
                <ImageWithFallback
                  src={hero?.imageUrl || 'https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/7efb3018-05ca-453e-0d48-cc1b38a44900/public'}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-xl p-6 z-20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🛡️</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">$500K+</div>
                    <div className="text-sm text-gray-600">
                      Coverage as low as $30/mo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  )
}


