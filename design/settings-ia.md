# Settings Information Architecture & Cookie Preferences Specification

## Overview
The granular cookie preferences panel allows users to manage their consent choices independently across categories (Essential, Analytics, and Marketing) in compliance with WCAG 2.1 AA and regional privacy standards.

## Structure
- **Essential**: Always active and locked.
- **Analytics**: Optional toggle persisting choice via `safeStorage`.
- **Marketing**: Optional toggle persisting choice via `safeStorage`.

## Accessibility (a11y)
- Explicit `<label>` elements linked via `htmlFor` and `id`.
- Proper ARIA attributes and keyboard navigation support.
- Compliant color contrast ratios across light and dark modes.
