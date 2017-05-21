module.exports = {
    'Test the homepage' : function (browser) {
        browser
            .url(browser.launchUrl)
            .waitForElementVisible('body', 1000)
            //.assert.title()
            .assert.elementPresent('h1')
            .end();
    },
    'Test GA code' : function (browser) {
        browser
            .url(browser.launchUrl)
            .waitForElementVisible('body', 1000)
            .execute(function() {
                return window.ga.getAll()[0].get('trackingId');
            }, function(result) {
                browser.assert.equal(result.value, 'UA-61200557-1');
            })
            .end();
    }
};

