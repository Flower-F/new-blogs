---
title: '50 天计划第 4 天'
date: '2022-10-09'
keywords: ['50 days']
---

## 准备工作

今天是 [50 天计划](https://yunhan.fun/notes/50-days-plan)的第 4 天。今天要完成的是第 4 个项目 Hidden Search。可以先看一下[页面效果](https://50projects50days-react.netlify.app/day/4)，对大体内容有个基本了解。

首先在 pages/day 目录下新建文件夹 4，并添加 `index.tsx` 文件。此时页面结构如下：

```plain
pages
  |-- index.tsx
  |-- day
      |-- 4
          |-- index.tsx
```

在 `pages/day/4/index.tsx` 中写入以下内容：

```tsx
const HiddenSearchPage = () => {
  return (
    <div>hello world</div>
  )
}

export default HiddenSearchPage
```

此时访问路由 [http://127.0.0.1:5173/day/4](http://127.0.0.1:5173/day/4)，可以看到一个 hello world。

## 项目开发

这期的项目应该是目前最简单的一个了，只有一个伸缩搜索框，就像前几期一样，我们只需要用一个状态来记录当前是展开还是收缩状态即可。

```tsx
const HiddenSearchPage = () => {
  const [hidden, setHidden] = useState(false)

  return (
    <div flex items-center justify-center h-70vh>
      <div h-50px flex items-center bg="#7d5fff" font-mono>
        <input bg="#7d5fff" outline-none text="black placeholder:black/50 xl" transition-all-400
          className={hidden ? 'w-0' : 'w-200px pl-10px'} type="text" placeholder="Search..."
        />
        <button flex ml-auto w-50px h-50px justify-center items-center onClick={() => setHidden(!hidden)}>
          <div bg-black w-30px h-30px i-charm-search></div>
        </button>
      </div>
    </div>
  )
}

export default HiddenSearchPage
```

到这里基本的效果已经实现了，但是还有一个小细节，就是我们按钮展开的时候，输入框是需要自动聚焦的，这样可以提升用户体验。实现这个效果，我们必须要直接调用 DOM 事件 focus，所以我们需要直接操作 DOM 节点，这时候我们需要遵循 React 的要求使用 useRef 这个 Hook，然后再用 useEffect 作为一个监听作用即可，但是这里我们起始状态起始并不需要判断是否 focus，所以我们可以使用 ahook 自带的拓展 Hook useUpdateEffect，这个 Hook 不同于 useEffect 的地方就是，它在页面首次加载的时候不会被触发，只有后续改变的时候才会触发，这样保证了页面不会有多余的 rerender。

关于 DOM 节点的 TS 类型定义，我们一般将它定义为类似于 `HTMLInputElement | null` 这种形式，然后在使用的时候对其进行一下判空操作即可。最终代码如下。

```tsx
const HiddenSearchPage = () => {
  const [hidden, setHidden] = useState(true)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useUpdateEffect(() => {
    if (!hidden && inputRef.current) {
      inputRef.current.focus()
    }
  }, [hidden])

  return (
    <div flex items-center justify-center h-70vh>
      <div h-50px flex items-center bg="#7d5fff" font-mono>
        <input bg="#7d5fff" outline-none text="black placeholder:black/50 xl" transition-all-400
          className={hidden ? 'w-0' : 'w-200px pl-10px'} type="text" placeholder="Search..." ref={inputRef}
        />
        <button flex ml-auto w-50px h-50px justify-center items-center onClick={() => setHidden(!hidden)}>
          <div bg-black w-30px h-30px i-charm-search></div>
        </button>
      </div>
    </div>
  )
}

export default HiddenSearchPage
```

到这里完整的效果就实现了，完整内容可以参考[源码](https://github.com/Flower-F/50projects50days/blob/main/src/pages/day/4/index.tsx)。
