'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { NewsletterForm } from '@/components/shared/newsletter-form'
import { smoothScrollTo } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n/hooks'
import { footerContent } from '@/lib/constants'
import type { NavigationItem } from '@/lib/types'

/**
 * Footer component with company info, navigation links, contact details, social media, and legal links
 * Displays on all pages for consistent site-wide navigation
 * Uses translations from i18n system
 */
export function Footer() {
  const { t } = useTranslation()
  const handleNavClick = (
    item: NavigationItem,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (item.isAnchor) {
      e.preventDefault()
      smoothScrollTo(item.href.replace('#', ''), 100)
    }
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />
      case 'twitter':
        return <Twitter className="h-5 w-5" />
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo" aria-label="Site footer">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
            aria-labelledby="company-info-heading"
          >
            <h3 id="company-info-heading" className="text-white text-xl font-bold">
              {t('footer.companyName', footerContent.companyInfo.name)}
            </h3>
            {footerContent.companyInfo.tagline && (
              <p className="text-sm text-gray-400">{t('footer.tagline', footerContent.companyInfo.tagline)}</p>
            )}
          </motion.section>

          {/* Quick Links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
            aria-label="Footer navigation"
          >
            <h4 className="text-white font-semibold">{t('footer.quickLinks', 'Quick Links')}</h4>
            <ul className="space-y-2">
              {footerContent.quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(item, e)}
                    className="text-gray-400 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded transition-colors duration-200"
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact Details */}
          <motion.address
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 not-italic"
          >
            <h4 className="text-white font-semibold">{t('footer.contactUs', 'Contact Us')}</h4>
            <div className="space-y-3">
              {footerContent.contactDetails.phone.primary && (
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-1 flex-shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${footerContent.contactDetails.phone.primary.replace(/\s/g, '-')}`}
                    className="text-gray-400 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded transition-colors duration-200"
                    aria-label={`Call us at ${footerContent.contactDetails.phone.primary}`}
                  >
                    {footerContent.contactDetails.phone.primary}
                  </a>
                </div>
              )}
              {footerContent.contactDetails.email.primary && (
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-1 flex-shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${footerContent.contactDetails.email.primary}`}
                    className="text-gray-400 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded transition-colors duration-200 break-all"
                    aria-label={`Email us at ${footerContent.contactDetails.email.primary}`}
                  >
                    {footerContent.contactDetails.email.primary}
                  </a>
                </div>
              )}
              {footerContent.contactDetails.address.fullAddress && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-400">
                    {footerContent.contactDetails.address.fullAddress}
                  </span>
                </div>
              )}
            </div>
          </motion.address>

          {/* Newsletter Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-white font-semibold">{t('footer.stayUpdated', 'Stay Updated')}</h4>
            <p className="text-sm text-gray-400">Get insurance tips and updates</p>
            <NewsletterForm source="footer" />
          </motion.div>

          {/* Social Media & Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="text-white font-semibold">{t('footer.followUs', 'Follow Us')}</h4>
            <div className="flex gap-4 mb-4">
              {footerContent.socialMediaLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded transition-colors duration-200"
                  aria-label={`Visit our ${social.platform === 'twitter' ? 'X' : social.label} page (opens in new tab)`}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-semibold">{t('footer.legal', 'Legal')}</h4>
              <ul className="space-y-2">
                {footerContent.legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded transition-colors duration-200 text-sm"
                      aria-label={`View ${link.label}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <Separator className="bg-gray-700 mb-6" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-gray-400"
        >
          <p>
            {footerContent.copyright.text.replace('{year}', footerContent.copyright.year.toString())}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
