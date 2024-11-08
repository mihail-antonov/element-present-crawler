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

    if (timeRemaining > 0) {

      logMessage(`Next check in ${timeRemaining > 1 ? `${timeRemaining} mins` : `${timeRemaining} min`}.`);
    }

    timeRemaining <= 0 && clearInterval(interval);
  }, DISPLAY_INTERVAL);
}

const checkStock = async () => {

  try {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(config.product_url, {waitUntil: 'domcontentloaded'});

    const elementPresent = await page.$(config.element_selector) !== null;

    if (elementPresent) {
      logMessage('Product IN STOCK.');
      await browser.close();
    } else {
      logMessage('Product NOT in stock.');
      await browser.close();

      if (config.loop && config.check_mins) {

        config.display_mins > 0 && displayInterval();

        setTimeout(checkStock, CHECK_INTERVAL);
      }
    }
  } catch (error) {

    logMessage(`Error trying to reach page: ${error}`);

    if (config.retry_mins) {

      logMessage(`Retrying in ${config.retry_mins > 1 ? `${config.retry_mins} mins` : `${config.retry_mins} min`}.`);
    }

    setTimeout(checkStock, RETRY_INTERVAL);
  }
}

config.product_url && config.element_selector ? checkStock() : logMessage('Please enter product_url and element');