"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_posts = require("../../stores/posts.js");
if (!Array) {
  const _easycom_PostCard2 = common_vendor.resolveComponent("PostCard");
  const _easycom_GlobalLayout2 = common_vendor.resolveComponent("GlobalLayout");
  (_easycom_PostCard2 + _easycom_GlobalLayout2)();
}
const _easycom_PostCard = () => "../../components/PostCard/PostCard.js";
const _easycom_GlobalLayout = () => "../../components/GlobalLayout/GlobalLayout.js";
if (!Math) {
  (_easycom_PostCard + _easycom_GlobalLayout)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const postStore = stores_posts.usePostStore();
    const { posts, loadingStatus } = common_vendor.storeToRefs(postStore);
    const isRefresherTriggered = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      if (posts.value.length === 0) {
        handleRefresh();
      }
    });
    const handleRefresh = async () => {
      isRefresherTriggered.value = true;
      await postStore.fetchPosts(true);
      isRefresherTriggered.value = false;
    };
    const handleLoadMore = () => {
      postStore.fetchPosts(false);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(posts), (post, k0, i0) => {
          return {
            a: "1cf27b2a-1-" + i0 + ",1cf27b2a-0",
            b: common_vendor.p({
              post
            }),
            c: `post_${post.id}`
          };
        }),
        b: common_vendor.unref(loadingStatus) === "loading"
      }, common_vendor.unref(loadingStatus) === "loading" ? {} : {}, {
        c: common_vendor.unref(loadingStatus) === "no-more"
      }, common_vendor.unref(loadingStatus) === "no-more" ? {} : {}, {
        d: isRefresherTriggered.value,
        e: common_vendor.o(handleRefresh),
        f: common_vendor.o(handleLoadMore),
        g: common_vendor.p({
          title: "主页"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
