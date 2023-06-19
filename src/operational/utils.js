import path from 'path';

export function resolvePath(destPath, homePath) {
  let destination = homePath;
  if (!path.isAbsolute(destPath)) {
    destination = path.resolve(homePath, destPath);
  } else {
    if (destPath.match(/^[A-Z]{1}:.*/)) {
      destination = destPath;
    }
  }

  return destination;
}
