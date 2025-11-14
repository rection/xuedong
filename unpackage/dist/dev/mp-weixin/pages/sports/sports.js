"use strict";
const common_vendor = require("../../common/vendor.js");
const composables_useTabDrawerCloser = require("../../composables/useTabDrawerCloser.js");
if (!Array) {
  const _easycom_GlobalLayout2 = common_vendor.resolveComponent("GlobalLayout");
  _easycom_GlobalLayout2();
}
const _easycom_GlobalLayout = () => "../../components/GlobalLayout/GlobalLayout.js";
if (!Math) {
  _easycom_GlobalLayout();
}
const _sfc_main = {
  __name: "sports",
  setup(__props) {
    composables_useTabDrawerCloser.useTabDrawerCloser();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "运动"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd6cce7c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/sports/sports.js.map
