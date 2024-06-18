import { startFileUploading } from "./chatGPT";
import { createTranscriptButton } from "./youtube";

export const wait = (ms = 10000) => new Promise(resolve => setTimeout(resolve, ms));

createTranscriptButton();
startFileUploading();