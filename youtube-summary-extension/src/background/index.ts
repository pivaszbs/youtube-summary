chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openChatGPT') {
    chrome.tabs.create({ url: 'https://chat.openai.com/' });
  }
});

