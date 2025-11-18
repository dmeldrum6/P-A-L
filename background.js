// Background service worker
const DEFAULT_SYSTEM_PROMPT = `You are a sarcastic but friendly AI buddy who comments on the user's browsing activity. Your personality is witty, occasionally snarky, but ultimately supportive. You make observations about what the user is doing online, ask engaging questions, and try to strike up interesting conversations. Keep responses concise (2-3 sentences usually) and entertaining. Use humor and light teasing, but stay friendly.`;

let conversationHistory = [];
const MAX_HISTORY = 20; // Keep last 20 messages

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'sendToAI') {
    handleAIRequest(request, sendResponse);
    return true; // Keep channel open for async response
  }
});

async function handleAIRequest(request, sendResponse) {
  try {
    const settings = await chrome.storage.sync.get({
      apiKey: '',
      apiUrl: 'https://api.openai.com/v1/chat/completions',
      model: 'gpt-3.5-turbo',
      systemPrompt: DEFAULT_SYSTEM_PROMPT
    });

    if (!settings.apiKey) {
      sendResponse({
        success: false,
        error: 'API key not configured. Please set it in the extension options.'
      });
      return;
    }

    // Build the message
    const userMessage = {
      role: 'user',
      content: request.message
    };

    // Add context if this is a background observation
    if (request.isContext) {
      // For context messages, we add them to history but don't show as user messages
      conversationHistory.push(userMessage);
    } else {
      conversationHistory.push(userMessage);
    }

    // Trim history if too long
    if (conversationHistory.length > MAX_HISTORY) {
      conversationHistory = conversationHistory.slice(-MAX_HISTORY);
    }

    // Build messages array for API
    const messages = [
      {
        role: 'system',
        content: settings.systemPrompt
      },
      ...conversationHistory
    ];

    // Make API request
    const response = await fetch(settings.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.apiKey}`
      },
      body: JSON.stringify({
        model: settings.model,
        messages: messages,
        temperature: 0.8,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API request failed: ${response.status}`);
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    // Add AI response to history
    conversationHistory.push({
      role: 'assistant',
      content: aiMessage
    });

    sendResponse({
      success: true,
      message: aiMessage
    });

  } catch (error) {
    console.error('AI request error:', error);
    sendResponse({
      success: false,
      error: error.message
    });
  }
}

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Open options page on first install
    chrome.runtime.openOptionsPage();
  }
});
