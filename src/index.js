import listenCommands, { exitFileManager } from './src/commands.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { homedir } from 'os';

import homeDir from './src/utils/homeDir.js';
import userName from './src/utils/userName.js';

const homePath = homedir();
homeDir.set(homePath);

const fullArgs = process.argv.slice(2);
let uname = 'guest';

if (fullArgs.length === 0 || !fullArgs.find((x) => x.match(/--username=/i)))
  console.log('Please enter your name in format -- --username=your_name');
else {
  userName.set(fullArgs[0].split('=')[1] || 'guest');
  userName.sayHello();
  console.log(`You are currently in ${homePath}`);
  console.log(`Please, enter your command, for full commands list type 'help'`);

  const rl = readline.createInterface({ input, output });
  rl.on('line', (data) => {
    listenCommands(data);
  });
  rl.on('SIGINT', () => {
    exitFileManager();
  });
}
