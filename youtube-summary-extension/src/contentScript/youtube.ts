import { wait } from ".";
import { save } from "./youtube";
import { openTranscript } from "./youtube";
import { TRANSCRIPTION_FILE, DESCRIPTION_FILE } from "../constants";

import { waitFor } from "../helpers";
import { saveChunks } from "./storage";


export const createTranscriptButton = async () => {
  const buttonContainer = await waitFor(10000, '#actions');

  const transcriptButton = document.createElement('button');
  transcriptButton.innerText = 'Summary';
  transcriptButton.style.padding = '8px';
  transcriptButton.style.margin = '4px';
  transcriptButton.style.backgroundColor = '#FF0000';
  transcriptButton.style.color = '#FFFFFF';
  transcriptButton.style.border = 'none';
  transcriptButton.style.borderRadius = '4px';
  transcriptButton.style.cursor = 'pointer';

  buttonContainer.appendChild(transcriptButton);

  transcriptButton.addEventListener('click', () => {
    openTranscript();
  });
};export const openTranscript = () => {
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

          await saveChunks(TRANSCRIPTION_FILE, transcript);
          await saveChunks(DESCRIPTION_FILE, description);
          save(TRANSCRIPTION_FILE, transcript);
          // wait for starting downloading
          await wait(500);

          chrome.runtime.sendMessage({ action: 'openChatGPT' });
        }, 2000);
      }
    }, 2000);
  }
};
export function save(filename, data) {
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

