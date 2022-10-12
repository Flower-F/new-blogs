---
title: '50 天计划第 3 天'
date: '2022-10-07'
keywords: ['50 days']
---

## 准备工作

今天是 [50 天计划](https://yunhan.fun/notes/50-days-plan)的第 3 天。今天要完成的是第 3 个项目 Rotating Navigation。可以先看一下[页面效果](https://50projects50days-react.netlify.app/day/3)，对大体内容有个基本了解。

首先在 pages/day 目录下新建文件夹 3，并添加 `index.tsx` 文件。此时页面结构如下：

```plain
pages
  |-- index.tsx
  |-- day
      |-- 3
          |-- index.tsx
```

在 `pages/day/3/index.tsx` 中写入以下内容：

```tsx
const RotatingNavigationPage = () => {
  return (
    <div>hello world</div>
  )
}

export default RotatingNavigationPage
```

此时访问路由 [http://127.0.0.1:5173/day/3](http://127.0.0.1:5173/day/3)，可以看到一个 hello world。

## 项目开发

这个页面的布局基本上比较简单，所以这里不详细讲解。不过这里介绍一下 UnoCSS 的一个 icon 的特性 `Use any icons with Pure CSS for UnoCSS`，这得益于 UnoCSS 的 [preset-icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons)。你可以通过 `$prefix-$collection-$icon` 获取图标，并且可以给它随便更换颜色。默认的 prefix 是 i，具体的图标可以在 [https://icones.js.org](https://icones.js.org) 中查找。比如我这里选择的是 charm-menu-hamburger 这个图标，也就是 i-charm-menu-hamburger，但是在此之前还需要先安装 charm 对应的 iconify-json。

```bash
pnpm i @iconify-json/charm -D
```

```tsx
import dogImage from '~/assets/3/dog.png'

const RotatingNavigationPage = () => {
  return (
    <div flex items-center justify-center p-50px font-mono>
      <div fixed z-10 className="-top-100px -left-100px">
        <div h-200px w-200px rounded-full relative bg="#ff7979">
          <button w-40px h-40px absolute left-123px top-126px text-white>
            <div i-charm-menu-hamburger w-32px h-32px bg-white font-bold></div>
          </button>
        </div>
      </div>
      <article text-start max-w-1000px>
        <h1 text-4xl font-bold>Amazing Article</h1>
        <i text-sm>Florin Pop</i>
        <p mt-16px>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Accusantium quia in ratione dolores cupiditate, maxime aliquid impedit
          dolorem nam dolor omnis atque fuga labore modi veritatis porro laborum minus,
          illo, maiores recusandae cumque ipsa quos. Tenetur, consequuntur mollitia
          labore pariatur sunt quia harum aut. Eum maxime dolorem provident natus
          veritatis molestiae cumque quod voluptates ab non, tempore cupiditate?
          Voluptatem, molestias culpa. Corrupti, laudantium iure aliquam rerum
          sint nam quas dolor dignissimos in error placeat quae temporibus minus
          optio eum soluta cupiditate! Cupiditate saepe voluptates laudantium.
          Ducimus consequuntur perferendis consequatur nobis exercitationem molestias
          fugiat commodi omnis. Asperiores quia tenetur nemo ipsa.
        </p>

        <h2 text-2xl font-bold my-12px>My Dog</h2>
        <img src={dogImage} alt="dog" w-full />
        <p mt-16px>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Sit libero deleniti rerum quo, incidunt vel consequatur culpa ullam.
          Magnam facere earum unde harum. Ea culpa veritatis magnam at aliquid.
          Perferendis totam placeat molestias illo laudantium? Minus id minima doloribus
          dolorum fugit deserunt qui vero voluptas, ut quia cum amet temporibus veniam ad ea
          ab perspiciatis, enim accusamus asperiores explicabo provident. Voluptates sint,
          neque fuga cum illum, tempore autem maxime similique laborum odio, magnam esse. Aperiam?
        </p>
      </article>
    </div>
  )
}

export default RotatingNavigationPage
```

下面处理动画的部分，其实涉及到 CSS 动画处理的情况，我们基本上都只需要关注起始状态和最终状态即可。比如这里最终状态就是页面整体倾斜，左上角按钮逆时针移动 90°，左下角的菜单栏出现。分析清楚状态之后，就知道这里动画其实也并不复杂，只要使用一个状态进行控制就行了。关于开关状态的控制，其实要用 checkbox 也是可以的，但是这里我还是使用 useState，为了便于代码的实现。

我们先处理旋转的部分。这里通过设置负数的 rotate 实现逆时针的旋转。

```tsx
const RotatingNavigationPage = () => {
  const [rotated, setRotated] = useState(false)

  return (
    <div flex items-center justify-center p-50px font-mono>
      <div fixed className="-top-100px -left-100px" z-10>
        <div h-200px w-200px rounded-full relative bg="#ff7979" transition-all-400 className={rotated ? '-rotate-90' : ''}>
          <button w-44px h-44px absolute left-123px top-126px text-white onClick={() => setRotated(true)}>
            <div i-charm-menu-hamburger w-34px h-34px bg-white font-bold></div>
          </button>
          <button w-44px h-44px absolute left-30px top-120px text-white onClick={() => setRotated(false)}>
            <div i-charm-cross w-44px h-44px bg-white font-bold></div>
          </button>
        </div>
      </div>
      <article text-start max-w-1000px origin-left-top transition-all-400 className={rotated ? '-rotate-18' : ''}>
        {/*...*/}
      </article>
    </div>
  )
}
```

接下来处理菜单部分动画，这里使用 translateX 而不是绝对定位 left，因为用 left 时，每一帧内 CPU 都需要计算该元素的其他样式，尤其是需要复杂计算的盒阴影，渐变，圆角等，很容易造成卡顿。而调用 translateX，会启动 GPU 加速。这样，CPU 就会相对解放出来进行其他的计算，同时 GPU 对样式的计算速度较快，可以保证较高的帧率。

```tsx
<nav fixed left-40px bottom-40px>
  <ul text-lg>
    <li flex items-center transition-all-400 className={rotated ? '' : '-translate-x-120px'}>
      <div i-charm-home mr-2></div>
        HOME
    </li>
    <li flex items-center mt-20px ml-20px transition-all-400 className={rotated ? '' : '-translate-x-140px'}>
      <div i-charm-person mr-2></div>
      ABOUT
    </li>
    <li flex items-center mt-20px ml-40px transition-all-400 className={rotated ? '' : '-translate-x-180px'}>
    <div i-charm-mail mr-2></div>
      CONTACT
    </li>
  </ul>
</nav>
```

到这里完整的效果就实现了，完整内容可以参考[源码](https://github.com/Flower-F/50projects50days/blob/main/src/pages/day/3/index.tsx)。
