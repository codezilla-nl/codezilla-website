module.exports = {
    "port": 3000,
    "ui": {
        port: 3001
    },
    "files": [
        "content/*.md",
        "src/*.js",
        "src/*.html",
        "src/*.scss"
    ],
    "watchOptions": {},
    "server": {
        baseDir: "build"
    },
    "open": true,
    "notify": false
};
