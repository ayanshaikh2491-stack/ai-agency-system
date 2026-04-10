# 🤖 MANAGED AGENT SETUP (2 MINUTES)

## ⚡ SUPER QUICK START

### Step 1: Get Free Groq API Key (1 minute)

```bash
# 1. Open: https://console.groq.com
# 2. Sign up (free)
# 3. Click: https://console.groq.com/keys
# 4. Copy your API key (looks like: gsk_xxxxx)
```

### Step 2: Set It Up (1 minute)

```bash
# Mac/Linux
export GROQ_API_KEY="gsk_xxxxx"
export LLM_PROVIDER="groq"

# Windows PowerShell
$env:GROQ_API_KEY="gsk_xxxxx"
$env:LLM_PROVIDER="groq"
```

### Step 3: Test It

```bash
node agent-coordinator.js check
# Output: ✅ GROQ_API_KEY is set
```

### Step 4: Deploy

```bash
node agent-coordinator.js deploy "My Gym"
```

**Done!** 6 agents coordinate to build your website. 🚀

---

## 📋 WHAT AGENTS DO

```
Designer 🎨 → Creates color palette
     ↓
Frontend 💻 → Generates React pages
     ↓
Backend 🔌 → Creates APIs
     ↓
QA 🧪 → Tests everything
     ↓
Optimizer ⚡ → Optimizes performance
     ↓
Deployer 🚀 → Deploys to production
     ↓
Live Website ✅
```

---

## 🎯 AVAILABLE COMMANDS

```bash
# Deploy 1 website
node agent-coordinator.js deploy "Iron Forge Gym"

# Deploy 5 websites
node agent-coordinator.js batch 5

# Deploy 10 3D websites
node agent-coordinator.js 3d 10

# List agents
node agent-coordinator.js agents

# Check status
node agent-coordinator.js status

# Test Groq
node agent-coordinator.js test:groq

# Full setup guide
node agent-coordinator.js setup
```

---

## 🔑 FREE LLM OPTIONS

| Option | Cost | Setup Time | Speed |
|--------|------|-----------|-------|
| **Groq** ⭐ | Free | 1 min | ⚡⚡⚡ |
| OpenRouter | Free tier | 2 min | ⚡⚡ |
| Local Ollama | Free | 10 min | ⚡ |
| Claude | Paid | 2 min | ⚡⚡⚡ |

**Recommendation:** Use Groq (free, fastest, no limits)

---

## 🚀 THAT'S IT

Your website builder now has 6 AI agents working in parallel!

```bash
node agent-coordinator.js deploy "Your Business"
```

---

**Get help:** node agent-coordinator.js --help
