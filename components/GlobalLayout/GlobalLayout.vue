<template>
  <view class="page-container">
    <CustomNavbar :title="title" />

    <view class="content-feed">
      <slot></slot> 
    </view>

    <uni-drawer ref="leftDrawerRef" mode="left" :width="300" @close="drawerStore.closeLeft()">
      <scroll-view class="drawer-scroll-view" scroll-y>
        <LeftMenu />
      </scroll-view>
    </uni-drawer>

    <uni-drawer ref="rightDrawerRef" mode="right" :width="300" @close="drawerStore.closeRight()">
      <scroll-view class="drawer-scroll-view" scroll-y>
        <RightProfile />
      </scroll-view>
    </uni-drawer>

  </view>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useDrawerStore } from '@/stores/drawer.js';

// 1. 定义 props，允许父组件传入 title
defineProps({
  title: {
    type: String,
    default: ''
  }
});

const drawerStore = useDrawerStore();
const leftDrawerRef = ref(null);
const rightDrawerRef = ref(null);


// 3. 监听 Pinia 状态 ➡️ 控制本地抽屉
watch(() => drawerStore.isLeftOpen, (newVal) => {
  if (leftDrawerRef.value) {
    newVal ? leftDrawerRef.value.open() : leftDrawerRef.value.close();
  }
});

watch(() => drawerStore.isRightOpen, (newVal) => {
  if (rightDrawerRef.value) {
    newVal ? rightDrawerRef.value.open() : rightDrawerRef.value.close();
  }
});
// 4. 页面加载时，立即检查 Pinia 状态
onMounted(() => {
  if (drawerStore.isLeftOpen) {
    leftDrawerRef.value?.open();
  }
  if (drawerStore.isRightOpen) {
    rightDrawerRef.value?.open();
  }
});
</script>

<style lang="scss" scoped>
/* ⬇️⬇️ 把所有冗余的 CSS 逻辑也都搬到这里 ⬇️⬇️
*/
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content-feed {
  flex: 1;
  overflow-y: auto;
  /* 注意：我们把 content-feed 的 padding 移除了，
    让每个页面自己决定自己的 padding
  */
}

.drawer-scroll-view {
  height: 100%;
}
</style>