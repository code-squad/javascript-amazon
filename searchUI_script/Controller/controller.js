// export default class Controller {
//   constructor(view, model, count) {
//     this.view = view;
//     this.model = model;
//     this.count = count;
//     this.addEvent();
//   }
//   addEvent() {
//     //add events
//   }
//   addTodo() {
//     const value = this.view.getValue();
//     this.model.addTodo(value);
//     this.updateView();
//     this.updateCount(this.model.getList());
//   }
//   updateView() {
//     this.view.render(this.model.getList());
//   }
//   updateCount(todoList) {
//     this.count.render(this.count.getTodoCount(todoList));
//   }
//   deleteTodo() {
//     const id
//     this.model.deleteTodo(id);
//   }
// }