import * as fsPromises from 'node:fs/promises';
import { EOL } from 'os';
import path from 'path';
import { resolvePath } from '../utils/resolvePath.js';

export default async function renameFile(filedata) {
  if (!filedata[0] || !filedata[0].trim()) console.log(`${EOL}You have to specify file path!`);
  else if (!filedata[1] || !filedata[1].trim())
    console.log(`${EOL}You have to specify new file name!`);
  else {
    const oldFile = resolvePath(filedata[0].trim());
    const filePath = path.dirname(oldFile);
    const newFile = path.join(filePath, filedata[1].trim());
    try {
      await fsPromises.rename(oldFile, newFile);
      console.log(`${EOL}${path.basename(oldFile)} is renamed to ${path.basename(newFile)}`);
    } catch (err) {
      console.log(`${EOL}The file doesn't exist`);
    }
  }
}
