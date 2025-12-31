# 🤖 P-A-L (Personal AI Listener)

Your sarcastic AI buddy that comments on your browsing and engages you in conversation!

P-A-L is a browser extension that adds a vertical chat sidebar to every webpage you visit. As you browse the web, your AI companion watches what you're doing and strikes up witty, engaging conversations about your online adventures.

## ✨ Features

- **Always-On Chat Sidebar**: A sleek, minimizable chat interface on the right side of every webpage
- **Context-Aware AI**: Automatically comments on the pages you visit and text you type
- **Sarcastic Personality**: Your AI buddy has wit, humor, and a friendly attitude
- **OpenAI-Compatible**: Works with OpenAI, LM Studio, Ollama, or any OpenAI-compatible API
- **Privacy-Focused**: All data stays between you and your chosen LLM provider
- **Customizable**: Adjust the AI's personality through custom system prompts
- **Beautiful UI**: Modern gradient design with smooth animations

## 🚀 Installation

### Chrome / Edge / Brave

1. **Download the extension**
   ```bash
   git clone https://github.com/yourusername/P-A-L.git
   cd P-A-L
   ```

2. **Generate icons**
   - See `icons/README.md` for instructions

3. **Load the extension**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `P-A-L` folder

4. **Configure your API**
   - Click the P-A-L extension icon
   - Click "Open Settings"
   - Enter your API credentials (see Configuration section below)

### Firefox

1. **Download the extension** (same as above)

2. **Load temporarily** (for testing)
   - Open Firefox and go to `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Select any file in the `P-A-L` folder (e.g., `manifest.json`)

3. **Configure your API** (same as Chrome)

> Note: For permanent Firefox installation, you'll need to sign the extension through Mozilla. For personal use, temporary loading works great!

## ⚙️ Configuration

### OpenAI

1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. In P-A-L settings:
   - **API Endpoint**: `https://api.openai.com/v1/chat/completions`
   - **API Key**: Your OpenAI API key (starts with `sk-`)
   - **Model**: `gpt-3.5-turbo` or `gpt-4`

### LM Studio (Local)

1. Download and install [LM Studio](https://lmstudio.ai/)
2. Download a model (e.g., Llama 3, Mistral)
3. Start the local server in LM Studio
4. In P-A-L settings:
   - **API Endpoint**: `http://localhost:1234/v1/chat/completions`
   - **API Key**: `none` (or leave as anything)
   - **Model**: The model name shown in LM Studio

### Ollama (Local)

1. Install [Ollama](https://ollama.ai/)
2. Pull a model: `ollama pull llama3`
3. Start Ollama server: `ollama serve`
4. In P-A-L settings:
   - **API Endpoint**: `http://localhost:11434/v1/chat/completions`
   - **API Key**: `none`
   - **Model**: `llama3` (or your chosen model)

### Other OpenAI-Compatible APIs

P-A-L works with any service that implements the OpenAI chat completions API format, including:
- Azure OpenAI
- Anthropic (via compatible proxy)
- Together AI
- Replicate
- And many more!

## 🎭 Customizing the Personality

You can customize your AI buddy's personality by editing the **System Prompt** in settings. Here are some examples:

### Default (Sarcastic Buddy)
```
You are a sarcastic but friendly AI buddy who comments on the user's browsing activity. Your personality is witty, occasionally snarky, but ultimately supportive. You make observations about what the user is doing online, ask engaging questions, and try to strike up interesting conversations. Keep responses concise (2-3 sentences usually) and entertaining. Use humor and light teasing, but stay friendly.
```

### Motivational Coach
```
You are an enthusiastic motivational coach who cheers on the user's browsing activities. You're positive, encouraging, and always looking for opportunities to celebrate their progress and productivity. Keep responses energetic and supportive (2-3 sentences).
```

### Philosophical Sage
```
You are a thoughtful philosopher who reflects deeply on the user's browsing habits. You ask profound questions about their choices and try to draw connections to broader life themes. Keep responses thought-provoking but concise (2-3 sentences).
```

### Paranoid Security Expert
```
You are a cybersecurity expert who is constantly worried about the user's online safety. You make nervous observations about potential security risks and privacy concerns. Keep responses cautionary but not overwhelming (2-3 sentences).
```

## 💬 How It Works

1. **Automatic Comments**: When you navigate to a new page, P-A-L comments on where you went
2. **Typing Detection**: When you type in text fields, P-A-L notices and asks what you're up to
3. **Manual Chat**: You can always type messages directly to chat with your AI buddy
4. **Context Memory**: P-A-L remembers the last 20 messages of your conversation

## 🛠️ Development

### Project Structure
```
P-A-L/
├── manifest.json          # Extension manifest
├── content.js            # Content script (sidebar injection)
├── content.css           # Sidebar styling
├── background.js         # Service worker (API calls)
├── options.html          # Settings page UI
├── options.js            # Settings page logic
├── popup.html            # Extension popup UI
├── popup.js              # Extension popup logic
└── icons/
    ├── icon.svg          # Source icon
    ├── icon16.png        # 16x16 icon
    ├── icon48.png        # 48x48 icon
    └── icon128.png       # 128x128 icon
```

### Making Changes

1. Edit the relevant files
2. Reload the extension:
   - Chrome: Go to `chrome://extensions/` and click the refresh icon
   - Firefox: Go to `about:debugging` and click "Reload"
3. Refresh any open web pages to see content script changes

## 🔧 Troubleshooting

### The sidebar doesn't appear
1. Check that the extension is enabled in your browser
2. Try reloading the page
3. Check browser console for errors (F12)

### "API key not configured" error
1. Click the extension icon
2. Click "Open Settings"
3. Fill in all required fields and click "Save Settings"

### AI responses are slow or failing
1. Check your API endpoint URL is correct
2. Verify your API key is valid
3. For local models (LM Studio/Ollama), ensure the server is running
4. Check browser console and background service worker logs for errors

### CORS errors with local models
Some local model servers need CORS enabled:
- **LM Studio**: Enable CORS in server settings
- **Ollama**: May need to run with `OLLAMA_ORIGINS=* ollama serve`

## 📝 License

MIT License - Feel free to modify and share!

## ⚠️ Disclaimer

This extension monitors your browsing activity and sends data to your configured LLM provider. Only use with providers you trust. The developers of P-A-L are not responsible for data handling by third-party API providers.

## 🎉 Enjoy!

Have fun browsing with your new AI buddy! If you enjoy P-A-L, consider sharing it with friends or starring the repository.
