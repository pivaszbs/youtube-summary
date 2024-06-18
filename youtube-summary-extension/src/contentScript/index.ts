import { startFileUploading } from "./chatGPT";
import { createTranscriptButton } from "./youtube";

createTranscriptButton();

const searchParams = new URLSearchParams(window.location.search);

if (searchParams.get('from') === 'antoha-production') {
  startFileUploading();
}