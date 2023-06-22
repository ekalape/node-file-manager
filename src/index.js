import listenCommands, { exitFileManager } from './operational/commands.js';

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { homedir, EOL } from 'os';

import homeDir from './operational/utils/homeDir.js';

const homePath = homedir();
homeDir.set(homePath);

const fullArgs = process.argv.slice(2);
let userName = 'guest';

if (fullArgs.length === 0 || !fullArgs.find((x) => x.match(/--username=/i)))
  console.log('Please enter your name in format -- --username=your_name');
else {
  userName = fullArgs[0].split('=')[1] || 'guest';
  console.log(`----------------${EOL}Welcome to the File Manager, ${userName}!${EOL}`);
  console.log(`You are currently in ${homePath}`);
  console.log(`Please, enter your command, for full commands list type 'help'`);

  const rl = readline.createInterface({ input, output });
  rl.on('line', (data) => {
    listenCommands(userName, data);
  });
  rl.on('SIGINT', () => {
    exitFileManager();
  });
}
