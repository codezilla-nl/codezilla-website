var path = require('path');
var Metalsmith = require('metalsmith');
var filter = require('metalsmith-filter');
var htmlMinifier = require('metalsmith-html-minifier');
var beautify = require('metalsmith-beautify');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var rollup = require('metalsmith-rollup');
var babel = require('rollup-plugin-babel');
var sass = require('metalsmith-sass');
var inPlace = require('metalsmith-in-place');

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
    .use(collections({
      blocks: {
        pattern: '*.html',
        sortBy: 'index'
      }
    }))
    .use(inPlace({
      engine: 'handlebars',
      partials: './src/partials/'
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
    .use(beautify({
      "js": false,
      "html": true
    }))
    .use(rollup({
      entry: path.resolve('src/main.js'),
      dest: 'bundle.js',
      plugins: [
        babel({
          exclude: 'node_modules/**'
        })
      ]
    }))
    .build(function (err, files) {
      if (err) {
        throw err;
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
        throw err;
      }

      if (cb) {
        cb();
      }
    });

};

run();
