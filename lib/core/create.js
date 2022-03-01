const program = require('commander')
const { createProjectAction, createTempalateAction, createPageAction } = require('./actions')
const createCommands = () => {
  const options = program.opts();
  program
  .command('create <project> [others...]')
  .description('clone a repository into a folder')
  .action(createProjectAction);

  program
  .command('addcpn <name>')
  .description('add a .vue extension file!')
  .action((name) => {
    createTempalateAction(name, options.dest || 'src/components')
  });

  program
  .command('addpage <name>')
  .description('add a page and router files!')
  .action((name) => {
    createPageAction(name, options.dest || 'src/pages')
  })
}

module.exports = createCommands