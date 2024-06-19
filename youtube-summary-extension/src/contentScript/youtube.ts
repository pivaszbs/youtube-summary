import { TRANSCRIPTION_FILE, DESCRIPTION_FILE } from "../constants";

import { wait, waitFor } from "../helpers";
import { tryToSendMessage } from "./broadcast";
import { createMyButton } from "./button";
import { saveChunks } from "./storage";

function save(filename, data) {
    const blob = new Blob([data], { type: 'text/plain' });
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, filename);
    }
    else {
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
}
  

export const createTranscriptButton = async () => {
  const buttonContainer = await waitFor(10000, '#actions');

  const transcriptButton = createMyButton({ text: 'Summary', onClick: openTranscript })

  buttonContainer.appendChild(transcriptButton);
};

export const openTranscript = () => {
  const moreButton = document.querySelector('#expand');
  if (moreButton) {
    moreButton.click();
    setTimeout(() => {
      const transcriptButton = document.querySelector('button[aria-label="Show transcript"]');
      if (transcriptButton) {
        transcriptButton.click();
        setTimeout(async () => {
          const transcriptText = [];
          document.querySelectorAll('ytd-transcript-segment-list-renderer').forEach(segment => {
            transcriptText.push(segment.innerText);
          });

          const descriptionText = [];
          document.querySelectorAll('ytd-text-inline-expander').forEach(segment => {
            descriptionText.push(segment.innerText);
          });

          const transcript = transcriptText.join('\n');
          const description = descriptionText.join('\n');

          tryToSendMessage(transcript, TRANSCRIPTION_FILE);
          tryToSendMessage(description, DESCRIPTION_FILE);

          chrome.runtime.sendMessage({ action: 'openChatGPT' });
        }, 2000);
      }
    }, 2000);
  }
};