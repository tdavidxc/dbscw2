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
test('should have the page title and heading "Add a Vehicle"', async ({ page }) => {
   await page.getByRole('link', { name: 'Add a vehicle' }).click();
   await expect(page.locator('h1')).toBeVisible();
});
//whether the submit button is called "Submit"
test('should have a submit button called "Add vehicle"', async ({ page }) => {
   await page.getByRole('link', { name: 'Add a vehicle' }).click();
   await expect(page.locator('#addVehicleButton')).toHaveText('Add vehicle');
});
//test whether dark mode button is present in the aside and when clicked, 
//the background color of the body changes to black
test('should have a dark mode button in the aside', async ({ page }) => {
   await expect(page.locator('#theme-toggle-btn')).toHaveText('Dark Mode'); 
   await page.getByRole('button', { name: 'Dark Mode' }).click();
   await expect(page.locator('body')).toHaveClass('dark-mode');
});




// database testing


// testing to see if JR123DE driver license number returns 3, Oliver Reps, Nottingham, 1976-10-05, JR123DE, 2016-01-29
test('should return 3, Oliver Reps, Nottingham, 1976-10-05, JR123DE, 2016-01-29', async ({ page }) => {
   await page.getByRole('link', { name: 'People search' }).click();
   await page.locator('#license').fill('JR123DE')
   await page.getByRole('button', { name: 'Submit' }).click();
   await expect(page.locator('#results')).toContainText('Name: Oliver Reps')
   await expect(page.locator('#results')).toContainText('Address: Nottingham')
   await expect(page.locator('#results')).toContainText('DOB: 1976-10-05')
   await expect(page.locator('#results')).toContainText('License Number: JR123DE')
   await expect(page.locator('#results')).toContainText('Expiry Date: 2016-01-29')
   await expect(page.locator('#results').locator('div')).toHaveCount(1)
});


// testing to see if PQR6465 returns Vehicle ID: PQR6465 Make: Audi Model: A4 Colour: Red Owner ID: 2
test('should return Vehicle ID: PQR6465 Make: Audi Model: A4 Colour: Red Owner ID: 2', async ({ page }) => {
   await page.getByRole('link', { name: 'Vehicle search' }).click();
   await page.locator('#rego').fill('PQR6465')
   await page.getByRole('button', { name: 'Submit' }).click();
   await expect(page.locator('#results')).toContainText('Vehicle ID: PQR6465')
   await expect(page.locator('#results')).toContainText('Make: Audi')
   await expect(page.locator('#results')).toContainText('Model: A4')
   await expect(page.locator('#results')).toContainText('Colour: Red')
   await expect(page.locator('#results')).toContainText('Owner ID: 2')
   await expect(page.locator('#results').locator('div')).toHaveCount(1)
});
// testing to see if a vehicle can be added in Rachel Smith's name
test('should add a vehicle in Rachel Smiths name', async ({ page }) => {
   await page.getByRole('link', { name: 'Add a vehicle' }).click();
   await page.locator('#rego').fill('ABC123')
   await page.locator('#make').fill('Toyota')
   await page.locator('#model').fill('Corolla')
   await page.locator('#colour').fill('Blue')
   await page.locator('#owner').fill('Rachel Smith')
   await page.getByRole('button', { name: 'Add vehicle' }).click();
   await expect(page.locator('#message')).toContainText('Vehicle added successfully')
   await page.getByRole('link', { name: 'People search' }).click();
   await page.locator('#name').fill('Rachel Smith')
   await page.getByRole('button', { name: 'Submit' }).click();
   await expect(page.locator('#results').locator('div')).toHaveCount(1)
});