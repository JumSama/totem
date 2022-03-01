#!/usr/bin/env node
const program = require('commander')
const helpConfig = require('./lib/core/help')
const VersionConfig = require('./lib/core/version')
const createCommands = require('./lib/core/create')
// 版本号
VersionConfig()
// help 
helpConfig()
// commands
createCommands()
 
program.parse(process.argv)