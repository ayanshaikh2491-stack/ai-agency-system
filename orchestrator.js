/**
 * 🤖 MANAGED AGENT ORCHESTRATOR
 * Main agent coordinates sub-agents for 3D website building
 * Supports: Groq (FREE), OpenRouter, Local LLMs, Claude
 */

const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

// ============================================
// 📋 AGENT CONFIGURATION & INITIALIZATION
// ============================================

class ManagedAgentOrchestrator {
    constructor(config = {}) {
        this.config = {
            llmProvider: config.llmProvider || process.env.LLM_PROVIDER || 'groq',
            groqApiKey: process.env.GROQ_API_KEY,
            openrouterApiKey: process.env.OPENROUTER_API_KEY,
            claudeApiKey: process.env.CLAUDE_API_KEY,
            localLlmUrl: process.env.LOCAL_LLM_URL || 'http://localhost:8000',
            ...config,
        };

        this.subAgents = {};
        this.taskQueue = [];
        this.results = {};
    }

    // ============================================
    // 🤖 SUB-AGENT DEFINITIONS
    // ============================================

    registerSubAgents() {
        this.subAgents = {
            frontend_builder: {
                name: 'Frontend Builder',
                role: 'React & UI Code Generation',
                prompt: `You are a frontend specialist. Generate beautiful React components with:
- Framer Motion animations
- Tailwind CSS responsive design
- React Router multi-page support
- Accessibility (WCAG 2.2)
Focus on: Home, Products, About, Contact pages`,
                tools: ['generateCode', 'createComponents', 'testResponsiveness'],
                maxTokens: 4000,
            },
            backend_builder: {
                name: 'Backend Builder',
                role: 'API & Server Code Generation',
                prompt: `You are a backend specialist. Generate:
- Express.js/Node.js APIs
- Contact form handlers
- Booking/subscription endpoints
- Email integration with Nodemailer
- Proper error handling & validation
Focus on: /api routes, database schema, authentication`,
                tools: ['generateApi', 'createEndpoints', 'setupDatabase'],
                maxTokens: 3000,
            },
            deployer: {
                name: 'Deployment Agent',
                role: 'GitHub & Vercel Deployment',
                prompt: `You are a deployment specialist. Handle:
- GitHub repository creation & push
- Vercel deployment configuration
- Environment variable setup
- CI/CD pipeline configuration
- Monitoring & logging setup
Focus on: Fast, reliable deployments with auto-scaling`,
                tools: ['gitPush', 'vercelDeploy', 'setupEnv'],
                maxTokens: 2000,
            },
            designer: {
                name: 'Design Agent',
                role: 'UI/UX Design & Color Schemes',
                prompt: `You are a design specialist. Create:
- Color palettes & design tokens
- Typography systems
- Component design specs
- Responsive layout guidelines
- Accessibility guidelines (WCAG 2.2)
Focus on: Visual hierarchy, branding, modern aesthetics`,
                tools: ['designTokens', 'createPalette', 'validateContrast'],
                maxTokens: 2500,
            },
            tester: {
                name: 'QA Agent',
                role: 'Testing & Quality Assurance',
                prompt: `You are a QA specialist. Test:
- Responsive design (mobile, tablet, desktop)
- Cross-browser compatibility
- Accessibility compliance (WCAG 2.2)
- Performance metrics (Lighthouse)
- Form validation & error handling
Focus on: Catching bugs before production`,
                tools: ['runTests', 'checkAccessibility', 'performanceAudit'],
                maxTokens: 2500,
            },
            optimizer: {
                name: 'Performance Optimizer',
                role: 'Speed & SEO Optimization',
                prompt: `You are a performance specialist. Optimize:
- Page speed (Lighthouse score > 90)
- SEO meta tags & structured data
- Image optimization & lazy loading
- Code splitting & bundling
- Caching strategies
Focus on: Fast, discoverable websites`,
                tools: ['minifyCode', 'optimizeImages', 'setupSeo'],
                maxTokens: 2500,
            },
        };

        console.log('✅ Registered 6 sub-agents:');
        Object.values(this.subAgents).forEach(agent => {
            console.log(`   🤖 ${agent.name} - ${agent.role}`);
        });
    }

    // ============================================
    // 🧠 LLM API HANDLERS (Free & Paid)
    // ============================================

    async callLLM(prompt, agentName = 'main') {
        const agent = this.subAgents[agentName];
        const systemPrompt = agent
            ? agent.prompt
            : 'You are a helpful AI assistant for website building.';

        try {
            switch (this.config.llmProvider) {
                case 'groq':
                    return await this.callGroqAPI(prompt, systemPrompt);
                case 'openrouter':
                    return await this.callOpenRouterAPI(prompt, systemPrompt);
                case 'local':
                    return await this.callLocalLLM(prompt, systemPrompt);
                case 'claude':
                    return await this.callClaudeAPI(prompt, systemPrompt);
                default:
                    throw new Error(`Unsupported LLM provider: ${this.config.llmProvider}`);
            }
        } catch (error) {
            console.error(`❌ LLM Error (${this.config.llmProvider}):`, error.message);
            throw error;
        }
    }

