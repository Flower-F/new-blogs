---
title: '50 天计划第 2 天'
date: '2022-10-06'
keywords: ['50 days']
---

## 准备工作

今天是 [50 天计划](https://yunhan.fun/notes/50-days-plan)的第 2 天。今天要完成的是第 2 个项目 Progress Steps。可以先看一下[页面效果](https://50projects50days-react.netlify.app/day/2)，对大体内容有个基本了解。

首先在 pages/day 目录下新建文件夹 2，并添加 `index.tsx` 文件。此时页面结构如下：

```bash
pages
  |-- index.tsx
  |-- day
      |-- 2
          |-- index.tsx
```

在 `pages/day/2/index.tsx` 中写入以下内容：

```tsx
const ProgressStepsPage = () => {
  return (
    <div>hello world</div>
  )
}

export default ProgressStepsPage
```

此时访问路由 [http://127.0.0.1:5173/day/2](http://127.0.0.1:5173/day/2)，可以看到一个 hello world。

## 项目开发

按照惯例，我们先把布局和基本的样式处理一下。

```tsx
const ProgressStepsItem = ({ step }: { step: number }) => {
  return (
    <li flex items-center>
      <div className={step > 0 ? 'w-80px h-4px bg-blue' : ''}></div>
      <div w-8 h-8 rounded-full flex items-center justify-center border-blue border-3 text-bluegray>
        {step + 1}
      </div>
    </li>
  )
}

const ProgressSteps = ({ steps }: { steps: number }) => {
  return (
    <div>
      <ul flex>
        {
          new Array(steps).fill(null).map((_, index) => (
            <ProgressStepsItem step={index} key={index} />
          ))
        }
      </ul>
      <div mt-8>
        <button bg="#3498db hover:#0f82c9" text-white rounded-2 p="x-30px y-6px" mr-4>Prev</button>
        <button bg="#3498db hover:#0f82c9" text-white rounded-2 p="x-30px y-6px">Next</button>
      </div>
    </div>
  )
}

const ProgressStepsPage = () => {
  return (
    <div flex items-center justify-center h-60vh>
      <ProgressSteps steps={4} />
    </div>
  )
}

export default ProgressStepsPage
```

逻辑部分与上一次的很相似，我们只需要维护一个当前的 stepIndex 就可以知道当前的 UI 视图情况。这里注意边界情况，stepIndex 的范围不能超出左右边界大小。通过 lastStep 传递给子组件当前最后一个被点亮的 step 是多少，然后子组件通过它即可获取自己的视图情况。

```tsx
const ProgressSteps = ({ steps }: { steps: number }) => {
  const [stepIndex, setStepIndex] = useState(0)

  return (
    <div>
      <ul flex>
        {
          new Array(steps).fill(null).map((_, index) => (
            <ProgressStepsItem step={index} key={index} lastStep={stepIndex} />
          ))
        }
      </ul>
      <div mt-8>
        <button
          text-white rounded-2 p="x-30px y-6px" mr-4
          className={stepIndex <= 0 ? 'bg-gray cursor-not-allowed' : 'bg-#3498db hover:bg-#0f82c9'}
          onClick={() => {
            if (stepIndex - 1 >= 0) {
              setStepIndex(stepIndex - 1)
            }
          }}
        >
          Prev
        </button>
        <button
          text-white rounded-2 p="x-30px y-6px"
          className={stepIndex >= steps - 1 ? 'bg-gray cursor-not-allowed' : 'bg-#3498db hover:bg-#0f82c9'}
          onClick={() => {
            if (stepIndex + 1 < steps) {
              setStepIndex(stepIndex + 1)
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
```

子组件实现这里需要考虑的是，原效果是通过宽度伸缩实现的，所以这里也需要实现宽度伸缩。实现的原理很简单，只要给一个 absolute 定位的子元素，然后根据条件判断修改子元素的宽度即可。

```tsx
const ProgressStepsItem = ({ step, lastStep }: { step: number; lastStep: number }) => {
  return (
    <li flex items-center>
      <div relative className={step > 0 ? 'bg-gray w-80px h-4px' : '' }>
        <div absolute bg-blue top-0 left-0 h-4px className={step > 0 && lastStep >= step ? 'w-80px' : 'w-0'}></div>
      </div>
      <div
        w-8 h-8 rounded-full flex items-center justify-center border-3 text-bluegray
        className={lastStep >= step ? 'border-blue' : 'border-gray'}
      >
        {step + 1}
      </div>
    </li>
  )
}
```

到这里效果就已经基本实现了，其余的就是一些动画参数的调整，具体的细节可以参考[源码](https://github.com/Flower-F/50projects50days/blob/main/src/pages/day/2/index.tsx)。
