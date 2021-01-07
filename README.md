## About the project
An automation testing framework for web application using Cypress

### Project structure
```
.
├── cypress
│   ├── fixtures
│   │   ├── login.json
│   │   └── ...
│   ├── integration
│   │   ├── homepage.spec.js
│   │   ├── login.spec.js
│   │   └── ...
│   ├── page-objects
│   │   ├── BasePage.js
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   └── ...
│   ├── plugins
│   │   ├── index.js
│   │   └── ...
│   └── support
│      ├── utils
│      │   ├── Utils.js
│      │   └── ...
│      ├── commands.js
│      ├── index.js
│      └── ...
├── package.json
└── cypress.json
```
## Getting Started
### Prerequisites
- NodeJS

### Installation
1. Clone the repo
```
git clone https://github.com/wizeline/Cypress-Framework.git
```
2. Install NPM packages
```
$ npm install
```
### Running the tests
- Open Cypress:
```
$ npm run cy:open
```
- Running the tests in headless mode with Chrome
```
$ npm run cy:run-chrome
```
- Running the tests in headless mode with Firefox
```
$ npm run cy:run-firefox
```
- Running the tests in headless mode with Electron
```
$ npm run cy:run-electron
```
