var path = require('path');
var Metalsmith = require('metalsmith');
var filter = require('metalsmith-filter');
var htmlMinifier = require('metalsmith-html-minifier');
var beautify = require('metalsmith-beautify');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var sitemap = require('metalsmith-sitemap');
var canonical = require('metalsmith-canonical');
var robots = require('metalsmith-robots');
var rollup = require('metalsmith-rollup');
var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');
var nodeResolve = require('rollup-plugin-node-resolve');
var sass = require('metalsmith-sass');
var inPlace = require('metalsmith-in-place');
var asset = require('metalsmith-static');
var helpers = require('metalsmith-register-helpers');
var models = require("metalsmith-models");
var googleAnalytics = require('metalsmith-google-analytics').default;

var ENV = process.env.ENV;

var run = module.exports = function(cb) {
  Metalsmith(__dirname)
    .metadata({
      title: 'CODEZILLA',
      description: "CODEZILLA Front End Coding",
      url: "http://www.codezilla.nl/"
    })
    .source('./content')
    .destination('./build')
    .use(filter('*.html'))
    .clean(true)
    .use(permalinks())
    .use(canonical({
      hostname: 'http://www.codezilla.nl',
      omitIndex: true,
      omitTrailingSlashes: false
    }))
    .use(collections({
      blocks: {
        pattern: '*.html',
        sortBy: 'index'
      }
    }))
    .use(models({
      directory: "content/data"
    }))
    .use(inPlace({
      engine: 'handlebars',
      partials: './src/partials/'
    }))
    .use(helpers({
      directory: "./src/helpers"
    }))
    .use(layouts({
      engine: 'handlebars',
      directory: './src/layouts/',
      partials: './src/partials/'
    }))
    .use(htmlMinifier("*.html", {
      collapseWhitespace: false,
      removeComments: true,
      removeAttributeQuotes: false
    }))
    .use(sitemap({
      hostname: 'http://www.codezilla.nl',
      omitIndex: true
    }))
    .use(robots({
      allow: ENV === 'PROD' ? ['*'] : [],
      disallow: ENV !== 'PROD' ? ['*'] : []
    }))
    .use(googleAnalytics('UA-61200557-1'))
    .use(beautify({
      "js": false,
      "html": true
    }))
    .use(asset({
      src: './public',
      dest: '.'
    }))
    .use(rollup({
      entry: path.resolve('src/main.js'),
      dest: 'bundle.js',
      plugins: [
        babel({
          exclude: 'node_modules/**'
        }),
        nodeResolve({
        }),
        ENV === 'PROD' ? uglify() : () => {}
      ]
    }))
    .build(function (err, files) {
      if (err) {
        console.error(err);
      }
    });

    // TODO: Research if this hacky system can be improved
    Metalsmith(__dirname)
    .source('./src/')
    .destination('./build')
    .use(filter('*.scss'))
    .use(sass({}))
    .build(function (err, files) {
      if (err) {
        console.error(err);
      }

      if (cb) {
        cb();
      }
    });

};

run();
