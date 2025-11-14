"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_user = require("../../stores/user.js");
const stores_drawer = require("../../stores/drawer.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "RightProfile",
  setup(__props) {
    const userStore = stores_user.useUserStore();
    const drawerStore = stores_drawer.useDrawerStore();
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const safeAreaTop = safeAreaInsets.top;
    const goToProfile = () => {
      drawerStore.closeAll();
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "/pages/profile/profile"
        });
      }, 350);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(safeAreaTop) + "px",
        b: common_vendor.p({
          type: "eye-filled",
          size: "24"
        }),
        c: common_vendor.unref(userStore).avatarUrl,
        d: common_vendor.t(common_vendor.unref(userStore).username),
        e: common_vendor.t(common_vendor.unref(userStore).karma),
        f: common_vendor.t(common_vendor.unref(userStore).accountAge),
        g: common_vendor.o(goToProfile)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ef2d0c5a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/RightProfile/RightProfile.js.map
