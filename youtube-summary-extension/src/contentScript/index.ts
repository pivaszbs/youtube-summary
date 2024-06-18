import { DESCRIPTION_FILE, TRANSCRIPTION_FILE } from "../constants";
import { waitFor } from "../helpers";
import { i18n } from "../translations";

const wait = (ms = 10000) => new Promise(resolve => setTimeout(resolve, ms));

function save(filename, data) {
    const blob = new Blob([data], {type: 'text/plain'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}

const createTranscriptButton = async () => {
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
  };
  
  const openTranscript = () => {
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
            })

            const transcript = transcriptText.join('\n');
            const description = descriptionText.join('\n');

            await saveChunks(TRANSCRIPTION_FILE, transcript);
            await saveChunks(DESCRIPTION_FILE, description);
            save(TRANSCRIPTION_FILE, transcript)
            await wait(500);

            chrome.runtime.sendMessage({ action: 'openChatGPT' });
          }, 2000);
        }
      }, 2000);
    }
  };
  

const CHUNK_SIZE = 4000;

function chunkString(str, size) {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
}

function saveChunks(key, str) {
  const chunks = chunkString(str, CHUNK_SIZE);
  const storageObj = {};

  chunks.forEach((chunk, index) => {
    storageObj[`${key}_chunk_${index}`] = chunk;
  });

  chrome.storage.local.set(storageObj, () => {
    if (chrome.runtime.lastError) {
      console.error('Error storing data: ', chrome.runtime.lastError);
    } else {
      console.log('Data successfully stored in chunks.');
    }
  });
}

function loadChunks(key, callback) {
  chrome.storage.local.get(null, (items) => {
    if (chrome.runtime.lastError) {
      console.error('Error retrieving data: ', chrome.runtime.lastError);
      return;
    }

    const chunkKeys = Object.keys(items).filter(itemKey => itemKey.startsWith(key));
    chunkKeys.sort(); // Ensure they are in the correct order

    let fullString = '';
    chunkKeys.forEach(chunkKey => {
      fullString += items[chunkKey];
    });

    callback(fullString);
  });
}

createTranscriptButton();

const startFileUploading = async () => {

    loadChunks(DESCRIPTION_FILE, data => {
        const input = waitFor(10000, 'form textarea');
        if (input && typeof input.value === 'string') {
            const event = new Event('input', {
                'bubbles': true,
                'cancelable': true
            });
            document.querySelectorAll('form button')[1].click();
    
            input.value = `${i18n.t('pre_description')} ${data} ${i18n.t('post_description')}`;
            input.dispatchEvent(event);
        }
    })
}

startFileUploading();