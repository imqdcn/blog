# vitepress从0开始部署笔记

## 前置知识

#### 1、什么是SSG

`SSG：Static site generators `，即静态站点生成器。用户在本地写`markdown`，即可通过`SSG`生成一个静态站点，生成后只有纯前端内容，不需要服务端处理，在运行时会更快。

缺点：

1. 对数据的任何更改都需要进行完全重建
2. 不适用于需频繁更新网站内容，实时、动态数据的情况。例如，股票交易或内容需要不断更新的 SaaS 仪表板

总结，它是前端开发技术，不涉及到后端开发。

#### 2、有什么用

非常适合写个人博客网站，技术文档、API文档、手册等。

比如vue全家桶工具文档，如vitepress的官网：https://vitepress.dev/

比如elementUI开发文档：https://element-plus.org/zh-CN/

#### 3、目前流行的SSG有哪些

- Next.js 、 Gatsby 非常适合 React 开发者
- Nuxt.js 、vuepress、vitepress非常适合 Vue.js 开发者
- SvelteKit 非常适合 Svelte 开发者
- Hugo 非常适合 Go 开发者

#### 4、为什么选择vitepress

- 基于`vue.js`，易于上手，适合大部分人，有详细的官方文档，甚至非程序开发人员也能根据官方文档快速搭建
- `VitePress `提供了更好的开发体验、更好的生产性能、更精美的默认主题和更灵活的自定义 `API`。
- `Vue` 团队决定将重点放在 `VitePress`，作为长期的主要` SSG `选择推荐

## 一、在本地安装vitepress

前置条件：需安装`Node.js 16` 及以上版本，建议使用`node`最新版。

按照官网说明，可以嵌入到当前项目安装或独立为一个`vitepress`项目。

**即有两种使用场景：**

1. 场景1，二级目录安装。比如我开发了一个`web项目`，需要为这个项目添加使用文档或接口文档，那么我就可以在这个项目新建一个`docs`文件夹，在该文件夹中安装、运行和部署`vitepress`（实际上它与该web项目还是独立的）。
2. 场景2，独立安装。比如我想将`vitepress`当做一个技术博客(blog)，那么就可以新建一个全新的`根文件夹`，然后安装`vitepress`。

但是不管是哪种方式，安装命令都是一样的。这里为了方便操作，我以`场景2`为例。

首先新建一个文件夹，然后在文件夹里面运行`powerShell`等命令行工具，以便命令行工具能定位到该文件夹下。

安装步骤如下：

1、安装为一个依赖包

```bash
npm add -D vitepress
```

这样在当前文件夹下会新建一个`node_modules`文件夹和一个`package.json`，当然还会有`package-lock.json`.

2、初始化`vitepress`

```bash
npx vitepress init
```

将需要回答几个简单的问题：

```json
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◆  Theme:
│  ● Default Theme (Out of the box, good-looking docs)
│  ○ Default Theme + Customization
│  ○ Custom Theme
└  Done! Now run npm run docs:dev and start writing.
```

重点关注第二个问题，`./docs` 它会在刚刚的全新文件夹下创建一个新的`docs`文件夹，这个可以理解为`vitepress`的根目录。`config`和`markdown`等文档都放置在此。

以上可参考官网：https://vitepress.dev/zh/guide/getting-started

## 二、在本地运行vitepress

就像步骤1最后的提示那样，我们可以在本地通过如下命令来预览新建好的静态站点。

```bash
npm run docs:dev
```

运行成功后，会在你默认的浏览器中打开一个域名，比如：http://localhost:5173/

最终的效果如下：

