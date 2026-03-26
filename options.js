// Options page script
const PERSONALITIES = {
  sarcastic: {
    label: '😏 Sarcastic Buddy',
    prompt: `You are a sarcastic but friendly AI buddy who comments on the user's browsing activity. Your personality is witty, occasionally snarky, but ultimately supportive. You make observations about what the user is doing online, ask engaging questions, and try to strike up interesting conversations. Keep responses concise (2-3 sentences usually) and entertaining. Use humor and light teasing, but stay friendly.`
  },
  philosopher: {
    label: '🏛️ Philosopher',
    prompt: `You are a thoughtful philosopher companion who reflects deeply on the user's browsing activity. You draw connections between what they're reading and the great questions of human existence — meaning, knowledge, ethics, and the nature of reality. You reference philosophical thinkers and ideas where fitting, but stay accessible and engaging. Keep responses concise (2-3 sentences usually) and intellectually stimulating.`
  },
  motivational: {
    label: '🔥 Motivational Coach',
    prompt: `You are an enthusiastic motivational coach who cheers on the user's browsing activity. You find the positive angle in everything they do online, celebrate their curiosity and effort, and keep their energy high. You speak with warmth, encouragement, and actionable positivity. Keep responses concise (2-3 sentences usually) and uplifting.`
  }
};

const DEFAULT_PERSONALITY = 'sarcastic';
const DEFAULT_SYSTEM_PROMPT = PERSONALITIES[DEFAULT_PERSONALITY].prompt;

const form = document.getElementById('settings-form');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const presetBtns = document.querySelectorAll('.preset-btn');
const personalityPills = document.querySelectorAll('.personality-pill');
const systemPromptTextarea = document.getElementById('systemPrompt');

function setActivePersonality(key) {
  personalityPills.forEach(pill => {
    pill.classList.toggle('active', pill.dataset.personality === key);
  });
}

// Load saved settings
function loadSettings() {
  chrome.storage.sync.get({
    apiKey: '',
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-3.5-turbo',
    systemPrompt: DEFAULT_SYSTEM_PROMPT,
    personality: DEFAULT_PERSONALITY
  }, (settings) => {
    document.getElementById('apiUrl').value = settings.apiUrl;
    document.getElementById('apiKey').value = settings.apiKey;
    document.getElementById('model').value = settings.model;
    document.getElementById('systemPrompt').value = settings.systemPrompt;
    setActivePersonality(settings.personality);
  });
}

// Save settings
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const activePill = document.querySelector('.personality-pill.active');
  const settings = {
    apiUrl: document.getElementById('apiUrl').value.trim(),
    apiKey: document.getElementById('apiKey').value.trim(),
    model: document.getElementById('model').value.trim(),
    systemPrompt: document.getElementById('systemPrompt').value.trim(),
    personality: activePill ? activePill.dataset.personality : 'custom'
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
    setActivePersonality(DEFAULT_PERSONALITY);
    showStatus('Settings reset to defaults. Click Save to apply.', 'success');
  }
});

// Personality pill selection
personalityPills.forEach(pill => {
  pill.addEventListener('click', () => {
    const key = pill.dataset.personality;
    systemPromptTextarea.value = PERSONALITIES[key].prompt;
    setActivePersonality(key);
  });
});

// Deselect personality if user manually edits the prompt
systemPromptTextarea.addEventListener('input', () => {
  const activePill = document.querySelector('.personality-pill.active');
  if (activePill) {
    const key = activePill.dataset.personality;
    if (systemPromptTextarea.value !== PERSONALITIES[key].prompt) {
      setActivePersonality(null);
    }
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
