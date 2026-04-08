export class PlannerAgent {
  constructor() {
    this.useCaseKeywords = {
      ecommerce: ['store', 'shop', 'ecommerce', 'products', 'sell', 'buy', 'cart', 'tshirt', 'clothing', 'fashion'],
      portfolio: ['portfolio', 'personal', 'resume', 'cv', 'developer', 'designer', 'artist', 'photographer'],
      landing: ['landing', 'page', 'startup', 'app', 'software', 'service', 'business'],
      blog: ['blog', 'news', 'articles', 'content', 'writing']
    };
    
    this.styleKeywords = {
      modern: ['modern', 'contemporary', 'sleek', 'minimal', 'clean'],
      classic: ['classic', 'traditional', 'elegant', 'formal'],
      minimal: ['minimal', 'simple', 'basic', 'plain']
    };
  }

  /**
   * Analyze user input and determine required sections
   * @param {string} userInput - User's website description
   * @returns {Object} - Plan with sections, use_case, and style_preference
   */
  planWebsite(userInput) {
    const inputLower = userInput.toLowerCase();
    
    // Determine use case
    let useCase = 'landing'; // default
    let maxScore = 0;
    
    for (const [category, keywords] of Object.entries(this.useCaseKeywords)) {
      let score = 0;
      for (const keyword of keywords) {
        if (inputLower.includes(keyword)) {
          score++;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        useCase = category;
      }
    }
    
    // Determine style preference
    let stylePreference = 'modern'; // default
    maxScore = 0;
    
    for (const [style, keywords] of Object.entries(this.styleKeywords)) {
      let score = 0;
      for (const keyword of keywords) {
        if (inputLower.includes(keyword)) {
          score++;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        stylePreference = style;
      }
    }
    
    // Determine required sections based on use case
    const sections = this.determineSections(useCase, userInput);
    
    return {
      sections,
      use_case: useCase,
      style_preference: stylePreference
    };
  }
  
  /**
   * Determine which sections are needed based on use case
   * @param {string} useCase - Detected use case
   * @param {string} userInput - Original user input for additional context
   * @returns {Array} - List of required section types
   */
  determineSections(useCase, userInput) {
    const inputLower = userInput.toLowerCase();
    let sections = [];
    
    // Always include navbar and footer unless explicitly excluded
    if (!inputLower.includes('no navbar') && !inputLower.includes('without navbar')) {
      sections.push('navbar');
    }
    
    if (!inputLower.includes('no footer') && !inputLower.includes('without footer')) {
      sections.push('footer');
    }
    
    // Add sections based on use case
    switch (useCase) {
      case 'ecommerce':
        sections.push('hero');
        sections.push('products');
        sections.push('cta');
        break;
        
      case 'portfolio':
        sections.push('hero');
        sections.push('testimonials');
        sections.push('cta');
        break;
        
      case 'landing':
        sections.push('hero');
        // Decide between products or testimonials based on context
        if (inputLower.includes('product') || inputLower.includes('feature') || inputLower.includes('service')) {
          sections.push('products');
        } else {
          sections.push('testimonials');
        }
        sections.push('cta');
        break;
        
      case 'blog':
        sections.push('hero');
        // For blog, we might want testimonials or just go straight to CTA
        sections.push('testimonials');
        sections.push('cta');
        break;
        
      default:
        // Default landing page structure
        sections.push('hero');
        sections.push('products'); // assuming products is more generic
        sections.push('cta');
    }
    
    // Remove duplicates while preserving order
    return [...new Set(sections)];
  }
}
