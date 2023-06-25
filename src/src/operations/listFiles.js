import homeDir from '../utils/homeDir.js';
import { EOL } from 'os';
import { readdir } from 'node:fs/promises';

export default async function listFiles() {
  let homePath = homeDir.get();
  try {
    const dir = await readdir(homePath, { withFileTypes: true });
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
