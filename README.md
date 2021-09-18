# CODEZILLA Website [![Build Status](https://travis-ci.org/codezilla-nl/codezilla-website.svg?branch=master)](https://travis-ci.org/codezilla-nl/codezilla-website) [![License GPLv3](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://github.com/codezilla-nl/codezilla-website/blob/master/LICENSE)

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

## CI / Deployment / Hosting
* CI and deployment is done through Github Actions, run on AWS Amplify Preview
* Hosting is done on AWS Amplify

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
