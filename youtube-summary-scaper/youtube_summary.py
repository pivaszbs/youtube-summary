import sys
import os
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright

def get_youtube_transcript(url, output_file):
    with sync_playwright() as p:
        browser = p.firefox.launch(headless=False, slow_mo=1000)
        page = browser.new_page()
        
        # Retrieve login credentials from environment variables
        email = os.getenv('YOUTUBE_EMAIL')
        password = os.getenv('YOUTUBE_PASSWORD')
        
        # Go to the YouTube video URL
        page.goto(url)
        page.get_by_label("Before you continue to YouTube").get_by_label("Sign in").click()
        page.get_by_label("Email or phone").click()
        page.get_by_label("Email or phone").fill(email)
        page.get_by_label("Email or phone").press("Enter")
        page.get_by_label("Enter your password").fill(password)
        page.get_by_label("Enter your password").press("Enter")
        page.get_by_role("button", name="...more").click()
        page.get_by_role("button", name="Show transcript").click()
    
        # Wait for the transcript to load
        
        # Extract the transcript
        transcript_elements = page.locator('ytd-transcript-segment-list-renderer').all_inner_texts()

        # Join the transcript elements into a single string
        transcript = "\n".join(transcript_elements)
        
        # Write the transcript to a file
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(transcript)
        
        page.goto("https://chatgpt.com/auth/login")
        page.get_by_test_id("login-button").click()
        page.get_by_role("button", name="Google logo Continue with").click()
        page.get_by_role("link", name="ChatGPT", exact=True).click()
        page.get_by_placeholder("Message ChatGPT").click()
        page.locator("form").get_by_role("button").nth(1).click()
        with page.expect_file_chooser() as fc_info:
            page.get_by_role("menuitem", name="Upload from computer").click()
        file_chooser = fc_info.value
        file_chooser.set_files(output_file)

        page.get_by_test_id("fruitjuice-send-button").is_enabled(timeout=15000)
        page.get_by_placeholder("Message ChatGPT").fill("Мне нужно саммари этого видео на русском в виде статьи с выделением основных частей")
        page.get_by_test_id("fruitjuice-send-button").click()

        page.wait_for_timeout(1000000)

        # Close the browser
        browser.close()

        return transcript

if __name__ == "__main__":
    # Load environment variables from .env file
    load_dotenv()

    if len(sys.argv) != 2:
        print("Usage: python script.py <YouTube URL>")

    url = sys.argv[1]
    output_file = 'output.txt'
    transcript = get_youtube_transcript(url, output_file)
    print(f"Transcript has been written to {output_file}")