import * as os from 'node:os';
import HelpIndications from '../utils/HelpIndications.js';

export default function systemOperations(data) {
  if (data[0] && data[0].trim()) {
    const command = data[0].slice(2);
    console.log('command', command);
    try {
      switch (command) {
        case 'EOL':
        case 'eol':
          console.log(`Here is your EOL: ${os.EOL}`);
          break;
        case 'cpus':
          const cps = os.cpus().map((x) => x.model.split(' @ '));
          console.log(`Overall amount of CPUS is ${os.cpus().length} `);
          console.table(cps);
          break;
        case 'homedir':
          console.log(`Here is your homedir: ${os.homedir()}`);
          break;
        case 'username':
          console.log(`Here is your username: ${os.hostname()}`);
          break;
        case 'architecture':
          console.log(`Here is your architecture: ${os.arch}`);
          break;
        case 'help':
          console.table(helpCommands);
          break;
        default:
          console.log(
            `Unknown os command${os.EOL}Type os --help to see all available os commands${os.EOL}`,
          );
      }
    } catch (err) {
      console.log(err.code, err.message);
    }
  } else
    console.log(
      `You have to type a os command in format os --command${os.EOL}Type os --help to see all available os commands${os.EOL}`,
    );
}

const helpCommands = [
  new HelpIndications('--EOL', 'display system EOL(default End-Of-Line)', 'os --EOL'),
  new HelpIndications(
    '--cpus',
    'display available logical cpus models and their clock rate ',
    'os --cpus',
  ),
  new HelpIndications('--homedir', 'display home directory', 'os --homedir'),
  new HelpIndications('--username', 'display current system user name', 'os --username'),
  new HelpIndications('--architecture', 'display CPU architecture', 'os --architecture'),
  new HelpIndications('--help', 'display available os commands', 'os --help'),
];
