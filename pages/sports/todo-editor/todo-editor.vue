<template>
  <view class="page-container">
    <view class="form-item">
      <input 
        v-model="title"
        class="input-title" 
        placeholder="标题 (例如: 学习 Vue)"
      />
    </view>

    <view class="form-item">
      <textarea 
        v-model="details"
        class="textarea-details" 
        placeholder="笔记详情 (可选)"
      />
    </view>

    <view class="form-item">
      <picker mode="date" :value="date" @change="bindDateChange">
        <view class="picker-display">
          <text>日期: </text>
          <text>{{ date }}</text>
        </view>
      </picker>
    </view>

    <button 
      class="save-button" 
      @click="handleSave"
      :disabled="!title.trim()"
    >
      保存
    </button>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoStore } from '@/stores/todo.js';

// 1. 获取 store
const todoStore = useTodoStore();

// 2. 本地状态
const title = ref('');
const details = ref('');
// 获取 YYYY-MM-DD 格式的今天日期
const getToday = () => new Date().toISOString().split('T')[0];
const date = ref(getToday());

// 3. 更新日期
const bindDateChange = (e) => {
  date.value = e.detail.value;
};

// 4. [核心] 保存
const handleSave = () => {
  // 1. 组装新 todo
  const newTodo = {
    title: title.value,
    details: details.value,
    timestamp: date.value // 使用选择的日期
  };

  // 2. 调用 store action
  todoStore.addTodo(newTodo);

  // 3. 返回上一页 (运动页)
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.page-container {
  padding: 15px;
}
.form-item {
  margin-bottom: 15px;
}
.input-title {
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}
.textarea-details {
  width: 100%;
  height: 150px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
}
.picker-display {
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
.save-button {
  background-color: #0079D3;
  color: #fff;
  &[disabled] {
    background-color: #a0a0a0;
  }
}
</style>