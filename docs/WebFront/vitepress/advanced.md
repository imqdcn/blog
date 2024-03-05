# vitepress进阶使用与定制化

## 一、全局配置

在`.vitepress/config.js`中进行配置。

#### 1、网站标题描述和icon图标等

```js
export default defineConfig({
   description: "网站描述",
   lastUpdated: true, // 显示最后更新时间
   ignoreDeadLinks: true, //忽略死链查询，即文档中嵌入的一些链接无法访问也不会导致站点报错
   head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://www.xxx.cn/favicon.ico", //添加网站ico图标
      },
    ],
  ]
});    
```

#### 2、新增Google分析（站点统计）

因为我们是部署到`github`或`vercel`，所以很适合使用`Google分析`而不是`百度统计`来记录站点访问情况。

```js
export default defineConfig({
    head: [
    // google analytics
    [
      "script",
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=这里换成你在谷歌analytics的key",
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', '这里换成你在谷歌analytics的key');`,
    ],
  ],
});     
```

#### 3、配置搜索

```js
export default defineConfig({
	themeConfig: {
        search: {
          provider: "local", //启用vitepress本身的搜索
        },
});     
```

也可以配置目前更流行的`Algolia`云搜索，具体可参考：https://vitepress.dev/zh/reference/default-theme-search#algolia-search

#### 4、配置logo

该`logo`显示在网站标题旁边，一般是小图标。

```js
themeConfig: {
    logo: "https://vitepress.dev/vitepress-logo-mini.svg" //这里换成logo地址
}    
```

## 二、改造首页

位置：`根目录/index.md`

#### 1、改造网站描述、标题、副标题等

```markdown
  name: "主标题"
  text: "副标题"
  tagline: "描述"
```

#### 2、新增快捷直达按钮

```markdown
actions:
    - theme: brand
      text: 前端开发笔记
      link: /WebFront/
    - theme: alt
      text: AI笔记
      link: /AI/
```

#### 3、新增card卡片描述和链接

```markdown
features:
  - title: 卡片标题
    details: "卡片描述。"
    link: "点击卡片要跳转的链接"
  - title: 卡片标题2
    details: "卡片描述2。"
    link: "如果不需要跳转，则link:属性不写"
```

#### 4、新增页脚版权

在`config.js`中配置：

```js
themeConfig: {
    // 页脚
    footer: {
      message:
        "MIT版权，未经许可禁止任何形式的转载",
      copyright: `Copyright © 2016-${new Date().getFullYear()} `, //这里可以写JS表达式
    },
},
```

## 三、改造导航

#### 1、新增顶部导航

在`config.js`中进行配置

```js
themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/",activeMatch: '/guide/' },
      { text: "参考", link: "/reference/",activeMatch: '/reference/'  },
      { text: "外链", link: "https://www.baidu.com"  }, //外链
      {
        text: '二级菜单',
        items: [
          {
            // 该部分的标题
            text: 'Section A Title',
            items: [
              { text: 'Section A Item A', link: '...' },
              { text: 'Section B Item B', link: '...' }
            ]
          }
        ]
      }, //二级菜单
    ],
}        
```

说明：

- `activeMatch` 模糊匹配被激活的菜单，并保持高亮，可解决点击侧边栏的菜单时，顶部菜单未高亮问题
- 设置二级菜单时，请替换 `link` 选项，设置 `items` 数组
- `link`的值是一个`url`链接，则会自动显示为一个外链（有个朝↗的箭头）

参考：https://vitepress.dev/zh/reference/default-theme-nav

#### 2、点击顶部导航时，切换到侧边栏

我们希望能像`vitepress`官网这样，点击`指南`，则跳转到指南对应的页面，且拥有一个独立的侧边栏，点击`参考`，也是希望能有独立的侧边栏。

这时就需要同时配置`nav`和`sidebar`，并进行关联。也就是`sidebar`要从一个数组变成一个对象，如下配置：

```js
themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/",activeMatch: '/guide/' },
      { text: "参考", link: "/reference/",activeMatch: '/reference/'  },
    ],
    sidebar: { 
      "/guide/": { base: "/guide/", items: sidebarGuide() }, //为了简化侧边栏的菜单配置，请先记住这种写法
      "/reference/": { base: "/reference/", items: sidebarReference() },
    },
}
```

效果：

![](https://image.imqd.cn/202403051645277.gif)

说明：

- `nav`的`link`需对应`sidebar`的`key`就建议关联了，这样能实现独立的侧边栏
- `sidebar`的`base`，能让侧边栏的`url`写法更简化，类似于变量，比如配置`/guide/`后，原本的`url`从`"/guide/intro"`，就可以写成`intro`
- 函数`items: sidebarGuide()`是为了方便将侧边栏的导航配置放到其他文件中，再`import`进来，可参考下一点

#### 3、侧边栏配置

如果侧边栏不多，可以直接写在`config.js`中，如果多了，可以独立为一个配置文件，再`import`到`config.js`中

不多的情况的写法：

```js
export default {
  themeConfig: {
    sidebar: {
      "/guide/":{
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
          ...
        ]
      },
      "/reference/":{
        text: 'reference',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
          ...
        ]
      }
    }
  }
}
```

如果侧边栏很多，而且每个导航菜单都需要有一个独立的侧边栏，那就应该将其独立 为一个配置文件，再`import`导入进来

`config.js`代码

```js
export default defineConfig({
    themeConfig: {
        nav: [
          { text: "首页", link: "/" },
          { text: "指南", link: "/guide/",activeMatch: '/guide/' },
          { text: "参考", link: "/reference/",activeMatch: '/reference/'  },
        ],
        sidebar: { 
          "/guide/": { base: "/guide/", items: sidebarGuide() }, //为了简化侧边栏的菜单配置，请先记住这种写法
          "/reference/": { base: "/reference/", items: sidebarReference() },
        },
    }
});
// 导入侧边栏目录文件,需要预先在项目根目录下创建public文件夹用来存放配置文件
//如果配置文件是JS，则需要这样写
import guide from "../../public/guide.js"; 
import reference from "../../public/reference.js";

