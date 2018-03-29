module.exports = {
    'port': 3000,
    'ui': {
        port: 3001
    },
    'files': [{
        match: [
            './content/**/*.html',
            './src/**/*.js',
            './src/**/*.html',
            './src/**/*.scss'
        ],
        fn: function (event) {
            if (event === 'change') {
                require('./index')(function() {
                    this.reload();
                }.bind(this));
            }
        }
    }],
    'watchOptions': {},
    'server': {
        baseDir: ['build', 'public']
    },
    'open': true,
    'notify': false,
    'browser': process.env.DEV_BROWSER || 'default'
};
