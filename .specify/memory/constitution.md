<!--
Sync Impact Report:
Version: 1.0.0 (initial version)
Modified principles: N/A (initial creation)
Added sections:
  - I. Code Quality Standards
  - II. Testing Standards
  - III. User Experience Consistency
  - IV. Performance Requirements
  - Development Workflow
Removed sections: N/A
Templates requiring updates:
  ✅ plan-template.md - Constitution Check section aligns with new principles
  ✅ tasks-template.md - Testing tasks align with Testing Standards principle
  ✅ spec-template.md - No changes needed (user story format unchanged)
Follow-up TODOs: None
-->

# InsuredByRJ Constitution

## Core Principles

### I. Code Quality Standards

All code MUST adhere to strict quality standards ensuring maintainability, readability, and reliability. TypeScript strict mode is mandatory; no `any` types without explicit justification. Code organization follows single responsibility principle with clear separation of concerns. All exported functions, components, and public APIs require JSDoc/TSDoc documentation. File naming uses kebab-case convention. Error handling must be explicit with user-friendly messages and proper logging. Code must pass linting, type checking, and formatting checks before commit.

### II. Testing Standards (NON-NEGOTIABLE)

Test-Driven Development (TDD) is mandatory for new features: tests written → approved → tests fail → then implement. Minimum 80% code coverage required for business logic; 100% coverage for critical paths (authentication, payments, data mutations). All reusable UI components require unit tests; all API endpoints require integration tests. Tests must be isolated, deterministic, and follow Arrange-Act-Assert pattern. Test execution must be fast: unit tests <100ms, integration tests <5s, E2E tests <30s. All tests must pass before code merge.

### III. User Experience Consistency

All UI components MUST adhere to the design system (shadcn/ui foundation) and use Tailwind CSS exclusively for styling. WCAG 2.1 Level AA accessibility compliance is mandatory. Semantic HTML and ARIA attributes required; all interactive elements must be keyboard accessible. Consistent navigation patterns, loading states, error messages, and empty states across all pages. Forms require real-time validation with clear error messages. Perceived performance: loading feedback within 100ms, optimistic updates when possible, skeleton screens for content loading.

### IV. Performance Requirements

Core Web Vitals MUST meet: LCP < 2.5s, FID < 100ms, CLS < 0.1, TTFB < 600ms. Page load time < 3s on 3G; Time to Interactive < 5s. JavaScript bundle size: initial < 200KB gzipped, total < 500KB gzipped. API response time p95 < 500ms; database queries < 100ms. All images optimized (WebP/AVIF, responsive sizes, lazy loading). Implement route-based code splitting, API response caching, and static asset CDN delivery. Performance monitoring and budgets enforced in CI/CD pipeline.

## Development Workflow

### Pre-Commit Requirements

All code MUST pass ESLint, TypeScript compilation, and Prettier formatting checks. Affected tests must pass before commit. Pre-commit hooks enforce these requirements automatically.

### Code Review Standards

All pull requests require review for constitution compliance. Test coverage must be maintained or improved. Performance impact must be assessed; UI changes require accessibility review. Constitution violations block merge unless explicitly justified and documented.

### Deployment Standards

All changes tested in staging before production. Database migrations must be backward-compatible or include migration scripts. Feature flags required for risky changes. Documented rollback procedures mandatory for all deployments.

## Governance

This constitution supersedes all other coding standards, style guides, and practices. All code, regardless of author or urgency, MUST comply with these principles. Violations require explicit documentation of why the exception is necessary.

Amendments require proposal with rationale, review and approval from project maintainers, documentation with version history, and communication to all team members before enforcement.

Enforcement via automated CI/CD checks (linting, type checking, tests), mandatory code review compliance verification, quarterly compliance audits, and systematic violation tracking.

Complexity must be justified; prefer simple solutions following YAGNI principle. Technical debt must be documented and prioritized with a plan to address.

**Version**: 1.0.0 | **Ratified**: 2025-01-27 | **Last Amended**: 2025-01-27
