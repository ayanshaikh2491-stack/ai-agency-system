# Website Builder Plan

This document outlines the structured approach for the modular website builder system.

## System Overview
The website builder uses a multi-agent system to:
1. Parse user requirements (Planner Agent)
2. Select appropriate modules (Module Reader Agent) 
3. Assemble final website (Builder Agent)

## Workflow
1. User provides website description
2. Planner analyzes input and outputs section requirements
3. Module Reader selects best matching modules from library
4. Builder combines modules into cohesive React page
5. System outputs complete website in `/output/final_site/`

## Module Library
- **Navbar**: 2 variants (navbar1.jsx, navbar2.jsx)
- **Hero**: 2 variants (hero1.jsx, hero2.jsx) 
- **Products**: 2 variants (grid1.jsx, grid2.jsx)
- **Testimonials**: 1 variant (testimonials1.jsx)
- **CTA**: 2 variants (cta1.jsx, cta2.jsx)
- **Footer**: 2 variants (footer1.jsx, footer2.jsx)

## Agents
- **planner.md**: Determines needed sections based on use case
- **module_reader.md**: Selects optimal modules for each section
- **builder.md**: Assembles modules into final website

## Output
Generated websites are placed in `/output/final_site/` as:
- App.jsx (main React component)
- Supporting files as needed