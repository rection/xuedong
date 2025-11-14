// stores/user.js
import { defineStore } from 'pinia';
import { ref } from 'vue'; // 确保从 vue 引入 ref

export const useUserStore = defineStore('user', () => {
  // 1. State (状态)
  // 使用 ref() 来定义 state 属性
  const username = ref('u/fancyy_123'); // 默认用户名

  // 默认头像 (您可以使用一个网络图片链接或本地路径)
  const avatarUrl = ref('/static/tabs/square1.png'); 

  const dateOfBirth = ref('1990-01-01'); // 默认出生日期

  const karma = ref(1); // 来自您截图的数据
  const accountAge = ref(9); // 来自您截图的数据

  // 2. Actions (方法)
  function setUsername(newUsername) {
    username.value = newUsername;
  }

  function setAvatar(newAvatarUrl) {
    avatarUrl.value = newAvatarUrl;
  }

  function setDateOfBirth(newDate) {
    dateOfBirth.value = newDate;
  }

  // 3. 返回 state 和 actions
  return {
    username,
    avatarUrl,
    dateOfBirth,
    karma,
    accountAge,
    setUsername,
    setAvatar,
    setDateOfBirth,
  };
});