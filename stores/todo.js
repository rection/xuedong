// stores/todo.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  // --- State ---
  // 我们的“待办事项”数据库
  const todos = ref([]);

  // --- Actions ---

  /**
   * (Req 1 & 2) 添加一个新的待办事项
   */
  function addTodo(newItem) {
    // 补充
    const fullTodo = {
      ...newItem,
      id: Date.now(),
      isDone: false,
      isExpanded: false // 默认不展开
    };
    todos.value.unshift(fullTodo); // 添加到列表顶部
  }

  /**
   * (Req 4) 更新一个待办事项 (用于 inline-edit)
   */
  function updateTodo(todo) {
    // 找到它
    const index = todos.value.findIndex(t => t.id === todo.id);
    if (index > -1) {
      // 替换它 (确保响应性)
      todos.value[index] = { ...todo };
    }
  }

  /**
   * (Req 4) 切换“拉长” (Expand) 状态
   */
  function toggleExpanded(todoId) {
    const todo = todos.value.find(t => t.id === todoId);
    if (todo) {
      // 只展开这一个，并折叠所有其他的
      todos.value.forEach(t => {
        if (t.id === todoId) {
          t.isExpanded = !t.isExpanded;
        } else {
          t.isExpanded = false; // 折叠其他
        }
      });
    }
  }

  /**
   * (可选) 切换“完成”状态
   */
  function toggleDone(todoId) {
    const todo = todos.value.find(t => t.id === todoId);
    if (todo) {
      todo.isDone = !todo.isDone;
    }
  }

  // --- Return ---
  return {
    todos,
    addTodo,
    updateTodo,
    toggleExpanded,
    toggleDone
  };
});