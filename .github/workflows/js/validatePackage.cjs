let packageJson = require('../../../package.json');
const clc = require('cli-color');

if(!packageJson.name.startsWith('@aicore/')){
    console.error(clc.red('ERROR: All packages under core.ai should have name starting with `@aicore/` in package.json'));
    process.exit(1);
}
