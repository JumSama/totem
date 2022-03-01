const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

// 解析模板工具
const compile = (template, data) => {
  const templatePosition = `../templates/${template}`;
  const templatePath = path.resolve(__dirname, templatePosition);
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(result);
    })
  })
}

// 判断文件存在工具
const createDir = (name, dest) => {
  const dir = path.resolve(dest, `${name.toLowerCase()}`)
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir)
  }
}

// 创建文件工具
const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content)
}

module.exports = {
  compile,
  writeToFile,
  createDir
}