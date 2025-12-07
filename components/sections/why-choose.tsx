import type { WhyChooseSection as WhyChooseSectionType } from '@/lib/types'

interface WhyChooseSectionProps {
  whyChoose: WhyChooseSectionType
}

/**
 * Why Choose section component displaying four benefit points
 * @param whyChoose - Why Choose section content data
 */
export function WhyChooseSection({ whyChoose }: WhyChooseSectionProps) {
  return (
    <section id="why-choose" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
            <span className="text-3xl text-blue-500 font-serif">∞</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {whyChoose.title.split('Insured by Rajan')[0]}
            <span className="text-blue-500">Insured by Rajan</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {whyChoose.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChoose.benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl text-white">💡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Badge Bar */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center space-x-3">
              <span className="text-3xl text-blue-500">🛡️</span>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900">
                  Licensed in BC
                </div>
                <div className="text-xs text-gray-600">Fully Regulated</div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200" />
            <div className="flex items-center space-x-3">
              <span className="text-3xl text-blue-500">🔒</span>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900">
                  Secure & Private
                </div>
                <div className="text-xs text-gray-600">Your Data Protected</div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200" />
            <div className="flex items-center space-x-3">
              <span className="text-3xl text-blue-500">🏆</span>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900">
                  Award-Winning Service
                </div>
                <div className="text-xs text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

