<template>
  <view class="container">
    
    <view class="community-item" @click="selectCommunity(userStore.username)">
      <image class="avatar" :src="userStore.avatarUrl" mode="aspectFill"></image>
      <text>{{ userStore.username }} (个人资料)</text>
    </view>
    
    <view class="community-item" @click="selectCommunity('主页')">
      <view class="avatar home-avatar"></view>
      <text>主页</text>
    </view>
    
    <view 
      class="community-item" 
      v-for="community in allCommunities" 
      :key="community.id"
      @click="selectCommunity(`r/${community.name}`)"
    >
      <view class="avatar default-avatar"></view>
      <text>r/{{ community.name }}</text>
    </view>
    
  </view>
</template> <script setup>
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/posts.js';
import { useUserStore } from '@/stores/user.js';
import { useCommunityStore } from '@/stores/community.js';

const postStore = usePostStore();
const userStore = useUserStore();

const communityStore = useCommunityStore();
const { allCommunities } = storeToRefs(communityStore);

const selectCommunity = (communityName) => {
  postStore.selectedCommunityForPost = communityName;
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.community-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #f0f0f0;
  .avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: #eee;
  }
  .default-avatar {
    background-color: #0079D3; 
  }
  .home-avatar {
    background-color: #c0c0c0; 
  }
}
</style>