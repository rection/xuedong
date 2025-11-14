<template>
  <GlobalLayout title="社区">
    
    <view class="page-container">
      
      <view class="create-community-card" @click="goToCreateCommunity">
        <view class="create-info">
          <text class="create-title">没找到你的社区？</text>
          <text class="create-subtitle">创建一个新社区</text>
        </view>
        <view class="create-icon">
          <uni-icons type="plussolid" size="24" color="#0079D3"></uni-icons>
        </view>
      </view>

      <view class="search-bar-container">
        <uni-easyinput 
          prefixIcon="search" 
          v-model="searchTerm" 
          placeholder="搜索社区"
          :clearable="true"
        >
        </uni-easyinput>
      </view>

      <scroll-view class="community-list-scroll" scroll-y="true">
        <view class="list-title">所有社区</view>
        <view
         class="community-item" 
           v-for="community in allCommunities" 
           :key="`comm_select_${community.id}`"
          @click="visitCommunity(community)"
        >
          <view class="avatar default-avatar"></view>
          <view class="info">
            <text class="name">r/{{ community.name }}</text>
            <text class="creator">创建者: {{ community.creator }}</text>
          </view>
        </view>
        
        <view v-if="filteredCommunities.length === 0 && allCommunities.length > 0" class="no-results">
          <text>没有找到 "r/{{ searchTerm }}"</text>
        </view>
        
      </scroll-view>
      
    </view>
  </GlobalLayout>
</template>

<script setup>
import { ref, computed } from 'vue'; // ⬅️ [新] 引入 ref 和 computed
import { useCommunityStore } from '@/stores/community.js';
import { useTabDrawerCloser } from '@/composables/useTabDrawerCloser.js';
import { storeToRefs } from 'pinia';

// (执行 TabBar 点击时关闭抽屉的逻辑)
useTabDrawerCloser();

// 1. 获取 store 和所有社区列表
const communityStore = useCommunityStore();
const { allCommunities } = storeToRefs(communityStore);

// 2. [新] 搜索框的双向绑定变量
const searchTerm = ref('');

// 3. [新] 计算属性，用于过滤社区
const filteredCommunities = computed(() => {
  const query = searchTerm.value.trim().toLowerCase();
  if (!query) {
    return allCommunities.value; // 如果搜索框为空，返回所有
  }
  return allCommunities.value.filter(c => 
    c.name.toLowerCase().includes(query)
  );
});

// 4. (不变) 访问一个社区 (记录到左抽屉)
const visitCommunity = (community) => {
  // 1. (保留) 记录到左抽屉
  communityStore.logVisit(community);

  // 2. [核心] 跳转到新的详情页，并把社区名作为参数
  uni.navigateTo({
    url: `/pages/community-detail/community-detail?name=${community.name}`
  });
};

// 5. [新] 跳转到创建社区页面
const goToCreateCommunity = () => {
  uni.navigateTo({
    // 这就是我们在 步骤一 中注册的页面
    url: '/pages/community-create/community-create' 
  });
};
</script>

<style lang="scss" scoped>
/* 让 <GlobalLayout> 的插槽 (slot) 
  内部可以实现复杂布局
*/
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%; /* 占满 GlobalLayout 的剩余高度 */
  background-color: #f0f2f5; /* 浅灰色背景 */
}

/* 需求 1 & 2: 创建社区卡片 */
.create-community-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  margin: 15px; /* 在卡片周围留出空间 */
  padding: 20px;
  border-radius: 12px; /* ⬅️ 圆角 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* ⬅️ 阴影 */
  
  .create-info {
    display: flex;
    flex-direction: column;
    .create-title { 
      font-size: 16px; 
      font-weight: bold; 
    }
    .create-subtitle { 
      font-size: 13px; 
      color: #666; 
      margin-top: 4px;
    }
  }
}

/* 需求 3: 搜索框 */
.search-bar-container {
  padding: 0 15px;
  margin-bottom: 10px;
  /* 使用 :deep 穿透修改 uni-easyinput 
    内部 input 的背景色
  */
  :deep(.uni-easyinput__content) {
    background-color: #ffffff !important;
  }
}

/* 需求 4: 社区列表 (可滚动) */
.community-list-scroll {
  /* 占据所有剩余空间 */
  flex: 1;
  height: 0; /* (flex 布局的技巧) */
  background-color: #ffffff;
}

.list-title {
  padding: 10px 15px;
  font-size: 14px;
  color: #888;
  background-color: #f0f2f5;
  border-bottom: 1px solid #e0e0e0;
}

.community-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  
  .avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: #0079D3;
  }
  .info {
    display: flex;
    flex-direction: column;
    .name {
      font-size: 16px;
      font-weight: 500;
    }
    .creator {
      font-size: 12px;
      color: #666;
    }
  }
}

.no-results {
  text-align: center;
  padding: 30px;
  color: #999;
  font-style: italic;
}
</style>