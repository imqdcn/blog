
# vitepress从0开始部署笔记

## 一、在本地安装vitepress

前置条件：需安装`Node.js 18` 及以上版本。

按照官网说明，可以在当前项目安装或独立为一个`vitepress`项目。这个可以理解为：

1、比如我开发了一个开源项目，需要为这个项目添加使用文档或接口文档，那么我就可以在这个项目中添加`vitepress`，并且新建一个`docs`文件夹来运行vitepress。

2、比如我仅仅只是想将vitepress当做一个个人博客，那么就可以新建一个全新的文件夹，然后安装vitepress。

但是不管是哪种方式，安装命令都是一样的。这里为了方便操作，我以场景2为例。

首先新建一个文件夹，然后在文件夹里面运行powerShell等命令行工具，以便命令行工具能定位到该文件夹下。

安装步骤如下：

1、安装为一个依赖包

```bash
npm add -D vitepress
```

这样在当前文件夹下会新建一个`node_modules`文件夹和一个`package.json`，当然还会有`package-lock.json`.

2、初始化vitepress

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

可以看到这个域名是顶级域名，也就是当做独立站点来看到的。最终的效果如下：

![image-20240111144253615](https://image.imqd.cn/202401111442704.png)

## 三、部署到github pages并且每次提交都能自动部署

我们新建的站点自然是希望能部署到线上，然后在任意地方都可以访问，如果自己没有服务器，那么可以将vitepress部署到github pages，享受免费的部署服务。

接下来就是实现的具体步骤。

##### 1、首先在你的`github`中创建一个新的仓库，比如我的叫`myvitepress`

这样我们就新建了一个空白的仓库。

##### 2、将刚刚在本地新建的`vitepress`根目录，与`github`关联，并且推送到`github`仓库

首先确保`powerShell`命令行工具在本地站点下，然后依次执行如下指令：

```bash
git init
git add *
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/imqdcn/justtest.git
git push -u origin main
```

这样github的空白仓库就同步了本地的站点了。

##### 3、确定站点到底是以根站点的方式存在还是二级目录站点存在

首先确定下我们的站点到底是以根站点的方式存在还是二级目录站点存在。他们的区别就像是这样：

https://imqdcn.github.io/ (根目录)

https://imqdcn.github.io/myvitepress/ （二级目录）

我的建议是二级目录，这样你就可以部署其他更多的二级目录。（更多站点）

如果是后者，那么就需要修改本地站点下的 `docs/.vitepress/config.mjs`文件，新增base配置项：

```js
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  base: '/myvitepress/',  //这里就是二级目录名字，也是github的仓库名字
  title: "My Awesome Project",
  description: "A VitePress Site",
  ....
})
```

##### 4、新建`github pages`的自动部署文件

在本地站点根目录下，新建文件夹`.github`，再新建`workflows`文件夹，然后在这里面新建一个`deploy.yml`部署文件。内容可以在https://vitepress.dev/zh/guide/deploy#github-pages 看到。直接复制，不用改动任何东西。

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

![image-20240111143843922](https://image.imqd.cn/202401111438481.png)

##### 7、等待部署完成，就可以直接访问部署好的vitepress站点了

比如我的站点是：https://imqdcn.github.io/myvitepress/

##### 8、如何自动更新和部署

其实我们的工作都已经完成，你只需要在本地尽情的写作修改，然后记得及时提交到github，它就能自动部署，自动更新网站内容。这些都不需要手动操作了。

##### 9、可能的问题

我下载依赖包最开始用的是`pnpm`，没有生成`package-lock.json`导致部署失败，这时就需要用`npm`生成该文件，然后它会自动部署，这次就成功了。

## 四、部署到vercel

其实部署到`github pages`和`vercel`可以二选一，因为他们只是服务器不同，但是站点内容都是一样的。

首先确保你已经注册了`vercel`了，可以直接用自己的`github`账号注册和关联。

1、新建 project

![image-20240111145828135](https://image.imqd.cn/202401111458237.png)

2、导入要部署的github仓库

![image-20240111145917903](https://image.imqd.cn/202401111459200.png)

> 如果没有看到自己的仓库，那么是因为权限不足，点击第二个红框处的链接，将对应的仓库加进来就可以看到了。

3、点击import后，再点击deploy

![image-20240111150219095](https://image.imqd.cn/202401121103006.png)

请注意，因为我们在config中是用二级目录的方式部署的，所以，如果直接点击部署，那么部署的站点会丢失样式，这样就需要我们重新配置。

可以将base中的配置重新改为‘/’ ，再重新部署即可。

如果github提交了，vercel也会重新部署。

问题，当我将base的改为/后，发现githubpages变成了刚刚vercel的样子，没有样式，访问页面会404，怀疑是缓存的问题。