#!/usr/bin/env node
// npm install recast @babel/core @babel/plugin-transform-typescript
// node Convert-All-ts-to-js.js

import { parse, print } from "recast";
import { transformFromAstSync } from "@babel/core";
import transformTypescript from "@babel/plugin-transform-typescript";
import getBabelOptions from "recast/parsers/_babel_options.js";
import { parser } from "recast/parsers/babel.js";
import { promises as fs } from "fs";
import path from "path";

// تنظیمات
const config = {
  srcDir: process.cwd(), // پوشه جاری
  outDir: './',     // پوشه خروجی
  extensions: ['.ts', '.tsx'],
  targetExtensions: ['.js', '.jsx'],
  excludeDirs: ['node_modules', '.git', 'dist'],
  babelOptions: {
    plugins: [
      [transformTypescript, { isTSX: true, allExtensions: true }]
    ],
    configFile: false,
    ast: true,
    code: false,
    cloneInputAst: false
  }
};

// تابع تبدیل محتوا
async function toJs(content, filename) {
  try {
    const ast = parse(content, {
      parser: {
        parse: (source, options) => {
          const babelOptions = getBabelOptions.default(options);
          babelOptions.plugins.push("typescript", "jsx");
          return parser.parse(source, babelOptions);
        }
      }
    });

    const { ast: transformedAST } = transformFromAstSync(
      ast,
      content,
      { ...config.babelOptions, filename }
    );

    return print(transformedAST).code;
  } catch (error) {
    console.error(`Error transforming ${filename}:`, error.message);
    throw error;
  }
}

// تابع پردازش فایل
async function processFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const jsContent = await toJs(content, filePath);
    
    const ext = path.extname(filePath);
    const extIndex = config.extensions.indexOf(ext);
    const targetExt = extIndex >= 0 ? config.targetExtensions[extIndex] : '.js';
    
    const relativePath = path.relative(config.srcDir, filePath);
    const outputPath = path.join(config.outDir, relativePath).replace(/\.[^/.]+$/, targetExt);
    
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, jsContent, 'utf8');
    
    console.log(`Converted: ${filePath} → ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Failed to process ${filePath}:`, error.message);
    return false;
  }
}

// تابع پیدا کردن فایل‌ها
async function findFiles(dir) {
  let results = [];
  const list = await fs.readdir(dir);
  
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = await fs.stat(fullPath);
    
    if (stat.isDirectory()) {
      if (!config.excludeDirs.includes(file)) {
        results = results.concat(await findFiles(fullPath));
      }
    } else if (config.extensions.includes(path.extname(file))) {
      results.push(fullPath);
    }
  }
  
  return results;
}

// تابع اصلی تبدیل
async function convert() {
  try {
    console.log('Starting TypeScript to JavaScript conversion...');
    
    if (!fs.access(config.srcDir).then(() => true).catch(() => false)) {
      throw new Error(`Source directory not found: ${config.srcDir}`);
    }

    await fs.mkdir(config.outDir, { recursive: true });
    
    const files = await findFiles(config.srcDir);
    console.log(`Found ${files.length} files to convert`);
    
    let successCount = 0;
    for (const file of files) {
      if (await processFile(file)) successCount++;
    }
    
    console.log(`\nConversion complete! Success: ${successCount}/${files.length} files`);
    console.log(`Output directory: ${path.resolve(config.outDir)}`);
  } catch (error) {
    console.error('Conversion failed:', error.message);
    process.exit(1);
  }
}

// اجرای اسکریپت
convert();