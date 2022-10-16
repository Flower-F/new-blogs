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

## 项目开发

我们先完成以下项目整体的布局，这里子节点的居中使用了绝对定位加上负 translate 二分之一的结合方式。

```tsx
import bg from '~/assets/5/bg.png'

const BlurryLoadingPage = () => {
  return (
    <div flex items-center justify-center h-90vh>
      <div bg-black p-10px relative shadow-gray shadow-sm rounded-2>
        <img src={bg} alt="" w="70%" object-cover />
        <div absolute top="1/2" left="1/2" text="white 4rem" font-bold className="-translate-x-1/2 -translate-y-1/2">
          99
        </div>
      </div>
    </div>
  )
}

export default BlurryLoadingPage
```

布局完成后，我们先处理一下数字的动态变化，这里需要在 useEffect 里面设置定时器进行处理，同时记得要在 useEffect 的返回值里面进行定时器清除。

```tsx
import bg from '~/assets/5/bg.png'

const BlurryLoadingPage = () => {
  const [loadingNum, setLoadingNum] = useState(0)

  const blurring = useCallback(() => {
    setLoadingNum(loadingNum => loadingNum + 1)
  }, [])

  useEffect(() => {
    if (loadingNum >= 100) {
      return
    }

    const timer = setTimeout(() => {
      blurring()
    }, 30)

    return () => {
      clearTimeout(timer)
    }
  }, [blurring, loadingNum])

  return (
    <div flex items-center justify-center>
      <div bg-black p-10px relative shadow-gray shadow-sm rounded-2>
        <img src={bg} alt="" w-500px object-cover />
        <div absolute top="1/2" left="1/2" text="white 4rem" font-bold className="-translate-x-1/2 -translate-y-1/2">
          {`${loadingNum}%`}
        </div>
      </div>
    </div>
  )
}

export default BlurryLoadingPage
```

下面进行动画的处理，随着数值的变化，数字的透明度需要逐渐减小为 0，图片的模糊程度也是一样。这里需要直接操作样式，也就是直接操作 DOM，所以需要使用 useRef 这个 Hook。

```tsx
import bg from '~/assets/5/bg.png'

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

const BlurryLoadingPage = () => {
  const [loadingNum, setLoadingNum] = useState(0)
  const loadingNumRef = useRef<HTMLDivElement | null>(null)
  const backgroundRef = useRef<HTMLImageElement | null>(null)

  const blurring = useCallback(() => {
    if (!loadingNumRef.current || !backgroundRef.current) {
      return
    }

    setLoadingNum(loadingNum => loadingNum + 1)
    loadingNumRef.current.style.opacity = String(scale(loadingNum, 0, 100, 1, 0))
    backgroundRef.current.style.filter = `blur(${scale(loadingNum, 0, 100, 30, 0)}px)`
  }, [loadingNum])

  useEffect(() => {
    if (loadingNum >= 100) {
      return
    }

    const timer = setTimeout(() => {
      blurring()
    }, 30)

    return () => {
      clearTimeout(timer)
    }
  }, [blurring, loadingNum])

  return (
    <div flex items-center justify-center h-90vh>
      <div bg-black p-10px relative shadow-gray shadow-sm rounded-2>
        <img src={bg} alt="" w="70%" object-cover ref={backgroundRef} />
        <div absolute top="1/2" left="1/2" text="white 4rem" font-bold className="-translate-x-1/2 -translate-y-1/2" ref={loadingNumRef}>
          {`${loadingNum}%`}
        </div>
      </div>
    </div>
  )
}

export default BlurryLoadingPage
```

这里可以学习一下这个 scale 函数的写法，它的作用是将一个范围内的数字某个映射到另一个范围内的另一个数字。到这里完整的效果就实现了，完整内容可以参考[源码](https://github.com/Flower-F/50projects50days/blob/main/src/pages/day/5/index.tsx)。
