"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_drawer = require("../../stores/drawer.js");
if (!Array) {
  const _easycom_CustomNavbar2 = common_vendor.resolveComponent("CustomNavbar");
  const _easycom_LeftMenu2 = common_vendor.resolveComponent("LeftMenu");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  const _easycom_RightProfile2 = common_vendor.resolveComponent("RightProfile");
  (_easycom_CustomNavbar2 + _easycom_LeftMenu2 + _easycom_uni_drawer2 + _easycom_RightProfile2)();
}
const _easycom_CustomNavbar = () => "../CustomNavbar/CustomNavbar.js";
const _easycom_LeftMenu = () => "../LeftMenu/LeftMenu.js";
const _easycom_uni_drawer = () => "../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
const _easycom_RightProfile = () => "../RightProfile/RightProfile.js";
if (!Math) {
  (_easycom_CustomNavbar + _easycom_LeftMenu + _easycom_uni_drawer + _easycom_RightProfile)();
}
const _sfc_main = {
  __name: "GlobalLayout",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const drawerStore = stores_drawer.useDrawerStore();
    const leftDrawerRef = common_vendor.ref(null);
    const rightDrawerRef = common_vendor.ref(null);
    common_vendor.watch(() => drawerStore.isLeftOpen, (newVal) => {
      if (leftDrawerRef.value) {
        newVal ? leftDrawerRef.value.open() : leftDrawerRef.value.close();
      }
    });
    common_vendor.watch(() => drawerStore.isRightOpen, (newVal) => {
      if (rightDrawerRef.value) {
        newVal ? rightDrawerRef.value.open() : rightDrawerRef.value.close();
      }
    });
    common_vendor.onMounted(() => {
      var _a, _b;
      if (drawerStore.isLeftOpen) {
        (_a = leftDrawerRef.value) == null ? void 0 : _a.open();
      }
      if (drawerStore.isRightOpen) {
        (_b = rightDrawerRef.value) == null ? void 0 : _b.open();
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: __props.title
        }),
        b: common_vendor.sr(leftDrawerRef, "1170b87c-1", {
          "k": "leftDrawerRef"
        }),
        c: common_vendor.o(($event) => common_vendor.unref(drawerStore).closeLeft()),
        d: common_vendor.p({
          mode: "left",
          width: 300
        }),
        e: common_vendor.sr(rightDrawerRef, "1170b87c-3", {
          "k": "rightDrawerRef"
        }),
        f: common_vendor.o(($event) => common_vendor.unref(drawerStore).closeRight()),
        g: common_vendor.p({
          mode: "right",
          width: 300
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1170b87c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/GlobalLayout/GlobalLayout.js.map
