"use strict";
const common_vendor = require("../common/vendor.js");
const useDrawerStore = common_vendor.defineStore("drawer", {
  // 1. 状态：定义抽屉是否打开
  state: () => ({
    isLeftOpen: false,
    isRightOpen: false
  }),
  // 2. Actions：定义如何修改状态
  actions: {
    openLeft() {
      this.isLeftOpen = true;
      this.isRightOpen = false;
    },
    closeLeft() {
      this.isLeftOpen = false;
    },
    openRight() {
      this.isRightOpen = true;
      this.isLeftOpen = false;
    },
    closeRight() {
      this.isRightOpen = false;
    },
    // (可选) 点击抽屉内的菜单项后，关闭所有抽屉
    closeAll() {
      this.isLeftOpen = false;
      this.isRightOpen = false;
    }
  }
});
exports.useDrawerStore = useDrawerStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/drawer.js.map
