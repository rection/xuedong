"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_community = require("../../stores/community.js");
const _sfc_main = {
  __name: "LeftMenu",
  setup(__props) {
    const communityStore = stores_community.useCommunityStore();
    const { recentVisits } = common_vendor.storeToRefs(communityStore);
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const safeAreaTop = safeAreaInsets.top;
    const isCheckedIn = common_vendor.ref(false);
    const checkInDays = common_vendor.ref(0);
    const handleCheckIn = () => {
      if (isCheckedIn.value)
        return;
      isCheckedIn.value = true;
      checkInDays.value += 1;
      common_vendor.index.showToast({ title: "打卡成功!", icon: "success" });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(safeAreaTop) + "px",
        b: common_vendor.t(checkInDays.value),
        c: common_vendor.t(isCheckedIn.value ? "今日已打卡" : "点击打卡"),
        d: common_vendor.o(handleCheckIn),
        e: isCheckedIn.value,
        f: common_vendor.unref(recentVisits).length === 0
      }, common_vendor.unref(recentVisits).length === 0 ? {} : {}, {
        g: common_vendor.f(common_vendor.unref(recentVisits), (community, k0, i0) => {
          return {
            a: common_vendor.t(community.name),
            b: community.id
          };
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-242799f8"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/LeftMenu/LeftMenu.js.map
