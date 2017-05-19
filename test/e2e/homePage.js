module.exports = {
    'Test the homepage' : function (browser) {
        browser
            .url(browser.launchUrl)
            .waitForElementVisible('body', 1000)
            //.assert.title()
            .assert.elementPresent('h1')
            .end();
    }
};

