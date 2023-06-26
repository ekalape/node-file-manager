import homeDir from '../utils/homeDir.js';
import { resolvePath } from '../utils/resolvePath.js';
import { EOL } from 'os';
import { opendir } from 'node:fs/promises';

export default async function goToTheDir(data) {
  if (data[0] && data[0].trim().length > 0) {
    const destPath = resolvePath(data[0].trim());
    if (destPath !== homeDir.get()) {
      let dir;
      try {
        dir = await opendir(destPath);
        if (dir) {
          homeDir.set(destPath);
        } else {
          console.log(`This directory doesn't exist${EOL}`);
        }
      } catch (err) {
        console.log(`This directory doesn't exist${EOL}`);
      } finally {
        if (dir) dir.close();
      }
    }
  } else {
    console.log(`${EOL}You didn't enter any path!`);
  }
}
