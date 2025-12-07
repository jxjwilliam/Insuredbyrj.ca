# API Contracts: Multi-Language Support

**Date**: 2025-01-27  
**Feature**: Multi-Language Support

## Overview

This directory contains API contracts for the internationalization (i18n) system. These contracts define the TypeScript interfaces, function signatures, and data structures used throughout the i18n implementation.

## Contracts

### Core i18n Utilities

- **`lib/i18n/config.ts`**: Language configuration and supported languages list
- **`lib/i18n/types.ts`**: TypeScript types for translations and locale handling
- **`lib/i18n/utils.ts`**: Translation utility functions and helpers

### React Context API

- **`lib/i18n/context.tsx`**: React Context provider for i18n state management
- **`lib/i18n/hooks.ts`**: React hooks for accessing translations (`useTranslation`, `useLocale`)

### Components

- **`components/shared/language-selector.tsx`**: Language dropdown selector component

### Next.js Integration

- **`middleware.ts`**: Next.js middleware for locale detection and routing
- **`app/[locale]/layout.tsx`**: Locale-aware root layout

## Contract Files

See individual contract files for detailed specifications:
- `i18n-api.md`: Core i18n utility functions and types
- `react-hooks.md`: React hooks and context API
- `middleware-api.md`: Next.js middleware contract
- `component-api.md`: Language selector component API
