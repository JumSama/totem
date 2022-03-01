const { promisify } = require('util')
const path = require('path')
const download = promisify(require('download-git-repo'))
const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, createDir } = require('../utils/utils')
const open = require('open')

// 创建项目Action
const createProjectAction = async (project) => {
  console.log("totem helps you create your project!")

  // 1.clone项目
  await download(vueRepo, project, { clone: true });

  // 2.执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  await commandSpawn(command, ['install'], { cwd: `./${project}` })

  // 3.运行npm run serve
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` });

  // 4.打开浏览器
  open("http://localhost:8080/");
}

// 创建模板Action
const createTempalateAction = async (name, dest) => {
  console.log('create template')
  // 1.经过ejs渲染获得result
  const result = await compile('vue-template.ejs', { name, lowerName: name.toLowerCase() })

  // 2.将获得的结果写入文件
  const targetPath = path.resolve(dest, `${name}.vue`);
  writeToFile(targetPath, result);
}

// 创建页面Action
const createPageAction = async (name, dest) => {
  console.log('create page')
  // 1.经过ejs渲染获得result
  const result_template = await compile('vue-template.ejs', { name, lowerName: name.toLowerCase() })
  const result_router = await compile('vue-router.ejs',{ name, lowerName: name.toLowerCase() })

  // 2.检测pages里有没有名叫参数name的page文件夹,没有则创建
  createDir(name,dest)

  // 3.将获得的结果写入文件
  const targetPath_template = path.resolve(dest, `${name.toLowerCase()}/${name}.vue`);
  const targetPath_router = path.resolve(dest, `${name.toLowerCase()}/router.js`);
  writeToFile(targetPath_template, result_template);
  writeToFile(targetPath_router, result_router);
}

module.exports = {
  createProjectAction,
  createTempalateAction,
  createPageAction
}