<template>
  <view class="left-menu-container">
    
    <view :style="{ height: safeAreaTop + 'px' }"></view>
    
    <view class="daily-checkin">
      
      <view class="checkin-left">
        <text class="checkin-label">本月已签到</text>
        <view class="checkin-days">
          <text class="days-number">{{ checkInDays }}</text>
          <text class="days-label">天</text>
        </view>
      </view>
      
      <view class="checkin-right">
        <button class="checkin-button" @click="handleCheckIn" :disabled="isCheckedIn">
          {{ isCheckedIn ? '今日已打卡' : '点击打卡' }}
        </button>
      </view>
      
    </view>
    
    <view class="menu-section">
      <view class="menu-title">最近访问过的社区</view>
      <view v-if="recentVisits.length === 0" class="menu-item-placeholder">
        暂无访问记录
      </view>
      <view 
        class="menu-item" 
        v-for="community in recentVisits" 
        :key="community.id"
      >
        <view class="avatar default-avatar"></view>
        <text>r/{{ community.name }}</text>
      </view>
    </view>
    
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { useCommunityStore } from '@/stores/community.js';
import { storeToRefs } from 'pinia';

// 1. (不变) 获取社区 store
const communityStore = useCommunityStore();
const { recentVisits } = storeToRefs(communityStore);

// 2. (不变) 获取顶部安全距离
const { safeAreaInsets } = uni.getSystemInfoSync();
const safeAreaTop = safeAreaInsets.top;

// 3. (修改) 打卡功能的本地逻辑
const isCheckedIn = ref(false);
const checkInDays = ref(0); // ⬅️ [新] 左侧签到天数

const handleCheckIn = () => {
  if (isCheckedIn.value) return; // 如果已经打过卡，就返回
  
  isCheckedIn.value = true;
  checkInDays.value += 1; // 签到天数 +1
  
  uni.showToast({ title: '打卡成功!', icon: 'success' });
};
</script>

<style lang="scss" scoped>
.left-menu-container {
  height: 100%;
}

/* ⬇️ [核心修改] 每日打卡 (Req 3) 
  我们重写了这里的全部样式
*/
.daily-checkin {
  display: flex;
  flex-direction: row; /* 水平布局 */
  justify-content: space-between; /* 左右推开 */
  align-items: center; /* 垂直居中 */
  
  background-color: #ffffff;
  margin: 15px; /* 在卡片周围留出空间 */
  padding: 20px;
  
  border-radius: 12px; /* ⬅️ 您要的圆角 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* ⬅️ 您要的阴影 */
}

/* 左侧 (Req 3) */
.checkin-left {
  display: flex;
  flex-direction: column;
  
  .checkin-label {
    font-size: 13px;
    color: #666;
  }
  .checkin-days {
    display: flex;
    align-items: baseline; /* "10" 和 "天" 对齐 */
    
    .days-number {
      font-size: 28px;
      font-weight: bold;
      color: #0079D3;
    }
    .days-label {
      font-size: 14px;
      color: #0079D3;
      margin-left: 4px;
    }
  }
}

/* 右侧 (Req 3) */
.checkin-button {
  background-color: #0079D3;
  color: white;
  border-radius: 20px; /* 胶囊按钮 */
  font-size: 14px;
  margin: 0; /* 清除 H5 默认 margin */
  padding: 0 18px;
  
  &[disabled] {
    background-color: #a0a0a0;
  }
}

/* ⬇️ (不变) 菜单通用样式 
*/
.menu-section {
  padding: 10px 20px;
}
.menu-title {
  font-size: 12px;
  color: #888;
  margin-top: 10px;
  margin-bottom: 10px;
  text-transform: uppercase;
}
.menu-item, .menu-item-placeholder {
  font-size: 16px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  .avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: #0079D3;
  }
}
.menu-item-placeholder {
  color: #999;
  font-style: italic;
}
</style>