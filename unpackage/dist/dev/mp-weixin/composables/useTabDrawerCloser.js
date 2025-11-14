"use strict";
const common_vendor = require("../common/vendor.js");
const stores_drawer = require("../stores/drawer.js");
function useTabDrawerCloser() {
  const drawerStore = stores_drawer.useDrawerStore();
  common_vendor.onTabItemTap(() => {
    if (drawerStore.isLeftOpen || drawerStore.isRightOpen) {
      drawerStore.closeAll();
    }
  });
}
exports.useTabDrawerCloser = useTabDrawerCloser;
//# sourceMappingURL=../../.sourcemap/mp-weixin/composables/useTabDrawerCloser.js.map
