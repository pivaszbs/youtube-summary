import { SECRET_KEYWORD } from "../constants";
import { startFileUploading } from "./chatGPT";
import { createTranscriptButton } from "./youtube";

createTranscriptButton();

const searchParams = new URLSearchParams(window.location.search);

if (searchParams.get('from') === SECRET_KEYWORD) {
  startFileUploading();
}