module.exports = (function() {
    const settings = {
        "src_folders" : ["test/e2e"],
        "output_folder" : "reports",
        "custom_commands_path" : "",
        "custom_assertions_path" : "",
        "page_objects_path" : ["test/pageObjects"],
        "globals_path" : "",

        "selenium" : {
            "start_process": true, // tells nightwatch to start/stop the selenium process
            "server_path": "./bin/selenium.jar",
            "host": "127.0.0.1",
            "port": 4444, // standard selenium port
            "cli_args" : {
                "webdriver.chrome.driver" : "./bin/chromedriver"
            }
        },

        "test_settings" : {
            "default" : {
                "launch_url" : "http://localhost:4000",
                "screenshots": {
                    "enabled": true, // if you want to keep screenshots
                    "path": './screenshots' // save screenshots here
                },
                "globals": {
                    "waitForConditionTimeout": 5000 // sometimes internet is slow so wait.
                },
                "desiredCapabilities": { // use Chrome as the default browser for tests
                    "browserName": "chrome"
                }
            },
            "ci" : {
                "launch_url" : "http://localhost:4000",
                "screenshots": {
                    "enabled": false
                },
                "globals": {
                    "waitForConditionTimeout": 5000 // sometimes internet is slow so wait.
                },
                "desiredCapabilities": { // use Chrome as the default browser for tests
                    "browserName": "chrome"
                }
            }
        }
    };

    require('selenium-download').ensure('./bin', function(error) {
        if (error) {
            return console.log(error);
        } else {
            console.log('✔ Selenium & Chromedriver downloaded to:', './bin');
        }
    });

    return settings;
})();

