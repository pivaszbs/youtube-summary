import { DESCRIPTION_FILE } from "../constants";
import { wait, waitFor } from "../helpers";
import { i18n } from "../translations";
import { loadChunks } from "./storage";


export const startFileUploading = async () => {
  await wait(5000);

  loadChunks(DESCRIPTION_FILE, data => {
    const input = document.querySelector('form textarea');
    
    if (input && typeof input.value === 'string') {
      const event = new Event('input', {
        'bubbles': true,
        'cancelable': true
      });
      document.querySelectorAll('form button')[1].click();

      i18n.locale = window.navigator.language

      input.value = `${i18n.t('pre_description')} ${data} ${i18n.t('post_description')}`;
      input.dispatchEvent(event);
    }
  });
};
