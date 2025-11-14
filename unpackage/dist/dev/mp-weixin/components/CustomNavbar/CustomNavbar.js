"use strict";
const common_vendor = require("../../common/vendor.js");
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
  __name: "CustomNavbar",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const drawerStore = stores_drawer.useDrawerStore();
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const safeAreaTop = safeAreaInsets.top;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "bars",
          size: "26",
          color: "#333"
        }),
        b: common_vendor.o(($event) => common_vendor.unref(drawerStore).openLeft()),
        c: common_vendor.t(__props.title),
        d: common_vendor.p({
          type: "person-filled",
          size: "26",
          color: "#333"
        }),
        e: common_vendor.o(($event) => common_vendor.unref(drawerStore).openRight()),
        f: common_vendor.unref(safeAreaTop) + "px"
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ff1d8d81"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/CustomNavbar/CustomNavbar.js.map
