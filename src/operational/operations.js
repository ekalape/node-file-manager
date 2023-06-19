import * as fs from 'node:fs';
import * as fsPromises from 'node:fs/promises';
import path from 'path';
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
