# Testing Guide for Medusa Storefront

This comprehensive guide outlines testing practices, patterns, configuration, and guidelines for the Medusa Storefront project.

## Coverage Requirements: 80%

Our project enforces a minimum of 80% coverage

### Creation of test files folder structure for (UI package)

src/modules/[module]/components/
└── [component-name]/
    ├── __tests__
    │   └── [component-name].test.tsx
    ├── [component-name].tsx
    └── index.tsx

src/utils/
├── __tests__/
│ └── helper.test.ts
└── helper.ts

### Test Naming Conventions

- Test files should be named as follows: `(Component Name).test.(tsx/ts)`
- Use descriptive names for test cases, following the format: `should [expected behavior] when [condition]`

### Test Implementation Guidelines

1. **Arrange-Act-Assert Pattern**: Structure tests using the Arrange-Act-Assert pattern for clarity.
2. **Keep Tests Isolated**: Ensure tests do not depend on each other to avoid cascading failures.
3. **Use Mocks and Stubs**: Utilize mocks and stubs to isolate components and control dependencies.
4. **Test Coverage**: Aim for comprehensive test coverage, including edge cases and error handling.

### Running test

You can run the tests using the following commands (at the root of the project)

```bash
turbo test
```

Or run the commands in the storefront itself

```bash
cd apps/medusa-storefront
pnpm test
```

To test a single file

```bash
pnpm test (test file name).test.tsx
```
