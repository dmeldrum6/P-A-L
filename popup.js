// Popup script
const statusDiv = document.getElementById('status');
const openSettingsBtn = document.getElementById('open-settings');
const reloadPageBtn = document.getElementById('reload-page');

// Check configuration status
function checkStatus() {
  chrome.storage.sync.get({
    apiKey: '',
    apiUrl: '',
    model: ''
  }, (settings) => {
    if (settings.apiKey && settings.apiUrl && settings.model) {
      statusDiv.className = 'status configured';
      statusDiv.innerHTML = `
        <div class="status-label">✓ Configured</div>
        <div class="status-text">P-A-L is ready to chat!</div>
      `;
    } else {
      statusDiv.className = 'status not-configured';
      statusDiv.innerHTML = `
        <div class="status-label">⚠ Not Configured</div>
        <div class="status-text">Please configure your API settings to get started.</div>
      `;
    }
  });
}

// Open settings page
openSettingsBtn.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

// Reload current page
reloadPageBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.reload(tabs[0].id);
      window.close();
    }
  });
});

// Check status on load
checkStatus();
