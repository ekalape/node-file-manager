import { EOL } from 'os';

export default {
  homePath: '',
  set(dir) {
    this.homePath = dir;
  },
  get() {
    return this.homePath;
  },
  alert() {
    console.log(`You are currently in ${this.homePath}${EOL}`);
  },
};
