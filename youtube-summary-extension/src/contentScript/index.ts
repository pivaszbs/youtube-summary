import { DESCRIPTION_FILE, TRANSCRIPTION_FILE } from "../constants";

const wait = (ms = 10000) => new Promise(resolve => setTimeout(resolve, ms))

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
    console.log(chrome.runtime.getManifest().permissions)
    console.log('hello')
    await wait(3000);
    const buttonContainer = document.querySelector('#actions');
    console.log(buttonContainer)
    if (!buttonContainer) return;
  
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
// loadChunks(STORAGE_KEY, async data => {
//     await wait(1000)
//     const input = document.querySelector('form textarea');
//     if (input && typeof input.value === 'string') {
//         const event = new Event('input', {
//             'bubbles': true,
//             'cancelable': true
//         });
//         input.value = `Мне нужно саммари этого видео на русском в виде статьи с выделением основных частей\n ${data}`;
//         const enterEvent = new KeyboardEvent('keydown', {
//             key: 'Enter',
//             keyCode: 13, // Enter key code
//             code: 'Enter',
//             which: 13,
//             metaKey: true, // Meta key is pressed
//             shiftKey: false,
//             ctrlKey: false,
//             altKey: false,
//             bubbles: true, // Event will bubble up through the DOM
//             cancelable: true // Event can be canceled
//         });
//         input.dispatchEvent(event);
//         input.focus();
//         input.dispatchEvent(enterEvent)
//         document.querySelector('button[data-testid="fruitjuice-send-button"]').click()
//     }
// })

const startFileUploading = async () => {
    await wait(1000)
    loadChunks(DESCRIPTION_FILE, data => {
        const input = document.querySelector('form textarea');
        if (input && typeof input.value === 'string') {
            const event = new Event('input', {
                'bubbles': true,
                'cancelable': true
            });
            document.querySelectorAll('form button')[1].click();
    
            input.value = `Используя описание ${data} и транскрипцию видео из файла, сделай саммари на русском с выделением основных частей в формате подробной статьи. В случае если не сможешь дать полный ответ - дай возможность продолжить работать с файлом`;
            input.dispatchEvent(event);
        }
    })
}

startFileUploading();