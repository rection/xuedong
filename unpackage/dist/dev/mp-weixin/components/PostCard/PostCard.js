"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_posts = require("../../stores/posts.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "PostCard",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const postStore = stores_posts.usePostStore();
    const goToPostDetail = (postId) => {
      common_vendor.index.navigateTo({
        url: `/pages/post-detail/post-detail?id=${postId}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(__props.post.community === "主页" ? "主页" : `r/${__props.post.community}`),
        b: common_vendor.t(__props.post.user),
        c: common_vendor.t(__props.post.title),
        d: __props.post.content && __props.post.content.trim() !== ""
      }, __props.post.content && __props.post.content.trim() !== "" ? {
        e: common_vendor.t(__props.post.content)
      } : {}, {
        f: common_vendor.p({
          type: "arrow-up",
          size: "18",
          color: __props.post.isUpvoted ? "#FF4500" : "#888"
        }),
        g: common_vendor.t(__props.post.upvotes),
        h: __props.post.isUpvoted ? "#FF4500" : "#888",
        i: common_vendor.o(($event) => common_vendor.unref(postStore).toggleUpvote(__props.post.id)),
        j: common_vendor.p({
          type: "chatbubble",
          size: "18",
          color: "#888"
        }),
        k: common_vendor.t(__props.post.comments),
        l: common_vendor.o(($event) => goToPostDetail(__props.post.id))
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f4466858"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/PostCard/PostCard.js.map
