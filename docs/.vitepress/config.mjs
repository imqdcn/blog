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
  head: [['link', { rel: 'icon', href: 'https://www.imqd.cn/wp-content/themes/imqd/images/favicon.ico' }]],
  themeConfig: {
    logo: "https://vitepress.dev/vitepress-logo-mini.svg",
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
      },
      {
        text: 'typescript',
        base: '/typescript/ruanyifeng/',
        items: [
          { text: 'ts学习-阮一峰版', link: '/' },
          { text: '01.简介', link: 'intro' },
          { text: '02.基本用法', link: 'basic' },
          { text: '03.any 类型', link: 'any' },
          { text: '04.类型系统', link: 'types' },
          { text: '05.数组', link: 'array' },
          { text: '06.元祖', link: 'tuple' },
          { text: '07.symbol 类型', link: 'symbol' },
          { text: '08.函数', link: 'function' },
          { text: '09.对象', link: 'object' },
          { text: '10.接口（interface）', link: 'interface' },
          { text: '11.类', link: 'class' },
          { text: '12.泛型', link: 'generics' },
          { text: '13.Enum（枚举） 类型', link: 'enum' },
          { text: '14.类型断言', link: 'assert' },
          { text: '15.模块', link: 'module' },
          { text: '16.namespace（命名空间）', link: 'namespace' },
          { text: '17.装饰器', link: 'decorator' },
          { text: '18.装饰器（旧语法）', link: 'decorator-legacy' },
          { text: '19.declare 关键字', link: 'declare' },
          { text: '20.d.ts类型声明文件', link: 'd.ts' },
          { text: '21.类型运算符', link: 'operator' },
          { text: '22.类型映射', link: 'mapping' },
          { text: '23.类型工具', link: 'utility' },
          { text: '24.注释指令', link: 'comment' },
          { text: '25.tsconfig.json 文件', link: 'tsconfig.json' },
          { text: '26.tsc命令', link: 'tsc' },
          { text: '27.ts的es6 类型', link: 'es6' },
          { text: '28.类型缩小', link: 'narrowing' },
          { text: '29.使用 npm 模块', link: 'npm' },
          { text: '30.类型运算', link: 'type-operations' },
          { text: '31.react支持', link: 'react' },
        ],
        collapsed:true
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/imqdcn/blog' }
    ],
    // 页脚
    footer: {
      message: '本站为资深前端开发与前端培训罗老师(微信号：imqdcnn)运营，未经许可禁止任何形式的转载',
      copyright: 'Copyright © imqd.cn'
    }
  }
})
