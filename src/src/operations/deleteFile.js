import { rm } from 'node:fs/promises';
import { EOL } from 'os';
import { resolvePath } from '../utils/resolvePath.js';

export default async function deleteFile(data) {
  if (!data[0] || !data[0].trim()) console.log(`${EOL}You have to specify file path!`);
  else {
    const filePath = resolvePath(data[0].trim());
    try {
      await rm(filePath);
      console.log(`${EOL}Done`);
    } catch (err) {
      console.log(`${EOL}The file doesn't exist`);
    }
  }
}
