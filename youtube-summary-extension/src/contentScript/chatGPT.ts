import { DESCRIPTION_FILE, TRANSCRIPTION_FILE } from "../constants";
import { wait } from "../helpers";
import { i18n } from "../translations";
import { loadChunks } from "./storage";

export const startFileUploading = async () => {
  await wait(5000);

  loadChunks(DESCRIPTION_FILE, async data => {
    const input = document.querySelector('form textarea');
    
    if (input && typeof input.value === 'string') {
        console.log('hello')
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        const onFocus = async () => {
            const [fileHandle] = await window.showOpenFilePicker();
            const file = await fileHandle.getFile();

            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);

            fileInput.files = dataTransfer.files;

            i18n.locale = window.navigator.language

            input.value = `${i18n.t('pre_description')}: \n"${data}"\n ${i18n.t('post_description')}`;
            input.dispatchEvent(new Event('input', {
                'bubbles': true,
                'cancelable': true
            }))

            fileInput.dispatchEvent(new Event('change', {
                'bubbles': true,
                'cancelable': true
            }));

            document.removeEventListener('click', onFocus);
            document.removeEventListener('focus', onFocus);
        }

        document.addEventListener('click', onFocus);
        document.addEventListener('focus', onFocus);
    }
  });
};
