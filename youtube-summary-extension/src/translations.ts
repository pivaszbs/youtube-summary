import { I18n } from "i18n-js";

const en = {
    pre_description: "Using description",
    post_description: "And transcribe the video from the file, summarize it in Russian highlighting the main parts in the form of a detailed article. If you are unable to provide a complete response, give the opportunity to continue working with the file. Please do not include timestamps in the response."
};

const locales = {
    en,
    'en-US': en,
    'en-GB': en,
    ru: {
        pre_description: 'Используя описание',
        post_description: 'и транскрипцию видео из файла, сделай саммари на русском с выделением основных частей в формате подробной статьи. В случае если не сможешь дать полный ответ - дай возможность продолжить работать с файлом. Пожалуйста не включай таймкоды в ответ'
    },
};

export const i18n = new I18n(locales);

export const availableLocales = Object.keys(locales)