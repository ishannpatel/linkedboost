# 🚀 LinkedBoost

AI-Powered LinkedIn Post Writer - Create engaging, viral-worthy LinkedIn posts in seconds.

**Created by Ishann Patel**

## ✨ Features

- 🤖 **AI-Powered Generation** - Uses Claude AI to create professional LinkedIn posts
- 💡 **Topic Suggestions** - Get inspired with pre-selected categories
- 🎲 **Surprise Me** - Random topic generator for when you need inspiration
- 📝 **Unicode Formatting** - Posts include bold titles and italic quotes
- 💬 **Inspirational Quotes** - Relevant quotes from successful people
- #️⃣ **Smart Hashtags** - Automatically adds 5-7 relevant hashtags
- 📋 **One-Click Copy** - Easy copy to paste directly into LinkedIn
- 🛡️ **Error Handling** - Robust error handling with auto-retry

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

## 📦 Setup Instructions

### Prerequisites

- [Vercel Account](https://vercel.com) (free)
- [Anthropic API Key](https://console.anthropic.com/settings/keys)

### Step 1: Clone/Fork Repository

```bash
# Clone this repository
git clone https://github.com/yourusername/linkedboost.git
cd linkedboost

# Or fork it on GitHub and clone your fork
```

### Step 2: Get Anthropic API Key

1. Go to [Anthropic Console](https://console.anthropic.com/settings/keys)
2. Sign up or log in
3. Create a new API key
4. Copy the key (you'll need it in the next step)

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and add your ANTHROPIC_API_KEY when asked
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add Environment Variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: Your API key from Step 2
5. Click "Deploy"

### Step 4: Test Your Deployment

Once deployed, Vercel will give you a URL like:
```
https://linkedboost-yourname.vercel.app
```

Visit that URL and try generating a post!

## 📁 Project Structure

```
linkedboost/
├── api/
│   └── generate.js       # Serverless function for API calls
├── index.html            # Main frontend file
├── vercel.json           # Vercel configuration
├── package.json          # Project metadata
├── .env.example          # Environment variables template
└── README.md             # This file
```

## 🔧 Local Development

```bash
# Install Vercel CLI
npm install -g vercel

# Create .env file
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# Run development server
vercel dev

# Open http://localhost:3000
```

## 🌍 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Yes |

## 💰 Cost

- **Vercel Hosting**: Free (Hobby plan includes 100GB bandwidth)
- **Anthropic API**: Pay-as-you-go (very affordable, ~$0.003 per post)

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS (Tailwind), Vanilla JavaScript
- **Backend**: Vercel Serverless Functions (Node.js)
- **AI**: Anthropic Claude API (Sonnet 4)
- **Hosting**: Vercel

## 📝 Usage

1. Enter a topic or choose from suggestions
2. Click "Generate"
3. Copy the generated post
4. Paste into LinkedIn
5. Watch the engagement! 🎉

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this for your own projects!

## 👤 Author

**Ishann Patel**

- LinkedIn: [Your LinkedIn Profile]
- GitHub: [@ishannpatel](https://github.com/ishannpatel)

## 🙏 Acknowledgments

- Built with [Claude AI](https://anthropic.com) by Anthropic
- Deployed on [Vercel](https://vercel.com)
- Icons by [Lucide](https://lucide.dev)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/linkedboost/issues) page
2. Create a new issue if your problem isn't already listed
3. DM me on LinkedIn

---

Made with ❤️ by Ishann Patel
