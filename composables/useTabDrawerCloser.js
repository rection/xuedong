// composables/useTabDrawerCloser.js

// 1. 引入 uni-app 的 TabBar 点击钩子
import { onTabItemTap } from '@dcloudio/uni-app';
// 2. 引入 Pinia store
import { useDrawerStore } from '@/stores/drawer.js';

// 3. 导出一个可复用的函数
export function useTabDrawerCloser() {
  // 4. 获取 store 实例
  const drawerStore = useDrawerStore();

  // 5. 注册 TabBar 点击事件
  onTabItemTap(() => {
    // 只要用户点击了 TabBar（无论是哪个）...

    // 6. 检查是否有任何抽屉是打开的
    if (drawerStore.isLeftOpen || drawerStore.isRightOpen) {

      // 7. （核心）调用 'closeAll' 动作
      //    (注意: 我们需要先在 store 中添加这个 action)
      drawerStore.closeAll();
    }
  });

  // 这个函数不需要返回任何东西
}