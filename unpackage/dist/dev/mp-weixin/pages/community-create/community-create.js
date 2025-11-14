"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_community = require("../../stores/community.js");
const stores_user = require("../../stores/user.js");
const _sfc_main = {
  __name: "community-create",
  setup(__props) {
    const communityStore = stores_community.useCommunityStore();
    const userStore = stores_user.useUserStore();
    const communityName = common_vendor.ref("");
    const isNameValid = common_vendor.computed(() => {
      const name = communityName.value.trim();
      return name.length > 0 && !name.includes(" ");
    });
    const validateInput = (e) => {
      communityName.value = e.detail.value.replace(/\s/g, "");
    };
    const handleCreate = () => {
      if (!isNameValid.value) {
        return;
      }
      const name = communityName.value.trim();
      const exists = communityStore.allCommunities.find((c) => c.name.toLowerCase() === name.toLowerCase());
      if (exists) {
        common_vendor.index.showToast({
          title: `r/${name} 已存在`,
          icon: "error"
        });
        return;
      }
      communityStore.createCommunity(name, userStore.username);
      common_vendor.index.showToast({
        title: "创建成功!",
        icon: "success"
      });
      setTimeout(() => {
        common_vendor.index.navigateBack();
      }, 1e3);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o([($event) => communityName.value = $event.detail.value, validateInput]),
        b: communityName.value,
        c: common_vendor.o(handleCreate),
        d: !isNameValid.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83044376"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/community-create/community-create.js.map
