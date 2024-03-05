// .vitepress/theme/index.js

// You can directly import Vue files in the theme entry
// VitePress is pre-configured with @vitejs/plugin-vue.
import DefaultTheme from 'vitepress/theme'
// import MyLayout from './MyLayout.vue'
import Layout from './Layout.vue'
import cardList from "./components/cardList.vue";
import './style/custom.css'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

export default {
  // ...DefaultTheme,
  extends: DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: Layout,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component("cardList", cardList);
    // 启用ElementPlus
    app.use(ElementPlus);
  }
}