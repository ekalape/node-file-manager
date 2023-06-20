import * as fs from 'node:fs';
import * as fsPromises from 'node:fs/promises';
import path from 'path';
import { stdout } from 'node:process';
import * as url from 'url';
import { resolvePath } from './utils.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
let homePath = path.join(__dirname, '..', 'files');
console.log(homePath);

function alertHomeDir() {
  console.log(`You are currently in ${homePath}\n`);
}

export async function addEmptyFile(data) {
  const fileName = data[0].trim();
  try {
    if (data.length === 0) throw Error('Please, add file name to create');
    const destination = path.join(homePath, fileName);
    fs.open(destination, 'wx', (err) => {
      if (err) console.log('This file name exists already');
      else {
        fs.writeFile(destination, '', (err) => {
          if (err) throw Error('Writing operation failed');
        });
        console.log(`${fileName} file is created succesfully!`);
      }
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    alertHomeDir();
  }
}

export async function goToTheDir(data) {
  if (data[0] && data[0].trim().length > 0) {
    const destPath = resolvePath(data[0].trim(), homePath);
    let dir;
    try {
      dir = await fsPromises.opendir(destPath);
      if (dir) {
        homePath = destPath;
      } else {
        console.log("This directory doesn't exist\n");
      }
    } catch (err) {
      console.log("This directory doesn't exist\n");
    } finally {
      if (dir) dir.close();
    }
  } else {
    console.log("You didn't enter any path!");
  }
  alertHomeDir();
}

export function goUpper() {
  if (path.parse(homePath).root === path.parse(homePath).dir && path.parse(homePath).base === '') {
    console.log('You cannot go any upper!');
  } else {
    const destPath = path.resolve(homePath, '..');
    homePath = destPath;
  }
  alertHomeDir();
}
export async function listFiles() {
  try {
    const dir = await fsPromises.readdir(homePath, { withFileTypes: true });
    const content = [];
    dir.forEach((x) => {
      if (x.isDirectory()) content.push([x.name, 'directory']);
      else content.push([x.name, 'file']);
    });
    console.table(content);
  } catch (err) {
    console.log("This directory doesn't exist");
  }
}

export async function readFileToConsole(data) {
  if (data[0] && data[0].trim().length > 0) {
    try {
      const destPath = resolvePath(data[0].trim(), homePath);
      const stream = fs.createReadStream(destPath, { encoding: 'utf-8' });
      stream.on('data', (data) => {
        console.log(`\nReading file '${path.basename(destPath)}':\n-------`);
        console.log(data);
        console.log('-------');
        alertHomeDir();
      });
      stream.on('error', (err) => {
        console.log("File doesn't exist");
      });
    } catch (err) {
      console.log('Reading ERROR');
    }
  } else console.log("You didn't enter any path!");
}

export async function writeFile(filedata) {
  if (!filedata[0] || !filedata[0].trim()) console.log('You have to specify file path!');
  else if (!filedata[1] || !filedata[1].trim()) console.log('You have to add text content!');
  else {
    try {
      const filePath = resolvePath(filedata[0].trim(), homePath);
      await fsPromises.writeFile(filePath, filedata[1]);
    } catch (err) {
      console.log('Writing ERROR');
    }
  }
  alertHomeDir();
}

export async function renameFile(filedata) {
  if (!filedata[0] || !filedata[0].trim()) console.log('You have to specify file path!');
  else if (!filedata[1] || !filedata[1].trim()) console.log('You have to specify new file name!');
  else {
    const oldFile = resolvePath(filedata[0].trim(), homePath);
    const filePath = path.dirname(oldFile);
    const newFile = path.join(filePath, data[1].trim());
    try {
      await fsPromises.rename(oldFile, newFile);
      console.log(`\n${path.basename(oldFile)} is renamed to ${path.basename(newFile)}`);
    } catch (err) {
      console.log("The file doesn't exist");
    }
  }
  alertHomeDir();
}

export async function deleteFile(data) {
  if (!data[0] || !data[0].trim()) console.log('\nYou have to specify file path!');
  else {
    const filePath = resolvePath(data[0].trim(), homePath);
    try {
      await fsPromises.rm(filePath);
      console.log(`\nDone`);
    } catch (err) {
      console.log("\nThe file doesn't exist");
    }
  }
  alertHomeDir();
}
