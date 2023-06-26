import {mkdir} from 'node:fs/promises';
import { resolvePath } from '../utils/resolvePath.js';

export default async function createDir(data) {
  const dirPath = resolvePath(data[0].trim());
  await mkdir(dirPath, { recursive: true });
}
