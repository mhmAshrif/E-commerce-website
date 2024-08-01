const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;

async function checkoutTest() {
    // Set up ChromeDriver
    let options = new chrome.Options();
    
    // Initialize WebDriver
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        // Open the website
        await driver.get('http://localhost/onlineshoppingportal/Onlineshoppingportal/Onlineshoppingportal/shopping/index.php');

        // Log in to the account
        await driver.findElement(By.linkText('Login')).click();
        await driver.findElement(By.name('email')).sendKeys('testuser@example.com');
        await driver.findElement(By.name('password')).sendKeys('password123');
        await driver.findElement(By.name('login')).click();

        // Wait until login is successful
        await driver.wait(until.titleContains('My Account'), 5000);

        // Add an item to the cart
        await driver.findElement(By.linkText('Product Name')).click();
        await driver.findElement(By.css('button.add-to-cart')).click();

        // Go to the cart
        await driver.findElement(By.linkText('Cart')).click();

        // Proceed to checkout
        await driver.findElement(By.linkText('Checkout')).click();

        // Fill in the checkout form
        await driver.findElement(By.name('shippingaddress')).sendKeys('123 Test Street');
        await driver.findElement(By.name('shippingcity')).sendKeys('Test City');
        await driver.findElement(By.name('shippingstate')).sendKeys('Test State');
        await driver.findElement(By.name('shippingzip')).sendKeys('12345');
        await driver.findElement(By.name('shippingcountry')).sendKeys('Test Country');

        // Submit the order
        await driver.findElement(By.css('button.submit-order')).click();

        // Wait for the confirmation
        await driver.wait(until.titleContains('Order Confirmation'), 5000);
        let confirmationMessage = await driver.findElement(By.css('.confirmation-message')).getText();
        console.log(confirmationMessage);

        if (confirmationMessage.includes('Thank you for your order')) {
            console.log('Test passed: Checkout successful');
        } else {
            console.log('Test failed: Checkout unsuccessful');
        }
    } finally {
        // Close the browser
        await driver.quit();
    }
}

checkoutTest();


