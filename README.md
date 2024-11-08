# Element Present Crawler

This application is a web automation tool that checks for the presence of a specific element on a webpage at specified intervals. If the element is found, the application logs it and exits; if not, it retries after a set interval. The application uses Puppeteer to automate webpage interactions.

## Prerequisites

- Node.js
- Puppeteer (`npm install puppeteer`)

## Configuration

Edit the `config.json` file to customize the application. Below is an explanation of the configuration options:

```json
{
  "loop": true,                   // Set to true to continuously check for the element
  "retry_mins": 5,                // Minutes to wait before retrying if an error occurs
  "check_mins": 60,               // Minutes between regular checks for the element
  "display_mins": 20,             // Interval (in minutes) to display time remaining until the next check
  "website_url": "",              // URL of the website to monitor (required)
  "element_selector": "",         // CSS selector for the element to check (required)
  "messages": {
    "error": "Error trying to reach page %error%",   // Message format for connection errors
    "next_check": "Next check in %mins% mins.",      // Message for time until next check
    "retry_check": "Retrying in %mins% mins.",       // Message for retry time on error
    "element_found": "Element FOUND!",               // Message when the element is found
    "element_not_found": "Element NOT found.",       // Message when the element is not found
    "empty": "Please fill website_url and element_selector in config file."
  }
}