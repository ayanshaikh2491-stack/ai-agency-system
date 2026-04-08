# Planner Agent

## Responsibilities
- Understand user input and requirements
- Define website structure and sections needed
- Output a structured plan for module selection
- Determine which modules are appropriate based on use case

## Input Format
User provides a brief description of the website they want to build, such as:
- "Build a T-shirt e-commerce website"
- "Create a portfolio website for a photographer"
- "Make a landing page for a SaaS product"

## Decision Logic
Based on the user input, the planner determines which sections/modules are needed:

### For E-commerce Websites:
- Navbar (essential)
- Hero (essential)
- Products (essential)
- Testimonials (recommended)
- CTA (essential)
- Footer (essential)

### For Landing Pages/Portfolio:
- Navbar (essential)
- Hero (essential)
- Products/Testimonials (depending on content)
- CTA (essential)
- Footer (essential)

### For Blog/Content Sites:
- Navbar (essential)
- Hero (essential)
- Testimonials (optional)
- CTA (optional)
- Footer (essential)

## Output Format
Returns a structured JSON plan:
{
  "sections": ["navbar", "hero", "products", "testimonials", "cta", "footer"],
  "use_case": "ecommerce/landing/blog/etc",
  "confidence": "high/medium/low",
  "reasoning": "Brief explanation of section selection"
}

## Example
Input: "Build a T-shirt e-commerce website"
Output: {
  "sections": ["navbar", "hero", "products", "testimonials", "cta", "footer"],
  "use_case": "ecommerce",
  "confidence": "high",
  "reasoning": "E-commerce sites need product display, clear navigation, hero for branding, testimonials for trust, CTA for conversions, and footer for legal/info"
}