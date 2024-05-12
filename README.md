# tdavidxc.github.io
Tom David
psytd11@nottingham.ac.uk

Web-page that used to be online through git:
https://tdavidxc.github.io/dbscw2/

*Supabase key mentioned in javascript code*

# Issues that I faced
My browser was not rendering the size of the header's border correctly. Even after setting it to 1px, it was not at 1px. it was at 0.666667px. I have emailed you about this and I have also talked to some other people who have had the same issue. They said they have emailed you already and you told them to include the issue in the markdown file and they will not be penalised as this is an issue with personal devices. Furthermore, I tested this on another device and It was working totally fine. However, for me, one of my playwright tests would fail due to this reason.

# Description of additional work

## HTML
In all html files (index,addvehicle,vehiclesearch) within the aside tag

Added a new dark-mode / light-mode button to increase useability for the web-page. I did this by adding a new button below the existing image in the aside bar. 

In all html files (index,addvehicle,vehiclesearch) within the start of the body tag

I also added a paragraph text using the <p> tag to give a quick description about the page and how to use the page for users who may have a little difficulty understanding the purpose of the page they are on.

## CSS
In the style.css file at line 194

Added functionality for the dark-mode/light-mode button.
- It changes the theme of the body to black
- It also changes the theme of the contents in the page to grey
- Clicking the button again sets the body to a beige colour
- Clicking the button will set the contents in the page to white.
- It also changes the text to the opposite colour to enhance readability
- It also changes the colour of the buttons and the text box's (inputs) to match the overall scheme


## JS
In script.js at line 307

Added the javascript functionality for the theme button. It grabs the element using the 'getElementByID' and uses an event listener to listen out for clicks and to change the text on the button as its clicked. It also saves the state of the page so even if the user changes pages, it will keep the theme already set by the user in the previous page.

# Tests

Tests that have been added:

|What it tests|What it tests for|How it tests|
|-----|--------|---------|
|Web-page|should set the character set to UTF-8|It does this by using a page.locator and using the .toBe method to test to see whether the UTF-8 element exists|
|Web-page|should have the page title and heading "Add a Vehicle|This uses the .getByRole method and checks if a link with the title Add a vehicle exists|
|Web-page|should have a submit button called "Add vehicle|This uses the same method as above but checks for a button with the name Add vehicle instead. For this, it uses a page.locator and checks whether it has the text desired. I initially failed this test because my label was set to Add Vehicle not Add so this helped me find the issue.|
|Web-page|should have a dark mode button in the aside|This first finds the theme-toggle button using the buttons ID and then proceeds to click the button. It then checks whether the background of the body has changed.|
|Database|should return 3, Oliver Reps, Nottingham, 1976-10-05, JR123DE, 2016-01-29|It does this using the same methods in the tests given. It fills in the desired input and checks to see if the results container contains the desired elements|
|Database|should return Vehicle ID: PQR6465 Make: Audi Model: A4 Colour: Red Owner ID: 2|This checks in the same way as above and also uses the .toContain method to see if the results container contains the desired elements|
|Database|should add a vehicle in Rachel Smiths name|The previous test did not test to see if a vehicle can be added for an existing user. Therefore, I added this test to test for just that. Initially the test failed because the js script was not correctly inserting the data properly into the table. This test helped me locate and understand the issue.|