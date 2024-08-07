// import fs from 'fs'
import { defineConfig } from "vitepress";
// import { VPTeamMembers } from 'vitepress/theme'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  // outDir: "../dist",   // 打包到跟目录下，默认在.vitepress下
  base: "/", //如果是二级目录，则需要配置与github仓库名一样的目录，比如blog
  title: "前端三评",
  description:
    "imqdcn的静态站点，专注于前端技术，AI，最新科技，前端罗老师的工作生活笔记",
  lastUpdated: true, // 显示最后更新时间
  ignoreDeadLinks: true, //忽略死链查询
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://www.imqd.cn/wp-content/themes/imqd/images/favicon.ico",
      },
    ],
    [
      "script",
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.min.js",
      },
    ],
    ["meta", { property: "og:title", content: "web前端圈技术博客 | 前端三评" }],
    [
      "meta",
      {
        property: "og:description",
        content: "web前端开发, 全栈开发, 前端资源",
      },
    ],
    // 51la
    [
      "script",
      {
        charset: "UTF-8",
        id: "LA_COLLECT",
        src: "//sdk.51.la/js-sdk-pro.min.js?id=3IwQUIoQSskc8iCO&ck=3IwQUIoQSskc8iCO",
      },
    ],
    // [
    //   "script",
    //   {},
    //   `!function(p){"use strict";!function(t){var s=window,e=document,i=p,c="".concat("https:"===e.location.protocol?"https://":"http://","sdk.51.la/js-sdk-pro.min.js"),n=e.createElement("script"),r=e.getElementsByTagName("script")[0];n.type="text/javascript",n.setAttribute("charset","UTF-8"),n.async=!0,n.src=c,n.id="LA_COLLECT",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:"3IwQUIoQSskc8iCO",ck:"3IwQUIoQSskc8iCO",hashMode:true});`,
    // ],
    // google analytics
    // [
    //   "script",
    //   {
    //     async: true,
    //     src: "https://www.googletagmanager.com/gtag/js?id=G-W6SWK27Q1Z",
    //   },
    // ],
    // [
    //   "script",
    //   {},
    //   `window.dataLayer = window.dataLayer || [];
    //    function gtag(){dataLayer.push(arguments);}
    //    gtag('js', new Date());

    //    gtag('config', 'G-W6SWK27Q1Z');`,
    // ],
  ],
  markdown: {},
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: "https://vitepress.dev/vitepress-logo-mini.svg",
    search: {
      provider: "local",
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "前端开发", link: "/WebFront/", activeMatch: "/WebFront/" },
      { text: "后端服务", link: "/Backend/", activeMatch: "/Backend/" },
      { text: "AI", link: "/AI/", activeMatch: "/AI/" },
      { text: "轻记", link: "/Record/", activeMatch: "/Record/" },
      { text: "联系我", link: "/contact", activeMatch: "/contact" },
    ],
    sidebar: {
      "/WebFront/": { base: "/WebFront/", items: sidebarWebFront() },
      "/Backend/": { base: "/Backend/", items: sidebarBackend() },
      "/AI/": { base: "/AI/", items: sidebarAI() },
      "/Record/": { base: "/Record/", items: sidebarRecord() },
    },
    socialLinks: [{ icon: "github", link: "https://github.com/imqdcn" }],
    outlineTitle: "目录",
    outline: [2, 4], //目录显示级别
    // 页脚
    footer: {
      message:
        "前端三评为个人技术博客，你可与我联系(v：imqdcnn)，未经许可禁止任何形式的转载",
      copyright: `Copyright © 2016-${new Date().getFullYear()}  imqd.cn`,
    },
  },
});
// 导入侧边栏目录文件
import WebFront from "../../public/sidebar/WebFront.js";
import Backend from "../../public/sidebar/Backend.js";
import AI from "../../public/sidebar/AI.js";
import Record from "../../public/sidebar/Record.js";

function sidebarWebFront() {
  // const content = fs.readFileSync('./public/sidebar/WebFront.json', 'utf8').toString()
  // const json = JSON.parse(content)
  // console.log(json)
  return WebFront;
}

function sidebarBackend() {
  return Backend;
}

function sidebarAI() {
  return AI;
}

function sidebarRecord() {
  return Record;
}
