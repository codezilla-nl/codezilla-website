module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            '../src/**/*.js'
        ],
        exclude: [
        ],
        preprocessors: {
            '**/*.js': ['rollup']
        },
        rollupPreprocessor: {
            // will help to prevent conflicts between different tests entries
            format: 'iife',
            sourceMap: 'inline'
        },
        browsers: [process.env.KARMA_BROWSER ? process.env.KARMA_BROWSER : 'Chrome'],
        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        // See https://github.com/karma-runner/karma/issues/598
        browserNoActivityTimeout: 30000, // 30 seconds
        browserDisconnectTolerance: 5    // 5 attempts
    })
};
