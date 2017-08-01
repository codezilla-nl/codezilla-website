module.exports = {
    'Open team member detail': function (browser) {
        let team = browser.page.team();

        team.navigate()
            .waitForElementVisible('@teamMember', 1000)
            .click('@teamMember')
            .waitForElementVisible('@teamMemberOverlay', 1000)
            .assert.visible('@teamMemberOverlayTitle')
            .assert.containsText('@teamMemberOverlayTitle', 'JORAN');

        browser.end();
    },
    'Close detail with close button': function (browser) {
        let team = browser.page.team();

        team.navigate()
            .waitForElementVisible('@teamMember', 1000)
            .click('@teamMember')
            .waitForElementVisible('@teamMemberOverlay', 1000)
            .click('@closeButton')
            .waitForElementNotPresent('@teamMemberOverlay', 1000)
            .assert.elementNotPresent('@teamMemberOverlayTitle');

        browser.end();
    },
    'Close detail with esc key': function (browser) {
        let team = browser.page.team();

        team.navigate()
            .waitForElementVisible('@teamMember', 1000)
            .click('@teamMember')
            .waitForElementVisible('@teamMemberOverlay', 1000);

        browser.keys(browser.Keys.ESCAPE);

        team.waitForElementNotPresent('@teamMemberOverlay', 1000)
            .assert.elementNotPresent('@teamMemberOverlayTitle');

        browser.end();
    }
};

