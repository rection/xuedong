// stores/posts.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

// // 模拟的 API 函数 (我们从 index.vue 把它“搬”到这里)
const fetchMockData = (page = 1, limit = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [];
      if (page > 4) {
        resolve({ list: [], hasMore: false });
        return;
      }
      for (let i = 0; i < limit; i++) {
        const id = (page - 1) * limit + i;
        if (id >= 35) break;
       // stores/posts.js -> fetchMockData 函数
       // ...
      data.push({
        id: id,
        community: 'r/programming',
        // ...
        comments: Math.floor(Math.random() * 100),
      
        // ⬇️ [核心修改]
        score: Math.floor(Math.random() * 500), // 替换 upvotes
        voteStatus: 'none' // 'none', 'up', 'down' (替换 isUpvoted)
      });
       // ...
      }
      resolve({ list: data, hasMore: data.length > 0 && page < 4 });
    }, 800);
  });
};

// --- 定义 Store ---
export const usePostStore = defineStore('posts', () => {
  // --- State ---
  const posts = ref([]);
  const currentPage = ref(1);
  const loadingStatus = ref('more'); // 'loading', 'more', 'no-more'

  // 这是为“创建”功能预留的状态
  // 记住用户在“创建页”选择了哪个社区
  const selectedCommunityForPost = ref(null);

  // --- Actions ---

  /**
   * 获取帖子
   */
  async function fetchPosts(isRefresh = false) {
    if (loadingStatus.value === 'loading' && !isRefresh) return;

    if (isRefresh) {
      currentPage.value = 1;
      posts.value = [];
      loadingStatus.value = 'more';
    }

    if (loadingStatus.value === 'no-more') return;

    loadingStatus.value = 'loading';

    try {
      const res = await fetchMockData(currentPage.value);
      // 使用 .push(...res.list) 而非 [... , ... ] 来提高性能
      posts.value.push(...res.list); 

      if (res.hasMore) {
        loadingStatus.value = 'more';
        currentPage.value++;
      } else {
        loadingStatus.value = 'no-more';
      }
    } catch (error) {
      console.error("获取数据失败", error);
      loadingStatus.value = 'more';
    }
  }

  /**
   * (新) 添加一个新帖子
   */
 // stores/posts.js -> addNewPost 函数
 // ...
function addNewPost(postData) {
  // ⬇️ [核心修改]
  postData.score = 1;       // 新帖子默认 1 分 (来自创建者)
  postData.voteStatus = 'up'; // 创建者默认给自己点赞
  postData.comments = 0;    // 确保评论从 0 开始
  // (旧的 isUpvoted 和 upvotes 会被自动覆盖)

  posts.value.unshift(postData);
}
 // stores/posts.js
 
 // ... (在 addNewPost 函数之后，return 之前) ...
 
 /**
  * (新) 切换帖子的点赞状态
  */
 // stores/posts.js
 
 // (删除旧的 toggleUpvote 函数)
 
 // ⬇️ [核心修改] 添加这个全新的、更智能的 Action
 /**
  * (新) 处理帖子的投票
  * @param {number} postId 帖子 ID
  * @param {'up' | 'down'} voteType 用户是点了“赞”还是“踩”
  */
 function handleVote(postId, voteType) {
   const post = posts.value.find(p => p.id === postId);
   if (!post) return;
 
   const currentStatus = post.voteStatus;
 
   if (voteType === 'up') {
     if (currentStatus === 'none') {
       // 未投票 -> 点赞
       post.score++;
       post.voteStatus = 'up';
     } else if (currentStatus === 'up') {
       // 已点赞 -> 取消点赞
       post.score--;
       post.voteStatus = 'none';
     } else if (currentStatus === 'down') {
       // 已点踩 -> 改为点赞 (分数 +2)
       post.score += 1;
       post.voteStatus = 'up';
     }
   } 
   else if (voteType === 'down') {
     if (currentStatus === 'none') {
       // 未投票 -> 点踩
       post.score--;
       post.voteStatus = 'down';
     } else if (currentStatus === 'down') {
       // 已点踩 -> 取消点踩
       post.score++;
       post.voteStatus = 'none';
     } else if (currentStatus === 'up') {
       // 已点赞 -> 改为点踩 (分数 -2)
       post.score -= 1;
       post.voteStatus = 'down';
     }
   }
 }
 
 // --- Return ---
 return {
   posts,
   loadingStatus,
   selectedCommunityForPost,
 
   fetchPosts,
   addNewPost,
   handleVote // ⬅️ [核心修改] 确保导出的是 handleVote
 };
 // ...
 
  // --- Return ---
  return {
    posts,
    loadingStatus,
    selectedCommunityForPost,

    fetchPosts,
    addNewPost,
	toggleUpvote
  };
});