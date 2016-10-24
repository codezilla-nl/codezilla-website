module.exports = {
    "port": 3000,
    "ui": {
        port: 3001
    },
    "files": [{
        match: [
            "./content/**/*.md",
            "./src/**/*.js",
            "./src/**/*.html",
            "./src/**/*.scss"
        ],
        fn: function (event, file) {
            if (event === 'change') {
                require('./index')(function() {
                    this.reload();
                }.bind(this));
            }
        }
    }],
    "watchOptions": {},
    "server": {
        baseDir: "build"
    },
    "open": true,
    "notify": false,
    "browser": process.env.DEV_BROWSER || 'default'
};
