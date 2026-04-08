# Builder Agent

## Responsibilities
- Combine selected modules into a complete React page
- Ensure proper layout and spacing between sections
- Handle props passing to modules
- Generate a working, cohesive website layout
- Output final React component (App.jsx)

## Input Format
Receives module selection from Module Reader Agent in the format:
{
  "selectedModules": [
    {
      "section": "navbar",
      "variant": 1,
      "filePath": "web-builder/modules/navbar/navbar1.jsx",
      "meta": { /* meta content */ }
    },
    // ... more modules
  ],
  "consistencyCheck": "pass/fail",
  "notes": "Any special considerations"
}

## Building Process
1. **Import Statements**: Generate import statements for all selected modules
2. **Component Structure**: Create a main App component that renders all sections in order
3. **Props Handling**: 
   - Define sample data for each module type (can be replaced with real data)
   - Pass appropriate props to each module based on its requirements
   - Handle optional props gracefully
4. **Layout Assembly**:
   - Ensure proper sequencing: Navbar → Hero → [Main Content] → CTA → Footer
   - Add appropriate spacing/containers between sections
   - Ensure no duplicate sections or conflicting styles
5. **Output Format**: Generate a single App.jsx file ready for use

## Sample Data Templates
The builder includes default sample data for each module type that can be customized:

### Navbar Sample Data
{
  brandName: "BrandName",
  links: [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" }
  ]
}

### Hero Sample Data
{
  title: "Transform Your Business",
  subtitle: "Innovative solutions for modern challenges",
  ctaText: "Get Started",
  ctaLink: "#features",
  secondaryButtonText: "Learn More",
  secondaryButtonLink: "#about"
}

### Products Sample Data
{
  title: "Our Products",
  subtitle: "Quality items crafted for your needs",
  products: [
    {
      id: 1,
      name: "Product 1",
      description: "High-quality product with excellent features",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/300x200",
      badge: "Sale",
      badgeVariant: "sale"
    }
    // ... more products
  ]
}

### Testimonials Sample Data
{
  title: "What Our Clients Say",
  subtitle: "Real stories from satisfied customers",
  testimonials: [
    {
      id: 1,
      name: "John Doe",
      role: "CEO, Tech Corp",
      content: "This service transformed our business operations completely.",
      imageUrl: "https://via.placeholder.com/100x100"
    }
    // ... more testimonials
  ]
}

### CTA Sample Data
{
  title: "Ready to Get Started?",
  subtitle: "Join thousands of satisfied customers who trust our solutions",
  buttonText: "Sign Up Free",
  buttonLink: "#signup",
  secondaryButtonText: "Watch Demo",
  secondaryButtonLink: "#demo"
}

### Footer Sample Data
{
  links: [
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" }
  ],
  socialLinks: [
    { label: "twitter", url: "https://twitter.com" },
    { label: "linkedin", url: "https://linkedin.com" },
    { label: "instagram", url: "https://instagram.com" }
  ],
  copyrightText: "© 2026 BrandName. All rights reserved."
}

## Output Generation
Creates a single file: `web-builder/output/final_site/App.jsx` containing:
- All necessary import statements
- Sample data definitions
- Main App component rendering all selected modules in proper order
- Proper JSX syntax and formatting
- Responsive layout structure

## Quality Checks
- Verifies all imported modules exist at their specified paths
- Ensures proper component ordering (navbar first, footer last)
- Validates that required props are provided to each module
- Checks for potential naming conflicts
- Confirms output is valid React JSX syntax