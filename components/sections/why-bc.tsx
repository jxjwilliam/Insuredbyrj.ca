import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ImageWithFallback } from '@/components/shared/image-with-fallback'
import type { WhyBCSection as WhyBCSectionType } from '@/lib/types'

interface WhyBCSectionProps {
  whyBC: WhyBCSectionType
}

/**
 * Why BC section component displaying value propositions and statistics
 * @param whyBC - Why BC section content data
 */
export function WhyBCSection({ whyBC }: WhyBCSectionProps) {
  return (
    <section
      id="why-bc"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute bottom-10 left-10 text-[12rem] text-amber-500 opacity-5 font-serif">
        ∞
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={whyBC.imageUrl}
                  alt={whyBC.imageAlt}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              {/* Floating Stats Cards */}
              {whyBC.statistics && whyBC.statistics.length > 0 && (
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl p-6 border-4 border-blue-500">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">👥</span>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">
                        {whyBC.statistics[0].value}
                      </div>
                      <div className="text-sm text-gray-600">
                        {whyBC.statistics[0].label}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2">
              <span className="text-amber-500">⭐</span>
              <span className="text-gray-900 text-sm font-semibold">
                Trusted by BC Families
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {whyBC.title.split('Insured by Rajan')[0]}
              <span className="text-blue-500">Insured by Rajan</span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              {whyBC.description}
            </p>

            {/* Benefits List */}
            <div className="space-y-4">
              {whyBC.valuePropositions.map((proposition, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-blue-500 text-xl">💡</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      {proposition.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {proposition.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button asChild>
                <Link href="/about">
                  Learn More About Us
                  <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

