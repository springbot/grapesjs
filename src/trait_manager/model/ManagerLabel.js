import { Model } from 'common';

export default class ManagerLabel extends Model {
  initialize() {
    this.set('open', true);
  }

  setOpen(value) {
    this.set('open', value);
  }
}