    async callGroqAPI(prompt, systemPrompt) {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'mixtral-8x7b-32768', // Free, fast model
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: prompt },
                ],
                temperature: 0.7,
                max_tokens: 2000,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.config.groqApiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.choices[0].message.content;
    }

    async callOpenRouterAPI(prompt, systemPrompt) {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'mistralai/mistral-7b-instruct', // Free tier available
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: prompt },
                ],
                temperature: 0.7,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.config.openrouterApiKey}`,
                    'HTTP-Referer': 'https://ai-agency.local',
                },
            }
        );

        return response.data.choices[0].message.content;
    }

    async callLocalLLM(prompt, systemPrompt) {
        try {
            const response = await axios.post(
                `${this.config.localLlmUrl}/v1/chat/completions`,
                {
                    model: 'local',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: prompt },
                    ],
                    temperature: 0.7,
                    max_tokens: 2000,
                }
            );

            return response.data.choices[0].message.content;
        } catch (error) {
            throw new Error(
                `Local LLM not available at ${this.config.localLlmUrl}. Start it first!`
            );
        }
    }

    async callClaudeAPI(prompt, systemPrompt) {
        // Placeholder for Claude API (requires paid key)
        throw new Error('Claude API support coming soon. Use Groq (free) instead!');
    }

    // ============================================
    // 📋 TASK QUEUE MANAGEMENT
    // ============================================

    createTask(agentName, taskType, description, priority = 'normal') {
        const task = {
            id: `task-${Date.now()}`,
            agent: agentName,
            type: taskType,
            description,
            priority,
            status: 'pending', // pending, in-progress, completed, failed
            createdAt: new Date(),
            result: null,
        };

        this.taskQueue.push(task);
        console.log(`📋 Task created: ${task.id} for ${agentName}`);
        return task.id;
    }

    async executeTask(taskId) {
        const task = this.taskQueue.find(t => t.id === taskId);
        if (!task) throw new Error(`Task not found: ${taskId}`);

        console.log(`\n🚀 Executing: ${task.type} by ${task.agent}`);
        task.status = 'in-progress';

        try {
            const result = await this.callLLM(task.description, task.agent);
            task.result = result;
            task.status = 'completed';
            this.results[taskId] = result;

            console.log(`✅ Completed: ${task.type}`);
            return result;
        } catch (error) {
            task.status = 'failed';
            task.error = error.message;
            console.error(`❌ Failed: ${task.type} - ${error.message}`);
            throw error;
        }
    }

    async executeTasks(agentName) {
        const tasks = this.taskQueue.filter(
            t => t.agent === agentName && t.status === 'pending'
        );

        console.log(`\n📋 ${agentName}: ${tasks.length} tasks`);

        for (const task of tasks) {
            await this.executeTask(task.id);
        }
    }

    // ============================================
    // 🤝 AGENT COORDINATION
    // ============================================

    async coordinateAgents(websiteConfig) {
        console.log('\n' + '='.repeat(60));
        console.log('🤖 AGENT COORDINATION STARTED');
        console.log('='.repeat(60));

        // Phase 1: Design Agent (creates color palettes & design specs)
        console.log('\n⏰ Phase 1: Design Agent');
        this.createTask(
            'designer',
            'create_palette',
            `Create a color palette for ${websiteConfig.websiteName} (${websiteConfig.businessType}). 
      Return: primary, accent, highlight, light colors with hex codes.`
        );
        await this.executeTasks('designer');

        // Phase 2: Frontend Builder (creates React components)
        console.log('\n⏰ Phase 2: Frontend Builder');
        this.createTask(
            'frontend_builder',
            'generate_pages',
            `Generate React pages for ${websiteConfig.websiteName}:
      - Home (hero + 3D animation)
      - Products (with 3D cards)
      - About (aligned with design palette)
      - Contact (form handling)
      Use Framer Motion, Tailwind CSS, React Router.`
        );
        await this.executeTasks('frontend_builder');

        // Phase 3: Backend Builder (creates API endpoints)
        console.log('\n⏰ Phase 3: Backend Builder');
        this.createTask(
            'backend_builder',
            'generate_api',
            `Generate Express.js API for ${websiteConfig.websiteName}:
      - /api/contact (form submission)
      - /api/booking (appointment)
      - /api/subscribe (newsletter)
      Include: validation, error handling, Nodemailer integration.`
        );
        await this.executeTasks('backend_builder');

        // Phase 4: QA & Testing Agent
        console.log('\n⏰ Phase 4: QA Agent');
        this.createTask(
            'tester',
            'test_all',
            `Test ${websiteConfig.websiteName}:
      - Responsive design (mobile, tablet, desktop)
      - Accessibility (WCAG 2.2)
      - Form validation
      - API endpoints
      Return: test report with issues & recommendations.`
        );
        await this.executeTasks('tester');

        // Phase 5: Performance Optimizer
        console.log('\n⏰ Phase 5: Optimizer Agent');
        this.createTask(
            'optimizer',
            'optimize',
            `Optimize ${websiteConfig.websiteName}:
      - Page speed (target Lighthouse > 90)
      - SEO meta tags
      - Image optimization
      - Code splitting
      Return: optimization checklist.`
        );
        await this.executeTasks('optimizer');

        // Phase 6: Deployer (final deployment)
        console.log('\n⏰ Phase 6: Deployment Agent');
        this.createTask(
            'deployer',
            'deploy',
            `Deploy ${websiteConfig.websiteName} to production:
      - Push to GitHub
      - Create Vercel project
      - Set environment variables
      - Configure CI/CD
      Return: live URL.`
        );
        await this.executeTasks('deployer');

        console.log('\n' + '='.repeat(60));
        console.log('✅ ALL AGENTS COMPLETED');
        console.log('='.repeat(60) + '\n');

        return this.results;
    }

    // ============================================
    // 📊 AGENT COMMUNICATION
    // ============================================

    messageAgent(agentName, message) {
        console.log(`\n💬 Message to ${agentName}:`);
        console.log(`   "${message}"`);
        this.createTask(agentName, 'message', message);
    }

    broadcastMessage(message) {
        console.log(`\n📢 Broadcast to all agents: "${message}"`);
        Object.keys(this.subAgents).forEach(agentName => {
            this.createTask(agentName, 'broadcast', message);
        });
    }

    // ============================================
    // 📊 STATUS & REPORTING
    // ============================================

    getStatus() {
        const total = this.taskQueue.length;
        const completed = this.taskQueue.filter(t => t.status === 'completed').length;
        const failed = this.taskQueue.filter(t => t.status === 'failed').length;
        const pending = this.taskQueue.filter(t => t.status === 'pending').length;

        return {
            total,
            completed,
            failed,
            pending,
            successRate: total > 0 ? ((completed / total) * 100).toFixed(1) : 0,
        };
    }

    printStatus() {
        const status = this.getStatus();
        console.log('\n📊 AGENT STATUS:');
        console.log(`   Total Tasks: ${status.total}`);
        console.log(`   ✅ Completed: ${status.completed}`);
        console.log(`   ❌ Failed: ${status.failed}`);
        console.log(`   ⏳ Pending: ${status.pending}`);
        console.log(`   📈 Success Rate: ${status.successRate}%\n`);
    }

    // ============================================
    // 💾 CONFIGURATION & SETUP
    // ============================================

    async saveConfig() {
        const configPath = path.join(process.cwd(), '.agent-config.json');
        await fs.writeFile(
            configPath,
            JSON.stringify(
                {
                    llmProvider: this.config.llmProvider,
                    subAgents: Object.keys(this.subAgents),
                    taskCount: this.taskQueue.length,
                    lastExecuted: new Date().toISOString(),
                },
                null,
                2
            )
        );
        console.log(`💾 Config saved to ${configPath}`);
    }

    printApiSetup() {
        console.log(`
