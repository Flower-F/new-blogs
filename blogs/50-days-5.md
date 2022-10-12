---
title: '50 天计划第 5 天'
date: '2022-10-11'
keywords: ['50 days']
---

## 准备工作

今天是 [50 天计划](https://yunhan.fun/notes/50-days-plan)的第 5 天。今天要完成的是第 5 个项目 Blurry Loading。可以先看一下[页面效果](https://50projects50days-react.netlify.app/day/5)，对大体内容有个基本了解。

首先在 pages/day 目录下新建文件夹 5，并添加 `index.tsx` 文件。此时页面结构如下：

```plain
pages
  |-- index.tsx
  |-- day
      |-- 5
          |-- index.tsx
```

在 `pages/day/5/index.tsx` 中写入以下内容：

```tsx
const BlurryLoadingPage = () => {
  return (
    <div>hello world</div>
  )
}

export default BlurryLoadingPage
```

此时访问路由 [http://127.0.0.1:5173/day/5](http://127.0.0.1:5173/day/5)，可以看到一个 hello world。
