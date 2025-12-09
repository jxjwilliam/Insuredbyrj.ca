'use client'

import { motion } from 'framer-motion'
import { NewsletterForm } from '@/components/shared/newsletter-form'
import { Mail } from 'lucide-react'

/**
 * Dedicated newsletter subscription section for the landing page
 */
export function NewsletterSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-amber-50" id="newsletter">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white mb-6">
            <Mail className="h-8 w-8" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Informed About Life Insurance
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter for helpful tips, industry updates, and exclusive offers
            delivered to your inbox.
          </p>
          <NewsletterForm source="landing-page" className="max-w-md mx-auto" />
        </motion.div>
      </div>
    </section>
  )
}
