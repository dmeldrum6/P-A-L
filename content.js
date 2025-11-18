// Content script - injected into every page
(function() {
  'use strict';

  // Avoid multiple injections
  if (window.palInjected) {
    return;
  }
  window.palInjected = true;

  let conversationHistory = [];
  let lastUrl = window.location.href;
  let typingTimeout = null;
  let lastTypedText = '';

  // Create the sidebar
  function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.id = 'pal-sidebar';
    sidebar.innerHTML = `
      <div id="pal-header">
        <h3>🤖 P-A-L</h3>
        <button id="pal-toggle" title="Minimize">−</button>
      </div>
      <div id="pal-chat-container">
        <div id="pal-messages"></div>
      </div>
      <div id="pal-input-container">
        <textarea id="pal-input" placeholder="Type a message..."></textarea>
        <button id="pal-send">Send</button>
      </div>
      <div id="pal-status"></div>
    `;
    document.body.appendChild(sidebar);

    // Add body margin to prevent content overlap
    document.body.style.marginRight = '350px';
    document.body.style.transition = 'margin-right 0.3s ease';

    setupEventListeners();
    announcePageVisit();
  }

  function setupEventListeners() {
    const sendBtn = document.getElementById('pal-send');
    const input = document.getElementById('pal-input');
    const toggleBtn = document.getElementById('pal-toggle');

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    toggleBtn.addEventListener('click', toggleSidebar);

    // Monitor page inputs
    document.addEventListener('input', handlePageInput);

    // Monitor URL changes
    let currentUrl = window.location.href;
    const urlObserver = new MutationObserver(() => {
      if (currentUrl !== window.location.href) {
        currentUrl = window.location.href;
        announcePageVisit();
      }
    });
    urlObserver.observe(document.querySelector('body'), {
      childList: true,
      subtree: true
    });

    // Also catch popstate events for browser back/forward
    window.addEventListener('popstate', () => {
      announcePageVisit();
    });
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('pal-sidebar');
    const toggleBtn = document.getElementById('pal-toggle');

    if (sidebar.classList.contains('minimized')) {
      sidebar.classList.remove('minimized');
      document.body.style.marginRight = '350px';
      toggleBtn.textContent = '−';
      toggleBtn.title = 'Minimize';
    } else {
      sidebar.classList.add('minimized');
      document.body.style.marginRight = '0';
      toggleBtn.textContent = '+';
      toggleBtn.title = 'Expand';
    }
  }

  function handlePageInput(e) {
    const target = e.target;

    // Ignore inputs from our own sidebar
    if (target.closest('#pal-sidebar')) {
      return;
    }

    // Track text inputs, textareas, and contenteditable elements
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' ||
        target.isContentEditable) {

      const value = target.value || target.textContent || '';

      // Only notify if text is substantial and different
      if (value.length > 10 && value !== lastTypedText) {
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          lastTypedText = value;
          notifyAIAboutTyping(value, target);
        }, 2000); // Wait 2 seconds after typing stops
      }
    }
  }

  function notifyAIAboutTyping(text, element) {
    const context = {
      url: window.location.href,
      elementType: element.tagName,
      elementPlaceholder: element.placeholder || '',
      elementName: element.name || '',
      text: text.substring(0, 200) // Limit to 200 chars
    };

    const message = `The user is typing on ${context.url}. They entered: "${context.text}${text.length > 200 ? '...' : ''}" in a ${context.elementType}${context.elementPlaceholder ? ` with placeholder "${context.elementPlaceholder}"` : ''}. What do you think they're doing?`;

    sendToAI(message, true);
  }

  function announcePageVisit() {
    const url = window.location.href;
    if (url === lastUrl) return;

    lastUrl = url;
    const pageTitle = document.title;

    const message = `The user just navigated to: "${pageTitle}" (${url}). Make a sarcastic comment or ask them what they're up to.`;

    sendToAI(message, true);
  }

  function sendMessage() {
    const input = document.getElementById('pal-input');
    const text = input.value.trim();

    if (!text) return;

    addMessage(text, 'user');
    input.value = '';

    sendToAI(text, false);
  }

  function sendToAI(message, isContext) {
    const messagesDiv = document.getElementById('pal-messages');

    // Show typing indicator
    if (!isContext) {
      const typingDiv = document.createElement('div');
      typingDiv.className = 'pal-message pal-ai typing-indicator';
      typingDiv.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
      typingDiv.id = 'pal-typing';
      messagesDiv.appendChild(typingDiv);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // Send to background script
    chrome.runtime.sendMessage({
      type: 'sendToAI',
      message: message,
      isContext: isContext,
      url: window.location.href,
      pageTitle: document.title
    }, (response) => {
      // Remove typing indicator
      const typingIndicator = document.getElementById('pal-typing');
      if (typingIndicator) {
        typingIndicator.remove();
      }

      if (response && response.success) {
        addMessage(response.message, 'ai');
      } else {
        addMessage('Oops! Something went wrong. Check your API settings.', 'ai error');
        updateStatus('Error: ' + (response?.error || 'Unknown error'), true);
      }
    });

    if (!isContext) {
      updateStatus('Thinking...');
    }
  }

  function addMessage(text, type) {
    const messagesDiv = document.getElementById('pal-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `pal-message pal-${type}`;

    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.textContent = text;

    messageDiv.appendChild(textDiv);
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    updateStatus('');
  }

  function updateStatus(message, isError = false) {
    const status = document.getElementById('pal-status');
    status.textContent = message;
    status.className = isError ? 'error' : '';
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSidebar);
  } else {
    createSidebar();
  }
})();
