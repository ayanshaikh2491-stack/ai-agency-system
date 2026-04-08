import fs from 'fs';
import path from 'path';

export class ModuleReaderAgent {
  constructor() {
    this.modulesPath = path.join(process.cwd(), 'web-builder', 'modules');
    this.availableModules = this.scanModules();
  }
  
  /**
   * Scan the modules directory for available components
   * @returns {Object} - Organized module inventory
   */
  scanModules() {
    const modules = {};
    
    try {
      const categories = fs.readdirSync(this.modulesPath);
      
      for (const category of categories) {
        const categoryPath = path.join(this.modulesPath, category);
        if (fs.statSync(categoryPath).isDirectory()) {
          const files = fs.readdirSync(categoryPath);
          const jsxFiles = files.filter(file => file.endsWith('.jsx'));
          
          modules[category] = jsxFiles.map(file => ({
            name: file.replace('.jsx', ''),
            path: path.join(category, file),
            fullPath: path.join(categoryPath, file)
          }));
        }
      }
    } catch (error) {
      console.error('Error scanning modules:', error);
    }
    
    return modules;
  }
  
  /**
   * Read module contents to understand their properties and styling
   * @param {string} modulePath - Relative path to module from modules directory
   * @returns {Object} - Module metadata
   */
  readModule(modulePath) {
    try {
      const fullPath = path.join(this.modulesPath, modulePath);
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Extract props from component signature
      const propsMatch = content.match(/\(([^)]+)\)/);
      const props = propsMatch ? propsMatch[1].split(',').map(p => p.trim()) : [];
      
      // Extract component name
      const nameMatch = content.match(/const\s+(\w+)/);
      const componentName = nameMatch ? nameMatch[1] : '';
      
      return {
        name: componentName,
        path: modulePath,
        content,
        props,
        hasImage: content.includes('imageUrl') || content.includes('image'),
        hasButton: content.includes('buttonText') || content.includes('buttonLink')
      };
    } catch (error) {
      console.error(`Error reading module ${modulePath}:`, error);
      return null;
    }
  }
  
  /**
   * Select the best matching modules based on the planner's recommendations
   * @param {Object} plan - Output from planner agent
   * @returns {Object} - Selected modules with metadata
   */
  selectModules(plan) {
    const selectedModules = {};
    const consistencyNotes = [];
    
    // Map section types to module categories
    const sectionToCategory = {
      navbar: 'navbar',
      hero: 'hero',
      products: 'products',
      testimonials: 'testimonials',
      cta: 'cta',
      footer: 'footer'
    };
    
    // Select modules for each required section
    for (const section of plan.sections) {
      const category = sectionToCategory[section];
      
      if (!this.availableModules[category] || this.availableModules[category].length === 0) {
        console.warn(`No modules found for category: ${category}`);
        continue;
      }
      
      // Simple selection logic: prefer higher numbered modules for more complex designs
      // In a real system, this would be more sophisticated based on style matching
      const modules = this.availableModules[category];
      let selectedModule = modules[modules.length - 1]; // Default to last (highest number)
      
      // For now, we'll just pick the last module in each category
      // A more advanced system would match based on style_preference and use_case
      selectedModules[section] = {
        path: selectedModule.path,
        name: selectedModule.name,
        fullPath: selectedModule.fullPath
      };
      
      // Read the module to get its props
      const moduleMetadata = this.readModule(selectedModule.path);
      if (moduleMetadata) {
        selectedModules[section].metadata = moduleMetadata;
      }
    }
    
    // Add consistency notes
    if (plan.style_preference === 'modern') {
      consistencyNotes.push('Selected modules should follow modern design principles with clean lines and adequate spacing');
    }
    
    return {
      selected_modules: selectedModules,
      module_props: this.extractRequiredProps(selectedModules),
      consistency_notes: consistencyNotes
    };
  }
  
  /**
   * Extract required props from selected modules
   * @param {Object} selectedModules - Selected modules with metadata
   * @returns {Object} - Props required for each module
   */
  extractRequiredProps(selectedModules) {
    const props = {};
    
    for (const [section, moduleInfo] of Object.entries(selectedModules)) {
      if (moduleInfo.metadata && moduleInfo.metadata.props) {
        props[section] = moduleInfo.metadata.props;
      } else {
        props[section] = []; // Default empty if no props found
      }
    }
    
    return props;
  }
}