![image-20240111144253615](https://image.imqd.cn/202401111442704.png)

## 三、在本地书写markdown和简单的配置

#### 一、新建文档和markdown文件

统一在`docs`中新建一个文件夹，比如我们要存放`guide`的文档。

然后在该文件夹下新建一个`markdown`文件，在`markdown`中编写内容、代码等。

例如：

```bash
.
├─ guide
│  ├─ getting-started.md
│  └─ index.md
├─ index.md
└─ prologue.md
```

#### 二、配置访问地址（导航菜单）

`vitepress`启动本地开发后，支持热更新，也就是说内容更新后，会在打开的浏览器中能保持实时预览。

但是我们刚刚新建的文件并没有配置访问路径，需要配置才能看到效果。

找到`docs\.vitepress\config.js`下的`themeConfig`对象，进行如下配置：

```js
// 顶部菜单
nav: [
    { text: "首页", link: "/" },
    { text: "指南", link: "/guide/",activeMatch: '/guide/' },
],
// 侧边栏菜单    
sidebar: {
  "/guide/": 
  { 
      base: "/guide/", 
      items: [
      { text: "首页", link: "/" }, //对应index.md
      { text: "快速开始", link: "getting-started" },//对应 getting-started.md
    ],
    collapsed: false,
  },
},
```

参考地址：https://vitepress.dev/zh/guide/routing

<font color='red'>其他更多设置，请参考`02.vitepress进阶使用与定制化`</font>

## 四、部署到github pages并且每次提交都能自动部署

我们新建的站点自然是希望能部署到线上，然后在任意地方都可以访问，如果自己没有服务器，那么可以将`vitepress`部署到`github pages`，享受免费的部署服务。

接下来就是实现的具体步骤。

##### 1、首先在你的`github`中创建一个新的仓库，比如我的叫`blog`

这样我们就新建了一个空白的仓库，创建的仓库地址：`https://github.com/你的用户名/blog`

##### 2、将刚刚在本地新建的`vitepress`根目录，与`github`关联，并且推送到`github`仓库

首先确保`powerShell`命令行工具在本地站点下，然后依次执行如下指令：

```bash
git init
git add *
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/你的用户名/blog.git
git push -u origin main
```

这样`github`的空白仓库就同步了本地的站点了。

##### 3、确定站点到底是以根站点的方式存在还是二级目录站点存在

首先确定下我们的站点到底是以根站点的方式存在还是二级目录站点存在。他们的区别就像是这样：

> https://你的用户名.github.io/ (根目录)
>
> https://你的用户名.github.io/blog/ （二级目录）

如果是后者，那么就需要修改本地站点下的 `docs/.vitepress/config.mjs`文件，新增base配置项：

```js
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  base: '/blog/',  //这里就是二级目录名字，也是github的仓库名字,如果是
  title: "My Awesome Project",
  description: "A VitePress Site",
  ....
})
```

##### 4、新建`github pages`的自动部署文件

在本地站点根目录下，新建文件夹`.github`，再新建`workflows`文件夹，然后在这里面新建一个`deploy.yml`部署文件。

内容可以在https://vitepress.dev/zh/guide/deploy#github-pages 看到。

直接复制，不用改动任何东西。

```xml
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
#
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。如果你
  # 使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [main]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      # - uses: pnpm/action-setup@v2 # 如果使用 pnpm，请取消注释
      # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm # 或 pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Install dependencies
        run: npm ci # 或 pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: |
          npm run docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
          touch docs/.vitepress/dist/.nojekyll
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: docs/.vitepress/dist

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

##### 5、将以上本地文件变动通过如下指令提交到`github`仓库，进行最后的部署配置工作。

```bash
git add .
git commit -m '提交说明'
git push
```

##### 6、在vitepress对应的github仓库中进行最后的配置和部署

在存储库设置中的“Pages”菜单项下，选择“Build and deployment > Source > GitHub Actions”

![image-20240111143629067](https://image.imqd.cn/202401111436205.png)

<font color='red'>它会自动监测项目中的`deploy.yml`文件，并且会自动开始进行构建和部署工作。</font>

具体流程，可以在仓库的action面板中看到：

![image-20240112165528353](https://image.imqd.cn/202401121655504.png)

##### 7、等待部署完成，就可以直接访问部署好的vitepress站点了

比如我的站点是：https://imqdcn.github.io/blog/

##### 8、如何自动更新和部署

其实我们的工作都已经完成，你只需要在本地尽情的写作修改，然后记得及时提交到`github`，它就能自动部署，自动更新网站内容。这些都不需要手动操作了。

##### 9、可能的问题

我下载依赖包最开始用的是`pnpm`，没有生成`package-lock.json`导致部署失败，这时就需要用`npm`生成该文件，然后它会自动部署。

## 五、绑定到自己的域名，并开启https

虽然`https://用户名.github.io/blog/`看起来挺不错，但是我们可以将其绑定到自己的域名上，然后通过类似于`blog.xxx.cn`来访问。

你只需要按照下面的方法操作即可。

##### 1、域名解析

登录域名服务网站，进行域名解析，比如我的域名是阿里云的，我就需要在阿里云进行解析。

只需要将你的`二级域名` cname到 `<user>.github.io`，如下图所示：

![image-20240112171113108](https://image.imqd.cn/202401121711187.png)

##### 2、到github对应的仓库中进行设置

路径：`仓库-setting-pages-Custom domain`

添加刚刚在阿里云解析的域名，然后开启强制的`https`，这样就能通过`https://你的域名`访问`github pages`站点了。

![image-20240112171628103](https://image.imqd.cn/202401121716200.png)

比如这里，我就可以通过`https://blog.imqd.cn/`来访问。

https是免费的，空间也是免费的，只有域名是自己的。

更多`github pages`配置问题，请参考：https://docs.github.com/zh/pages/quickstart

## 六、部署到vercel

其实部署到`github pages`和`vercel`可以二选一，因为他们只是服务器不同，但是站点内容都是一样的。

但是`github`在国内访问不稳定，可以同步部署到`vercel`，以便拥有一个备用访问地址。

首先确保你已经注册了`vercel`了：https://vercel.com/login，可以直接用自己的`github`账号进行注册和关联，这样更方便操作。

![image-20240226163053640](https://image.imqd.cn/202402261630929.png)

然后按如下步骤进行操作。

##### 1、在`vitepress`根目录新增部署配置文件 

新建一个空白的文本文件，并重命名为`vercel.json`，然后一字不差的复制如下代码，并提交到`github`中

```json
{
  "cleanUrls": true,
  "framework": "vitepress",
  "installCommand": "npm install",
  "buildCommand": "npm run docs:build",
  "outputDirectory": "docs/.vitepress/dist"
}
```

即项目大概是这样的目录结构：

![image-20240226164830835](https://image.imqd.cn/202402261648977.png)

<font color='red'>接下来在vercel网站中进行操作</font>

##### 2、新建 project

![image-20240111145828135](https://image.imqd.cn/202401111458237.png)

##### 3、导入要部署的github仓库

![image-20240111145917903](https://image.imqd.cn/202401111459200.png)

> 如果没有看到自己的仓库，那么是因为权限不足，点击第二个红框处的链接，将对应的仓库加进来就可以看到了。

##### 4、点击import后，再点击deploy

![image-20240111150219095](https://image.imqd.cn/202401121103006.png)

##### 5、部署成功后，就可以看到访问地址

![image-20240226163726186](https://image.imqd.cn/202402261637007.png)

<font color='red'>如果github提交了，vercel也会重新部署。</font>所以只需要维护好`github`的仓库即可。

##### 6、可能的问题

1. 访问`vercel`部署的站点后，样式丢失。

   问题解决：

   因为我们在`config`中是用二级目录的方式部署的，所以，如果直接点击部署，那么部署的站点会丢失样式，这样就需要我们重新配置。

   可以将`base`中的配置重新改为`‘/’ `，再重新部署即可。
