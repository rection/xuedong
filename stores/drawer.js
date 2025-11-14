// stores/drawer.js
import { defineStore } from 'pinia';

// 'drawer' 是这个 store 的唯一 ID
export const useDrawerStore = defineStore('drawer', {
  // 1. 状态：定义抽屉是否打开
  state: () => ({
    isLeftOpen: false,
    isRightOpen: false,
  }),

  // 2. Actions：定义如何修改状态
  actions: {
    openLeft() {
      this.isLeftOpen = true;
      this.isRightOpen = false; // 打开左边时，确保右边关闭
    },
    closeLeft() {
      this.isLeftOpen = false;
    },
    openRight() {
      this.isRightOpen = true;
      this.isLeftOpen = false; // 打开右边时，确保左边关闭
    },
    closeRight() {
      this.isRightOpen = false;
    },
    // (可选) 点击抽屉内的菜单项后，关闭所有抽屉
    closeAll() {
      this.isLeftOpen = false;
      this.isRightOpen = false;
    }
  },
});