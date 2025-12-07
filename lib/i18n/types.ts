/**
 * TypeScript types for internationalization (i18n) system
 * 
 * These types define the structure for language configuration,
 * translation objects, and translation keys used throughout the i18n system.
 */

/**
 * Language configuration interface
 * Represents a supported language with its metadata
 */
export interface LanguageConfig {
  /** ISO 639-1 language code (e.g., 'en', 'pa', 'hi') */
  code: string;
  /** Display name in native language (e.g., 'English', 'ਪੰਜਾਬੀ', 'हिन्दी') */
  name: string;
  /** Display name in English (e.g., 'English', 'Punjabi', 'Hindi') */
  nameEn: string;
  /** Flag emoji or icon identifier (e.g., '🇬🇧', '🇮🇳') */
  flag?: string;
  /** Right-to-left language support (default: false) */
  rtl?: boolean;
}

/**
 * Translation object type
 * Nested object structure matching the content hierarchy from lib/constants.ts
 * Values can be strings (translated text) or nested TranslationObjects
 */
export type TranslationObject = {
  [key: string]: string | TranslationObject;
};

/**
 * Translation key type
 * String literal union type of all valid translation keys
 * This will be expanded as translation files are created
 * 
 * Format: dot-separated path (e.g., 'hero.headline', 'navigation.whyChoose')
 */
export type TranslationKey = 
  | 'hero.headline'
  | 'hero.subheadline'
  | 'hero.primaryCTA.text'
  | 'hero.primaryCTA.href'
  | 'hero.secondaryCTA.text'
  | 'hero.secondaryCTA.href'
  | 'navigation.whyChoose'
  | 'navigation.plans'
  | 'navigation.howItWorks'
  | 'navigation.faq'
  // Additional keys will be added as translation files are created
  | string; // Allow string for now, will be narrowed as translations are added
