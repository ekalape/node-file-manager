import { appendFile } from 'node:fs/promises';
import { EOL } from 'os';
import { resolvePath } from '../utils/resolvePath.js';

export default async function writeFile(filedata) {
  if (!filedata[0] || !filedata[0].trim()) console.log(`${EOL}You have to specify file path!`);
  else if (!filedata[1] || !filedata[1].trim()) console.log(`${EOL}You have to add text content!`);
  else {
    try {
      const filePath = resolvePath(filedata[0].trim());
      const text = filedata.slice(1).join(' ') + EOL;
      await appendFile(filePath, text, { encoding: 'utf-8' });
      console.log(`${EOL}Done`);
    } catch (err) {
      if (err.code === 'ENOENT')
        console.log('You are trying to create a file in unexistent directory');
      else console.log('Writing ERROR', err.message);
    }
  }
}