function sidebarGuide() {
  return guide;
}

function sidebarReference() {
  return reference;
}

//如果配置文件是JSON，则需要这样写
import fs from 'fs';
function sidebarGuide() {
  const content = fs.readFileSync('./public/guide.json', 'utf8').toString()
  const json = JSON.parse(content)
  return json;
}
function sidebarReference() {
  const content = fs.readFileSync('./public/reference.json', 'utf8').toString()
  const json = JSON.parse(content)
  return json;
}
```

参考：https://vitepress.dev/zh/reference/default-theme-sidebar

4、改造右侧目录和锚点颗粒度

比如将目录`title`改为中文，默认的锚点是`H2`,如果想让`H3`、`H4`标题也自动变成目录，则需要配置。

```js
themeConfig: {
    outlineTitle: '目录', //将On this page 改为目录
    outline:[2,5]  //可选的值：number | [number, number] | 'deep' //目录显示级别
}
```

参考：https://vitepress.dev/zh/reference/default-theme-config#outline

## 四、改造主题

#### 1、自定义主题（扩展主题）

有时候需要对主题添加一些新的功能，就需要扩展主题。

先创建一个自定义主题，方便我们扩展：

在`.vitepress`文件夹下，新建一个`theme`文件夹，目录结构如下：

```js
.
├─ docs                # 项目根目录
│  ├─ .vitepress
│  │  ├─ theme
│  │  │  └─ index.js   # 主题入口
│  │  │  └─ Layout.vue # 主题文件，可影响全局
│  │  │  ├─ style      # 添加主题样式文件夹
│  │  │  │  └─ custom.css # 添加主题样式
│  │  └─ config.js     # 配置文件
│  └─ index.md
└─ package.json
```

`index.js`的代码：

```js
// .vitepress/theme/index.js

import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './style/custom.css'  //加入自定义样式
export default {
  extends: DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: Layout,
  // enhanceApp({ app }) {
  // }
}
```

`Layout.vue`的代码：

```vue
<!-- .vitepress/theme/Layout.vue -->
<script setup lang="ts">
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { nextTick, provide, ref } from "vue";
const { Layout } = DefaultTheme;

const { isDark } = useData();

const isShow = ref(false);
const copyInfoText = ref("复制成功，可以去页面粘贴了~");

const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`,
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    }
  );
});
//一键复制
function copy() {
  var clipboard = new ClipboardJS(".copyBtn", {
    target: function (trigger) {
      return trigger.nextElementSibling;
    },
  });

  clipboard.on("success", function (e) {
    // console.info("Text:", e.text);
    isShow.value = true;
    copyInfoText.value = "复制成功，可以去页面粘贴了~";
    e.clearSelection();
  });
  setTimeout(() => {
    isShow.value = false;
  }, 3000);
  clipboard.on("error", function (e) {
    copyInfoText.value = "复制失败，请手动复制~";
  });
}
</script>

<template>
  <!-- <DefaultTheme.Layout /> -->
  <Layout>
    <template #doc-before>
      <button
        class="VPBadge warning copyBtn"
        @click="copy"
        data-clipboard-target=".vp-doc"
      >
        复制全文
      </button>
    </template>
    <template #doc-footer-before>
      <div id="snackbar" :class="{ show: isShow }">{{ copyInfoText }}</div>
    </template>
    <template #doc-bottom>
	  <!--回到顶部结构-->
      <a href="#app" id="go2top"> </a>
    </template>
  </Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
.copyBtn {
  position: absolute;
  top: -30px;
  right: 32px;
  z-index: 9;
}
#snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  border-radius: 6px;
  background-color: var(--vp-local-search-result-bg);
  color: #333;
  text-align: center;
  border-radius: 3px;
  padding: 16px;
  position: fixed;
  z-index: 10;
  left: 50%;
  bottom: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
/*回到顶部样式*/
#go2top {
  background: #999
    url("https://www.imqd.cn/wp-content/themes/imqd/images/go2top.png")
    no-repeat 8px center;
  position: fixed;
  bottom: 28px;
  right: 20px;
  width: 40px;
  height: 35px;
  border-radius: 6px;
}
#go2top:hover {
  background-color: #555;
}
@keyframes fadein {
  0% {
    bottom: 0;
    opacity: 0;
  }
  100% {
    bottom: 50px;
    opacity: 1;
  }
}
</style>

```

