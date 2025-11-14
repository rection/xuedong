<template>
  <view class="card" @click="goToPostDetail(post.id)">
    
    <view class="header">
      <text class="community">
        {{ post.community === '主页' ? '主页' : `r/${post.community}` }}
      </text>
      
      <text class="user">· posted by {{ post.user }}</text>
    </view>
    
    <view class="title">
      {{ post.title }}
    </view>
    
    <view class="body" v.if="post.content && post.content.trim() !== ''">
      <text>{{ post.content }}</text>
    </view>
    
    <view class="footer">
      
      <view class="vote-section">
        
        <view 
          class="vote-action"
          @click.stop="postStore.handleVote(post.id, 'up')"
        >
          <uni-icons 
            type="arrow-up" 
            size="20" 
            :color="post.voteStatus === 'up' ? '#FF4500' : '#888'"
          ></uni-icons>
        </view>
        
        <text 
          class="score-text"
          :class="{ 
            'upvoted': post.voteStatus === 'up', 
            'downvoted': post.voteStatus === 'down' 
          }"
        >
          {{ post.score }}
        </text>
        
        <view 
          class="vote-action"
          @click.stop="postStore.handleVote(post.id, 'down')"
        >
          <uni-icons 
            type="arrow-down" 
            size="20" 
            :color="post.voteStatus === 'down' ? '#0079D3' : '#888'"
          ></uni-icons>
        </view>
        
      </view>
      
      <view class="footer-action comment">
        <uni-icons type="chatbubble" size="18" color="#888"></uni-icons>
        <text class="action-text">{{ post.comments }}</text>
      </view>

    </view>
  </view>
</template>
<script setup>
import { usePostStore } from '@/stores/posts.js';

defineProps({
  post: {
    type: Object,
    required: true
  }
});

const postStore = usePostStore();

// ⬇️ [核心] 4. 您报错就是因为“缺失”了这个函数
// 添加 goToPostDetail 函数
const goToPostDetail = (postId) => {
  uni.navigateTo({
    url: `/pages/post-detail/post-detail?id=${postId}`
  });
};

// ⬇️ [核心] 5. 确保 goToComments 函数已被“删除”
/*
const goToComments = () => {
  // ... (此函数应被删除)
};
*/
</script>


<style lang="scss" scoped>
/* ... (card, header, title, body 的样式保持不变) ... */
.card { /* ... */ }
.header { /* ... */ }
.title { /* ... */ }
.body { /* ... */ }

/* ⬇️ [核心修改] 
  重写 footer 样式
*/
.footer {
  display: flex;
  justify-content: space-between; /* 将 投票区 和 评论区 推到两边 */
  align-items: center;
  margin-top: 15px;
}

/* (新) 投票区 */
.vote-section {
  display: flex;
  align-items: center;
  background-color: #f6f7f8;
  border-radius: 20px; /* 胶囊形状 */
  
  .vote-action {
    padding: 5px 8px;
    &:active {
      background-color: #e0e0e0;
    }
  }
  
  .score-text {
    font-size: 14px;
    font-weight: 500;
    color: #888; /* 默认颜色 */
    padding: 0 4px;
    
    &.upvoted {
      color: #FF4500; /* 点赞时是橙色 */
    }
    &.downvoted {
      color: #0079D3; /* 点踩时是蓝色 */
    }
  }
}

/* (修改) 评论区 */
.footer-action.comment {
  display: flex;
  align-items: center;
  gap: 5px; /* 图标和文字的间距 */
  padding: 5px 10px;
  border-radius: 20px;
  background-color: #f6f7f8;
  
  .action-text {
    font-size: 13px;
    font-weight: 500;
    color: #888;
  }
  &:active {
    background-color: #e0e0e0;
  }
}
</style>