'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import confetti, { type CreateTypes } from 'canvas-confetti'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useContactDialog } from '@/components/shared/contact-dialog-provider'
import { useTranslation } from '@/lib/i18n/hooks'
import { landingPageContent } from '@/lib/constants'
import {
  Building2,
  Heart,
  MapPin,
  CheckCircle2,
  Sparkles,
  Shield,
  ArrowRight,
  Handshake,
  FileText,
  Headphones,
} from 'lucide-react'
import type { CompanyBackground } from '@/lib/types'
import { cn } from '@/lib/utils'
import { TextAnimate } from '@/components/ui/text-animate'
import { GSAPScrollAnimation } from '@/components/animations/gsap-animations'
import { ViewportAnimation } from '@/components/animations/viewport-animation'

interface CompanyBackgroundSectionProps {
  background: CompanyBackground
  showImage?: boolean // Whether to show professional headshot
  layout?: 'default' | 'split' | 'centered' // Layout variant
  className?: string
}

/**
 * Component for company and advisor background information
 * @param background - Company background data
 * @param showImage - Whether to show professional headshot
 * @param layout - Layout variant
 * @param className - Additional CSS classes
 */
export function CompanyBackgroundSection({
  background,
  showImage = true,
  className,
}: CompanyBackgroundSectionProps) {
  const { openDialog } = useContactDialog()
  const { t } = useTranslation()
  const [isImageHovered, setIsImageHovered] = useState(false)
  const confettiIntervalRef = useRef<number | null>(null)
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)
  const confettiInstanceRef = useRef<CreateTypes | null>(null)

  // Initialize confetti instance with the canvas
  useEffect(() => {
    if (confettiCanvasRef.current && typeof window !== 'undefined') {
      confettiInstanceRef.current = confetti.create(confettiCanvasRef.current, {
        resize: true,
        useWorker: true,
      })
    }
  }, [])

  const handleInfoMouseEnter = () => {
    if (!confettiInstanceRef.current) return

    const duration = 2000
    const animationEnd = Date.now() + duration
    const defaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 1000,
    }

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        if (confettiIntervalRef.current) {
          clearInterval(confettiIntervalRef.current)
          confettiIntervalRef.current = null
        }
        return
      }

      const particleCount = 50 * (timeLeft / duration)
      confettiInstanceRef.current?.({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confettiInstanceRef.current?.({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    confettiIntervalRef.current = interval
  }

  const handleInfoMouseLeave = () => {
    if (confettiIntervalRef.current) {
      clearInterval(confettiIntervalRef.current)
      confettiIntervalRef.current = null
    }
  }

  return (
    <section
      id="about"
      className={cn('py-16 bg-gradient-to-br from-blue-50/30 via-white to-gray-50/30', className)}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <TextAnimate
              animation="blurIn"
              by="word"
              startOnView={true}
              once={true}
              className="inline"
            >
              About
            </TextAnimate>{' '}
            <TextAnimate
              animation="blurIn"
              by="word"
              startOnView={true}
              once={true}
              className="inline text-primary"
            >
              Insured by Rajan
            </TextAnimate>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Learn more about Rajan Thind and why British Columbia families trust
            us with their protection.
          </p>
        </div>

        {/* Hero Card with Image and Key Info */}
        <div className="max-w-6xl mx-auto mb-12">
          <Card className="overflow-hidden border border-gray-200 shadow-2xl bg-gradient-to-br from-white to-primary/10 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-shadow duration-500">
              <CardContent className="p-0">
              <div className="grid lg:grid-cols-3 gap-0">
                {/* Image Section */}
                {showImage && background.imageUrl && (
                  <div 
                    className="lg:col-span-1 relative h-64 lg:h-auto bg-[#8cc63e]/50 overflow-hidden benefits-card-image"
                    onMouseEnter={() => setIsImageHovered(true)}
                    onMouseLeave={() => setIsImageHovered(false)}
                  >
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                      isImageHovered ? 'p-0' : 'p-6'
                    }`}>
                      <div className={`relative w-full overflow-hidden transition-all duration-500 ${
                        isImageHovered 
                          ? 'h-full w-full rounded-none shadow-none ring-0' 
                          : 'max-w-sm aspect-square rounded-2xl shadow-2xl ring-4 ring-white/50'
                      }`}>
                        <Image
                          src={background.imageUrl}
                          alt={`${background.ownerName} - ${background.ownerTitle}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 400px"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Info Section */}
                <div 
                  className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden"
                  onMouseEnter={handleInfoMouseEnter}
                  onMouseLeave={handleInfoMouseLeave}
                >
                  <canvas
                    ref={confettiCanvasRef}
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <div className="relative z-10 space-y-4">
                    <div>
                      <TextAnimate
                        animation="blurIn"
                        by="text"
                        startOnView={true}
                        once={true}
                        as="h3"
                        className="text-3xl font-bold text-gray-900 mb-2"
                      >
                        {background.ownerName}
                      </TextAnimate>
                      <TextAnimate
                        animation="blurIn"
                        by="text"
                        startOnView={true}
                        once={true}
                        as="p"
                        className="text-xl text-primary font-semibold mb-4"
                      >
                        {background.ownerTitle}
                      </TextAnimate>
                      <div className="flex items-center gap-2">
                        <TextAnimate
                          animation="blurIn"
                          by="text"
                          startOnView={true}
                          once={true}
                          as="p"
                          className="text-lg text-gray-700 font-medium"
                        >
                          {background.companyName}
                        </TextAnimate>
                        <Image
                          src="/images/infinity.jpeg"
                          alt="Infinity Insurance Services logo"
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {background.brandAffiliation && (
                      <div className="flex items-center gap-3 pt-2">
                        <Badge
                          variant="outline"
                          className="bg-primary/10 border-primary/30 text-primary px-4 py-2 text-sm font-semibold"
                        >
                          <Building2 className="h-4 w-4 mr-2" />
                          {background.brandAffiliation.name} {background.brandAffiliation.type}
                        </Badge>
                      </div>
                    )}

                    {/* Specialties */}
                    {background.experience.specialties.length > 0 && (
                      <div className="pt-4">
                        <h5 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <div className="w-1 h-5 bg-primary rounded-full"></div>
                          <TextAnimate
                            animation="blurIn"
                            by="text"
                            startOnView={true}
                            once={true}
                            className="inline"
                          >
                            Specialties
                          </TextAnimate>
                        </h5>
                        <ul className="space-y-3 list-none">
                          {background.experience.specialties.map((specialty, idx) => {
                            // Map icons to specialties based on content
                            const iconMap = [
                              { Icon: Headphones, color: 'text-amber-500' }, // Life Insurance - service/support
                              { Icon: FileText, color: 'text-primary' }, // Estate Planning - documents
                              { Icon: Handshake, color: 'text-amber-500' }, // Business Succession - partnership
                              { Icon: MapPin, color: 'text-primary' }, // Newcomer to Canada - location
                            ]
                            const { Icon, color } = iconMap[idx] || { Icon: CheckCircle2, color: 'text-primary' }
                            
                            return (
                              <li key={idx} className="flex items-start gap-3 text-sm text-gray-800">
                                <Icon className={`h-5 w-5 ${color} shrink-0 mt-0.5`} />
                                <span>{specialty}</span>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto">
          {/* Our Story & Philosophy - Merged Card */}
          <GSAPScrollAnimation animation="fadeIn" start="top 80%">
            <Card className="border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-primary/5 mb-8">
              <CardContent className="p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <TextAnimate
                      animation="blurIn"
                      by="text"
                      startOnView={true}
                      once={true}
                      as="h4"
                      className="text-3xl font-bold text-gray-900"
                    >
                      Our Story & Philosophy
                    </TextAnimate>
                    <p className="text-sm text-gray-600 mt-1">Who we are and what drives us</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Story Section */}
                  <div>
                    <h5 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Our Journey
                    </h5>
                    <p className="text-gray-700 leading-relaxed">
                      {background.biography}
                    </p>
                  </div>

                  {/* Philosophy Section */}
                  <div className="pt-6 border-t border-primary/20">
                    <h5 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      Our Core Belief
                    </h5>
                    <blockquote className="text-gray-700 leading-relaxed text-lg italic border-l-4 border-primary pl-6 bg-primary/5 py-4 rounded-r-lg">
                      &ldquo;{background.philosophy}&rdquo;
                    </blockquote>
                  </div>
                </div>
              </CardContent>
            </Card>
          </GSAPScrollAnimation>


          {/* Values & What Makes Us Different - Merged Card */}
          {(background.values.length > 0 || background.differentiators.length > 0) && (
            <GSAPScrollAnimation animation="fadeIn" start="top 80%">
              <Card className="border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white mb-8">
                <CardContent className="p-8 lg:p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <TextAnimate
                        animation="blurIn"
                        by="text"
                        startOnView={true}
                        once={true}
                        as="h4"
                        className="text-3xl font-bold text-gray-900"
                      >
                        Why Choose Us
                      </TextAnimate>
                      <p className="text-sm text-gray-600 mt-1">Our values and what sets us apart</p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Values Section */}
                    {background.values.length > 0 && (
                      <div>
                        <h5 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <div className="w-1 h-6 bg-primary rounded-full"></div>
                          Our Core Values
                        </h5>
                        <div className="space-y-3">
                          {background.values.map((value, idx) => (
                            <ViewportAnimation 
                              key={idx}
                              direction="up"
                              delay={idx * 0.1}
                              duration={0.3}
                            >
                              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-primary/5 to-white rounded-xl border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 group">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0 mt-0.5">
                                  <Heart className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-gray-800 font-medium pt-0.5">{value}</span>
                              </div>
                            </ViewportAnimation>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Differentiators Section */}
                    {background.differentiators.length > 0 && (
                      <div>
                        <h5 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <div className="w-1 h-6 bg-primary rounded-full"></div>
                          What Makes Us Different
                        </h5>
                        <div className="space-y-3">
                          {background.differentiators.map((diff, idx) => (
                            <ViewportAnimation 
                              key={idx}
                              direction="up"
                              delay={idx * 0.1}
                              duration={0.3}
                            >
                              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-primary/5 to-white rounded-xl border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 group">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                                  <span className="text-white text-sm font-bold">{idx + 1}</span>
                                </div>
                                <span className="text-gray-800 font-medium pt-0.5">{diff}</span>
                              </div>
                            </ViewportAnimation>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </GSAPScrollAnimation>
          )}

          {/* Brand Affiliation Benefits Card */}
          {background.brandAffiliation && background.brandAffiliation.benefits.length > 0 && (
            <div className="mb-8 benefits-card rounded-3xl p-8 lg:p-12 text-center relative shadow-2xl">
              <div className="absolute top-0 right-0 text-9xl text-white opacity-10 font-serif z-0 animate-infinity">
                ∞
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <TextAnimate
                    animation="blurIn"
                    by="word"
                    startOnView={true}
                    once={true}
                    as="h4"
                    className="text-2xl sm:text-3xl font-bold text-white"
                  >
                    {`Benefits of ${background.brandAffiliation.name} Affiliation`}
                  </TextAnimate>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                  {background.brandAffiliation.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-white/25 rounded-lg backdrop-blur-sm border border-white/40 hover:bg-white/35 transition-colors text-left shadow-sm"
                    >
                      <CheckCircle2 className="h-5 w-5 text-white mt-0.5 shrink-0" />
                      <span className="text-white font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center pt-8">
            <Button onClick={openDialog} size="lg" className="px-8 py-6 text-lg font-semibold shadow-lg min-h-[44px]">
              Get in Touch with Rajan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
