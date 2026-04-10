#!/usr/bin/env node

/**
 * 🔥 3D MULTI-PAGE WEBSITE DEPLOYER CLI
 * Deploy 10 beautiful 3D websites in 10 seconds!
 */

const deployer = require('./pipeline/deploy3DWebsites');

async function main() {
    const args = process.argv.slice(2);
    const numSites = parseInt(args[0]) || 10;

    if (args.includes('--help') || args.includes('-h')) {
        console.log(`
╔════════════════════════════════════════════════════════╗
║   🔥 3D MULTI-PAGE WEBSITE DEPLOYER - 10 SECONDS      ║
╚════════════════════════════════════════════════════════╝

Usage:
  npm run deploy:3d [number of sites]

Examples:
  npm run deploy:3d        (Deploy all 10 sites)
  npm run deploy:3d 5      (Deploy 5 sites)
  npm run deploy:3d 3      (Deploy 3 sites)

Features:
  ✨ 3D Animations with Framer Motion
  📱 Fully Responsive (Mobile + Desktop)
  🎨 Unique Color Schemes
  📄 Multi-Page (Home, Products, About, Contact)
  ⚡ Deploy in 10 seconds
  🎯 Different Product Data Per Industry

Supported Industries:
  - Gym (Fitness)
  - Salon (Beauty)
  - E-commerce (Stores)
  - Restaurant (Food)
  - Hotel (Hospitality)
  - Tech (Services)
  - Fashion (Boutique)
  - Coffee Shop
  - Fitness Club
  - Spa & Wellness

Environment Variables (Required):
  export GITHUB_TOKEN="ghp_xxxxx"
  export VERCEL_TOKEN="vercel_xxxxx"

Get Tokens:
  GitHub:  https://github.com/settings/tokens
  Vercel:  https://vercel.com/account/tokens

    `);
        process.exit(0);
    }

    console.log(`
╔════════════════════════════════════════════════════════╗
║   🚀 DEPLOYING ${numSites} 3D WEBSITES IN 10 SECONDS  ║
╚════════════════════════════════════════════════════════╝
  `);

    try {
        const result = await deployer.deployBatch3D(numSites);
        process.exit(0);
    } catch (error) {
        console.error(`\n❌ Error: ${error.message}\n`);
        process.exit(1);
    }
}

main();
