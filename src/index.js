/*
 * @Author: Kvkens
 * @Date:   2017-05-22 14:36:34
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2017-05-22 14:36:40
 */


const chalk = require("chalk");
const pathExists = require("path-exists");
const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");




function getHelp() {
  console.log(chalk.green(" Usage : "));
  console.log();
  console.log(chalk.green(" uba plugin <name>"));
  console.log();
  process.exit(0);
}

function getVersion() {
  console.log(chalk.green(require("../package.json").version));
  process.exit(0);
}

function copy(src, dst) {
  fs.writeFileSync(dst, fs.readFileSync(src));
}

module.exports = {
  plugin: function(options) {
    commands = options.cmd;
    pluginname = options.name;
    if (options.argv.h || options.argv.help) {
      getHelp();
    }
    if (options.argv.v || options.argv.version) {
      getVersion();
    }

    if (!pathExists.sync(commands[1])) {
      fs.mkdirSync(path.resolve('.', commands[1]));
      fse.copySync(path.join(__dirname, 'template'), path.resolve('.', commands[1]));
      console.log(chalk.green(`uba plugin ${commands[1]} created.`));
    } else {
      console.log(chalk.red(`The current folder ${commands[1]} already exists  `));
      process.exit(1);
    }


  }
}
