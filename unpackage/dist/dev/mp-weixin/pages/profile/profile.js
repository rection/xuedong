"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_user = require("../../stores/user.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "profile",
  setup(__props) {
    const userStore = stores_user.useUserStore();
    const localUsername = common_vendor.ref(userStore.username);
    const updateUsername = () => {
      userStore.setUsername(localUsername.value);
      common_vendor.index.showToast({ title: "用户名已更新", icon: "none" });
    };
    const handleDateChange = (e) => {
      userStore.setDateOfBirth(e.detail.value);
    };
    const handleChangeAvatar = () => {
      common_vendor.index.chooseImage({
        count: 1,
        // 只选 1 张
        sizeType: ["compressed"],
        // 压缩图
        sourceType: ["album", "camera"],
        // 相册或相机
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          userStore.setAvatar(tempFilePath);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(userStore).avatarUrl,
        b: common_vendor.p({
          type: "forward",
          size: "20",
          color: "#999"
        }),
        c: common_vendor.o(handleChangeAvatar),
        d: common_vendor.o(updateUsername),
        e: localUsername.value,
        f: common_vendor.o(($event) => localUsername.value = $event.detail.value),
        g: common_vendor.t(common_vendor.unref(userStore).dateOfBirth),
        h: common_vendor.unref(userStore).dateOfBirth,
        i: common_vendor.o(handleDateChange),
        j: common_vendor.p({
          type: "forward",
          size: "20",
          color: "#999"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd383ca2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
