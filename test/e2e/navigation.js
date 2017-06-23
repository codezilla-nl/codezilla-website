module.exports = {
    'Open navigation' : function (browser) {
        let home = browser.page.home();
        let nav = home.section.nav;

        home.navigate().waitForElementVisible('body', 1000);
        nav.click('@menuButton');
        home.assert.cssClassPresent('@bodyContainer', 'cz-body-container--skewed');
    },
    'Close navigation' : function (browser) {
        let home = browser.page.home();
        let nav = home.section.nav;

        nav.click('@menuButton');
        home.assert.cssClassNotPresent('@bodyContainer', 'cz-body-container--skewed');
        browser.end();
    },
    'Navigate to a page' : function (browser) {
        let home = browser.page.home();
        let nav = home.section.nav;

        let linkSelector = 'nav .cz-navigation__list-item:nth-child(2) a';

        home.navigate().waitForElementVisible('body', 1000);
        nav.click('@menuButton').waitForElementVisible('@menuItem', 1000);
        browser.execute(function(linkSelector) {
            // For some reason, the nightwatch .click() method doesnt work
            document.querySelector(linkSelector).click()
        }, [linkSelector]);
        home.waitForElementVisible('@staticHeader', 3000);
        nav.assert.urlContains('/visie/');
        browser.end();
    },
};

