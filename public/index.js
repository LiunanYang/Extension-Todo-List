var input = document.querySelector('#todo_input');
var inputList = document.querySelector('#todo_list');
var todoListData = [];
//取缓存 
var storageList = localStorage.getItem('list');
if (storageList) {
  todoListData = JSON.parse(storageList);
  todoListData.forEach(function (v) {
    var li = document.createElement('li');
    li.innerText = v.text;
    v.complete ? li.classList.add('complete') : li.classList.add('not_complete');
    inputList.appendChild(li);
  });
}
// 键盘事件
document.addEventListener('keydown', function (e) {
  // 判断输入框是否处于聚焦状态
  console.log(input)
  console.log(document.activeElement)
  if (input == document.activeElement) {
    if (e.key === 'Enter') {
      console.log(input.value)
      var li = document.createElement('li');
      var inputValue = input.value;
      if (inputValue.trim().length > 0) {
        li.innerText = inputValue;
        li.classList.add('not_complete');
        inputList.appendChild(li);
        todoListData.push({
          text: inputValue,
          complete: false
        });
        localStorage.setItem('list', JSON.stringify(todoListData));
        input.value = '';
      }
    }
  }
});
// 点击列表项，标记完成/未完成
inputList.addEventListener('click', function (e) {
  var li = e.target;
  li.classList.toggle('complete');
  li.classList.toggle('not_complete');
  updateTodoList();
});
// 右击列表项，删除
inputList.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  var li = e.target;
  li.remove();
  updateTodoList();
});
// 更新缓存中的todo数据
function updateTodoList() {
  var todosEl = document.querySelectorAll('li');
  var todos = [];
  todosEl.forEach(function (e) {
    todos.push({
      text: e.innerText,
      complete: e.classList.contains('complete')
    });
  });
  localStorage.setItem('list', JSON.stringify(todos));
};
