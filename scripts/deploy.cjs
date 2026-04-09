const { execSync } = require('child_process');
require('dotenv').config();

console.log('Starting deployment process...');

// Initialize git repo if not exists
try {
  execSync('git status', { stdio: 'ignore' });
  console.log('Git repository already initialized');
} catch (error) {
  execSync('git init', { stdio: 'inherit' });
  console.log('Initialized git repository');
}

// Configure git user
execSync('git config user.name "AI Agency Bot"', { stdio: 'inherit' });
execSync('git config user.email "bot@aiagency.com"', { stdio: 'inherit' });

// Add all files
execSync('git add .', { stdio: 'inherit' });
console.log('Added all files to staging');

// Commit changes
execSync('git commit -m "Initial commit: AI Agency Website"', { stdio: 'inherit' });
console.log('Committed changes');

// Add remote origin if not exists
try {
  execSync('git remote get-url origin', { stdio: 'ignore' });
  console.log('Remote origin already exists');
} catch (error) {
  const repoUrl = `https://${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_USERNAME}/${process.env.REPO_NAME}.git`;
  execSync(`git remote add origin ${repoUrl}`, { stdio: 'inherit' });
  console.log('Added remote origin');
}

// Push to main branch
execSync('git push -u origin main --force', { stdio: 'inherit' });
console.log('Successfully pushed to GitHub');

console.log('Deployment completed!');