import { defineConfig } from 'vitepress'
// import { VPTeamMembers } from 'vitepress/theme'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  base: '/myvitepress/',
  title: "我的vitepress博客",
  description: "一个基于vitepress的静态站点，使用markdown编写",
  lastUpdated: true,// 显示最后更新时间
  ignoreDeadLinks: true,//忽略死链查询
  themeConfig: {
    logo: "https://vitepress.dev/vitepress-logo-mini.svg",
    // 无效，不知道怎么用
    // team: {
    //   // 团队成员列表
    //   members: [
    //     {
    //       name: "John Doe",
    //       title: "CEO",
    //       image: "/images/john-doe.jpg",
    //       social: {
    //         github: "https://github.com/johndoe",
    //         linkedIn: "https://www.linkedin.com/in/johndoe/",
    //       },
    //     }
    //   ],
    // },
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: '学习', link: '/study/vitepress' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: '学习',
        items: [
          { text: '技能学习', link: '/study/' },
          { text: '从0开始部署vitepress', link: '/study/vitepress' }
        ],
        collapsed:true
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/imqdcn/myvitepress' }
    ],
    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © imqd.cn'
    }
  }
})
