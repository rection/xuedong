"use strict";
const common_vendor = require("../common/vendor.js");
const useCommunityStore = common_vendor.defineStore("community", () => {
  const allCommunities = common_vendor.ref([
    { id: 1, name: "programming", creator: "admin" },
    { id: 2, name: "learnpython", creator: "admin" },
    { id: 3, name: "nextjs", creator: "admin" },
    { id: 4, name: "funny", creator: "admin" }
  ]);
  const recentVisits = common_vendor.ref([]);
  function createCommunity(communityName, creatorUsername) {
    const newCommunity = {
      id: Date.now(),
      name: communityName,
      creator: creatorUsername
    };
    allCommunities.value.unshift(newCommunity);
  }
  function logVisit(community) {
    const exists = recentVisits.value.find((c) => c.id === community.id);
    if (!exists) {
      recentVisits.value.unshift(community);
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
exports.useCommunityStore = useCommunityStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/community.js.map
