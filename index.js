var path = require('path');
var Metalsmith  = require('metalsmith');
var filter      = require('metalsmith-filter');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var rollup      = require('metalsmith-rollup');
var sass        = require('metalsmith-sass');

Metalsmith(__dirname)
  .metadata({
    title: 'CODEZILLA',
    description: "CODEZILLA Front End Coding",
    url: "http://www.codezilla.nl/"
  })
  .source('./content')
  .destination('./build')
  .use(filter('*.md'))
  .clean(true)
  .use(markdown())
  .use(permalinks())
  .use(collections({
    blocks: {
      pattern: '*.md',
      sortBy: 'index'
    }
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: './src/layouts/'
  }))
  .use(rollup({
    entry: path.resolve('src/main.js'),
    dest: 'bundle.js',
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });

// TODO: Research if this hacky system can be improved
Metalsmith(__dirname)
  .source('./src/')
  .destination('./build')
  .use(filter('*.scss'))
  .use(sass({}))
  .build(function(err, files) {
    if (err) { throw err; }
  });