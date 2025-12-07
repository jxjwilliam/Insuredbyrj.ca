import type { TrustIndicator } from '@/lib/types'

interface TrustIndicatorsProps {
  indicators: TrustIndicator[]
}

/**
 * Trust indicators component displaying statistics (A+, 10K+, 15+)
 * @param indicators - Array of trust indicator data
 */
export function TrustIndicators({ indicators }: TrustIndicatorsProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-3 gap-6">
          {indicators.map((indicator, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-1">
                {indicator.value}
              </div>
              <div className="text-xs text-gray-600">{indicator.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

