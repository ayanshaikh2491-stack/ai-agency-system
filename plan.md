# Website Builder Plan

This document outlines the modular website builder system.

## System Overview
The system consists of:
- Planner Agent: Determines required sections based on user input
- Module Reader Agent: Selects appropriate modules from library
- Builder Agent: Combines modules into final React page
- Module Library: Reusable React+Tailwind components

## Module Categories
1. Navbar (2 variants)
2. Hero (2 variants)
3. Products/Grid (2 variants)
4. Testimonials (1 variant)
5. CTA (1 variant)
6. Footer (2 variants)

## Workflow
1. User provides website description
2. Planner analyzes input and outputs section requirements
3. Module Reader selects best matching modules
4. Builder combines modules into final App.jsx
5. Output saved to output/final_site/App.jsx

## Guidelines
- Always use modular approach
- Never hardcode full pages
- Maintain UI consistency
- Ensure responsiveness
- Use Tailwind CSS for styling
