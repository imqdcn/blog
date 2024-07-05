export default [
  {
    link: "/",
    text: "说明",
  },
  {
    base: "/Backend/strapiv5/",
    text: "strapi v5",
    items: [
      { text: "01.安装", link: "01.安装" },
      { text: "02.运行", link: "02.运行" },
      { text: "03.CentOS7安装nodejs18和yarn", link: "03.CentOS7安装nodejs18和yarn" },
      { text: "04.使用navicat管理数据库", link: "04.使用navicat管理数据库" },
      { text: "05.常见问题-FAQ", link: "05.常见问题-FAQ" },
      { text: "06.将界面语言改为中文", link: "06.将界面语言改为中文" },
      { text: "07.安装插件", link: "07.安装插件" },
      { text: "08.注册用户表user说明", link: "08.注册用户表user说明" },
    ],
    collapsed: true,
  },
  {
    base: "/Backend/supabase/",
    text: "supabase",
    items: [
      { text: "01.它是什么", link: "01.它是什么" },
      { text: "02.简易使用教程", link: "02.简易使用教程" },
      { text: "03.使用postman联调API", link: "03.使用postman联调API" },
    ],
    collapsed: true,
  },
  {
    base: "/Backend/appwrite/",
    text: "appwrite",
    items: [
      { text: "01.使用docker在本地安装和开发", link: "01.使用docker在本地安装和开发" },
      { text: "02.使用postman调试", link: "02.使用postman调试" },
    ],
    collapsed: true,
  }
];
