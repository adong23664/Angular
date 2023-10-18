# It Automation Portal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Requirements

For building and running the application you need:

- [node.js 18.17.1]


Run the following shell in the project directory
```shell
npm install
```

## Environment

According to the environment, set host url.

```javascript
export const environment = {
  production: false,
};
export const host= <It-automaion-service-url>;
const apiPrefix = 'it-automation';
export const endpoint= host + '/' + apiPrefix;
```


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Commit Rule
Commit message needs to conform to the following rule or it cannot be pushed to Gitlab.

Commit type
- build: Changes that affect the build system or external dependencies
- feat: A new feature
- fix: A bug fix
- doc: Documentation only changes
- style: Changes that do not affect the meaning of the code 
- refactor: A code change that neither fixes a bug nor adds a feature
- revert: Revert the previous version code
- test: Adding missing tests or correcting existing tests
- chore: Updated files but no code change
- ci: Changes to our CI configuration files and scripts

```shell
<commit-type>: <jira-issue-key> <your-commit-message>
```

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
