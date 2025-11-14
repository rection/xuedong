"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_posts = require("../../stores/posts.js");
const stores_user = require("../../stores/user.js");
const composables_useTabDrawerCloser = require("../../composables/useTabDrawerCloser.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_GlobalLayout2 = common_vendor.resolveComponent("GlobalLayout");
  (_easycom_uni_icons2 + _easycom_GlobalLayout2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_GlobalLayout = () => "../../components/GlobalLayout/GlobalLayout.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_GlobalLayout)();
}
const _sfc_main = {
  __name: "create",
  setup(__props) {
    composables_useTabDrawerCloser.useTabDrawerCloser();
    const postStore = stores_posts.usePostStore();
    const userStore = stores_user.useUserStore();
    const title = common_vendor.ref("");
    const content = common_vendor.ref("");
    const communityDisplayName = common_vendor.computed(() => {
      return postStore.selectedCommunityForPost || `发布到: 主页`;
    });
    const goToSelectCommunity = () => {
      common_vendor.index.navigateTo({
        url: "/pages/community-select/community-select"
      });
    };
    const handlePost = () => {
      if (!title.value.trim()) {
        common_vendor.index.showToast({ title: "标题不能为空", icon: "error" });
        return;
      }
      const newPost = {
        id: Date.now(),
        // 用时间戳作为临时 ID
        title: title.value,
        content: content.value,
        community: postStore.selectedCommunityForPost || "主页",
        user: userStore.username,
        upvotes: 0,
        comments: 0
      };
      postStore.addNewPost(newPost);
      title.value = "";
      content.value = "";
      postStore.selectedCommunityForPost = null;
      common_vendor.index.showToast({ title: "发布成功!", icon: "success" });
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    common_vendor.onUnload(() => {
      postStore.selectedCommunityForPost = null;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(communityDisplayName.value),
        b: common_vendor.p({
          type: "forward",
          size: "20",
          color: "#999"
        }),
        c: common_vendor.o(goToSelectCommunity),
        d: title.value,
        e: common_vendor.o(($event) => title.value = $event.detail.value),
        f: content.value,
        g: common_vendor.o(($event) => content.value = $event.detail.value),
        h: common_vendor.o(handlePost),
        i: !title.value.trim(),
        j: common_vendor.p({
          title: "创建帖子"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-98f0e4ec"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/create/create.js.map
