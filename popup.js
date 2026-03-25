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
      statusDiv.className = 'status-card configured';
      statusDiv.innerHTML = `
        <div class="status-indicator"></div>
        <div class="status-body">
          <div class="label">Configured</div>
          <div class="desc">P-A-L is ready to chat!</div>
        </div>
      `;
    } else {
      statusDiv.className = 'status-card not-configured';
      statusDiv.innerHTML = `
        <div class="status-indicator"></div>
        <div class="status-body">
          <div class="label">Not Configured</div>
          <div class="desc">Please configure your API settings to get started.</div>
        </div>
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
