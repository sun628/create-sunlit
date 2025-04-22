import { log } from './../template-vue3-ts-admin/src/utils/auto-import/pretty-log'
import { mkdirSync, readdirSync, statSync, readFileSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'

/**
 * @function
 * @todo 复制目录
 * @param {string} src - 源目录
 * @param {string} dest - 目标目录
 **/
function copyDir(src: string, dest: string) {
  mkdirSync(dest, { recursive: true })
  for (const file of readdirSync(src)) {
    const srcFile = join(src, file)
    const destFile = join(dest, file)
    const stat = statSync(srcFile)

    if (stat.isDirectory()) {
      copyDir(srcFile, destFile)
    } else {
      const content = readFileSync(srcFile, 'utf-8')
      writeFileSync(destFile, content)
    }
  }
}

/**
 * @function
 * @todo 处理文件中的 @sunlit/ 引用
 * @param {string} filePath - 文件路径
 **/
function processImports(filePath: string) {
  const content = readFileSync(filePath, 'utf-8')
  if (content.includes('@sunlit/')) {
    const processedContent = content.replace(/@sunlit\//g, '@/')
    console.log('🚀 ~ processImports ~ filePath:', processedContent)
    writeFileSync(filePath, processedContent)
  }
}

/**
 * @function
 * @todo 处理模板中的 @sunlit/ 引用
 * @description 替换模板中所有的 @sunlit/ 引用
 **/
function processTemplateImports() {
  const rootDir = process.cwd()
  const templateDirs = readdirSync(rootDir).filter((dir: string) =>
    dir.startsWith('template-')
  )

  templateDirs.forEach((templateDir: any) => {
    const templateSrcDir = resolve(rootDir, templateDir)
    processDirectory(templateSrcDir)
  })
}

/**
 * @function
 * @todo 递归处理目录中的所有文件
 * @param {string} dir - 目录路径
 **/
function processDirectory(dir: string) {
  for (const file of readdirSync(dir)) {
    const filePath = join(dir, file)
    const stat = statSync(filePath)

    // 排除 node_modules 目录
    if (filePath.includes('node_modules')) {
      continue
    }

    if (stat.isDirectory()) {
      processDirectory(filePath)
    } else {
      // 只处理 .vue、.js 和 .ts 文件
      if (/\.(vue|js|ts)$/.test(filePath)) {
        console.log('🚀 ~ processDirectory ~ filePath:', filePath)
        processImports(filePath)
      }
    }
  }
}

/**
 * @function
 * @todo 准备 packages
 * @description 将 packages 中的文件复制到各个模板中
 **/
function preparePackages() {
  const rootDir = process.cwd()
  const packagesDir = resolve(rootDir, 'packages')

  const templateDirs = readdirSync(rootDir).filter((dir: string) =>
    dir.startsWith('template-')
  )

  const sharedDirs = ['hooks', 'components']

  templateDirs.forEach((templateDir: any) => {
    const templateSrcDir = resolve(rootDir, templateDir, 'src')
    sharedDirs.forEach((sharedDir) => {
      const srcDir = join(packagesDir, sharedDir)
      const destDir = join(templateSrcDir, sharedDir)
      if (statSync(srcDir).isDirectory()) {
        copyDir(srcDir, destDir)
      }
    })
  })
}

// 先复制 packages 文件
preparePackages()
// 然后处理模板中的 @sunlit/ 引用
processTemplateImports()
