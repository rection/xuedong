<template>
  <scroll-view class="page-container" scroll-y="true">
    
    <view class="post-card-wrapper" v-if="post">
      <PostCard :post="post" />
    </view>
    
    <view class="comment-input-section">
      <input
        v-model="newCommentText"
        class="comment-input"
        placeholder="发表您的评论..."
      />
      <button 
        class="submit-button" 
        @click="handleSubmitComment"
        :disabled="!newCommentText.trim()"
      >
        发送
      </button>
    </view>
    
    <view class="comments-list">
      <view class="list-title">
        全部评论 ({{ comments.length }})
      </view>
      
      <view v-if="comments.length === 0" class="no-comments">
        还没有评论
      </view>
      
      <view 
        class="comment-item" 
        v-for="comment in comments" 
        :key="`comment_${comment.id}`" >
        <view class="comment-header">
          <text class="comment-user">{{ comment.user }}</text>
        </view>
        <view class="comment-body">
          <text>{{ comment.text }}</text>
        </view>
        
        <view class="comment-footer">
          <view 
            class="comment-action like"
            @click="commentStore.toggleCommentLike(post.id, comment.id)"
          >
            <uni-icons 
              type="heart" 
              size="16" 
              :color="comment.isLiked ? '#FF4500' : '#888'"
            ></uni-icons>
            <text 
              v-if="comment.likes > 0"
              class="action-text"
              :style="{ color: comment.isLiked ? '#FF4500' : '#888' }"
            >
              {{ comment.likes }}
            </text>
          </view>
          
          </view>
        
      </view>
      
    </view>

  </scroll-view>
</template>
<script setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { usePostStore } from '@/stores/posts.js';
import { useCommentStore } from '@/stores/comments.js';

// 1. 获取 stores
const postStore = usePostStore();
const commentStore = useCommentStore();

// 2. 本地状态
const post = ref(null); // 存储主楼的帖子数据
const newCommentText = ref(''); // 绑定输入框

// 3. 在页面加载时，获取 postId 并加载数据
onLoad((options) => {
  if (options.id) {
    // 从 postStore 中找到这个帖子
    // 注意: options.id 可能是字符串, post.id 是数字
    const foundPost = postStore.posts.find(p => p.id == options.id);
    if (foundPost) {
      post.value = foundPost;
    } else {
      // (错误处理：如果找不到帖子)
      uni.showToast({ title: '帖子加载失败', icon: 'error' });
    }
  }
});

// 4. [核心] 计算属性，从 store 获取本帖的评论
const comments = computed(() => {
  if (!post.value) return [];
  // 调用 store getter
  return commentStore.getCommentsForPost(post.value.id);
});

// 5. 提交评论
const handleSubmitComment = () => {
  if (!newCommentText.value.trim() || !post.value) return;

  // 调用 store action
  commentStore.addComment(post.value.id, newCommentText.value);

  // 清空输入框
  newCommentText.value = '';

  // (可选) 更新 postStore 中的评论数
  post.value.comments += 1;
};

</script>

<style lang="scss" scoped>
.page-container {
  height: 100vh;
  background-color: #f0f2f5;
}

/* (不变) PostCard 包装 */
.post-card-wrapper {
  margin: 8px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* (不变) 评论输入 */
.comment-input-section {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  
  .comment-input {
    flex: 1;
    background-color: #f0f2f5;
    border-radius: 20px;
    padding: 8px 15px;
    font-size: 14px;
  }
  .submit-button {
    flex-shrink: 0;
    font-size: 14px;
    background-color: #0079D3;
    color: #fff;
    border-radius: 20px;
    margin: 0;
    
    &[disabled] {
      background-color: #a0a0a0;
    }
  }
}

/* (不变) 评论列表 */
.comments-list {
  background-color: #fff;
  padding: 10px 15px;
}
.list-title {
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 8px;
}
.no-comments {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 30px 0;
}

/* (修改) 评论条目 */
.comment-item {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
  
  .comment-header {
    .comment-user {
      font-size: 13px;
      font-weight: 500;
      color: #333;
    }
  }
  .comment-body {
    font-size: 15px;
    color: #222;
    padding: 5px 0; /* 给 body 上下留出空间 
    */
    word-break: break-word;
  }
  
  /* ⬇️ [核心修改] 
    添加了 footer 样式
  */
  .comment-footer {
    display: flex;
    margin-top: 5px;
  }
  .comment-action {
    display: flex;
    align-items: center;
    gap: 4px; /* 图标和文字的间距 */
    color: #888;
    
    .action-text {
      font-size: 13px;
    }
  }
}
</style>