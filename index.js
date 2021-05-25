const path = require('path');
const Metalsmith = require('metalsmith');
const filter = require('metalsmith-filter');
const htmlMinifier = require('metalsmith-html-minifier');
const beautify = require('metalsmith-beautify');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const collections = require('metalsmith-collections');
const sitemap = require('metalsmith-sitemap');
const canonical = require('metalsmith-canonical');
const robots = require('metalsmith-robots');
const rollup = require('metalsmith-rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const nodeResolve = require('rollup-plugin-node-resolve');
const sass = require('metalsmith-sass');
const inPlace = require('metalsmith-in-place');
const asset = require('metalsmith-static');
const helpers = require('metalsmith-register-helpers');
const models = require('metalsmith-models');
// const imagemin = require('metalsmith-imagemin');
// const googleAnalytics = require('metalsmith-google-analytics').default;

const ENV = process.env.ENV;

let run = module.exports = function (cb) {
    Metalsmith(__dirname)
        .metadata({
            title: 'CODEZILLA',
            description: 'Samen met haar klanten bouwt CODEZILLA complexe (mobiele) web applicaties met optimale gebruikersvriendelijkheid. Dit doet CODEZILLA door het tijdelijk inzetten van professionele, communicatieve en creatieve IT front end vakmensen. ',
            url: 'http://www.codezilla.nl/'
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
            directory: 'content/data'
        }))
        .use(inPlace({
            engine: 'handlebars',
            partials: './src/partials/'
        }))
        .use(helpers({
            directory: './src/helpers'
        }))
        .use(layouts({
            engine: 'handlebars',
            directory: './src/layouts/',
            partials: './src/partials/'
        }))
        .use(htmlMinifier('*.html', {
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
        // .use(googleAnalytics('UA-61200557-1'))
        .use(beautify({
            'js': false,
            'html': true
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
                nodeResolve({}),
                ENV === 'PROD' ? uglify() : () => {
                }
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

    Metalsmith(__dirname)
        .source('./public/')
        .destination('./build')
        .use(filter(['**/*.gif', '**/*.png', '**/*.jpg', '**/*.svg']))
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
