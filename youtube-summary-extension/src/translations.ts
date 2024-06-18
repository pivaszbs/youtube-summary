import { I18n } from "i18n-js";

const en = {
    pre_description: "Using description",
    post_description: "And the transcription of the video from the file, make a summary in Russian with highlighting the main parts in the form of a detailed article. If you are unable to provide a complete response, give the opportunity to continue working with the file."
};

export const i18n = new I18n({
    en,
    'en_US': en,
    'en_UK': en,
    ru: {
        pre_description: 'Используя описание',
        post_description: 'и транскрипцию видео из файла, сделай саммари на русском с выделением основных частей в формате подробной статьи. В случае если не сможешь дать полный ответ - дай возможность продолжить работать с файлом'
    },
});