---
name: CampusOS Design System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#424655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#727786'
  outline-variant: '#c2c6d7'
  surface-tint: '#0058ca'
  primary: '#0054c0'
  on-primary: '#ffffff'
  primary-container: '#066bf0'
  on-primary-container: '#f9f8ff'
  inverse-primary: '#b0c6ff'
  secondary: '#555f71'
  on-secondary: '#ffffff'
  secondary-container: '#d6e0f5'
  on-secondary-container: '#596375'
  tertiary: '#4b5a70'
  on-tertiary: '#ffffff'
  tertiary-container: '#63738a'
  on-tertiary-container: '#f6f8ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b0c6ff'
  on-primary-fixed: '#001944'
  on-primary-fixed-variant: '#00429a'
  secondary-fixed: '#d9e3f8'
  secondary-fixed-dim: '#bdc7db'
  on-secondary-fixed: '#121c2b'
  on-secondary-fixed-variant: '#3d4758'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system is built upon the pillars of **Academic Intelligence** and **Technological Fluidity**. It targets a diverse ecosystem of students, faculty, and administrators, requiring a UI that balances high-density information management with a frictionless, high-end user experience. 

The aesthetic is **Corporate Modern** with a strong infusion of **Glassmorphism**. It utilizes clean lines, generous whitespace, and a sophisticated layering system to organize complex educational data. The visual language conveys institutional trust while signaling a leap into the future of smart campus management. Every interaction is designed to feel precise, responsive, and premium, evoking a sense of calm efficiency within a fast-paced academic environment.

## Colors

The palette is anchored by **Midnight Slate** (#263040), providing a grounded, authoritative foundation for navigation and structural elements. **Electric Blue** (#066BF0) serves as the primary action color, driving user focus toward key interactions and system statuses.

To maintain a clean and tech-forward feel, the system relies on a high-fidelity neutral scale. Pure white (#FFFFFF) is reserved for primary surfaces and "floating" card elements, while a soft off-white (#F8FAFC) provides a subtle contrast for background canvases. Semantic colors for success, warning, and error should be desaturated to fit the sophisticated tone, ensuring they do not disrupt the professional harmony of the dashboard environments.

## Typography

This design system employs a dual-font strategy to differentiate between brand expression and functional utility. **Space Grotesk** is used for headlines and display text; its geometric, technical character reinforces the "Smart OS" narrative of the platform.

For all data-heavy content, body text, and UI labels, **Manrope** is used. Its balanced proportions and high legibility ensure that long-form academic content and complex data tables remain accessible and easy to parse. Captions and labels should utilize increased letter spacing and uppercase styling where appropriate to assist in information hierarchy within dense microservices interfaces.

## Layout & Spacing

The layout is built on a **12-column fluid grid system** designed for modularity. Given the platform's microservices-based features, the grid allows for flexible "widgets" that can span 3, 4, 6, or 12 columns depending on the data complexity.

A linear 8px base unit governs all spacing decisions. This ensures a consistent vertical rhythm and mathematical harmony across disparate modules. Margins are generous (32px) to allow the UI to "breathe" on high-resolution monitors, while gutters are fixed at 24px to provide clear separation between data cards and functional blocks.

## Elevation & Depth

Depth is established through a combination of **Ambient Shadows** and **Glassmorphism**. Instead of traditional heavy drop shadows, this design system uses extra-diffused, low-opacity shadows (e.g., 4% to 8% opacity) with a slight blue tint derived from the secondary color. This creates a "lifted" effect without cluttering the interface.

**Glassmorphism** is applied selectively to high-level navigation elements (sidebars and top headers) and modal overlays. These elements should feature a `backdrop-filter: blur(12px)` and a thin, semi-transparent 1px border (#FFFFFF 20%) to simulate a premium frosted glass effect. This layering strategy helps users maintain context of the underlying dashboard while focusing on the active task.

## Shapes

The shape language is consistently **Rounded**, utilizing a 0.5rem (8px) corner radius for standard components like input fields, buttons, and small cards. This provides a modern, approachable feel while maintaining the professional structure of the grid. 

For larger layout containers and primary dashboard cards, the `rounded-lg` (16px) or `rounded-xl` (24px) settings should be used to emphasize the modular nature of the platform. Interactive elements such as chips or status badges may use pill-shaped containers to clearly distinguish them from actionable buttons or data inputs.

## Components

### Buttons
Primary buttons utilize the Electric Blue (#066BF0) with white text and a subtle inner glow. Secondary buttons are "Ghost" style—Midnight Slate outlines with a transparent background that fills on hover. All buttons feature a 300ms transition for background-color and transform shifts.

### Cards & Containers
Cards are the primary unit of the layout. They feature a white background, a 1px border (#E2E8F0), and a Level 1 ambient shadow. For "active" or "highlighted" content, a card may adopt a glassmorphic border or a subtle 2px left-accent line using the primary color.

### Input Fields
Inputs are minimalist, using a light gray border (#CBD5E1) that transitions to Electric Blue on focus. Labels sit outside the field in a bold, small Manrope font. Error states are signaled by a 1px red border and a subtle pinkish-red background tint.

### Navigation & Lists
The sidebar uses a semi-transparent Midnight Slate background with glassmorphism blurs. List items feature high horizontal padding and "active" states indicated by a soft blue background wash and a bolded font weight.

### Academic-Specific Elements
- **Course Progress Bars:** Thin, sleek lines using a gradient of Electric Blue.
- **Data Visualization:** Charts should use a refined palette of blues, teals, and grays to maintain the high-end tech aesthetic.
- **Status Badges:** Small, pill-shaped markers with low-saturation background tints and high-saturation text for readability.