export const tryToSendMessage = (text: string, channelName: string) => chrome.storage.local.set({ [channelName]: text });

export const tryToRecieveMessage = async (channelName: string) => {
    const data = await chrome.storage.local.get(channelName);
    if (data) {
        return data[channelName]
    }
    return data
}