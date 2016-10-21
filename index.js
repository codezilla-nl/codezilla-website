var path = require('path');
var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var collections  = require('metalsmith-collections');
var rollup      = require('metalsmith-rollup');

Metalsmith(__dirname)
  .metadata({
    title: 'CODEZILLA',
    description: "CODEZILLA Front End Coding",
    url: "http://www.codezilla.nl/"
  })
  .source('./content')
  .destination('./build')
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
    entry: path.resolve(__dirname, 'src/main.js'),
    dest: 'bundle.js',
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
