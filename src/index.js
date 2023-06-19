import listenCommands, { exitFileManager } from './operational/commands.js';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const homePath = path.join(__dirname, 'files');

const fullArgs = process.argv.slice(2);
let userName = 'guest';

if (fullArgs.length === 0 || !fullArgs.find((x) => x.match(/--username=/i)))
  console.log('Please enter your name in format -- --username=your_name');
else {
  userName = fullArgs[0].split('=')[1] || 'guest';
  console.log(`Welcome to the File Manager, ${userName}!\n`);
  console.log(`You are currently in ${homePath}`);
  console.log(`Please, type your commands, for full list type 'help'`);

  process.stdin.on('data', (data) => listenCommands(userName, data));
  process.on('SIGINT', () => {
    exitFileManager();
  });
}
