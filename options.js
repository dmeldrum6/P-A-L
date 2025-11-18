// Options page script
const DEFAULT_SYSTEM_PROMPT = `You are a sarcastic but friendly AI buddy who comments on the user's browsing activity. Your personality is witty, occasionally snarky, but ultimately supportive. You make observations about what the user is doing online, ask engaging questions, and try to strike up interesting conversations. Keep responses concise (2-3 sentences usually) and entertaining. Use humor and light teasing, but stay friendly.`;

const form = document.getElementById('settings-form');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const presetBtns = document.querySelectorAll('.preset-btn');

// Load saved settings
function loadSettings() {
  chrome.storage.sync.get({
    apiKey: '',
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-3.5-turbo',
    systemPrompt: DEFAULT_SYSTEM_PROMPT
  }, (settings) => {
    document.getElementById('apiUrl').value = settings.apiUrl;
    document.getElementById('apiKey').value = settings.apiKey;
    document.getElementById('model').value = settings.model;
    document.getElementById('systemPrompt').value = settings.systemPrompt;
  });
}

// Save settings
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const settings = {
    apiUrl: document.getElementById('apiUrl').value.trim(),
    apiKey: document.getElementById('apiKey').value.trim(),
    model: document.getElementById('model').value.trim(),
    systemPrompt: document.getElementById('systemPrompt').value.trim()
  };

  chrome.storage.sync.set(settings, () => {
    showStatus('Settings saved successfully!', 'success');
  });
});

// Reset to defaults
resetBtn.addEventListener('click', () => {
  if (confirm('Reset all settings to defaults?')) {
    document.getElementById('apiUrl').value = 'https://api.openai.com/v1/chat/completions';
    document.getElementById('apiKey').value = '';
    document.getElementById('model').value = 'gpt-3.5-turbo';
    document.getElementById('systemPrompt').value = DEFAULT_SYSTEM_PROMPT;
    showStatus('Settings reset to defaults. Click Save to apply.', 'success');
  }
});

// Preset buttons
presetBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const url = btn.getAttribute('data-url');
    document.getElementById('apiUrl').value = url;

    // Set default model based on preset
    if (url.includes('openai.com')) {
      document.getElementById('model').value = 'gpt-3.5-turbo';
    } else if (url.includes('1234')) {
      document.getElementById('model').value = 'local-model';
      document.getElementById('apiKey').value = 'none';
    } else if (url.includes('11434')) {
      document.getElementById('model').value = 'llama3';
      document.getElementById('apiKey').value = 'none';
    }

    showStatus('Preset applied. Update the model name and API key as needed, then click Save.', 'success');
  });
});

function showStatus(message, type) {
  statusDiv.textContent = message;
  statusDiv.className = `status-message ${type}`;

  setTimeout(() => {
    statusDiv.className = 'status-message';
  }, 4000);
}

// Load settings on page load
loadSettings();
