<template>
  <GlobalLayout title="运动">
    
    <view class="index-page-content">
      <text>这是【主页】独有的内容 Feed 流</text>
    </view>

  </GlobalLayout>
</template>

<script setup>
// 1. 引入composable
import { useTabDrawerCloser } from '@/composables/useTabDrawerCloser.js';
useTabDrawerCloser();//点击tabbar，左右抽屉自动关闭
</script>

<style lang="scss" scoped>
/* 这里只放“主页”自己独有的样式
  例如我们之前移除的 padding
*/
.index-page-content {
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #888;
}
</style>