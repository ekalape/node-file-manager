import * as fs from 'node:fs';
import * as fsPromises from 'node:fs/promises';
import path from 'path';
import { stdout } from 'node:process';
import { EOL } from 'os';
import * as url from 'url';
import { resolvePath } from './utils.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
let homePath = path.join(__dirname, '..', 'files');
console.log(homePath);

function alertHomeDir() {
  console.log(`You are currently in ${homePath}${EOL}`);
}

export async function addEmptyFile(data) {
  if (data[0] && data[0].trim().length > 0) {
    const fileName = data[0].trim();
    try {
      if (data.length === 0) throw Error('Please, add file name to create');
      const destination = path.resolve(homePath, fileName);

      fs.open(destination, 'wx', (err) => {
        if (err) {
          if (err.code === 'EEXIST') console.log('This file name exists already');
          else if (err.code === 'ENOENT')
            console.log('You are trying to create a file in unexistent directory');
          else throw Error();
        } else {
          console.error('cannot access 2');
          fs.writeFile(destination, '', (err) => {
            if (err) throw Error('Writing operation failed');
          });
          console.log(`${fileName} file is created succesfully!`);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  } else console.log('You have to enter a file name');
  alertHomeDir();
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
        console.log(`This directory doesn't exist${EOL}`);
      }
    } catch (err) {
      console.log(`This directory doesn't exist${EOL}`);
    } finally {
      if (dir) dir.close();
    }
  } else {
    console.log(`${EOL}You didn't enter any path!`);
  }
  alertHomeDir();
}

export function goUpper() {
  if (path.parse(homePath).root === path.parse(homePath).dir && path.parse(homePath).base === '') {
    console.log(`You cannot go any upper!`);
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
    console.log(`${EOL}This directory doesn't exist`);
  }
}

export async function readFileToConsole(data) {
  if (data[0] && data[0].trim().length > 0) {
    try {
      const destPath = resolvePath(data[0].trim(), homePath);
      const stream = fs.createReadStream(destPath, { encoding: 'utf-8' });
      stream.on('data', (data) => {
        console.log(`${EOL}Reading file '${path.basename(destPath)}':${EOL}-------`);
        console.log(data);
        console.log('-------');
        alertHomeDir();
      });
      stream.on('error', (err) => {
        console.log(`${EOL}File doesn't exist`);
      });
    } catch (err) {
      console.log('Reading ERROR');
    }
  } else console.log(`${EOL}You didn't enter any path!`);
}

export async function writeFile(filedata) {
  if (!filedata[0] || !filedata[0].trim()) console.log(`${EOL}You have to specify file path!`);
  else if (!filedata[1] || !filedata[1].trim()) console.log(`${EOL}You have to add text content!`);
  else {
    try {
      const filePath = resolvePath(filedata[0].trim(), homePath);
      const text = filedata.slice(1).join(' ') + EOL;
      await fsPromises.appendFile(filePath, text, { encoding: 'utf-8' });
      console.log(`${EOL}Done`);
    } catch (err) {
      if (err.code === 'ENOENT')
        console.log('You are trying to create a file in unexistent directory');
      else console.log('Writing ERROR');
    }
  }
  alertHomeDir();
}

export async function renameFile(filedata) {
  if (!filedata[0] || !filedata[0].trim()) console.log(`${EOL}You have to specify file path!`);
  else if (!filedata[1] || !filedata[1].trim())
    console.log(`${EOL}You have to specify new file name!`);
  else {
    const oldFile = resolvePath(filedata[0].trim(), homePath);
    const filePath = path.dirname(oldFile);
    const newFile = path.join(filePath, filedata[1].trim());
    try {
      await fsPromises.rename(oldFile, newFile);
      console.log(`${EOL}${path.basename(oldFile)} is renamed to ${path.basename(newFile)}`);
    } catch (err) {
      console.log(`${EOL}The file doesn't exist`);
    }
  }
  alertHomeDir();
}

export async function deleteFile(data) {
  if (!data[0] || !data[0].trim()) console.log(`${EOL}You have to specify file path!`);
  else {
    const filePath = resolvePath(data[0].trim(), homePath);
    try {
      await fsPromises.rm(filePath);
      console.log(`${EOL}Done`);
    } catch (err) {
      console.log(`${EOL}The file doesn't exist`);
    }
  }
  alertHomeDir();
}
export async function copyFile(data) {
  if (!data[0] || !data[0].trim())
    console.log(`${EOL}You have to specify old file path and new file path!`);
  else if (!data[1] || !data[1].trim()) console.log(`${EOL}You have to specify new file path!`);
  else {
    const oldFileDest = resolvePath(data[0].trim(), homePath);
    const newFileDest = resolvePath(data[1].trim(), homePath);
    try {
      await fsPromises
        .access(oldFileDest, fsPromises.constants.R_OK | fsPromises.constants.W_OK)
        .catch((err) => {
          throw Error(`${EOL}You are trying to copy unexistent file!${EOL}`);
        });
      await fsPromises
        .access(newFileDest, fsPromises.constants.R_OK | fsPromises.constants.W_OK)
        .catch(async (err) => {
          if (err) {
            const dir = path.dirname(newFileDest);
            createDir([dir]);
            await fsPromises.copyFile(oldFileDest, newFileDest);
            throw Error(`${EOL}Done`);
          }
        });
      console.log(`${EOL}Destination file already exists`);
    } catch (err) {
      console.log(err.message);
    }
  }
  alertHomeDir();
}

export function createDir(data) {
  const dirPath = resolvePath(data[0].trim(), homePath);
  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) console.log('Directory creation error');
  });
}
