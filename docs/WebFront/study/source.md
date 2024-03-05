---
pageClass: site-layout
---
# 前端主流框架

<cardList v-for="model in siteData" :key="model.title" :title="model.title" :data="model.items" />

<script setup>
// 网址导航页面的数据
import siteData from "./data/source.js";

</script>