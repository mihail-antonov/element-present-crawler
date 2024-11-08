const config = require('./config.json');
const puppeteer = require('puppeteer');

const CHECK_INTERVAL = config.check_mins * 60 * 1000;
const RETRY_INTERVAL = config.retry_mins * 60 * 1000;
const DISPLAY_INTERVAL = config.display_mins * 60 * 1000;

const getTime = () => new Date().toLocaleTimeString('en-US', {hour12: false});

const logMessage = message => console.log(getTime() + ' ' + message);

const displayInterval = () => {

  let timeRemaining = config.check_mins;

  let interval = setInterval(() => {

    timeRemaining -= config.display_mins;

    timeRemaining > 0 && logMessage(config.messages.next_check.replace('%mins%', timeRemaining));

    timeRemaining <= 0 && clearInterval(interval);
  }, DISPLAY_INTERVAL);
}

const checkStock = async () => {

  try {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(config.website_url, {waitUntil: 'domcontentloaded'});

    const elementPresent = await page.$(config.element_selector) !== null;

    if (elementPresent) {
      logMessage(config.messages.element_found);
      await browser.close();
    } else {
      logMessage(config.messages.element_not_found);
      await browser.close();

      if (config.loop && config.check_mins) {

        config.display_mins > 0 && displayInterval();

        setTimeout(checkStock, CHECK_INTERVAL);
      }
    }
  } catch (error) {

    logMessage(config.messages.error.replace('%error%', error));

    config.retry_mins && logMessage(config.messages.retry_check.replace('%mins%', config.retry_mins));

    setTimeout(checkStock, RETRY_INTERVAL);
  }
}

config.website_url && config.element_selector ? checkStock() : logMessage(config.messages.empty);