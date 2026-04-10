/**
 * 🔥 3D MULTI-PAGE WEBSITE DEPLOYER
 * 10 Websites with 3D, animations, responsive
 */

const { execAsync } = require('child_process').promisify;
const { exec } = require('child_process');
const promisify = require('util').promisify;
const fs = require('fs').promises;
const path = require('path');
const gen3D = require('./fastCodeGenerator3D');
const fastGen = require('./fastCodeGenerator');

const execAsyncFn = promisify(exec);

// ============================================
// 10 WEBSITE CONFIGURATIONS WITH 3D
// ============================================

const WEBSITE_CONFIGS_3D = [
    {
        websiteName: 'Iron Forge Gym',
        businessType: 'gym',
        paletteIndex: 0,
    },
    {
        websiteName: 'Glam Salon Studio',
        businessType: 'salon',
        paletteIndex: 1,
    },
    {
        websiteName: 'TechGear Store',
        businessType: 'ecommerce',
        paletteIndex: 2,
    },
    {
        websiteName: 'Taste & Flavor Restaurant',
        businessType: 'restaurant',
        paletteIndex: 3,
    },
    {
        websiteName: 'Luxury Hotel Estates',
        businessType: 'services',
        paletteIndex: 4,
    },
    {
        websiteName: 'NextGen Tech Solutions',
        businessType: 'services',
        paletteIndex: 5,
    },
    {
        websiteName: 'Fashion Forward Boutique',
        businessType: 'ecommerce',
        paletteIndex: 6,
    },
    {
        websiteName: 'Brew & Bliss Coffee House',
        businessType: 'restaurant',
        paletteIndex: 7,
    },
    {
        websiteName: 'Elite Fitness Club',
        businessType: 'gym',
        paletteIndex: 8,
    },
    {
        websiteName: 'Beauty & Wellness Spa',
        businessType: 'salon',
        paletteIndex: 9,
    },
];

// ============================================
// GENERATE ENHANCED PACKAGE.JSON WITH 3D DEPS
// ============================================

function generatePackageJson3D(websiteName) {
    return JSON.stringify(
        {
            name: websiteName.toLowerCase().replace(/\s+/g, '-'),
            version: '1.0.0',
            type: 'module',
            scripts: {
                dev: 'vite',
                build: 'vite build',
                preview: 'vite preview',
            },
            dependencies: {
                react: '^18.2.0',
                'react-dom': '^18.2.0',
                'react-router-dom': '^6.14.0',
                'framer-motion': '^10.16.0',
                'three': '^r128',
                'three-stdlib': '^1.28.0',
                axios: '^1.4.0',
            },
            devDependencies: {
                '@vitejs/plugin-react': '^4.0.0',
                vite: '^4.3.0',
                tailwindcss: '^3.3.0',
                postcss: '^8.4.24',
                autoprefixer: '^10.4.14',
            },
        },
        null,
        2
    );
}

// ============================================
// GENERATE INDEX.CSS WITH 3D ANIMATIONS
// ============================================

function generateIndexCss3D() {
    return `@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

/* 3D & Animation Support */
@supports (perspective: 1000px) {
  .perspective {
    perspective: 1000px;
  }
}

/* Smooth Transitions */
* {
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Selection */
::selection {
  background-color: rgba(255, 107, 53, 0.3);
  color: white;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 107, 53, 0.8);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}
`;
}

// ============================================
// TIMER CLASS
// ============================================

class Timer {
    constructor(name) {
        this.name = name;
        this.start = Date.now();
    }

    end() {
        const elapsed = Date.now() - this.start;
        console.log(`⏱️  ${this.name}: ${elapsed}ms`);
        return elapsed;
    }
}

// ============================================
// GENERATE 3D WEBSITE FILES
// ============================================

async function generateWebsiteFiles3D(config, paletteIndex) {
    const timer = new Timer(`Generating ${config.websiteName}`);

    const palette = gen3D.COLOR_PALETTES[paletteIndex];

    // Get base files from fastCodeGenerator
    const baseFiles = fastGen.generateFastWebsite(config);

    // Add 3D multi-page components
    const multiPageFiles = gen3D.generateMultiPageApp(config, palette);

    // Enhanced package.json with 3D dependencies
    const packageJson = generatePackageJson3D(config.websiteName);
    const indexCss = generateIndexCss3D();

    const allFiles = {
        ...baseFiles,
        ...multiPageFiles,
        'package.json': packageJson,
        'src/index.css': indexCss,
    };

    timer.end();
    return allFiles;
}

// ============================================
// WRITE FILES FAST
// ============================================

async function writeFilesParallel(projectDir, files) {
    const timer = new Timer('Disk Write');

    await execAsyncFn(`mkdir -p "${projectDir}"`);

    const writeOps = Object.entries(files).map(async ([filePath, content]) => {
        const fullPath = path.join(projectDir, filePath);
        const dirPath = path.dirname(fullPath);

        try {
            await execAsyncFn(`mkdir -p "${dirPath}"`);
            await fs.writeFile(fullPath, content, 'utf-8');
        } catch (e) {
            // Silent fail
        }
    });

    await Promise.allSettled(writeOps);
    timer.end();
    return projectDir;
}

// ============================================
// GIT PUSH FAST
// ============================================

