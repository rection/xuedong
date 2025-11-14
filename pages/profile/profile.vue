<template>
  <view class="profile-editor-container">

    <view class="form-item avatar-item" @click="handleChangeAvatar">
      <image class="avatar" :src="userStore.avatarUrl" mode="aspectFill"></image>
      <text class="item-label">更换头像</text>
      <uni-icons type="forward" size="20" color="#999"></uni-icons>
    </view>

    <view class="form-item">
      <text class="item-label">用户名</text>
      <input 
        class="item-input" 
        v-model="localUsername" 
        @blur="updateUsername" 
        placeholder="请输入用户名"
      />
    </view>

    <view class="form-item">
      <text class="item-label">出生年月</text>
      <picker 
        mode="date" 
        :value="userStore.dateOfBirth" 
        @change="handleDateChange"
      >
        <view class="item-value">
          {{ userStore.dateOfBirth }}
        </view>
      </picker>
      <uni-icons type="forward" size="20" color="#999"></uni-icons>
    </view>

  </view>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user.js';

// 获取 store 实例
const userStore = useUserStore();

// --- 1. 用户名逻辑 ---
// 创建一个本地 ref，用于 v-model
const localUsername = ref(userStore.username);

// 当输入框失去焦点时，更新 Pinia
const updateUsername = () => {
  userStore.setUsername(localUsername.value);
  // (可选) 提示用户保存成功
  uni.showToast({ title: '用户名已更新', icon: 'none' });
};


// --- 2. 出生年月逻辑 ---
const handleDateChange = (e) => {
  // e.detail.value 就是选中的日期，例如 "2025-11-14"
  userStore.setDateOfBirth(e.detail.value);
};


// --- 3. 更换头像逻辑 ---
const handleChangeAvatar = () => {
  uni.chooseImage({
    count: 1, // 只选 1 张
    sizeType: ['compressed'], // 压缩图
    sourceType: ['album', 'camera'], // 相册或相机
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0];

      // [演示] 暂时只更新本地预览
      // (在真实项目中，这里应该是 uni.uploadFile)
      userStore.setAvatar(tempFilePath);

      /* // [真实项目]
      uni.uploadFile({
        url: 'https://your-server.com/upload', // 您的上传接口
        filePath: tempFilePath,
        name: 'file',
        success: (uploadRes) => {
          const data = JSON.parse(uploadRes.data);
          // 假设服务器返回了新的头像 URL
          userStore.setAvatar(data.url); 
        }
      });
      */
    }
  });
};

</script>

<style lang="scss" scoped>
.profile-editor-container {
  padding: 15px;
}

.form-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;

  .item-label {
    font-size: 16px;
    color: #333;
    flex-shrink: 0; // 不压缩
    width: 100px;
  }

  .item-input {
    flex: 1; // 占据剩余空间
    text-align: right;
    font-size: 16px;
    color: #555;
  }

  .item-value {
    flex: 1;
    text-align: right;
    font-size: 16px;
    color: #555;
  }

  uni-icons {
    margin-left: 5px;
    flex-shrink: 0;
  }
}

.avatar-item {
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #eee;
    margin-right: 15px;
  }
  .item-label {
    flex: 1; // 占据空间
    width: auto;
  }
}
</style>