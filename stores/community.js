// stores/community.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCommunityStore = defineStore('community', () => {
  // --- State ---

  // 1. 所有社区的列表 (Req 1 & 4)
  // 我们先放一些模拟数据，稍后 "创建社区" 功能会向这里添加
  const allCommunities = ref([
    // { id: 1, name: 'programming', creator: 'admin' },
    // { id: 2, name: 'learnpython', creator: 'admin' },
    // { id: 3, name: 'nextjs', creator: 'admin' },
    // { id: 4, name: 'funny', creator: 'admin' },
  ]);

  // 2. 最近访问的社区列表 (Req 2)
  const recentVisits = ref([]);

  // --- Actions ---

  /**
   * (Req 1) 创建一个新社区
   */
  function createCommunity(communityName, creatorUsername) {
    const newCommunity = {
      id: Date.now(),
      name: communityName,
      creator: creatorUsername
    };
    allCommunities.value.unshift(newCommunity);
    // (在真实项目中，这里应该是一个 API 请求)
  }

  /**
   * (Req 2) 记录一次社区访问
   */
  function logVisit(community) {
    // 检查是否已在“最近”列表中
    const exists = recentVisits.value.find(c => c.id === community.id);
    if (!exists) {
      // 添加到最前面
      recentVisits.value.unshift(community);
      // 保持列表不超过 5 个
      if (recentVisits.value.length > 5) {
        recentVisits.value.pop();
      }
    }
  }

  return {
    allCommunities,
    recentVisits,
    createCommunity,
    logVisit
  };
});