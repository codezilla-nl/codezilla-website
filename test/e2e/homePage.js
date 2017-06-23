module.exports = {
    'Test the homepage': function (browser) {
        let home = browser.page.home();

        home.navigate()
            .assert.title('CODEZILLA - Front end coding')
            .waitForElementVisible('body', 1000)
            .assert.elementPresent('@h1');

        browser.end();
    },
    'Test header carousel': function (browser) {
        let home = browser.page.home();
        let carousel = home.section.carousel;

        home.navigate();

        carousel
            .waitForElementVisible('body', 1000)
            // Check the first carousel slide
            .assert.cssClassPresent('@firstSlide', 'cz-carousel--current')
            // Wait for the h1 slide title to pop up
            .waitForElementVisible('@firstSlideHeader', 2000)
            // Check if the second slide isnt visible yet
            .assert.hidden('@secondSlideHeader')
            // Wait for the second slide to appear
            .waitForElementVisible('@secondSlideHeader', 11000)
            // Check if the slide is 'current'
            .assert.cssClassPresent('@secondSlide', 'cz-carousel--current')
            // Check if the first  slide isnt visible yet
            .assert.hidden('@firstSlideHeader');

        browser.end();
    },
    'Test client carousel': function (browser) {
        let home = browser.page.home();
        let clients = home.section.clients;

        home.navigate();

        clients
            .waitForElementVisible('body', 1000)
            // Check the first carousel slide
            .assert.cssClassPresent('@firstSlide', 'cz-bedrijven-carousel--current')
            // Wait for the slide content to apear
            .waitForElementVisible('@firstSlideContent', 2000)
            // Check if the second slide isnt visible yet
            .assert.hidden('@secondSlideContent')
            // Click on the next button
            .click('@nextButton')
            // Wait for the second slide to appear
            .waitForElementVisible('@secondSlideContent', 1000)
            // Check if the slide is 'current'
            .assert.cssClassPresent('@secondSlide', 'cz-bedrijven-carousel--current')
            // Check if the first  slide isnt visible yet
            .assert.hidden('@firstSlideContent');

        browser.end();
    },
    'Test GA code': function (browser) {
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

