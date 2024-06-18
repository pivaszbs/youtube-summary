import { SECRET_KEYWORD } from "../constants";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openChatGPT') {
    chrome.tabs.create({ url: `https://chatgpt.com/?from=${SECRET_KEYWORD}` });
  }
});

