# Language Selector Component API Contract

## Component

### `LanguageSelector`

React component that renders a dropdown menu for language selection.

**Location**: `components/shared/language-selector.tsx`

**Type**: Client Component (`'use client'`)

## Props

```typescript
interface LanguageSelectorProps {
  className?: string;           // Optional CSS classes
  variant?: 'default' | 'minimal';  // Visual variant (default: 'default')
  showFlags?: boolean;           // Show flag icons (default: true)
  showNativeNames?: boolean;     // Show native language names (default: true)
}
```

**Default Props**:
- `className`: `undefined`
- `variant`: `'default'`
- `showFlags`: `true`
- `showNativeNames`: `true`

## Behavior

### Rendering

- Displays current language with flag and name
- Opens dropdown on click/hover (configurable)
- Shows all supported languages in dropdown
- Highlights current language in dropdown

### Interaction

- **Click**: Opens/closes dropdown
- **Keyboard**: Full keyboard navigation (Tab, Enter, Arrow keys, Escape)
- **Selection**: Updates locale on language selection
- **Accessibility**: ARIA labels, roles, and keyboard support

### State Management

- Uses `useLocale()` hook for current locale
- Calls `setLocale()` on language selection
- Updates URL automatically via Next.js router

## Visual Design

### Default Variant

- Button-style trigger with current language
- Dropdown menu with language options
- Flag icons + native names
- Hover/active states
- Smooth transitions

### Minimal Variant

- Compact dropdown (icon only or abbreviated)
- Minimal visual footprint
- Suitable for mobile or space-constrained layouts

## Accessibility

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and roles
- **Focus Management**: Visible focus indicators
- **Color Contrast**: Meets contrast requirements

### ARIA Attributes

```typescript
<button
  aria-label="Select language"
  aria-haspopup="true"
  aria-expanded={isOpen}
  role="combobox"
>
  {/* Current language display */}
</button>
```

## Integration

### Header Integration

```typescript
// components/layout/header.tsx
import { LanguageSelector } from '@/components/shared/language-selector';

export function Header() {
  return (
    <header>
      {/* Logo, navigation, etc. */}
      <LanguageSelector />
    </header>
  );
}
```

### Standalone Usage

```typescript
import { LanguageSelector } from '@/components/shared/language-selector';

export function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <LanguageSelector variant="minimal" />
    </div>
  );
}
```

## Styling

- Uses Tailwind CSS utility classes
- Follows shadcn/ui design system
- Customizable via `className` prop
- Responsive design (mobile-friendly)

## Browser Language Detection

On first render, component:
1. Checks if locale is already set (from localStorage/cookie)
2. If not set, detects browser language
3. Highlights matching language in dropdown (if supported)
4. Does NOT auto-select (user must click)

## Error Handling

- **Translation Load Error**: Shows error message, falls back to English
- **Invalid Locale**: Prevents selection, shows warning
- **Network Error**: Retries loading, shows loading state

## Performance

- **Initial Render**: No loading state (uses SSR locale)
- **Language Switch**: Shows loading indicator during switch
- **Re-renders**: Only re-renders on locale change (memoized)
