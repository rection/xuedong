<template>
  <view class="page-container">
    
    <scroll-view class="scroll-view-container" scroll-y="true">
      
      <view class="community-header-card">
        <view class="header-top">
          <view class="header-info">
            <view class="avatar default-avatar"></view>
            <text class="title">r/{{ communityName }}</text>
          </view>
          <view class="header-actions">
            <button 
              class="subscribe-button"
              :class="{ 'subscribed': isSubscribed }"
              @click="toggleSubscription"
            >
              {{ subscribeText }}
            </button>
            </view>
        </view>
        
        <view class="header-stats">
          <text>每周 500k 位访客 和 2.8k 个赞献</text>
        </view>
        
        <view class="header-description">
          <text>
            Subreddit for posting questions and asking for general advice
            about all topics related to learning {{ communityName }}.
          </text>
        </view>
      </view>
      
      <view class="filter-bar">
        <view class="filter-button">
          <uni-icons type="fire-filled" size="18" color="#666"></uni-icons>
          <text>最佳帖子</text>
          <uni-icons type="arrowdown" size="16" color="#666"></uni-icons>
        </view>
        <view class="view-mode-button">
          <uni-icons type="list" size="22" color="#666"></uni-icons>
        </view>
      </view>

      <view class="feed-list">
        <view
          class="list-item"
          v-for="post in filteredPosts"
          :key="post.id"
        >
          <PostCard :post="post" />
        </view>
        
        <view v-if="filteredPosts.length === 0" class="no-posts">
          <text>这个社区还没有帖子</text>
          <text>快去“创建”页发布第一篇吧！</text>
        </view>
      </view>

    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app'; 
import { usePostStore } from '@/stores/posts.js';
import { storeToRefs } from 'pinia';

// (不变) 1. 获取 store 和响应式的 posts 列表
const postStore = usePostStore();
const { posts } = storeToRefs(postStore);

// (不变) 2. 本地状态，存储当前社区名
const communityName = ref('');

// (不变) 3. 在页面加载时，获取路由参数
onLoad((options) => {
  if (options.name) {
    communityName.value = options.name;
    uni.setNavigationBarTitle({
      title: `r/${options.name}`
    });
  }
});

// (不变) 4. 计算属性，用于过滤帖子
const filteredPosts = computed(() => {
  const currentCommunity = `r/${communityName.value}`;
  return posts.value.filter(post => 
    post.community === currentCommunity
  );
});

// ⬇️ [新] 
// 5. “订阅”按钮的本地状态
const isSubscribed = ref(false); // 默认未订阅
const toggleSubscription = () => {
  isSubscribed.value = !isSubscribed.value;
};
// 6. “订阅”按钮的 computed 文本
const subscribeText = computed(() => {
  return isSubscribed.value ? '已订阅' : '加入';
});

</script>

<style lang="scss" scoped>
/* ⬇️ [核心修改] 
  我们重写了 header 的样式
*/
.community-header-card {
  background-color: #ffffff;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 10px;
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #0079D3;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }
}

.subscribe-button {
  font-size: 14px;
  font-weight: bold;
  border-radius: 20px;
  padding: 0 16px;
  height: 32px;
  line-height: 32px;
  margin: 0; /* 清除默认 margin */
  
  /* 默认“加入”样式 */
  background-color: #0079D3;
  color: #fff;
  
  /* “已订阅”的样式 */
  &.subscribed {
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ccc;
  }
}

.header-stats, .header-description {
  font-size: 13px;
  color: #666;
  margin-top: 10px;
}

/* ⬇️ [新] 
  筛选条的样式
*/
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #ffffff;
  border-bottom: 5px solid #f0f2f5;
  
  .filter-button {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    color: #666;
  }
  .view-mode-button {
    color: #666;
  }
}


/* ⬇️ (不变) 
  Feed 列表的样式 (和 index.vue 保持一致)
*/
.scroll-view-container {
  height: 100vh;
  background-color: #DAE0E6;
}
.feed-list {
  padding-top: 8px;
}
.list-item {
  margin: 0 8px 8px 8px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.no-posts {
  padding: 40px;
  text-align: center;
  color: #888;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>