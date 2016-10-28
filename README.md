# CODEZILLA Website

## Tools / Libs
* [Metalsmith](http://www.metalsmith.io/) > Static site generator
* [rollup.js](http://rollupjs.org/) > JavaScript module bundler
* Babel
* [Nightwatch.js](http://nightwatchjs.org/) > E2E testing framework
* SASS

## Installation
* Clone the repo: `git clone git@github.com:codezilla-nl/codezilla-website.git`
* Install dependencies: `npm install`

## Tests
* Run unit tests: `npm test`
* Run E2E tests: `npm run test-e2e`

## Folder structure
```text
    |-- content > Markdown content that is used to generate the HTML files
    |-- src
        |-- classes > JavaScript classes
        |-- layouts > HTML layouts that are used to render the content in
        |-- scss > SASS stylesheets
        |-- main.js > Main JavaScript file that is used as the entry point for the website
        |-- main.scss > Main SASS file that is used as the entry point for the website
```
