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
const inquirer = require("inquirer");
const ejs = require("ejs");



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
var questions = [{
    type: 'input',
    name: 'description',
    message: 'plugin description',
    default: function() {
      return "uba plugin for your"
    }
  },
  {
    type: 'input',
    name: 'version',
    message: 'project version',
    default: function() {
      return '0.0.1';
    }
  },
  {
    type: 'input',
    name: 'author',
    message: 'project author'
  },
  {
    type: 'input',
    name: 'keywords',
    message: 'project keywords',
    default: function() {
      return 'uba';
    }
  }
];

function writeFile(source, target, data) {
  var tpl = fs.readFileSync(source, 'utf-8');
  fs.writeFileSync(target, ejs.render(tpl, data));
}

function genPlugin(commands) {
  if (!pathExists.sync(`uba-${commands[1]}`)) {
    fs.mkdirSync(path.resolve('.', `uba-${commands[1]}`));
    fse.copySync(path.join(__dirname, 'template'), path.resolve('.', `uba-${commands[1]}`));

    inquirer.prompt(questions).then(function(answers) {
      answers.name = `uba-${commands[1]}`;
      writeFile(path.resolve('.', `uba-${commands[1]}`, 'package.json'), path.resolve('.', `uba-${commands[1]}`, 'package.json'), answers);
      console.log(chalk.green(`uba plugin uba-${commands[1]} created.`));
      console.log();
      console.log(chalk.green(`cd uba-${commands[1]} && npm install && npm test`));
    });
  } else {
    console.log(chalk.red(`The current folder ${commands[1]} already exists  `));
  }
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
    genPlugin(commands);
  }
}
