export default {
  homePath: '',
  set(dir) {
    this.homePath = dir;
  },
  get() {
    return this.homePath;
  },
};
