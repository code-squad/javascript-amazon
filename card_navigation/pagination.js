import $ from './allenibrary.js'
import Subscriber from './subscriber.js'

export default class Pagination extends Subscriber {
  constructor(publisher) {
    super();
    this.subscribe(publisher);
  }
}