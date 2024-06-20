import { DESCRIPTION_FILE, SECRET_KEYWORD, TRANSCRIPTION_FILE } from "../constants";
import { wait, waitFor } from "../helpers";
import { i18n } from "../translations";
import { tryToRecieveMessage } from "./broadcast";


export const startFileUploading = async () => {
    await waitFor(10000, 'button[data-testid="fruitjuice-send-button"]')

    console.log(`hello from ${SECRET_KEYWORD}`)
    const input = document.querySelector('form textarea');
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const transcription = await tryToRecieveMessage(TRANSCRIPTION_FILE);
    const description = await tryToRecieveMessage(DESCRIPTION_FILE);

    const file = new File([new Blob([String(transcription)], { type: 'text/plain' })], TRANSCRIPTION_FILE);

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    fileInput.files = dataTransfer.files;

    i18n.locale = window.navigator.language

    input.value = `${i18n.t('pre_description')}: \n"${description}"\n ${i18n.t('post_description')}`;
    input.dispatchEvent(new Event('input', {
        'bubbles': true,
        'cancelable': true
    }))

    fileInput.dispatchEvent(new Event('change', {
        'bubbles': true,
        'cancelable': true
    }));


    const button = await waitFor(10000, 'button[data-testid="fruitjuice-send-button"]:not(:disabled)') as HTMLButtonElement;
    button.click();
};
