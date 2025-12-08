'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Clock, FileText, Stethoscope, CheckCircle2 } from 'lucide-react'
import type { ProcessDetail } from '@/lib/types'

interface ProcessDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  processDetail: ProcessDetail
}

/**
 * Process detail dialog component displaying comprehensive step information
 * Shows sub-steps, required documents, medical exam info, and timeline
 */
export function ProcessDetailDialog({
  open,
  onOpenChange,
  processDetail,
}: ProcessDetailDialogProps) {
  const getStepTitle = (stepNumber: number) => {
    const titles: Record<number, string> = {
      1: 'Share Your Needs',
      2: 'Get Instant Quotes',
      3: 'Get Protected',
    }
    return titles[stepNumber] || `Step ${stepNumber}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
            {getStepTitle(processDetail.stepNumber)} - Detailed Information
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600 pt-2">
            Complete guide to this step of the insurance process
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Sub-Steps */}
          {processDetail.subSteps && processDetail.subSteps.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold">Detailed Steps</h3>
              </div>
              <div className="space-y-6">
                {processDetail.subSteps.map((subStep, idx) => (
                  <div key={idx} className="border-l-4 border-blue-500 pl-6 py-2 bg-blue-50/50 rounded-r-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-base">{subStep.title}</h4>
                      {subStep.timeRequired && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {subStep.timeRequired}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                      {subStep.description}
                    </p>
                    
                    {subStep.requiredDocuments &&
                      subStep.requiredDocuments.length > 0 && (
                        <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4 text-amber-500" />
                            <p className="text-sm font-semibold">Required Documents:</p>
                          </div>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-2">
                            {subStep.requiredDocuments.map((doc, docIdx) => (
                              <li key={docIdx}>{doc}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    
                    {subStep.questions && subStep.questions.length > 0 && (
                      <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-sm font-semibold mb-2">Example Questions:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-2">
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
          {processDetail.medicalExamInfo && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold">Medical Exam</h3>
                </div>
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">Required:</span>
                    <Badge variant={processDetail.medicalExamInfo.required ? 'default' : 'secondary'}>
                      {processDetail.medicalExamInfo.required ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {processDetail.medicalExamInfo.description}
                  </p>
                  {processDetail.medicalExamInfo.scheduling && (
                    <div className="mt-2">
                      <span className="font-semibold text-sm">Scheduling: </span>
                      <span className="text-sm text-gray-700">
                        {processDetail.medicalExamInfo.scheduling}
                      </span>
                    </div>
                  )}
                  {processDetail.medicalExamInfo.whatToExpect &&
                    processDetail.medicalExamInfo.whatToExpect.length > 0 && (
                      <div className="mt-3">
                        <p className="font-semibold text-sm mb-2">What to Expect:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-2">
                          {processDetail.medicalExamInfo.whatToExpect.map(
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
          {processDetail.postApplication && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold">After Application</h3>
                </div>
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-semibold text-sm">Timeline: </span>
                    <span className="text-sm text-gray-700">
                      {processDetail.postApplication.timeline}
                    </span>
                  </div>
                  {processDetail.postApplication.nextSteps &&
                    processDetail.postApplication.nextSteps.length > 0 && (
                      <div className="mt-3">
                        <p className="font-semibold text-sm mb-2">Next Steps:</p>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 ml-2">
                          {processDetail.postApplication.nextSteps.map((step, idx) => (
                            <li key={idx} className="leading-relaxed">{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  <div className="mt-3">
                    <span className="font-semibold text-sm">Contact: </span>
                    <span className="text-sm text-gray-700">
                      {processDetail.postApplication.contactInfo}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-4 border-t mt-6">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            size="lg"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
