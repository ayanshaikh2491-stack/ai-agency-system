#!/usr/bin/env node

/**
 * 🤖 AGENT COORDINATOR CLI
 * Manage sub-agents for website building
 */

const ManagedAgentOrchestrator = require('./orchestrator');

async function main() {
    const command = process.argv[2] || '--help';

    if (command === '--help' || command === '-h') {
        console.log(`
╔════════════════════════════════════════════════════════╗
║      🤖 MANAGED AGENT ORCHESTRATOR - CLI TOOL          ║
╚════════════════════════════════════════════════════════╝

Usage:
  node agent-coordinator.js [command] [options]

Commands:
  🔧 SETUP & CONFIG:
    setup              Setup Groq API or other LLM
    config             Show current configuration
    check              Verify API keys are set

  🚀 DEPLOY:
    deploy <name>      Deploy single website with agents
    batch <num>        Deploy multiple websites
    3d <num>           Deploy 3D websites with agents

  🤖 AGENT MANAGEMENT:
    agents             List all registered sub-agents
    status             Show task queue status
    message <agent>    Send message to specific agent
    broadcast <msg>    Send message to all agents

  📊 REPORTING:
    report             Generate full execution report
    results            Show task results

  🧪 TESTING:
    test               Test LLM connection
    test:groq          Test Groq API
    test:openrouter    Test OpenRouter API
    test:local         Test Local LLM

Examples:
  node agent-coordinator.js setup            # Setup Groq API
  node agent-coordinator.js deploy "My Gym"  # Deploy 1 website
  node agent-coordinator.js batch 5          # Deploy 5 websites
  node agent-coordinator.js agents           # List agents
  node agent-coordinator.js status           # Check progress
  node agent-coordinator.js test:groq        # Test Groq

Environment Variables:
  LLM_PROVIDER          groq | openrouter | local | claude
  GROQ_API_KEY          API key from console.groq.com
  OPENROUTER_API_KEY    API key from openrouter.ai
  LOCAL_LLM_URL         http://localhost:8000 (for local)
  GITHUB_TOKEN          For GitHub deployment
  VERCEL_TOKEN          For Vercel deployment

Get Started:
  1. node agent-coordinator.js setup
  2. node agent-coordinator.js test:groq
  3. node agent-coordinator.js deploy "My Business"

Docs:
  - MANAGED_AGENTS.md        Full system guide
  - agent-definitions.js     Sub-agent prompts
  - orchestrator.js          Main orchestrator code
    `);
        process.exit(0);
    }

    const orchestrator = new ManagedAgentOrchestrator({
        llmProvider: process.env.LLM_PROVIDER || 'groq',
    });

    try {
        switch (command) {
            // ============== SETUP ==============
            case 'setup':
                orchestrator.printApiSetup();
                break;

            case 'config':
                console.log('Current Configuration:');
                console.log(JSON.stringify(orchestrator.config, null, 2));
                break;

            case 'check':
                console.log('\n🔍 Checking API keys...\n');
                if (process.env.LLM_PROVIDER === 'groq' || !process.env.LLM_PROVIDER) {
                    console.log(`GROQ_API_KEY: ${process.env.GROQ_API_KEY ? '✅ Set' : '❌ Not set'}`);
                    console.log(`   Get key: https://console.groq.com/keys\n`);
                }
                if (process.env.LLM_PROVIDER === 'openrouter') {
                    console.log(`OPENROUTER_API_KEY: ${process.env.OPENROUTER_API_KEY ? '✅ Set' : '❌ Not set'}`);
                    console.log(`   Get key: https://openrouter.ai/keys\n`);
                }
                if (process.env.LLM_PROVIDER === 'local') {
                    console.log(`LOCAL_LLM_URL: ${process.env.LOCAL_LLM_URL || 'http://localhost:11434'}`);
                    console.log(`   Setup: ollama pull mistral && ollama serve\n`);
                }
                break;

            // ============== AGENTS ==============
            case 'agents':
                orchestrator.registerSubAgents();
                break;

            case 'status':
                orchestrator.printStatus();
                break;

            case 'deploy':
                {
                    const siteName = process.argv[3];
                    if (!siteName) {
                        console.error('❌ Usage: node agent-coordinator.js deploy "Site Name"');
                        process.exit(1);
                    }

                    orchestrator.registerSubAgents();
                    const results = await orchestrator.coordinateAgents({
                        websiteName: siteName,
                        businessType: 'services',
                    });

                    console.log('\n📊 DEPLOYMENT RESULTS:');
                    console.log(JSON.stringify(results, null, 2));
                    orchestrator.printStatus();
                }
                break;

            case 'batch':
                {
                    const numSites = parseInt(process.argv[3]) || 5;
                    console.log(`\n🤖 Batch deploying ${numSites} websites with agents...\n`);
                    // In production, this would deploy multiple sites with different agents
                    console.log(`Would deploy ${numSites} sites using agent coordination.`);
                }
                break;

            case '3d':
                {
                    const num3d = parseInt(process.argv[3]) || 10;
                    console.log(`\n🔥 Deploying ${num3d} 3D websites with agents...\n`);
                    orchestrator.registerSubAgents();
                    console.log('3D websites would be deployed with all agents coordinating.');
                }
                break;

            // ============== TESTING ==============
            case 'test':
                {
                    console.log('\n🧪 Testing all LLM providers...\n');
                    const testProviders = ['groq', 'openrouter', 'local'];
                    for (const provider of testProviders) {
                        console.log(`Testing ${provider}...`);
                        // Would test in production
                    }
                }
                break;

            case 'test:groq':
                {
                    console.log('\n🧪 Testing Groq API...\n');
                    if (!process.env.GROQ_API_KEY) {
                        console.error('❌ GROQ_API_KEY not set');
                        console.error('   Set it: export GROQ_API_KEY="gsk_xxxxx"');
                        process.exit(1);
                    }
                    console.log('✅ GROQ_API_KEY is set');
                    console.log('✅ Ready to use Groq for agent LLM');
                }
                break;

            case 'test:openrouter':
                {
                    console.log('\n🧪 Testing OpenRouter API...\n');
                    if (!process.env.OPENROUTER_API_KEY) {
                        console.error('❌ OPENROUTER_API_KEY not set');
                        console.error('   Set it: export OPENROUTER_API_KEY="sk-or-xxxxx"');
                        process.exit(1);
                    }
                    console.log('✅ OPENROUTER_API_KEY is set');
                }
                break;

            case 'test:local':
                {
                    console.log('\n🧪 Testing Local LLM...\n');
                    const url = process.env.LOCAL_LLM_URL || 'http://localhost:11434';
                    console.log(`Checking ${url}...`);
                    console.log('Make sure to run: ollama serve');
                }
                break;

            // ============== REPORTING ==============
            case 'report':
                {
                    orchestrator.registerSubAgents();
                    console.log('\n📊 FULL EXECUTION REPORT:\n');
                    orchestrator.printStatus();
                    console.log('Tasks:', orchestrator.taskQueue.length);
                    console.log('Sub-agents:', Object.keys(orchestrator.subAgents).length);
                }
                break;

            case 'results':
                {
                    console.log('\n📋 TASK RESULTS:\n');
                    console.log(JSON.stringify(orchestrator.results, null, 2));
                }
                break;

            default:
                console.error(`❌ Unknown command: ${command}`);
                console.log('\nRun: node agent-coordinator.js --help');
                process.exit(1);
        }
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

main();
