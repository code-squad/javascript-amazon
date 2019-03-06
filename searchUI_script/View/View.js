export default class View {
  getValue() {
    return document.querySelector("#todoValue").value;
  }
  template(todo) {
    return `<li id=${todo.id}> ${todo.name} <span class="deleteX"> X </span></li>`
  }
  render(todoList) {
    const ul = document.querySelector(".todolist")
    ul.innerHTML = ``;
    todoList.forEach(v => ul.innerHTML += this.template(v))
  }
}