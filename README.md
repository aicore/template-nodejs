# template-nodejs
A template project for nodejs. Has integrated linting, testing,
coverage, reporting, Github actions and other goodies.

Easily use this template to quick start a production ready nodejs project template.

# Commands available
## Linting
To lint the files in the project, run the following command:
```shell
> npm run lint
```
To Automatically fix lint errors:
```shell
> npm run lint:fix
```

## Testing
To run all tests:
```shell
> npm run test
  Hello world Tests
    ✔ should return Hello World
    #indexOf()
      ✔ should return -1 when the value is not present
```

Additionally, to run unit/integration tests only, use the commands:
```shell
> npm run test:unit
> npm run test:integ
```

## Coverage Reports
To run all tests with coverage:

```shell
> npm run cover
  Hello world Tests
    ✔ should return Hello World
    #indexOf()
      ✔ should return -1 when the value is not present


  2 passing (6ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |                   
 index.js |     100 |      100 |     100 |     100 |                   
----------|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 100% ( 5/5 )
Branches     : 100% ( 2/2 )
Functions    : 100% ( 1/1 )
Lines        : 100% ( 5/5 )
================================================================================
Detailed unit test coverage report: file:///template-nodejs/coverage-unit/index.html
Detailed integration test coverage report: file:///template-nodejs/coverage-integration/index.html
```
After running coverage, detailed reports can be found in the coverage folder listed in the output of coverage command.
Open the file in browser to view detailed reports.

To run unit/integration tests only with coverage
```shell
> npm run cover:unit
> npm run cover:integ
```

Sample coverage report:
![image](https://user-images.githubusercontent.com/5336369/148687351-6d6c12a2-a232-433d-ab62-2cf5d39c96bd.png)

### Unit and Integration coverage configs
Unit and integration test coverage settings can be updated by configs `.nycrc.unit.json` and `.nycrc.integration.json`.

See https://github.com/istanbuljs/nyc for config options.

# Code Guardian
Several automated workflows that check code integrity are integrated into this template.
These include:
1. GitHub actions that runs build/test/coverage flows when a contributor raises a pull request
2. [Sonar cloud](https://sonarcloud.io/) integration using `.sonarcloud.properties`

## IDE setup
SonarLint is currently available as a free plugin for jetbrains, eclipse, vscode and visual studio IDEs.
Use sonarLint plugin for webstorm or any of the available
IDEs from this link before raising a pull request: https://www.sonarlint.org/ .

SonarLint static code analysis checker is not yet available as a Brackets
extension.

## Internals
### Testing framework: Mocha , assertion style: chai
 See https://mochajs.org/#getting-started on how to write tests
 Use chai for BDD style assertions (expect, should etc..). See move here: https://www.chaijs.com/guide/styles/#expect

### Mocks and spies: sinon
 if you want to mock/spy on fn() for unit tests, use sinon. refer docs: https://sinonjs.org/

### Note on coverage suite used here:
we use c8 for coverage https://github.com/bcoe/c8. Its reporting is based on nyc, so detailed docs can be found
 here: https://github.com/istanbuljs/nyc ; We didn't use nyc as it do not yet have ES module support
 see: https://github.com/digitalbazaar/bedrock-test/issues/16 . c8 is drop replacement for nyc coverage reporting tool
