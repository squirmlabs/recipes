# Upfronts

## Setup Instructions

### Requirements

- MySQL/MariaDB (https://www.mysql.com/downloads/)
- Node.js 9.0+ (https://nodejs.org)

### Installation

- Clone the repository:

```
 git clone path/to/repository.git
```

- Install the NPM dependencies with yarn.

```
npm install
npm install -g pm2
```

- Add to your hosts:

```
127.0.0.1 local.uui.com
```

- Start the application server

```
npm start
```

- Run the application at [http://local.uui.com:3000](http://local.uui.com:3000)

### Tasks

- `npm start` Start server in local mode
- `npm run start-development` Start server in development mode
- `npm run start-qa` Start server in QA mode
- `npm run start-stage` Start server in stage mode
- `npm run start-production` Start server in production mode
- `npm run lint` Eslint validator
- `npm run lint-fix` Eslint validator with --fix flag
- `npm test` Run unit tests

### Libraries Used

- [babeljs](https://babeljs.io/)
- [eslint](http://eslint.org/)
- [express-js](http://expressjs.com/)
- [handlebars](handlebarsjs.com)
- [jest](https://github.com/facebook/jest)
- [mocha](https://mochajs.org)
- [react-helmet](https://github.com/nfl/react-helmet)
- [react-router](https://github.com/rackt/react-router)
- [react](http://facebook.github.io/react/)
- [redux](http://rackt.github.io/redux/)
- [stylus](http://stylus-lang.com)
- [webpack](http://webpack.github.io/)

### Development Process

#### Git Workflow

- Create a new feature branch using the naming convention listed below.
- When a feature branch is ready, a Pull Request to merge into the `develop` branch must be opened.

#### Branch Naming Convention

- All branches must follow the naming convention: `feature/<STORY-ID>-<branch-name>`

#### Commit Message Convention

- All commits must follow the naming convention: `<COMMIT-TYPE>(<STORY-ID>): <commit-message>`
- Commit types may be one of the following: Add, Drop, and fix. The type `Add` will be the most common.
