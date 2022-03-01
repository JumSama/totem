const program = require('commander')
const VersionConfig = () => {
  program.version(require('../../package.json').version)
}
module.exports = VersionConfig