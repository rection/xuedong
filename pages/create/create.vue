<template>
  <GlobalLayout title="创建帖子">
    <view class="editor-container">
      
      <view class="community-selector" @click="goToSelectCommunity">
        <text>{{ communityDisplayName }}</text>
        <uni-icons type="forward" size="20" color="#999"></uni-icons>
      </view>
      
      <view class="title-input">
        <input 
          v-model="title"
          placeholder="标题" 
          class="input"
        />
      </view>
      
      <view class="content-input">
        <textarea 
          v-model="content"
          placeholder="正文（可选）" 
          class="textarea"
        />
      </view>
      
      <button class="post-button" @click="handlePost" :disabled="!title.trim()">
        发布
      </button>

    </view>
  </GlobalLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onUnload } from '@dcloudio/uni-app';
import { usePostStore } from '@/stores/posts.js';
import { useUserStore } from '@/stores/user.js';
import { useTabDrawerCloser } from '@/composables/useTabDrawerCloser.js';

// (执行 TabBar 点击时关闭抽屉的逻辑)
useTabDrawerCloser();

// 获取 store
const postStore = usePostStore();
const userStore = useUserStore();

// 本地状态，用于绑定表单
const title = ref('');
const content = ref('');

// [核心] 计算属性，显示当前选择的社区
const communityDisplayName = computed(() => {
  // 您的要求：“无要求，也可以不选择社区”
  // 我们将默认（null）视为发布到个人资料
  return postStore.selectedCommunityForPost || `发布到: 主页`;
});

// 跳转到社区选择页
const goToSelectCommunity = () => {
  uni.navigateTo({
    url: '/pages/community-select/community-select'
  });
};

// [核心] 发布帖子
const handlePost = () => {
  if (!title.value.trim()) {
    uni.showToast({ title: '标题不能为空', icon: 'error' });
    return;
  }
  
  // 1. 准备新帖子数据
  const newPost = {
    id: Date.now(), // 用时间戳作为临时 ID
    title: title.value,
    content: content.value,
    community: postStore.selectedCommunityForPost || '主页',
    user: userStore.username,
    upvotes: 0,
    comments: 0
  };
  
  // 2. 调用 store action
  postStore.addNewPost(newPost);
  
  // 3. 清理工作
  title.value = '';
  content.value = '';
  postStore.selectedCommunityForPost = null; // 重置选择
  
  // 4. 提示并跳转到主页
  uni.showToast({ title: '发布成功!', icon: 'success' });
  uni.switchTab({
    url: '/pages/index/index'
  });
};

// [可选] 离开创建页时，清除社区选择
onUnload(() => {
  postStore.selectedCommunityForPost = null;
});

</script>

<style lang="scss" scoped>
.editor-container {
  padding: 10px;
  background-color: #f9f9f9;
  height: 100%;
}
.community-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 14px;
}
.title-input {
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  .input {
    font-size: 16px;
    font-weight: bold;
  }
}
.content-input {
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  .textarea {
    width: 100%;
    height: 200px;
    font-size: 14px;
  }
}
.post-button {
  background-color: #0079D3;
  color: #fff;
  margin-top: 20px;
  border-radius: 20px;
  font-weight: bold;
  
  &[disabled] {
    background-color: #a7cceb;
  }
}
</style>