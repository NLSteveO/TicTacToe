# Tic-Tac-Toe

This is a simple in browser implementation of Tic-Tac-Toe, written using JavaScript and ReactJS.

[![Build Status](https://travis-ci.org/NLSteveO/TicTacToe.svg?branch=master)](https://travis-ci.org/NLSteveO/TicTacToe)

## Installation and Running
To install my Tic-Tac-Toe react app you should first install the latest version of Node. Then you will clone this repository and install the node packages.
```
git clone https://github.com/NLSteveO/TicTacToe.git
cd TicTacToe
npm install
npm start
```
**NOTE:** I highly recommend using [NVM(Node Version Manager)](https://github.com/creationix/nvm). NVM will allow you to easily use multiple versions of node and switch back and forth as needed.

## Testing and Continuous Integration
#### Linting
I am using [ESLint](https://eslint.org/) for my style guide linter, along with an ES9, Node and React extensions from [eslint-config-mitmaro](https://github.com/mitmaro/eslint-config-mitmaro). You can run the linter using:
```
npm run lint
```

#### Tests
I will add tests at a later time.

#### Continuous Integration
I am using [Travis CI](https://travis-ci.org) for Continuous Integration.

## What's New
- **2018-11-01:** Added a computer player that picks an empty square at random.
- **2018-09-03:** Fixed any some disabled eslint rules, split component classes into their own files, added propTypes validation, finished fixing disabled eslint rules, and gave square components unique keys.
- **2018-08-23:** Added move location to move list, Bolded current move in list, Replaced hardcoding with two loops for creating the board squares, Added button to reverse order of moves list, Now highlights the winning squares, and Displays tie when no one wins.
- **2018-08-22:** Lifted State Up Again, Showed Past Moves, and Implemented Time Travel.
- **2018-08-20:** Lifted State Up, Made a Functional Component, Added Turns, and Added Declaring a Winner.
- **2018-08-18:** Passed some data through props and Made an interactive component.
- **2018-08-16:** Created repository with License and README. Setup the base react app for the Tutorial, added ESLint, and Travis CI. config

## License
MIT
