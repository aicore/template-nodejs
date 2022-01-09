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

## Testing and coverage
To run all tests:
```shell
> npm run test
  Hello world Tests
    ✔ should return Hello World
    #indexOf()
      ✔ should return -1 when the value is not present
```

To run all tests with coverage:
```shell
> npm run coverage
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
```

### Coverage folder
After running coverage, detailed reports can be found in the coverage folder.
Open `coverage/index.html` in browser to view detailed reports.

Sample coverage report:
![image](https://user-images.githubusercontent.com/5336369/148687351-6d6c12a2-a232-433d-ab62-2cf5d39c96bd.png)
