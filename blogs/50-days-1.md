---
title: '50 天计划第 1 天'
date: '2022-10-05'
keywords: ['50 days']
---

今天是 [50 天计划](https://momohanbao.com/notes/50-days-plan)的第 1 天。今天的目标很简单，就是搭建环境，然后完成第一个项目。

## 创建项目

这里使用 [Revitesse-Lite](https://github.com/Flower-F/revitesse-lite) 作为启动模板。Revitesse 基本集成了 React + Vite 的一些最佳实践，免去了配置环节。

```bash
$ npx degit flower-f/revitesse-lite 50days
$ cd 50days
$ git init
$ pnpm i
```

因为 Revitesse 使用了动态路由的工具，所以只需要修改目录结构就能自动生成路由。将项目目录结构更改为：

```plain
pages
  |-- index.tsx
  |-- day
      |-- 1
          |-- index.tsx
```

在 `pages/day/1/index.tsx` 中写入以下内容：

```tsx
const ExpandingCards = () => {
  return (
    <div>ExpandingCards</div>
  )
}

export default ExpandingCards
```

此时访问路由 [http://127.0.0.1:5173/day/1](http://127.0.0.1:5173/day/1)，可以看到一个 hello world。

## 页面开发

可以先看一下[页面效果](https://50projects50days-react.netlify.app/day/1)，对大体内容有个基本了解。

我们先完成一下页面的基本布局，借助 UnoCSS，我们可以很方便地完成布局。这里把 cardList 配置单独抽出来，是为了便于后续维护。

```tsx
import img1 from '~/assets/1/1.png'
import img2 from '~/assets/1/2.png'
import img3 from '~/assets/1/3.png'
import img4 from '~/assets/1/4.png'
import img5 from '~/assets/1/5.png'

interface ItemType {
  title: string
  source: string
}

const originalCardList: ItemType[] = [
  {
    title: 'Explore The World',
    source: img1,
  },
  {
    title: 'Wild Forest',
    source: img2,
  },
  {
    title: 'Sunny Beach',
    source: img3,
  },
  {
    title: 'City on Winter',
    source: img4,
  },
  {
    title: 'Mountains - Clouds',
    source: img5,
  },
]

const ExpandingCards = () => {
  return (
    <div flex items-center justify-center>
      <div flex items-center className="w-90%">
        {
          originalCardList.map((cardItem, index) => (
            <button key={index} relative mx-2>
              <img src={cardItem.source} alt={cardItem.title} h-80vh object-cover rounded-50px />
              <h3 absolute left-20px bottom-40px text="xl left white" font-extrabold>
                {cardItem.title}
              </h3>
            </button>
          ))
        }
      </div>
    </div>
  )
}

export default ExpandingCards
```

现在布局效果已经基本出来了。我们首先做一件事情，把列表渲染的 item 部分抽出来。

```tsx
const CardItem = ({ cardItem }: { cardItem: ItemType } & Partial<JSX.IntrinsicElements['button']>) => {
  return (
    <button relative mx-2>
      <img src={cardItem.source} alt={cardItem.title} h-80vh object-cover rounded-50px />
      <h3 absolute left-20px bottom-40px text="xl left white" font-extrabold>
        {cardItem.title}
      </h3>
    </button>
  )
}

const ExpandingCardsPage = () => {
  return (
    <div flex items-center justify-center>
      <div flex items-center className="w-90%">
        {
          originalCardList.map((cardItem, index) => (
            <CardItem cardItem={cardItem} key={index} />
          ))
        }
      </div>
    </div>
  )
}
```

下面我们开始梳理逻辑部分。折叠卡的具体表现形式是展开的时候卡片占据的比例不同，要实现这一效果，我们很容易想到通过 flex 布局实现。
只需要给展开的卡片设置 flex-grow 大于 1（我设置的是 5），缩着的卡片设置 flex-grow 小于 1 （我设置的是 0.6）即可。另外还需要设置 flex-basis 为 0。这里采取维护一个状态记录当前的展开项 index 是多少，从而识别当前卡片状态是展开还是收缩。

```tsx
const CardItem = ({ cardItem, expand, onClick }: { cardItem: ItemType; expand: boolean } & Partial<JSX.IntrinsicElements['button']>) => {
  return (
    <button relative mx-2 basis-0 className={expand ? 'grow-5' : 'grow-0.6'} onClick={onClick}>
      <img src={cardItem.source} alt={cardItem.title} h-80vh object-cover rounded-50px />
      <h3 absolute left-20px bottom-40px text="xl left white" font-extrabold>
        {cardItem.title}
      </h3>
    </button>
  )
}

const ExpandingCardsPage = () => {
  const [expandIndex, setExpandIndex] = useState(0)

  return (
    <div flex items-center justify-center>
      <div flex items-center className="w-90%">
        {
          originalCardList.map((cardItem, index) => (
            <CardItem
              cardItem={cardItem}
              key={index}
              expand={expandIndex === index}
              onClick={() => setExpandIndex(index)}
            />
          ))
        }
      </div>
    </div>
  )
}
```

因为 UnoCSS 按需打包的特性，记得要在 `uno.config.ts` 中添加上对应的 safelist 配置，否则可能会得不到想要的效果。

```ts
export default defineConfig({
  // ...
  safelist: [
    'grow-0.6',
    'grow-5',
  ],
})
```

此时基本的效果已经实现，但是还有些细节需要调整，比如说文字部分，当卡片收缩的时候应该隐藏文字，这也很简单。给 h3 标签添加上 
`className={expand ? 'visible' : 'invisible'}` 即可，当然 visible 和 invisible 也都需要添加到 safelist 中。

最后只需要把一些动画参数添加上去，以及处理一下响应式即可，具体的细节可以参考[源码](https://github.com/Flower-F/50projects50days/blob/main/src/pages/day/1/index.tsx)。