╔════════════════════════════════════════════════════════╗
║         🔑 API KEY SETUP (FREE OPTIONS)                ║
╚════════════════════════════════════════════════════════╝

1️⃣  GROQ API (RECOMMENDED - FREE & FAST)
    Sign up: https://console.groq.com
    Get API key: https://console.groq.com/keys
    
    Set environment:
    export GROQ_API_KEY="gsk_xxxxx"
    
    Then use:
    export LLM_PROVIDER="groq"

2️⃣  OpenRouter (FREE TIER AVAILABLE)
    Sign up: https://openrouter.ai
    Get API key: https://openrouter.ai/keys
    
    Set environment:
    export OPENROUTER_API_KEY="sk-or-xxxxx"
    
    Then use:
    export LLM_PROVIDER="openrouter"

3️⃣  Local LLM (COMPLETELY FREE)
    Install: ollama pull mistral
    Run: ollama serve
    
    Then use:
    export LLM_PROVIDER="local"
    export LOCAL_LLM_URL="http://localhost:11434"

4️⃣  Claude (PAID - for reference)
    Sign up: claude.ai
    Get API key: https://console.anthropic.com
    
    Set environment:
    export CLAUDE_API_KEY="sk-ant-xxxxx"
    
    Then use:
    export LLM_PROVIDER="claude"

RECOMMENDED:
  🟢 Best Choice: Groq (Free, fast, no limits)
  🟡 Good Choice: OpenRouter (Free tier available)
  🔴 Local Option: Ollama (Completely free, runs locally)

CHECK YOUR SETUP:
  echo $GROQ_API_KEY
  node --eval "require('./orchestrator').check()"
    `);
    }
}

// ============================================
// EXPORTS
// ============================================

module.exports = ManagedAgentOrchestrator;

// ============================================
// CLI USAGE
// ============================================

if (require.main === module) {
    (async () => {
        const orchestrator = new ManagedAgentOrchestrator({
            llmProvider: process.env.LLM_PROVIDER || 'groq',
        });

        if (process.argv[2] === '--setup') {
            orchestrator.printApiSetup();
        } else {
            orchestrator.registerSubAgents();
            orchestrator.printApiSetup();
        }
    })();
}
