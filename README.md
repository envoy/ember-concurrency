# ember-concurrency

[![Build Status][build-status-img]][build-status-link]
[![NPM][npm-badge-img]][npm-badge-link]
[![Ember Observer Score][ember-observer-badge]][ember-observer-url]
![Ember Version][ember-version]

Improved concurrency primitives for Ember.js. Documentation can be
found [here](http://ember-concurrency.com).

## Installation

`ember-concurrency` is an ember-cli addon. You can install it via:

    ember install ember-concurrency

`ember-concurrency` also requires that the Regenerator runtime be
included in your app. The easiest way to ensure this is to enable
the `babel.includePolyfill` option in your `ember-cli-build.js`
or `Brocfile.js` files.

    var app = new EmberApp(defaults, {
      babel: {
        includePolyfill: true,
      },
    });

## Documentation

The [ember-concurrency documentation site](http://ember-concurrency.com) is an ember-cli app
with interactive examples powered by ember-concurrency. It runs from
ember-concurrency's [dummy test app](https://github.com/machty/ember-concurrency/tree/master/tests/dummy/app)
(thanks to [ef4](https://github.com/ef4) for spearheading this
approach).

## Problems?

Whether you've found a bug or just have a question about
ember-concurrency, feel free to [Open an Issue](https://github.com/machty/ember-concurrency/issues).
Also, I highly recommend heading over to the
[Ember.js Community Slack](https://embercommunity.slack.com)
and asking your question in the `#e-concurrency` channel.

## Addon Maintenance

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

### Generate Docs

TODO: use build pipeline.

    ./builddocs.sh

[build-status-img]: https://travis-ci.org/machty/ember-concurrency.svg?branch=master
[build-status-link]: https://travis-ci.org/machty/ember-concurrency
[npm-badge-img]: https://badge.fury.io/js/ember-concurrency.svg
[npm-badge-link]: http://badge.fury.io/js/ember-concurrency
[ember-observer-badge]: http://emberobserver.com/badges/ember-concurrency.svg
[ember-observer-url]: http://emberobserver.com/addons/ember-concurrency
[ember-version]: https://embadge.io/v1/badge.svg?start=1.13.0
