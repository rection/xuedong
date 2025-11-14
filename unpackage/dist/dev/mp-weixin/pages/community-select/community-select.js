"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_posts = require("../../stores/posts.js");
const stores_user = require("../../stores/user.js");
const stores_community = require("../../stores/community.js");
const _sfc_main = {
  __name: "community-select",
  setup(__props) {
    const postStore = stores_posts.usePostStore();
    const userStore = stores_user.useUserStore();
    const communityStore = stores_community.useCommunityStore();
    const { allCommunities } = common_vendor.storeToRefs(communityStore);
    const selectCommunity = (communityName) => {
      postStore.selectedCommunityForPost = communityName;
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(userStore).avatarUrl,
        b: common_vendor.t(common_vendor.unref(userStore).username),
        c: common_vendor.o(($event) => selectCommunity(common_vendor.unref(userStore).username)),
        d: common_vendor.o(($event) => selectCommunity("主页")),
        e: common_vendor.f(common_vendor.unref(allCommunities), (community, k0, i0) => {
          return {
            a: common_vendor.t(community.name),
            b: community.id,
            c: common_vendor.o(($event) => selectCommunity(`r/${community.name}`), community.id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-15cacc5b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/community-select/community-select.js.map
