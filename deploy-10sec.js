#!/usr/bin/env node

/**
 * 🚀 ULTRA-FAST DEPLOYMENT CLI
 * Usage: node deploy-10sec.js "Gym Name" gym
 * Usage: node deploy-10sec.js "Gym 1,Gym 2,Gym 3" gym
 */

const deployer = require('./ultraFastDeployer');

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
╔══════════════════════════════════════════════════════════╗
║     ⚡ 10-SECOND WEBSITE DEPLOYER (Single & Batch)       ║
╚══════════════════════════════════════════════════════════╝

Usage:
  node deploy-10sec.js "Website Name" gym
  node deploy-10sec.js "Site1,Site2,Site3" gym

Examples:
  🔥 Single: node deploy-10sec.js "Peak Gym" gym
  ⚡ Batch:  node deploy-10sec.js "Peak1,Peak2,Peak3" gym

Supported business types:
  gym, salon, ecommerce, services, portfolio, restaurant

Result:
  ✅ Deploy in 5-7 seconds (single)
  ✅ Deploy in 8-10 seconds (10 websites)
    `);
    process.exit(0);
  }

  const [names, businessType = 'gym'] = args;
  const siteNames = names.split(',').map(s => s.trim());

  console.log('\n' + '='.repeat(60));
  console.log(`🚀 DEPLOYING ${siteNames.length} website(s) with type: ${businessType}`);
  console.log('='.repeat(60) + '\n');

  try {
    const configs = siteNames.map(name => ({
      websiteName: name,
      businessType,
      primaryColor: '#FF6B35',
      accentColor: '#FFA500',
    }));

    const result = await deployer.deployFast(
      configs.length === 1 ? configs[0] : configs
    );

    console.log('\n✨ All done! Check the results above.\n');
    process.exit(0);
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
