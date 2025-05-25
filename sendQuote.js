const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/run', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://in.xero.com');

    // Add your automation here

    await browser.close();
    res.send('✅ Puppeteer task completed.');
  } catch (err) {
    console.error('❌ Error running Puppeteer:', err);
    res.status(500).send('Puppeteer failed.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
