const CHUNK_SIZE = 4000;

export function chunkString(str: string, size = CHUNK_SIZE) {
    const numChunks = Math.ceil(str.length / size);
    const chunks = new Array(numChunks);

    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = str.substr(o, size);
    }

    return chunks;
}   

export function loadChunks(key, callback) {
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

export function saveChunks(key, str) {
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

export const set = (key: string, value: any) => {
  return chrome.storage.local.set({ [key]: value })
}

export const get = (key: string) => {
  return chrome.storage.local.get(key)
}