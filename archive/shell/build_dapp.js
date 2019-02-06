'use strict';

const yargs = require('yargs');
const shell = require('shelljs');

const argv = yargs
  .usage('Usage: build_dapp [file]')
  .example('aaaa')
  .help('h')
  .alias('h', 'help')
  .options({
    n: {
      alias: 'name',
      demand: true,
      describe: 'file name',
      type: 'string'
    },
  })
  .epilog('copyright Cyber-republic')
  .argv;



const file = argv.name;
const cwd = process.cwd();

const cmd = `node ./bin/bundle --dev --platform ios --entry-file ${cwd}/dapp/${file}/app.js --bundle-output ${file}.js --zip false --inline false`;


shell.env['npm_package_name'] = 'elastos-ReactNative-framework';

shell.exec(cmd, {
  verbose: true
}, (code, stdout, stderr) => {
  console.log('Exit code:', code);
  console.log('Program output:', stdout);
  console.log('Program stderr:', stderr);

});