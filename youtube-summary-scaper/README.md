
# YouTube Summary Scraper

> A Puppeteer scraper for YouTube - ChatGPT transcript analysis.

## Installation

To set up and install the necessary dependencies, follow these steps:

1. **Create a Virtual Environment**:
   - Run the following commands:
     ```sh
     python3 -m venv .
     source ./bin/activate
     ```

2. **Install Dependencies**:
   - Run:
     ```sh
     pip install -r requirements.txt
     ```

3. **Set Up Environment Variables**:
   - Create a `.env.local` file and add your YouTube credentials:
     ```sh
     echo "YOUTUBE_EMAIL=<YOUR GOOGLE EMAIL>" >> .env.local
     echo "YOUTUBE_PASSWORD=<YOUR GOOGLE PASSWORD>" >> .env.local
     ```

## Usage

To run the scraper and analyze YouTube video transcripts, use the following command:

```sh
python youtube_transcript.py <YOUR VIDEO URL>
```

Replace `<YOUR VIDEO URL>` with the URL of the YouTube video you want to analyze, for example:
```
https://www.youtube.com/watch?v=GscMn0Gcn_U&list=WL&index=1&t=5659s
```
