const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // use false to watch it run (local only)
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Navigate to Xero login
  await page.goto('https://login.xero.com/', { waitUntil: 'networkidle2' });

  // Login
  await page.type('#xl-form-email', process.env.XERO_EMAIL);
  await page.type('#xl-form-password', process.env.XERO_PASSWORD);
  await page.click('#submitButton');

  // Wait for dashboard or handle 2FA manually if needed
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  // Navigate to Quotes or a specific quote URL (e.g., via env variable)
  await page.goto(process.env.QUOTE_URL, { waitUntil: 'networkidle2' });

  // Click send button (update selector as needed)
  await page.click('button[data-automationid="send-button"]');

  console.log('Quote sent!');
  await browser.close();
})();
