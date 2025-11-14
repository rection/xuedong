<template>
  <GlobalLayout title="聊天">
  <view class="tab-bar">
	  <view v-for="(tab,index) in tabs"
	  :key="index"
	  class="tab-item"
	  :class="{active:activeIndex === index}"
	  @click="switchTab(index)"
	  >
		<text>{{ tab.name }}</text>
		<view class="indicator"></view>
	  </view>
  </view>

  </GlobalLayout>
</template>

<script setup>
// 1. 引入composable
import { useTabDrawerCloser } from '@/composables/useTabDrawerCloser.js';
import { ref,onMounted } from 'vue'
useTabDrawerCloser();//点击tabbar，左右抽屉自动关闭

const activeIndex = ref(0); // 当前激活的 Tab 索引
const tabs = ref([
  { name: '消息' },
  { name: '未读' },
  { name: '请求' },
]);

// 切换 Tab
const switchTab = (index) => {
  activeIndex.value = index;
  // 在这里你可以通过 uni.$emit 或 pinia 触发父页面的内容切换
  // 例如：uni.$emit('switch-main-content', index);
};
</script>

<style lang="scss" scoped>

</style>