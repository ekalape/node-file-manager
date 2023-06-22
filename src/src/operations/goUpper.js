import homeDir from '../utils/homeDir.js';
import path from 'path';

export default function goUpper() {
  const homePath = homeDir.get();
  if (path.parse(homePath).root === path.parse(homePath).dir && path.parse(homePath).base === '') {
    console.log(`You cannot go any upper!`);
  } else {
    const destPath = path.resolve(homePath, '..');
    homeDir.set(destPath);
  }
}
