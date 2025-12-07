'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useContactDialog } from '@/components/shared/contact-dialog-provider'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ExpandableContent } from '@/components/shared/expandable-content'
import { useTranslation } from '@/lib/i18n/hooks'
import type {
  HowItWorksSection as HowItWorksSectionType,
  ProcessDetail,
} from '@/lib/types'

interface HowItWorksSectionProps {
  howItWorks?: HowItWorksSectionType
  processDetails?: ProcessDetail[]
}

/**
 * Enhanced How It Works section component displaying three-step process with detailed information
 * Uses translations from i18n system
 * @param howItWorks - Optional How It Works section content data (for backward compatibility)
 * @param processDetails - Optional array of detailed process information
 */
export function HowItWorksSection({
  howItWorks,
  processDetails,
}: HowItWorksSectionProps) {
  const { openDialog } = useContactDialog()
  const { t } = useTranslation()
  
  // Get translations for section header
  const title = t('howItWorks.title', howItWorks?.title || 'How It Works')
  const description = t('howItWorks.description', howItWorks?.description || 'Getting life insurance shouldn\'t be complicated.')
  
  // Get translations for steps
  const steps = [
    {
      title: t('howItWorks.steps.step1.title', howItWorks?.steps?.[0]?.title || 'Share Your Needs'),
      description: t('howItWorks.steps.step1.description', howItWorks?.steps?.[0]?.description || 'Tell us about yourself...'),
      timeIndicator: t('howItWorks.steps.step1.timeIndicator', howItWorks?.steps?.[0]?.timeIndicator || '2 minutes'),
    },
    {
      title: t('howItWorks.steps.step2.title', howItWorks?.steps?.[1]?.title || 'Get Instant Quotes'),
      description: t('howItWorks.steps.step2.description', howItWorks?.steps?.[1]?.description || 'Receive personalized quotes...'),
      timeIndicator: t('howItWorks.steps.step2.timeIndicator', howItWorks?.steps?.[1]?.timeIndicator || 'Instant results'),
    },
    {
      title: t('howItWorks.steps.step3.title', howItWorks?.steps?.[2]?.title || 'Get Protected'),
      description: t('howItWorks.steps.step3.description', howItWorks?.steps?.[2]?.description || 'Complete your application...'),
      timeIndicator: t('howItWorks.steps.step3.timeIndicator', howItWorks?.steps?.[2]?.timeIndicator || 'Same-day coverage'),
    },
  ]
  const getProcessDetail = (stepNumber: number): ProcessDetail | undefined => {
    return processDetails?.find((detail) => detail.stepNumber === stepNumber)
  }

  const renderDetailedContent = (detail: ProcessDetail) => {
    return (
      <div className="space-y-6 pt-4">
        {/* Sub-Steps */}
        {detail.subSteps && detail.subSteps.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-3">Detailed Steps</h4>
            <div className="space-y-4">
              {detail.subSteps.map((subStep, idx) => (
                <div key={idx} className="border-l-2 border-blue-500 pl-4">
                  <div className="flex items-start justify-between mb-1">
                    <h5 className="font-medium text-sm">{subStep.title}</h5>
                    {subStep.timeRequired && (
                      <Badge variant="outline" className="text-xs">
                        {subStep.timeRequired}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {subStep.description}
                  </p>
                  {subStep.requiredDocuments &&
                    subStep.requiredDocuments.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium mb-1">
                          Required Documents:
                        </p>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                          {subStep.requiredDocuments.map((doc, docIdx) => (
                            <li key={docIdx}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  {subStep.questions && subStep.questions.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-medium mb-1">
                        Example Questions:
                      </p>
                      <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                        {subStep.questions.map((question, qIdx) => (
                          <li key={qIdx}>{question}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medical Exam Information */}
        {detail.medicalExamInfo && (
          <>
            <Separator />
            <div>
              <h4 className="font-semibold text-sm mb-2">Medical Exam</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong>Required:</strong>{' '}
                  {detail.medicalExamInfo.required ? 'Yes' : 'No'}
                </p>
                <p>{detail.medicalExamInfo.description}</p>
                {detail.medicalExamInfo.scheduling && (
                  <p>
                    <strong>Scheduling:</strong>{' '}
                    {detail.medicalExamInfo.scheduling}
                  </p>
                )}
                {detail.medicalExamInfo.whatToExpect &&
                  detail.medicalExamInfo.whatToExpect.length > 0 && (
                    <div>
                      <p className="font-medium mb-1">What to Expect:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        {detail.medicalExamInfo.whatToExpect.map(
                          (item, idx) => (
                            <li key={idx}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          </>
        )}

        {/* Post-Application Information */}
        {detail.postApplication && (
          <>
            <Separator />
            <div>
              <h4 className="font-semibold text-sm mb-2">After Application</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong>Timeline:</strong> {detail.postApplication.timeline}
                </p>
                {detail.postApplication.nextSteps &&
                  detail.postApplication.nextSteps.length > 0 && (
                    <div>
                      <p className="font-medium mb-1">Next Steps:</p>
                      <ol className="list-decimal list-inside space-y-1 ml-2">
                        {detail.postApplication.nextSteps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                <p>
                  <strong>Contact:</strong>{' '}
                  {detail.postApplication.contactInfo}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
  return (
    <section id="how-it-works" className="py-16 bg-white relative overflow-hidden">
      {/* Background Infinity Pattern */}
      <div className="absolute top-10 right-10 text-[10rem] text-blue-500 opacity-5 font-serif">
        ∞
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title.split(' ')[0]} <span className="text-blue-500">{title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-amber-500 to-blue-500 transform -translate-y-1/2 z-0" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, stepIndex) => {
              const stepNumber = stepIndex + 1
              const processDetail = getProcessDetail(stepNumber)
              return (
                <div
                  key={stepNumber}
                  className="group text-center"
                  data-testid="process-step"
                >
                  <div className="relative inline-flex items-center justify-center mb-6">
                    {/* Circle Background */}
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="text-3xl text-white">📋</span>
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-20">
                      {stepNumber}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <div className="inline-flex items-center text-sm text-blue-500 font-semibold mb-4">
                    <span className="mr-2">⏱️</span>
                    {step.timeIndicator}
                  </div>

                  {/* Detailed Information */}
                  {processDetail && (
                    <div className="mt-6 text-left">
                      <ExpandableContent
                        title="View Detailed Information"
                        summary="See sub-steps, required documents, medical exam info, and timeline"
                        content={renderDetailedContent(processDetail)}
                        variant="collapsible"
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 text-9xl text-white opacity-10 font-serif">
            ∞
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Protect Your Family?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join over 10,000 British Columbia families who trust us with their
              life insurance. Start your free quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/get-quote">
                  Start Your Free Quote
                  <span className="ml-2">→</span>
                </Link>
              </Button>
              <Button onClick={openDialog} variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900">
                <span className="mr-2">📞</span>
                Talk to Rajan
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              <span className="mr-2">🔒</span>
              No credit card required • Free quotes • No obligation
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

