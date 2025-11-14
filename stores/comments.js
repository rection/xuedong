// stores/comments.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useUserStore } from './user.js';

export const useCommentStore = defineStore('comments', () => {
  // --- State ---
  // 我们的“数据库”
  // 结构: { "postId_1": [ ...comments... ], "postId_2": [ ...comments... ] }
  const commentsByPostId = ref({});

  // --- Getters (as computed) ---

  /**
   * (新) 一个计算属性，用于获取特定帖子的评论
   * @param {string | number} postId
   */
const getCommentsForPost = computed(() => {
    return (postId) => {
      return commentsByPostId.value[postId] || [];
    };
  });

  // --- Actions ---

 function addComment(postId, commentText) {
     const userStore = useUserStore();
     
     // ⬇️ [核心修改] 
     // 新评论对象现在包含点赞状态
     const newComment = {
       id: Date.now(),
       user: userStore.username,
       text: commentText,
       timestamp: new Date().toISOString(),
       likes: 0,       // ⬅️ [新] 初始点赞为 0
       isLiked: false  // ⬅️ [新] 默认未点赞
     };
 
     if (!commentsByPostId.value[postId]) {
       commentsByPostId.value[postId] = [];
     }
 
     commentsByPostId.value[postId].unshift(newComment);
   }
 
   // ⬇️ [核心修改]
   // 添加“切换评论点赞”的 Action
   /**
    * (新) 切换评论的点赞状态
    */
   function toggleCommentLike(postId, commentId) {
     // 1. 找到该帖子的评论列表
     const comments = commentsByPostId.value[postId];
     if (!comments) return;
 
     // 2. 找到对应的评论
     const comment = comments.find(c => c.id === commentId);
     if (!comment) return;
 
     // 3. 切换状态
     if (comment.isLiked) {
       comment.likes -= 1;
       comment.isLiked = false;
     } else {
       comment.likes += 1;
       comment.isLiked = true;
     }
   }
  return {
    commentsByPostId,
    getCommentsForPost,
    addComment,
	toggleCommentLike
  };
});