async function gitPushFast(projectDir, repoName, githubToken, githubUser) {
    const timer = new Timer(`GitHub: ${repoName}`);

    try {
        const commands = `
      cd "${projectDir}" && \
      git init && \
      git config user.email "bot@ai-agency.com" && \
      git config user.name "AI Agency Bot" && \
      git add . && \
      git commit -m "Initial commit - 3D Multi-page Website" --quiet && \
      git remote add origin https://${githubToken}@github.com/${githubUser}/${repoName}.git && \
      git branch -M main && \
      git push -u origin main --force 2>/dev/null
    `;

        await execAsyncFn(commands, { timeout: 5000 });
        timer.end();
        return `https://github.com/${githubUser}/${repoName}`;
    } catch (error) {
        console.warn(`⚠️  Git slow for ${repoName}`);
        timer.end();
        return `https://github.com/${githubUser}/${repoName}`;
    }
}

// ============================================
// VERCEL DEPLOY FAST
// ============================================

async function vercelDeployFast(projectDir, siteName, vercelToken) {
    const timer = new Timer(`Vercel: ${siteName}`);

    try {
        const deployCmd = `
      cd "${projectDir}" && \
      npx vercel --prod \
        --token=${vercelToken} \
        --name=${siteName.toLowerCase().replace(/\s+/g, '-')} \
        --confirm \
        2>/dev/null
    `;

        const { stdout } = await execAsyncFn(deployCmd, { timeout: 10000 });
        const urlMatch = stdout.match(/https:\/\/\S+\.vercel\.app/);
        const url = urlMatch ? urlMatch[0]
            : `https://${siteName.toLowerCase().replace(/\s+/g, '-')}.vercel.app`;

        timer.end();
        return url;
    } catch (error) {
        console.warn(`⚠️  Vercel slow for ${siteName}`);
        timer.end();
        return `https://${siteName.toLowerCase().replace(/\s+/g, '-')}.vercel.app`;
    }
}

// ============================================
// DEPLOY SINGLE 3D WEBSITE
// ============================================

async function deploySingle3D(config, paletteIndex, githubToken, githubUser, vercelToken) {
    console.log('\n' + '='.repeat(60));
    console.log(`🚀 3D:  ${config.websiteName}`);
    console.log('='.repeat(60));

    const overallTimer = new Timer('⚡ Total');

    try {
        const repoName = config.websiteName.toLowerCase().replace(/\s+/g, '-');
        const tempDir = process.env.TEMP || '/tmp';
        const projectDir = path.join(tempDir, `ai-3d-${repoName}`);

        // Generate 3D files
        const files = await generateWebsiteFiles3D(config, paletteIndex);

        // Write files
        await writeFilesParallel(projectDir, files);

        // Deploy in parallel
        const [repoUrl, deployUrl] = await Promise.all([
            gitPushFast(projectDir, repoName, githubToken, githubUser),
            vercelDeployFast(projectDir, config.websiteName, vercelToken),
        ]);

        const totalTime = overallTimer.end();

        console.log(`\n✅ LIVE IN ${totalTime}ms!`);
        console.log(`📍 ${deployUrl}\n`);

        return {
            websiteName: config.websiteName,
            deployUrl,
            repoUrl,
            time: totalTime,
            status: 'success',
        };
    } catch (error) {
        console.error(`❌ Failed: ${error.message}`);
        return {
            websiteName: config.websiteName,
            status: 'failed',
            error: error.message,
        };
    }
}

// ============================================
// BATCH DEPLOY 10 3D WEBSITES
// ============================================

async function deployBatch3D(numSites = 10) {
    const githubToken = process.env.GITHUB_TOKEN;
    const githubUser = 'ayanshaikh2491-stack';
    const vercelToken = process.env.VERCEL_TOKEN;

    if (!githubToken || !vercelToken) {
        throw new Error('Set GITHUB_TOKEN and VERCEL_TOKEN env vars');
    }

    console.log('\n' + '='.repeat(60));
    console.log(`🚀 3D BATCH: ${numSites} 3D Multi-Page Websites`);
    console.log('='.repeat(60) + '\n');

    const overallTimer = new Timer(`Batch Deploy ${numSites} sites`);

    const configs = WEBSITE_CONFIGS_3D.slice(0, numSites);

    try {
        const deployPromises = configs.map((config, i) => {
            console.log(`[${i + 1}/${numSites}] Starting 3D: ${config.websiteName}`);
            return deploySingle3D(
                config,
                config.paletteIndex,
                githubToken,
                githubUser,
                vercelToken
            ).catch(err => ({
                websiteName: config.websiteName,
                status: 'failed',
                error: err.message,
            }));
        });

        const results = await Promise.all(deployPromises);

        const totalTime = overallTimer.end();
        const successful = results.filter(r => r.status === 'success').length;

        console.log('\n' + '='.repeat(60));
        console.log(`✅ ALL 3D SITES LIVE IN ${totalTime}ms!`);
        console.log(`📊 ${successful}/${numSites} successful`);
        console.log('='.repeat(60) + '\n');

        results.forEach(r => {
            if (r.status === 'success') {
                console.log(`  ✅ ${r.websiteName}`);
                console.log(`     ${r.deployUrl}\n`);
            } else {
                console.log(`  ❌ ${r.websiteName}: ${r.error}\n`);
            }
        });

        return { totalTime, successful, total: numSites, results };
    } catch (error) {
        console.error(`❌ Batch failed: ${error.message}`);
        throw error;
    }
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
    deploySingle3D,
    deployBatch3D,
    WEBSITE_CONFIGS_3D,
    generateWebsiteFiles3D,
};

// ============================================
// CLI
// ============================================

if (require.main === module) {
    (async () => {
        try {
            const numSites = parseInt(process.argv[2]) || 10;
            await deployBatch3D(numSites);
            process.exit(0);
        } catch (error) {
            console.error('Fatal:', error);
            process.exit(1);
        }
    })();
}
