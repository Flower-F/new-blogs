---
title: '50 天计划第 6 天'
date: '2022-10-17'
keywords: ['50 days']
---

## 准备工作

今天是 [50 天计划](https://yunhan.fun/notes/50-days-plan)的第 6 天。今天要完成的是第 6 个项目 Scroll Animation。可以先看一下[页面效果](https://50projects50days-react.netlify.app/day/6)，对大体内容有个基本了解。

首先在 pages/day 目录下新建文件夹 6，并添加 `index.tsx` 文件。此时页面结构如下：

```plain
pages
  |-- index.tsx
  |-- day
      |-- 6
          |-- index.tsx
```

在 `pages/day/6/index.tsx` 中写入以下内容：

```tsx
const ScrollAnimationPage = () => {
  return (
    <div>hello world</div>
  )
}

export default ScrollAnimationPage
```

此时访问路由 [http://127.0.0.1:5173/day/6](http://127.0.0.1:5173/day/6)，可以看到一个 hello world。

## 项目开发

先把页面布局弄一下。

```tsx
const Item = () => {
  return (
    <div flex justify-center items-center h-240px w-360px shadow-lg shadow-gray
      bg="#4682b4" text="white 4xl" font-bold rounded-lg
    >
      Hello World
    </div>
  )
}

const ScrollAnimationPage = () => {
  return (
    <>
      <h1 font-extrabold text-3xl mb-20px>Scroll to see the animation</h1>
      <div flex gap-6 items-center flex-col>
        {
          new Array(8).fill(null).map((item, index) => (
            <Item key={index} />
          ))
        }
      </div>
    </>
  )
}

export default ScrollAnimationPage
```


