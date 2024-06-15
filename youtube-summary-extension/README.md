
# YouTube Summary

> A Chrome extension tool built with Vite, Solid, and Manifest v3.

## Installation

To set up and install the necessary dependencies, follow these steps:

1. **Install NVM (Node Version Manager)**:
   - Run the following command:
     ```sh
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
     ```
   - If the above command doesn't work, visit the [NVM GitHub page](https://github.com/nvm-sh/nvm) for alternative installation methods.

2. **Use NVM**:
   - Run:
     ```sh
     nvm use
     ```

3. **Install PNPM (Package Manager)**:
   - Run:
     ```sh
     npm install -g pnpm
     ```

4. **Install Dependencies**:
   - Run:
     ```sh
     pnpm install
     ```

## Development and Testing

To build and test the extension locally, follow these steps:

1. **Build the Extension**:
   - Run:
     ```sh
     pnpm build
     ```

2. **Load the Extension in Chrome**:
   - Open `chrome://extensions/` in your Chrome browser.
   - Toggle `Developer mode` on (located in the top right corner).
   - Click `Load unpacked`.
   - Select the `build` directory.

3. **Test the Extension**:
   - Open any YouTube video.
   - Enjoy the new red button feature added by the extension.

## Usage

Once the extension is loaded and a YouTube video is open, you should see a red button that provides the summary functionality.
