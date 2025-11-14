"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore("user", () => {
  const username = common_vendor.ref("u/fancyy_123");
  const avatarUrl = common_vendor.ref("/static/tabs/square1.png");
  const dateOfBirth = common_vendor.ref("1990-01-01");
  const karma = common_vendor.ref(1);
  const accountAge = common_vendor.ref(9);
  function setUsername(newUsername) {
    username.value = newUsername;
  }
  function setAvatar(newAvatarUrl) {
    avatarUrl.value = newAvatarUrl;
  }
  function setDateOfBirth(newDate) {
    dateOfBirth.value = newDate;
  }
  return {
    username,
    avatarUrl,
    dateOfBirth,
    karma,
    accountAge,
    setUsername,
    setAvatar,
    setDateOfBirth
  };
});
exports.useUserStore = useUserStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/user.js.map
