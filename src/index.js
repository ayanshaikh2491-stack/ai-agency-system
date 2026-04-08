import { PlannerAgent } from './plannerAgent.js';
import { ModuleReaderAgent } from './moduleReaderAgent.js';
import { BuilderAgent } from './builderAgent.js';

class WebsiteBuilderOrchestrator {
  constructor() {
    this.planner = new PlannerAgent();
    this.moduleReader = new ModuleReaderAgent();
    this.builder = new BuilderAgent();
  }
  
  /**
   * Build a website based on user input
   * @param {string} userInput - User's website description
   * @returns {Object} - Result with file path and status
   */
  buildWebsite(userInput) {
    try {
      console.log(`Building website for: "${userInput}"`);
      
      // Step 1: Planner determines what sections are needed
      const plan = this.planner.planWebsite(userInput);
      console.log('Planner output:', JSON.stringify(plan, null, 2));
      
      // Step 2: Module Reader selects appropriate modules
      const moduleSelection = this.moduleReader.selectModules(plan);
      console.log('Module Reader output:', JSON.stringify({
        selected_modules: Object.keys(moduleSelection.selected_modules).reduce((acc, key) => {
          acc[key] = {
            name: moduleSelection.selected_modules[key].name,
            path: moduleSelection.selected_modules[key].path
          };
          return acc;
        }, {}),
        module_props: moduleSelection.module_props,
        consistency_notes: moduleSelection.consistency_notes
      }, null, 2));
      
      // Step 3: Builder combines modules into final page
      const componentCode = this.builder.buildPage(moduleSelection, plan);
      const filePath = this.builder.savePage(componentCode);
      
      console.log(`Website built successfully! Saved to: ${filePath}`);
      
      return {
        success: true,
        filePath: filePath,
        plan: plan,
        moduleSelection: moduleSelection,
        message: `Website built successfully! Saved to: ${filePath}`
      };
    } catch (error) {
      console.error('Error building website:', error);
      return {
        success: false,
        error: error.message,
        message: `Failed to build website: ${error.message}`
      };
    }
  }
}

// Test the system
const orchestrator = new WebsiteBuilderOrchestrator();
const result = orchestrator.buildWebsite("Build T-shirt website");
console.log('Result:', result.message);
