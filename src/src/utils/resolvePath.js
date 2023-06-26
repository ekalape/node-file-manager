import path from 'path';
import homeDir from './homeDir.js';

export function resolvePath(destPath) {
  const homePath = homeDir.get();
  let destination = '';
  if (!path.isAbsolute(destPath)) {
    destination = path.resolve(homePath, destPath);
  } else {
    if (destPath.match(/^[A-Z]{1}:.*/)) {
      destination = destPath;
    }
  }

  return destination;
}
