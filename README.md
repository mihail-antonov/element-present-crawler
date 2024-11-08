# Element Present Crawler

This application is a web automation tool that checks for the presence of a specific element on a webpage at specified intervals. If the element is found, the application logs it and exits; if not, it retries after a set interval. The application uses Puppeteer to automate webpage interactions.

## Prerequisites

- Node.js
- Puppeteer (`npm install puppeteer`)
- Puppeteer Extra (`npm install puppeteer-extra`)
- Puppeteer Stealth Plugin (`npm install puppeteer-extra-plugin-stealth`)

## Configuration

Edit the `config.json` file to customize the application. Below is an explanation of the configuration options:

```json
{
  "loop": false,                   // Set to true to continuously check for the element
  "retry_mins": 5,                 // Minutes to wait before retrying if an error occurs
  "check_mins": 60,                // Minutes between regular checks for the element
  "display_mins": 0,               // Interval (in minutes) to display time remaining until the next check
  "website_url": "",               // URL of the website to monitor (required)
  "element_selector": "",          // CSS selector for the element to check (required)
  "messages": {
    "error": "Error trying to reach page %error%",   // Message format for connection errors
    "next_check": "Next check in %mins% mins.",      // Message for time until next check
    "retry_check": "Retrying in %mins% mins.",       // Message for retry time on error
    "element_found": "Product in STOCK!",           // Message when the element is found
    "element_not_found": "Product NOT in stock.",   // Message when the element is not found
    "empty": "Please fill website_url and element_selector in config file."
  },
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",   // User-Agent string to simulate browser request
  "http_headers": {
    "accept-language": "en-US,en;q=0.9",   // Accept language header
    "accept-encoding": "gzip, deflate, br"  // Accept encoding header
  }
}
```

## Installation
* Clone or download this repository.
* Navigate to the project directory in your terminal.
* Run the following command to install the dependencies

`npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth`

## Usage
* Update the config.json file with the following details:
  * `website_url`: The URL of the page to check.
  * `element_selector`: The CSS selector of the element you're checking for.
  * Optionally, customize other configuration fields (e.g., retry interval, check interval).
  * Run the application:

`npm run crawler`

The application will check for the specified element at the interval defined in `check_mins`. 
If the element is found, a message will be logged and the crawler will stop. If the element is not found, a message will be logged and will also stop. If the loop option is enable and the element is not found, the
crawler will log a message and attempt to find the element after `check_mins` mins.