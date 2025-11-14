// main.js
import { createSSRApp } from "vue";
import App from "./App.vue";


// 1. 从 'pinia' 库中导入 createPinia
import { createPinia } from "pinia";

// 2. 创建一个 Pinia 实例
const pinia = createPinia();



export function createApp() {
  const app = createSSRApp(App);


  app.use(pinia);

  return {
    app,
  };
}