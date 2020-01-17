/*eslint-disable no-var, vars-on-top, no-console */
const { promisify } = require('util');
const { exec } = require('child_process');

const run = promisify(exec);

run('rm -rf .tmp/')
  .then(() => run('node-sass -o .tmp/ src/styles.scss'))
  .then(() => run('postcss .tmp/styles.css --use autoprefixer --no-map -d .tmp/'))
  .then(() => run('mv .tmp/styles.css .tmp/styles-compiled.css'))
  .then(() => run('mkdir -p es lib'))
  .then(() => run('cp .tmp/styles-compiled.css es/ && cp .tmp/styles-compiled.css lib/'))
  .then(() => run('cp src/styles.scss es/ && cp src/styles.scss lib/'))
  .then(() => console.log('✔ Styles have been build'))
  .catch(err => {
    console.error(err);
  });