请注意`layout.vue`中的插槽，它其实是覆盖了默认主题，你在此插入的`view`最终会在对应的位置中显示。

更多插槽可查看：https://vitepress.dev/zh/guide/extending-default-theme#layout-slots

#### 2、改造主题色

官方默认主题的链接、文字等颜色为<font color='#3451b2'>蓝色</font>，可以通过新建一个`custom.css`来覆盖。

代码见`layout.vue`引入的`custom.css`

```css
/* .vitepress/theme/custom.css */
:root {
    --vp-c-brand-1: #ff8700;
    --vp-c-brand-2: #ffc107;
    --vp-c-brand-3: #ffca2c;
    --vp-c-indigo-soft: rgba(100, 108, 255, 0.14);
  }
  
```

#### 3、更换切换到暗黑模式的效果

代码见`layout.vue`。

参考链接：https://vitepress.dev/zh/guide/extending-default-theme#%E4%BD%BF%E7%94%A8%E8%A7%86%E5%9B%BE%E8%BF%87%E6%B8%A1-api

::: details 效果演示

![](https://vitepress.dev/appearance-toggle-transition.webp)

:::

#### 4、新增一键回到顶部功能

代码见`layout.vue`。

#### 5、新增一键复制功能

代码见`layout.vue`。

并且需要在`config.js`中配置`clipboard.js `一键复制插件。

> PS：该插件也可以通过`npm`方式安装，然后在`layout.vue`中`import`。

```js
export default defineConfig({
    head: [
        ['script', {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.min.js'
        }],
    ]
})
```

#### 6、在写markdown时插入代码高亮、折叠、演示效果等

总结：

1. `markdown`中可以通过`frontmatter`配置数据项

   ```markdown
   ---
   title: Docs with VitePress
   editLink: true
   ---
   
   # {{ $frontmatter.title }} //访问数据
   
   Guide content
   ```

2. `markdown`中可以直接写`vue`代码

   比如：在任意`md`中可以写如下`vue`代码。

   ```vue
   <ul>
       <li v-for='item in list' :key='item.id'>{{item.title}}</li>
   </ul>
   
   <script setup>
   import {ref} from 'vue'
   
   const list=ref([
       {
           id:1,
           title:'标题1'
       },
       {
           id:2,
           title:'标题2'
       }
   ])
   </script>
   ```

3. 意味着可以很方便写`代码+演示demo`，比如这里以`element-plus`的文档为例

   安装

   ```bash
   npm install element-plus
   ```

   在`theme/index.js`中引入`element-plus`

   ```js
   import DefaultTheme from "vitepress/theme";
    
   import ElementPlus from "element-plus";
   import "element-plus/dist/index.css";
    
   export default {
     ...DefaultTheme,
   
     enhanceApp({ app}) {
       app.use(ElementPlus);
     },
   };
   ```

   即可在`markdown`中使用，比如在`demo.md`中，可以写成类似于这样：

   > 为什么在vitepress的markdown中可以写vue、html等代码，是因为markdown最终会被当成vue组件来处理
   >
   > https://vitepress.dev/zh/guide/what-is-vitepress#developer-experience

   ````markdown
   ## 基础用法
    
   <div class="ui-button">
     <el-button type="primary">主要按钮</el-button>
     <el-button type="success">绿色按钮</el-button>
     <el-button type="info">灰色按钮</el-button>
     <el-button type="warning">黄色按钮</el-button>
     <el-button type="danger">红色按钮</el-button>
   </div>
    
   <details>
     <summary>查看代码</summary>
    
   ``` vue
   <template>
     <el-button type="primary">主要按钮</el-button>
     <el-button type="success">绿色按钮</el-button>
     <el-button type="info">灰色按钮</el-button>
     <el-button type="warning">黄色按钮</el-button>
     <el-button type="danger">红色按钮</el-button>
   </template>
   ```
    
   </details>
   ````

   效果：

   ![image-20240228161859251](https://image.imqd.cn/202402281619618.png)

具体可参考：https://vitepress.dev/zh/guide/markdown

