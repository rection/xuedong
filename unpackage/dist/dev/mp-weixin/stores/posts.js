"use strict";
const common_vendor = require("../common/vendor.js");
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
        if (id >= 35)
          break;
        data.push({
          id,
          community: "r/programming",
          // ...
          upvotes: Math.floor(Math.random() * 500),
          comments: Math.floor(Math.random() * 100),
          isUpvoted: false
          // ⬅️ [添加] 默认未点赞
        });
      }
      resolve({ list: data, hasMore: data.length > 0 && page < 4 });
    }, 800);
  });
};
const usePostStore = common_vendor.defineStore("posts", () => {
  const posts = common_vendor.ref([]);
  const currentPage = common_vendor.ref(1);
  const loadingStatus = common_vendor.ref("more");
  const selectedCommunityForPost = common_vendor.ref(null);
  async function fetchPosts(isRefresh = false) {
    if (loadingStatus.value === "loading" && !isRefresh)
      return;
    if (isRefresh) {
      currentPage.value = 1;
      posts.value = [];
      loadingStatus.value = "more";
    }
    if (loadingStatus.value === "no-more")
      return;
    loadingStatus.value = "loading";
    try {
      const res = await fetchMockData(currentPage.value);
      posts.value.push(...res.list);
      if (res.hasMore) {
        loadingStatus.value = "more";
        currentPage.value++;
      } else {
        loadingStatus.value = "no-more";
      }
    } catch (error) {
      common_vendor.index.__f__("error", "at stores/posts.js:75", "获取数据失败", error);
      loadingStatus.value = "more";
    }
  }
  function addNewPost(postData) {
    postData.isUpvoted = false;
    posts.value.unshift(postData);
  }
  function toggleUpvote(postId) {
    const post = posts.value.find((p) => p.id === postId);
    if (post) {
      if (post.isUpvoted) {
        post.upvotes -= 1;
        post.isUpvoted = false;
      } else {
        post.upvotes += 1;
        post.isUpvoted = true;
      }
    }
  }
  return {
    posts,
    loadingStatus,
    selectedCommunityForPost,
    fetchPosts,
    addNewPost,
    toggleUpvote
  };
});
exports.usePostStore = usePostStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/posts.js.map
