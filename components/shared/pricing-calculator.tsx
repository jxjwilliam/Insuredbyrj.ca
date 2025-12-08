'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useQuoteDialog } from '@/components/shared/quote-dialog-provider'
import type { PricingScenario } from '@/lib/types'
import { cn } from '@/lib/utils'

interface PricingCalculatorProps {
  planId: string // References InsurancePlan.id
  scenarios: PricingScenario[] // Available pricing scenarios
  onScenarioSelect?: (scenarioId: string) => void // Callback when scenario selected
  showDisclaimer?: boolean // Whether to show pricing disclaimer
  className?: string
}

/**
 * Interactive component for pricing examples
 * Displays pricing scenarios for a selected plan with filtering options
 */
export function PricingCalculator({
  planId,
  scenarios,
  onScenarioSelect,
  showDisclaimer = true,
  className,
}: PricingCalculatorProps) {
  const { openDialog: openQuoteDialog } = useQuoteDialog()
  const [selectedAge, setSelectedAge] = useState<string>('all')
  const [selectedHealth, setSelectedHealth] = useState<string>('all')
  const [selectedCoverage, setSelectedCoverage] = useState<string>('all')

  // Filter scenarios for this plan
  const planScenarios = useMemo(
    () => scenarios.filter((s) => s.planId === planId),
    [scenarios, planId]
  )

  // Get unique filter values
  const ages = useMemo(
    () => Array.from(new Set(planScenarios.map((s) => s.profile.age.toString()))).sort(),
    [planScenarios]
  )
  const healthStatuses = useMemo(
    () => Array.from(new Set(planScenarios.map((s) => s.profile.healthStatus))),
    [planScenarios]
  )
  const coverageAmounts = useMemo(
    () => Array.from(new Set(planScenarios.map((s) => s.profile.coverageAmount))),
    [planScenarios]
  )

  // Filter scenarios based on selected filters
  const filteredScenarios = useMemo(() => {
    return planScenarios.filter((scenario) => {
      if (selectedAge !== 'all' && scenario.profile.age.toString() !== selectedAge) {
        return false
      }
      if (selectedHealth !== 'all' && scenario.profile.healthStatus !== selectedHealth) {
        return false
      }
      if (
        selectedCoverage !== 'all' &&
        scenario.profile.coverageAmount !== selectedCoverage
      ) {
        return false
      }
      return true
    })
  }, [planScenarios, selectedAge, selectedHealth, selectedCoverage])

  if (planScenarios.length === 0) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-muted-foreground">
          No pricing scenarios available for this plan.
        </p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <label className="text-sm font-medium">Filter by:</label>
        <select
          value={selectedAge}
          onChange={(e) => setSelectedAge(e.target.value)}
          className="px-3 py-1 border rounded-md text-sm"
          aria-label="Filter by age"
        >
          <option value="all">All Ages</option>
          {ages.map((age) => (
            <option key={age} value={age}>
              Age {age}
            </option>
          ))}
        </select>
        <select
          value={selectedHealth}
          onChange={(e) => setSelectedHealth(e.target.value)}
          className="px-3 py-1 border rounded-md text-sm"
          aria-label="Filter by health status"
        >
          <option value="all">All Health Statuses</option>
          {healthStatuses.map((health) => (
            <option key={health} value={health}>
              {health.charAt(0).toUpperCase() + health.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={selectedCoverage}
          onChange={(e) => setSelectedCoverage(e.target.value)}
          className="px-3 py-1 border rounded-md text-sm"
          aria-label="Filter by coverage amount"
        >
          <option value="all">All Coverage Amounts</option>
          {coverageAmounts.map((coverage) => (
            <option key={coverage} value={coverage}>
              {coverage}
            </option>
          ))}
        </select>
      </div>

      {/* Pricing Scenarios */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredScenarios.map((scenario) => (
          <Card
            key={scenario.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onScenarioSelect?.(scenario.id)}
          >
            <CardHeader>
              <CardTitle className="text-lg">Example Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Profile Info */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Age {scenario.profile.age}</Badge>
                  <Badge variant="outline">
                    {scenario.profile.healthStatus.charAt(0).toUpperCase() +
                      scenario.profile.healthStatus.slice(1)}
                  </Badge>
                  <Badge variant="outline">
                    {scenario.profile.coverageAmount}
                  </Badge>
                  {scenario.profile.termLength && (
                    <Badge variant="outline">{scenario.profile.termLength}</Badge>
                  )}
                </div>
              </div>

              {/* Premiums */}
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Premium</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {scenario.monthlyPremium}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Annual Premium</p>
                  <p className="text-lg font-semibold">{scenario.annualPremium}</p>
                </div>
              </div>

              {/* Notes */}
              {scenario.notes && (
                <p className="text-xs text-muted-foreground">{scenario.notes}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredScenarios.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No pricing scenarios match the selected filters.
          </p>
        </div>
      )}

      {/* Disclaimer */}
      {showDisclaimer && filteredScenarios.length > 0 && (
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-xs text-muted-foreground">
            {filteredScenarios[0]?.disclaimer ||
              'Pricing is representative and may vary based on individual circumstances, health status, and underwriting results. Actual premiums may differ.'}
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="text-center pt-4">
        <Button onClick={openQuoteDialog}>Get Your Personalized Quote</Button>
      </div>
    </div>
  )
}
