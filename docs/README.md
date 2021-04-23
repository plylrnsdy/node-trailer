node-trailer - v0.2.1 / [Exports](modules.md)

# node-trailer

[![npm](https://img.shields.io/npm/v/node-trailer.svg)](https://npmjs.org/package/node-trailer)

> A logger built with middleware, based on [trough](https://github.com/wooorm/trough).

* Create a logger without middlewares will use the default theme;
* Create a customize logger with middlewares.
  * There are 3 types middleware:
    * `Filter` decide what can be handle by next middleware;
    * `Appender` render different part of message as a log;
    * `Output` use appenders generating the log and send it to different place.

![Preview](./images/preview.png)

## Installation

Install using [npm](https://www.npmjs.org/):

```sh
npm i -P node-trailer
```

## API Reference

- node-trailer
  - inner
    - [createLogger()](./docs/modules.md#createLogger)
    - :Middleware
      - [filter()](./docs/modules.md#filter)
      - :Appender
        - [date()](./docs/modules.md#date)
        - [error()](./docs/modules.md#error)
        - [level()](./docs/modules.md#level)
        - [message()](./docs/modules.md#message)
      - :Output
        - [rawConsole()](./docs/modules.md#rawConsole)
        - [colorConsole()](./docs/modules.md#colorConsole)
        - [logFile()](./docs/modules.md#logFile)
        - [jsonFile()](./docs/modules.md#jsonFile)

## Tests

Run tests using `npm test`.

## Contributing

Please submit all issues and pull requests to the [plylrnsdy/node-trailer](http://github.com/plylrnsdy/node-trailer) repository!

## Support

If you have any problem or suggestion please open an issue [here](https://github.com/plylrnsdy/node-trailer/issues).
