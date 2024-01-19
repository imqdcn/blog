// import fs from 'fs'
import { defineConfig } from 'vitepress'
// import { VPTeamMembers } from 'vitepress/theme'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  // base: '/blog/',
  title: "前端三评",
  description: "imqdcn的静态站点，专注于前端技术，AI，最新科技，前端罗老师的工作生活笔记",
  lastUpdated: true,// 显示最后更新时间
  ignoreDeadLinks: true,//忽略死链查询
  head: [
    ['link', { rel: 'icon', href: 'https://www.imqd.cn/wp-content/themes/imqd/images/favicon.ico' }],
    ['meta', { property: 'og:title', content: 'web前端圈技术博客 | 前端三评' }],
    ['meta', { property: 'og:description', content: 'web前端开发, 全栈开发, 前端资源' }],
     // google analytics
     ['script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-W6SWK27Q1Z' }],
     ['script', {}, `window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
 
       gtag('config', 'G-W6SWK27Q1Z');`],
  ],
  markdown: {
    headers: {
      level: [0, 5]
    }
  },
  themeConfig: {
    logo: "https://vitepress.dev/vitepress-logo-mini.svg",
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '前端开发', link: '/WebFront/' },
      { text: 'AI', link: '/AI/' },
      { text: '轻记', link: '/Record/' }
    ],
    sidebar: {
      '/WebFront/': { base: '/WebFront/', items: sidebarWebFront() },
      '/AI/': { base: '/AI/', items: sidebarAI() },
      '/Record/': { base: '/Record/', items: sidebarRecord() }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/imqdcn/blog' }
    ],
    // 页脚
    footer: {
      message: '前端三评为资深全栈开发与前端培训罗老师(v：imqdcnn)的个人技术博客，未经许可禁止任何形式的转载',
      copyright: `Copyright © 2016-${new Date().getFullYear()}  imqd.cn`
    }
  }
})
// 导入侧边栏目录文件
import WebFront from '../../public/sidebar/WebFront.js'
import AI from '../../public/sidebar/AI.js'
import Record from '../../public/sidebar/Record.js'

function sidebarWebFront(){
  // const content = fs.readFileSync('./public/sidebar/WebFront.json', 'utf8').toString()
  // const json = JSON.parse(content)
  // console.log(json)
  return WebFront;
}

function sidebarAI(){
  return AI;
}

function sidebarRecord(){
  return Record;
}