<template>
  <view class="page-container">

    <view class="form-title">创建一个新社区</view>

    <view class="form-item">
      <text class="item-label">社区名称</text>
      <view class="item-input-wrapper">
        <text class="input-prefix">r/</text>
        <input 
          class="item-input" 
          v-model="communityName"
          placeholder="社区名 (不能包含空格)"
          @input="validateInput"
        />
      </view>
      <text class="input-tip">
        名称一经确定，无法修改。
      </text>
    </view>

    <button 
      class="create-button" 
      @click="handleCreate" 
      :disabled="!isNameValid"
    >
      创建社区
    </button>

  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCommunityStore } from '@/stores/community.js';
import { useUserStore } from '@/stores/user.js';

// 1. 获取 stores
const communityStore = useCommunityStore();
const userStore = useUserStore();

// 2. 本地状态
const communityName = ref('');

// 3. [核心] 验证社区名称
const isNameValid = computed(() => {
  // 规则：不为空，且不包含空格
  const name = communityName.value.trim();
  return name.length > 0 && !name.includes(' ');
});

// 3b. 实时移除空格
const validateInput = (e) => {
  communityName.value = e.detail.value.replace(/\s/g, ''); // 自动删除所有空格
};

// 4. [核心] 创建按钮点击事件
const handleCreate = () => {
  if (!isNameValid.value) {
    return;
  }

  const name = communityName.value.trim();

  // 检查是否已存在
  const exists = communityStore.allCommunities.find(c => c.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    uni.showToast({
      title: `r/${name} 已存在`,
      icon: 'error'
    });
    return;
  }

  // 1. 调用 store action
  communityStore.createCommunity(name, userStore.username);

  // 2. 提示成功
  uni.showToast({
    title: '创建成功!',
    icon: 'success'
  });

  // 3. 延迟 1 秒后返回上一页（社区列表页）
  setTimeout(() => {
    uni.navigateBack();
  }, 1000);
};

</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px;
  background-color: #f9f9f9;
  height: 100vh;
}

.form-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 25px;
}

.form-item {
  .item-label {
    font-size: 16px;
    margin-bottom: 10px;
    display: block;
  }
  .item-input-wrapper {
    display: flex;
    align-items: center;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 0 10px;

    .input-prefix {
      font-size: 16px;
      color: #888;
    }
    .item-input {
      flex: 1;
      height: 44px;
      font-size: 16px;
      padding-left: 5px;
    }
  }
  .input-tip {
    font-size: 12px;
    color: #999;
    margin-top: 8px;
    display: block;
  }
}

.create-button {
  background-color: #0079D3;
  color: #fff;
  margin-top: 30px;
  border-radius: 20px;
  font-weight: bold;

  &[disabled] {
    background-color: #a7cceb;
  }
}
</style>