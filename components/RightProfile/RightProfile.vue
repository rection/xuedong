<template>
  <view class="right-profile-container">
    
    <view :style="{ height: safeAreaTop + 'px' }"></view>

    <view class="top-actions">
      <view class="action-btn">...</view>
      <view class="action-btn">
        <uni-icons type="eye-filled" size="24"></uni-icons>
      </view>
    </view>
    
    <view class="profile-header">
      <image class="avatar" :src="userStore.avatarUrl" mode="aspectFill"></image>
      <text class="username">{{ userStore.username }}</text>
    </view>
    
    <view class="stats">
      <view>
        <text class="count">{{ userStore.karma }}</text>
        <text class="label">Karma</text>
      </view>
      <view>
        <text class="count">{{ userStore.accountAge }} 天</text>
        <text class="label">学动年龄</text>
      </view>
    </view>
    
    <view class="menu-list">
      <view class="menu-item" @click="goToProfile">
        <text>个人资料</text>
      </view>
      <view class="menu-item">
        <text>草稿</text>
      </view>
      <view class="menu-item">
        <text>设置</text>
      </view>
    </view>

  </view>
</template>

<script setup>
import { useUserStore } from '@/stores/user.js';
import { useDrawerStore } from '@/stores/drawer.js';

// 获取 store 实例
const userStore = useUserStore();
const drawerStore = useDrawerStore();

// 获取顶部安全距离
const { safeAreaInsets } = uni.getSystemInfoSync();
const safeAreaTop = safeAreaInsets.top;

// [核心] 跳转到个人资料页
// components/RightProfile/RightProfile.vue

// (确保 <script setup> 顶部有 const drawerStore = useDrawerStore();)

const goToProfile = () => {

  // 1. [第一步]：立即请求关闭抽屉
  // 这会更新 Pinia，GlobalLayout 的 watch 会收到并开始动画
  drawerStore.closeAll(); 

  // 2. [第二步]：设置一个“强制延迟”
  // 我们用 350 毫秒，这比 300 毫秒的默认动画时间
  // 稍长，足以确保动画在 H5/App 上都播放完毕。
  setTimeout(() => {

    // 3. [第三步]：在动画“绝对”结束后，执行跳转
    uni.navigateTo({
      url: '/pages/profile/profile'
    });

  }, 350); // 350 毫秒
};
</script>

<style lang="scss" scoped>
.right-profile-container {
  padding: 15px;
}

.top-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  .action-btn {
    font-size: 24px;
    font-weight: bold;
    padding: 5px;
  }
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #eee;
    margin-bottom: 15px;
    border: 1px solid #f0f0f0;
  }
  .username {
    font-size: 18px;
    font-weight: bold;
  }
}

.stats {
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
  
  view {
    display: flex;
    flex-direction: column;
    align-items: center;
    .count { 
      font-weight: bold; 
      font-size: 20px; 
    }
    .label { 
      font-size: 13px; 
      color: #666; 
      margin-top: 5px;
    }
  }
}

.menu-list {
  .menu-item {
    font-size: 16px;
    padding: 18px 0;
    border-bottom: 1px solid #f0f0f0;
    
    &:first-child {
      border-top: 1px solid #f0f0f0;
    }
  }
}
</style>