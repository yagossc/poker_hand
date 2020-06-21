# Poker Hand Challenge
A solution to the poker hand ranking challenge.

The challenge consists of receiving two poker hands, ranking them and
returning the winner. A simple REST API was built to expose the
solution.

Tech. Stack: Node.JS, Express, Jest (and supertest) for testing.

- [About the solution](#about-the-solution)
- [Code Structure](#code-structure)
- [Building](#building)
- [Running](#running)
- [Testing](#testing)
- [References](#references)

# About the solution
This solutions does not consider `jokers` as part of the available deck
for poker and also does not differentiate the `royal straight flush`,
because it's simply a `straight flush` with a `high ace`.

# Code Structure
```
.
├── LICENSE
├── README.md
├── api/
│   ├── __test__/
│   │   └── hands.spec.js       -- tests for the api enpoint
│   ├── hands.js                -- enpoint to receive the poker hands
│   ├── routes.js               -- the route(s) to attach to the server
│   └── server.js               -- simple server implementation
├── app/
│   └── errors.js               -- error handling middleware
├── cards/
│   ├── __test__/
│   │   └── analyzer.spec.js    -- tests for the cards analyzer
│   └── analyzer.js             -- cards/hands analyzer
├── curl/
│   └── test.sh                 -- api request examples
├── index.js                    -- application entry point
└── package.json
```

# Building
This considers available recent versions of Node.JS and NPM.

Get to the project's root and run:
```
# Install the dependencies
$ npm install
```

This should be enough.

# Running
If all the dependencies are satisfied, simply run the applications
entry point:
```
$ node index.js
Server up and running. Listenning at 8080
```

# Testing
You can either run the automated tests with:
```
$ npm test
```

Or, test it manually with cURL or a REST client of your choice. There
are some examples at `curl/test.sh`.
```
$ cd curl/
$ sh test.sh
```

# References

- [NodeJS](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com/en/4x/api.html)
- [Poker Hands](https://www.unibet.com/poker/guides/poker-hand-rankings-cheat-sheet-1.1158487)
- [Jest](https://jestjs.io/docs/en/getting-started)
- [Supertest](https://www.npmjs.com/package/supertest)
