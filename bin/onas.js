#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const inquirer = require("inquirer"); // default require for CJS

async function main() {
  console.log("\n Welcome to ONAS Framework CLI!\n");

  const answers = await inquirer.prompt([
    { name: "projectName", message: "Enter your new project name:" }
  ]);

  const projectName = answers.projectName;
  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.error("Folder already exists. Choose a different name.");
    return;
  }

  await fs.copy(path.join(__dirname, "../templates"), projectPath);

  const pkgPath = path.join(projectPath, "package.json");
  const pkg = await fs.readJson(pkgPath);
  pkg.name = projectName;
  await fs.writeJson(pkgPath, pkg, { spaces: 2 });

  console.log(`\n Project '${projectName}' created successfully!`);
  console.log(`\nNext steps:`);
  console.log(`1. cd ${projectName}`);
  console.log(`2. npm install`);
  console.log(`3. node index.js`);
  console.log(`\nYour app is ready to go! \n`);
}

main();
