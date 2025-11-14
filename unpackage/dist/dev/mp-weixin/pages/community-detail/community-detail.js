"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_posts = require("../../stores/posts.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_PostCard2 = common_vendor.resolveComponent("PostCard");
  (_easycom_uni_icons2 + _easycom_PostCard2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_PostCard = () => "../../components/PostCard/PostCard.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_PostCard)();
}
const _sfc_main = {
  __name: "community-detail",
  setup(__props) {
    const postStore = stores_posts.usePostStore();
    const { posts } = common_vendor.storeToRefs(postStore);
    const communityName = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      if (options.name) {
        communityName.value = options.name;
        common_vendor.index.setNavigationBarTitle({
          title: `r/${options.name}`
        });
      }
    });
    const filteredPosts = common_vendor.computed(() => {
      const currentCommunity = `r/${communityName.value}`;
      return posts.value.filter(
        (post) => post.community === currentCommunity
      );
    });
    const isSubscribed = common_vendor.ref(false);
    const toggleSubscription = () => {
      isSubscribed.value = !isSubscribed.value;
    };
    const subscribeText = common_vendor.computed(() => {
      return isSubscribed.value ? "已订阅" : "加入";
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(communityName.value),
        b: common_vendor.t(subscribeText.value),
        c: isSubscribed.value ? 1 : "",
        d: common_vendor.o(toggleSubscription),
        e: common_vendor.t(communityName.value),
        f: common_vendor.p({
          type: "fire-filled",
          size: "18",
          color: "#666"
        }),
        g: common_vendor.p({
          type: "arrowdown",
          size: "16",
          color: "#666"
        }),
        h: common_vendor.p({
          type: "list",
          size: "22",
          color: "#666"
        }),
        i: common_vendor.f(filteredPosts.value, (post, k0, i0) => {
          return {
            a: "fe7103a0-3-" + i0,
            b: common_vendor.p({
              post
            }),
            c: post.id
          };
        }),
        j: filteredPosts.value.length === 0
      }, filteredPosts.value.length === 0 ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fe7103a0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/community-detail/community-detail.js.map
