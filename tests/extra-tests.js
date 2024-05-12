import exp from 'constants';

// @ts-check
const { test, expect} = require('@playwright/test');

// change this to the URL of your website, could be local or GitHub pages
const websiteURL = 'http://127.0.0.1:5500/';

// Go to the website home page before each test.
test.beforeEach(async ({ page }) => {
   await page.goto(websiteURL);
});

// # html tests

// testing for correct charset
test('should set the character set to UTF-8', async ({ page }) => {
   const metaElement = await page.locator('meta[charset="UTF-8"]');
   await expect(metaElement).toBe; // Check if the meta element exists
});
// testing for correct title on add a vehicle page

//whether the submit button is called "Submit"

//test whether dark mode button is present in the aside and when clicked, 
//the background color of the body changes to black




// database testing


// testing to see if JR123DE license number returns 3, Oliver Reps, Nottingham, 1976-10-05, JR123DE, 2016-01-29

// testing to see if PQR6465 returns Vehicle ID: PQR6465 Make: Audi Model: A4 Colour: Red Owner ID: 2

// testing to see if a vehicle can be added in Rachel Smith's name