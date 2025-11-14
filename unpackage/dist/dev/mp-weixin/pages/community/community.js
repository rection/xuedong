"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_community = require("../../stores/community.js");
const composables_useTabDrawerCloser = require("../../composables/useTabDrawerCloser.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_GlobalLayout2 = common_vendor.resolveComponent("GlobalLayout");
  (_easycom_uni_icons2 + _easycom_uni_easyinput2 + _easycom_GlobalLayout2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_GlobalLayout = () => "../../components/GlobalLayout/GlobalLayout.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_easyinput + _easycom_GlobalLayout)();
}
const _sfc_main = {
  __name: "community",
  setup(__props) {
    composables_useTabDrawerCloser.useTabDrawerCloser();
    const communityStore = stores_community.useCommunityStore();
    const { allCommunities } = common_vendor.storeToRefs(communityStore);
    const searchTerm = common_vendor.ref("");
    const filteredCommunities = common_vendor.computed(() => {
      const query = searchTerm.value.trim().toLowerCase();
      if (!query) {
        return allCommunities.value;
      }
      return allCommunities.value.filter(
        (c) => c.name.toLowerCase().includes(query)
      );
    });
    const visitCommunity = (community) => {
      communityStore.logVisit(community);
      common_vendor.index.navigateTo({
        url: `/pages/community-detail/community-detail?name=${community.name}`
      });
    };
    const goToCreateCommunity = () => {
      common_vendor.index.navigateTo({
        // 这就是我们在 步骤一 中注册的页面
        url: "/pages/community-create/community-create"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          type: "plussolid",
          size: "24",
          color: "#0079D3"
        }),
        b: common_vendor.o(goToCreateCommunity),
        c: common_vendor.o(($event) => searchTerm.value = $event),
        d: common_vendor.p({
          prefixIcon: "search",
          placeholder: "搜索社区",
          clearable: true,
          modelValue: searchTerm.value
        }),
        e: common_vendor.f(common_vendor.unref(allCommunities), (community, k0, i0) => {
          return {
            a: common_vendor.t(community.name),
            b: common_vendor.t(community.creator),
            c: `comm_select_${community.id}`,
            d: common_vendor.o(($event) => visitCommunity(community), `comm_select_${community.id}`)
          };
        }),
        f: filteredCommunities.value.length === 0 && common_vendor.unref(allCommunities).length > 0
      }, filteredCommunities.value.length === 0 && common_vendor.unref(allCommunities).length > 0 ? {
        g: common_vendor.t(searchTerm.value)
      } : {}, {
        h: common_vendor.p({
          title: "社区"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a6ef5318"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/community/community.js.map
