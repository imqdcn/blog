<template>
  <!-- 网址分类模块 -->
  <h2 class="title" :id="createTitle">
    {{ props.title }}
    <a class="anchor" :href="`#${createTitle}`" aria-hidden="true"></a>
  </h2>
  <el-row>
    <el-col
      v-for="(item, index) in props.data"
      :key="item.name"
      :span="8"
      class="item"
    >
      <el-badge :value="index + 1" class="badge" :type="tagColors[randomNum()]">
        <el-card :body-style="{ padding: '12px' }" class="card" shadow="hover">
          <img :src="item.icon" class="image" />
          <a class="link" :href="item.link" target="_blank">
            <p class="tc">{{ item.name }}</p>
            <div class="bottom">
              <div class="font12">{{ item.desc }}</div>
            </div>
          </a>
          <div class="tags">
            <el-button
              v-for="(t) in item.tags"
              :type="tagColors[randomNum()]"
              size="small"
              >{{ t }}</el-button
            >
          </div>
        </el-card>
      </el-badge>
    </el-col>
  </el-row>
</template>
<script setup>
import { ref, computed } from "vue";
import { slugify } from "@mdit-vue/shared";
const props = defineProps({
  title: String,
  data: {
    type: Array,
    default: [],
  },
});
// tags标签颜色
const tagColors = ref(["primary", "success", "warning", "danger", "info"]);
//   生成markdown的目录
const createTitle = computed(() => {
  return slugify(props.title);
});
// 随机生成一个0-4的数
const randomNum = () => {
  return Math.floor(Math.random() * 5);
};
</script>
<style lang="scss" scoped>
.tc {
  text-align: center;
}
.font12 {
  font-size: 12px;
  line-height: 1.8;
}
.item {
  padding: 10px;
  .badge {
    width: 100%;
    height: 100%;
    position: relative;
    .card {
      height: 100%;
      padding-bottom: 30px;
      background-color: transparent;
    }
    .tags{
      position: absolute;
      bottom: 10px;
    }
    .link {
      display: block;
      color: var(--vp-c-text-2);
      text-decoration: none;
      &:hover {
        color: var(--vp-c-text-1);
        transition: color 0.25s;
      }
    }
    .image {
      height: 50px;
      margin: 0 auto;
    }
  }
}
</style>
