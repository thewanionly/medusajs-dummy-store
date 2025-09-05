# UI Package

This package contains shared UI components for use across the MedusaJS Dummy Store monorepo. It is designed to provide a consistent design system and reusable building blocks for your applications.

## Purpose

- Centralize UI components for reuse in multiple apps (storefront, admin, etc.)
- Promote consistency and maintainability
- Enable rapid development by sharing common UI patterns

## Adding Components from gfed-registry

You can easily add new components from the [gfed-registry](https://gfed-registry.vercel.app/) using the following command:

```sh
pnpm dlx shadcn@latest add https://gfed-registry.vercel.app/r/breadcrumbs.json
```

Replace the URL with the component you want to add. This will automatically fetch and integrate the component into the UI package.

### Steps:

1. Browse [gfed-registry](https://gfed-registry.vercel.app/) for available components.
2. Copy the component link (e.g., `/r/breadcrumbs.json`).
3. Run the command above in the root of the UI package.
4. The component will be added to `src/components` and ready for use.

## Usage

Import components from this package in your apps:

```tsx
import { Breadcrumbs } from '@mds/ui/components/breadcrumbs/breadcrumbs';
```

## Folder Structure

The most important part of the UI package is the `src` folder, which contains all the code you need to work with:

```text
src/
├── components/
│   ├── [base components]        # Single .tsx files from shadcn
│   └── [custom/grouped components] # Folders for components from gfed-registry or custom components
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions and helpers
└── styles/                      # Global CSS and style files
```

- **Base components**: Single `.tsx` files in `components/` (added via shadcn)
- **gfed-registry/custom components**: Folders in `components/` for components from gfed-registry or custom project-specific UI elements
- **hooks**: For custom React hooks
- **lib**: Utility functions and helpers
- **styles**: Global CSS and style files

This structure keeps the UI code organized and easy to find.

## Contributing

Feel free to add your own components or update existing ones. For custom additions, place your components in `src/components` and export them as needed.

---

For more details, see the documentation in each component folder or reach out to the team.
