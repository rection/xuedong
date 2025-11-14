<template>
  <GlobalLayout title="主页">
    <scroll-view
      class="scroll-view-container"
      scroll-y="true"
      :refresher-enabled="true"
      :refresher-triggered="isRefresherTriggered"
      @refresherrefresh="handleRefresh"
      @scrolltolower="handleLoadMore"
    >
      <view class="feed-list">
        <view
          class="list-item"
          v-for="post in posts" 
		  :key="`post_${post.id}`"
        >
          <PostCard :post="post" />
        </view>
        
        <view class="loading-status">
		<text v-if="loadingStatus === 'loading'">...</text>
		<text v-if="loadingStatus === 'no-more'">...</text>	
        </view>
      </view>
    </scroll-view>

  </GlobalLayout>
</template>

<script setup>
import { ref,onMounted} from 'vue';
// import { onShow } from '@dcloudio/uni-app'; // 注意: onMounted 在 uni-app 包里
import { usePostStore } from '@/stores/posts.js'; // 1. 引入 store
import { storeToRefs } from 'pinia'; 
// 2. 获取 store 实例
const postStore = usePostStore();

// [核心] 使用 storeToRefs 来保证 posts 和 loadingStatus 是响应式的
const { posts, loadingStatus } = storeToRefs(postStore);

const isRefresherTriggered = ref(false);
//  1. 页面加载
onMounted(() => {
  // [核心] 只有当 posts 数组 (来自 storeToRefs) 为空时，才去服务器加载
  // 否则，就显示 Pinia (store) 中已有的数据（包括我们刚发的帖子）
  if (posts.value.length === 0) {
    handleRefresh();
  }
});
// 2. <scroll-view> 触发了下拉刷新
const handleRefresh = async () => {
  isRefresherTriggered.value = true;
  await postStore.fetchPosts(true); // 调用 store 的 action
  isRefresherTriggered.value = false;
};

//  3. <scroll-view> 滚动到底部
const handleLoadMore = () => {
  postStore.fetchPosts(false); // 调用 store 的 action
};

</script>

<style lang="scss" scoped>
.scroll-view-container {
  height: 100%;
  background-color: #DAE0E6;
}

.list-item {
  margin: 8px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.loading-status {
  text-align: center;
  color: #888;
  padding: 20px 0;
  font-size: 14px;
}
</style>