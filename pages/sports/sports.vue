<template>
  <GlobalLayout title="运动">
    <view class="sports-page-container">
      
      <scroll-view class="scroll-content" scroll-y="true">
        
        <view class="button-row">
          <button class="action-button sport-button">运动</button>
          <button class="action-button study-button">学习</button>
        </view>
        
        <view class="todo-section">
          
          <view class="list-title">
            待办事项
          </view>
          
          <view v-if="todos.length === 0" class="no-todos">
            <text>暂无待办，点击右下角 "+" 添加</text>
          </view>
          
          <view 
            v-for="todo in todos" 
            :key="`todo_${todo.id}`"
            class="todo-card" 
            :class="{ 
              'expanded': todo.isExpanded, 
              'done': todo.isDone 
            }"
            @click="todoStore.toggleExpanded(todo.id)"
          >
            <view class="todo-header">
              <view class="header-left">
                <input 
                  class="todo-title-input"
                  v-model="todo.title"
                  @click.stop @blur="todoStore.updateTodo(todo)" />
              </view>
              <view class="header-right">
                <text class="todo-time">{{ todo.timestamp }}</text>
                <checkbox 
                  :checked="todo.isDone" 
                  @click.stop="todoStore.toggleDone(todo.id)"
                />
              </view>
            </view>
            
            <view class="todo-details">
              <textarea
                class="details-textarea"
                v-model="todo.details"
                @click.stop
                @blur="todoStore.updateTodo(todo)"
                placeholder="点击编辑详情..."
              />
            </view>
            
          </view>
        </view> </scroll-view>
      
      <view class="fab-button" @click="goToEditor">
        <uni-icons type="plussolid" size="30" color="#fff"></uni-icons>
      </view>

    </view>
  </GlobalLayout>
</template>

<script setup>
import { ref } from 'vue'; // 确保 ref
import { storeToRefs } from 'pinia'; // [新]
import { useTabDrawerCloser } from '@/composables/useTabDrawerCloser.js';
import { useTodoStore } from '@/stores/todo.js'; // [新]

useTabDrawerCloser();

// [核心] 1. 获取 store 和响应式列表
const todoStore = useTodoStore();
const { todos } = storeToRefs(todoStore); // ⬅️ 动态列表

// (删除 isTodoExpanded 和 toggleTodo)

// [核心] 2. FAB 按钮跳转 (Req 1)
const goToEditor = () => {
  uni.navigateTo({
    url: '/pages/sports/todo-editor/todo-editor'
  });
};

</script>

<style lang="scss" scoped>
/* (不变) .sports-page-container, .scroll-content, 
  .button-row, .fab-button 
  的样式和之前完全一样
*/
.sports-page-container {
  height: 100%;
  position: relative;
  background-color: #f0f2f5;
}
.scroll-content {
  height: 100%;
  /* 为 FAB 按钮留出底部空间，
    防止列表最后一项被遮住 
  */
  padding-bottom: 100px;
}
.button-row { /* ... */ }
.fab-button {
  position: absolute;
  bottom: 75px; 
  right: 30px; 
  /* ... (其他样式不变) */
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #FFD600;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  &:active {
    transform: scale(0.95);
  }
}
.button-row {
  display: flex;
  justify-content: space-around;
  padding: 25px 15px;
  gap: 20px;
  .action-button {
    flex: 1;
    font-size: 16px;
    font-weight: bold;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 12px 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  .sport-button {
    background-color: #4CAF50;
  }
  .study-button {
    background-color: #2196F3;
  }
}

/* ⬇️ [核心修改] 
  Todo 列表的样式
*/
.todo-section {
  padding: 0 15px;
}
.list-title {
  font-size: 16px;
  font-weight: 500;
  color: #666;
  padding: 0 5px 10px 5px;
}

.no-todos {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 30px 0;
}

.todo-card {
  background-color: #ffffff;
  border-radius: 12px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  /* 完成后的样式 */
  &.done {
    background-color: #f7f7f7;
    .todo-title-input {
      text-decoration: line-through;
      color: #999;
    }
  }
  
  .todo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    
    .header-left {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    /* (Req 4) 可编辑的标题 */
    .todo-title-input {
      font-size: 16px;
      font-weight: 500;
      width: 100%;
    }
    
    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
      .todo-time {
        font-size: 12px;
        color: #999;
        flex-shrink: 0; /* 防止日期被压缩 
      */
      }
      checkbox {
        transform: scale(0.8);
      }
    }
  }
  
  /* (Req 4) "拉长" 和 "更改内容" */
  .todo-details {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s ease-out;
    padding: 0 15px;
    
    .details-textarea {
      width: 100%;
      height: 80px; /* 默认 80px 高 */
      font-size: 14px;
      color: #666;
      border-top: 1px solid #f0f0f0;
      padding: 10px 0;
    }
  }
  
  /* (Req 4) "拉长" 激活 */
  &.expanded {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    .todo-details {
      max-height: 110px; /* 展开 (80px + 10px*2 padding + 1px border) */
    }
  }
}
</style>