const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;

async function signUpTest() {
    // Initialize WebDriver with ChromeDriver
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();

    try {
        // Open the sign-up page
        await driver.get('http://localhost/onlineshoppingportal/Onlineshoppingportal/Onlineshoppingportal/shopping/order-history.php');

        // Fill in the form
        await driver.findElement(By.id('fullname')).sendKeys('Test User');
        await driver.findElement(By.id('email')).sendKeys('testuser@example.com');
        await driver.findElement(By.id('contactno')).sendKeys('1234567890');
        await driver.findElement(By.id('password')).sendKeys('password123');
        await driver.findElement(By.id('confirmpassword')).sendKeys('password123');

        // Submit the form
        await driver.findElement(By.id('submit')).click();

        // Wait for the alert and verify the successful registration
        await driver.wait(until.alertIsPresent(), 5000);
        let alert = await driver.switchTo().alert();
        let alertText = await alert.getText();
        console.log(alertText);
        await alert.accept();

        if (alertText.includes('You are successfully register')) {
            console.log('Test passed: Registration successful');
        } else {
            console.log('Test failed: Registration unsuccessful');
        }
    } finally {
        // Close the browser
        await driver.quit();
    }
}

signUpTest();




