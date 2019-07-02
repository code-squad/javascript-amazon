export default class Subscriber {
  subscribe(publisher) {
    this.publisher = publisher;
    this.publisher.add(this);
  }
  render(state) {
    console.log(state);
  }
}