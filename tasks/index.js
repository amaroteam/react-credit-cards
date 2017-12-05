/*eslint-disable no-var, vars-on-top, no-console */
const { promisify } = require('util');
const { exec } = require('child_process');
const chalk = require('chalk');
const yargs = require('yargs');

const run = promisify(exec);

module.exports = yargs
  .command({
    command: 'build-styles',
    desc: 'build styles before publishing',
    handler: () => {
      run('rm -rf .tmp/')
        .then(() => run('node-sass -o .tmp/ src/styles.scss'))
        .then(() => run('postcss .tmp/styles.css --use autoprefixer --no-map -d .tmp/'))
        .then(() => run('mv .tmp/styles.css .tmp/styles-compiled.css'))
        .then(() => run('mkdir -p es lib'))
        .then(() => run('cp .tmp/styles-compiled.css es/ && cp .tmp/styles-compiled.css lib/'))
        .then(() => run('cp src/styles.scss es/ && cp src/styles.scss lib/'))
        .then(() => console.log(chalk.green('✔ Styles have been build')))
        .catch(err => {
          throw new Error(err);
        });
    },
  })
  .command({
    command: 'commits',
    desc: 'has new remote commits',
    handler: () => {
      run('git rev-parse --is-inside-work-tree')
        .then(() =>
          run('git remote -v update')
            .then(() =>
              Promise.all([
                run('git rev-parse @'),
                run('git rev-parse @{u}'),
                run('git merge-base @ @{u}'),
              ])
                .then(values => {
                  const [{ stdout: $local }, { stdout: $remote }, { stdout: $base }] = values;

                  if ($local === $remote) {
                    console.log(chalk.green('✔ Repo is up-to-date!'));
                  }
                  else if ($local === $base) {
                    console.log(chalk.red('⊘ Error'), 'You need to pull, there are new commits.');
                    process.exit(1);
                  }
                })
                .catch(err => {
                  if (err.message.includes('no upstream configured ')) {
                    console.log(chalk.yellow('⚠ Warning'), 'No upstream. Is this a new branch?');
                    return;
                  }

                  console.log(chalk.yellow('⚠ Warning'), err.message);
                }))
            .catch(err => {
              throw new Error(err);
            }))
        .catch(() => {
          console.log('not under git');
        });
    },
  })
  .command({
    command: 'update',
    desc: 'run `npm update` if package.json has changed',
    handler: () => {
      return run('git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD')
        .then(({ stdout }) => {
          if (stdout.match('package.json')) {
            console.log(chalk.yellow('▼ Updating...'));
            exec('npm update').stdout.pipe(process.stdout);
          }
          else {
            console.log(chalk.green('✔ Nothing to update'));
          }
        })
        .catch(err => {
          throw new Error(err);
        });
    },
  })
  .demandCommand()
  .help()
  .wrap(72)
  .version(false)
  .strict()
  .fail((msg, err, instance) => {
    if (err) {
      throw new Error(err);
    }

    console.error(`${chalk.red(msg)}
    `);
    console.log(instance.help());
    process.exit(1);
  })
  .argv;
