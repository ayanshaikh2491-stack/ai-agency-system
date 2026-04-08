import fs from 'fs';
import path from 'path';

export class BuilderAgent {
  constructor() {
    this.componentsPath = path.join(process.cwd(), 'web-builder', 'modules');
    this.outputPath = path.join(process.cwd(), 'web-builder', 'output', 'final_site');
  }
  
  /**
   * Combine selected modules into a working React layout
   * @param {Object} moduleSelection - Output from module reader agent
   * @param {Object} plan - Output from planner agent (for context)
   * @returns {string} - React component code for App.jsx
   */
  buildPage(moduleSelection, plan) {
    const { selected_modules } = moduleSelection;
    
    // Generate imports
    let imports = "import React from 'react';\n\n";
    const componentImports = {};
    
    for (const [section, moduleInfo] of Object.entries(selected_modules)) {
      const componentName = this.pascalCase(moduleInfo.name);
      const importPath = `./modules/${moduleInfo.path.replace('.jsx', '')}`;
      
      if (!componentImports[componentName]) {
        componentImports[componentName] = importPath;
        imports += `import ${componentName} from '${importPath}';\n`;
      }
    }
    
    // Generate component props based on plan and module requirements
    const props = this.generateDefaultProps(selected_modules, plan);
    
    // Generate JSX
    let jsx = "\nconst App = () => {\n";
    
    // Add state for navbar scroll effect if needed
    const needsScrollEffect = this.needsScrollEffect(selected_modules);
    if (needsScrollEffect) {
      jsx += "  const [isScrolled, setIsScrolled] = React.useState(false);\n";
      jsx += "  \n";
      jsx += "  React.useEffect(() => {\n";
      jsx += "    const handleScroll = () => {\n";
      jsx += "      setIsScrolled(window.scrollY > 50);\n";
      jsx += "    };\n";
      jsx += "    window.addEventListener('scroll', handleScroll);\n";
      jsx += "    return () => window.removeEventListener('scroll', handleScroll);\n";
      jsx += "  }, []);\n";
      jsx += "\n";
    }
    
    jsx += "  return (\n";
    jsx += "    <>\n";
    
    // Build sections in order
    const sectionOrder = ['navbar', 'hero', 'products', 'testimonials', 'cta', 'footer'];
    
    for (const section of sectionOrder) {
      if (selected_modules[section]) {
        jsx += this.generateSectionJSX(section, selected_modules[section], props[section] || {}, needsScrollEffect && section === 'navbar');
      }
    }
    
    jsx += "    </>\n";
    jsx += "  );\n";
    jsx += "};\n\n";
    jsx += "export default App;\n";
    
    return imports + jsx;
  }
  
  /**
   * Generate JSX for a specific section
   * @param {string} section - Section type
   * @param {Object} moduleInfo - Module information
   * @param {Object} props - Props to pass to the component
   * @param {boolean} passScrollState - Whether to pass scroll state (for navbar)
   * @returns {string} - JSX for the section
   */
  generateSectionJSX(section, moduleInfo, props, passScrollState = false) {
    const componentName = this.pascalCase(moduleInfo.name);
    let jsx = `    <${componentName}`;
    
    // Add props
    const propEntries = Object.entries(props);
    if (propEntries.length > 0 || passScrollState) {
      jsx += " ";
      
      if (passScrollState) {
        jsx += `isScrolled={isScrolled}`;
        if (propEntries.length > 0) {
          jsx += ", ";
        }
      }
      
      const propStrings = [];
      for (const [key, value] of propEntries) {
        if (typeof value === 'string') {
          propStrings.push(`${key}="${value}"`);
        } else if (typeof value === 'object') {
          propStrings.push(`${key}=${JSON.stringify(value)}`);
        } else {
          propStrings.push(`${key}={value}`);
        }
      }
      
      jsx += propStrings.join(" ");
    }
    
    jsx += " />\n";
    
    // Add spacing between sections (except after footer)
    if (section !== 'footer') {
      jsx += "    {/* Spacing */}\n";
    }
    
    return jsx;
  }
  
  /**
   * Determine if we need to pass scroll state to navbar
   * @param {Object} selectedModules - Selected modules
   * @returns {boolean} - True if navbar needs scroll state
   */
  needsScrollEffect(selectedModules) {
    return selectedModules.navbar && 
           selectedModules.navbar.name === 'navbar2'; // Only navbar2 uses scroll effect
  }
  
  /**
   * Generate default props for modules based on plan context
   * @param {Object} selectedModules - Selected modules
   * @param {Object} plan - Plan from planner agent
   * @returns {Object} - Props for each module
   */
  generateDefaultProps(selectedModules, plan) {
    const props = {};
    
    // Default data for common props
    const defaultData = {
      brand: "MyWebsite",
      links: [
        { label: "Home", isActive: true },
        { label: "About", isActive: false },
        { label: "Features", isActive: false },
        { label: "Contact", isActive: false }
      ],
      title: "Awesome Product",
      subtitle: "This is a amazing product that will change your life",
      buttonText: "Get Started",
      buttonLink: "#",
      features: [
        { icon: "⚡", title: "Fast", description: "Lightning quick performance" },
        { icon: "🔒", title: "Secure", description: "Your data is safe with us" },
        { icon: "💡", title: "Innovative", description: "Cutting edge technology" }
      ],
      products: [
        { 
          id: 1, 
          name: "Product 1", 
          description: "This is an amazing product", 
          price: 29.99,
          image: "https://via.placeholder.com/300",
          discount: 10
        },
        { 
          id: 2, 
          name: "Product 2", 
          description: "Another great product", 
          price: 39.99,
          image: "https://via.placeholder.com/300"
        },
        { 
          id: 3, 
          name: "Product 3", 
          description: "Yet another product", 
          price: 19.99,
          image: "https://via.placeholder.com/300",
          discount: 15
        }
      ],
      testimonials: [
        { 
          id: 1,
          text: "This product is amazing! I love it!",
          name: "John Doe",
          role: "CEO",
          image: "https://via.placeholder.com/100"
        },
        { 
          id: 2,
          text: "Great service and fast delivery!",
          name: "Jane Smith",
          role: "Designer",
          image: "https://via.placeholder.com/100"
        }
      ],
      socialLinks: [
        { url: "#", icon: "📘" },
        { url: "#", icon: "📘" },
        { url: "#", icon: "📷" }
      ],
      copyright: "© 2023 MyWebsite. All rights reserved."
    };
    
    // Generate props for each selected module
    for (const [section, moduleInfo] of Object.entries(selected_modules)) {
      props[section] = {};
      
      // Read the actual module to see what props it expects
      try {
        const modulePath = path.join(this.componentsPath, moduleInfo.path);
        const content = fs.readFileSync(modulePath, 'utf8');
        
        // Extract prop names from component signature
        const propsMatch = content.match(/\(([^)]+)\)/);
        if (propsMatch) {
          const propsString = propsMatch[1];
          // Simple prop extraction (would be more robust in practice)
          const propNames = propsString
            .split(',')
            .map(p => p.trim())
            .filter(p => p && !p.includes('{') && !p.includes('}'))
            .map(p => p.split(':')[0].trim()); // Handle TypeScript-like syntax
            
          // Assign default values for each prop
          for (const propName of propNames) {
            if (defaultData[propName] !== undefined) {
              props[section][propName] = defaultData[propName];
            }
            // Handle special cases
            else if (propName === 'onLinkClick') {
              props[section][propName] = "(link) => console.log('Clicked:', link)";
            }
            else if (propName === 'showPrices') {
              props[section][propName] = true;
            }
            else if (propName === 'inverse') {
              props[section][pro
