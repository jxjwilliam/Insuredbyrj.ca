import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { CTAButton as CTAButtonType } from '@/lib/types'

interface CTAButtonProps {
  cta: CTAButtonType
  className?: string
}

/**
 * Reusable CTA button component using shadcn/ui Button
 * @param cta - CTA button configuration
 * @param className - Additional CSS classes
 */
export function CTAButton({ cta, className }: CTAButtonProps) {
  const variantMap = {
    primary: 'default',
    secondary: 'secondary',
    outline: 'outline',
  } as const

  return (
    <Button
      asChild
      variant={variantMap[cta.variant || 'primary']}
      className={className}
    >
      <Link href={cta.href}>
        {cta.text}
        {cta.icon && <span className="ml-2">{cta.icon}</span>}
      </Link>
    </Button>
  )
}


