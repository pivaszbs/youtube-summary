import { SECRET_KEYWORD } from "../constants";
import { set } from "../contentScript/storage";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openChatGPT') {
    const urlToFind = `chatgpt.com`;
    chrome.tabs.query({}, (tabs) => {
      let tabFound = false;
      if (!tabs) return;
      
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].url?.includes(urlToFind)) {
          const id = tabs[i].id;
          if (id) {
            chrome.tabs.update(id, { active: true });
            set(SECRET_KEYWORD, 1)
            tabFound = true;
            break; 
          }
        }
      }
    });
  }
});

