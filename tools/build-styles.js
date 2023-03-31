/*eslint-disable no-var, vars-on-top, no-console */
const { promisify } = require("util");
const { exec } = require("child_process");

const run = promisify(exec);

run("rm -rf .tmp/")
  .then(() => run("sass src/styles.scss .tmp/styles.css"))
  .then(() =>
    run("postcss .tmp/styles.css --use autoprefixer --no-map -d .tmp/")
  )
  .then(() => run("mv .tmp/styles.css .tmp/styles-compiled.css"))
  // .then(() => run("mkdir -p dist/es dist/lib"))
  .then(() =>
    run(
      "cp .tmp/styles-compiled.css dist/es/ && cp .tmp/styles-compiled.css dist/lib/"
    )
  )
  .then(() =>
    run("cp src/styles.scss dist/es/ && cp src/styles.scss dist/lib/")
  )
  .then(() => console.log("✔ Styles have been build"))
  .catch((err) => {
    console.error(err);
  });
