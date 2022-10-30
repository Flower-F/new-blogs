---
title: '栈与队列'
date: '2022-10-21'
keywords: ['Data Structure']
---

## [用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/)

这题主要考察使用两个栈实现队列，难度不大。

```ts
class MyQueue {
  /** 入栈 */
  private stackIn: number[] = []
  /** 出栈 */
  private stackOut: number[] = []

  push(x: number): void {
    this.stackIn.push(x)
  }

  pop(): number {
    // 出栈不为空
    if (this.stackOut.length) {
      return this.stackOut.pop()
    } 
    // 出栈为空
    while (this.stackIn.length) {
      this.stackOut.push(this.stackIn.pop())
    }
    return this.stackOut.pop()
  }

  peek(): number {
    // 复用 pop 函数
    const popNum = this.pop()
    // 将已经 pop 出的数字装回去
    this.stackOut.push(popNum)
    return popNum
  }

  empty(): boolean {
    return this.stackIn.length === 0 && this.stackOut.length === 0
  }
}
```

## [用队列实现栈](https://leetcode.cn/problems/implement-stack-using-queues/)

对比起用栈实现队列，用队列实现栈其实是个没什么太大难度的问题，因为就是一个单纯的暴力解法。但是我们很容易会受到上面 `用栈实现队列` 一题的误导，使用两个队列进行实现。其实这道题我们是不需要使用两个队列的，只要一个队列就够了。在模拟栈弹出元素的时候只要将队列除了最后一个元素外的所有元素从前面取出后，再重新添加到队列尾部，此时再去弹出元素就是栈的顺序了。

```ts
class MyStack {
  private queue: number[] = []

  push(x: number): void {
    this.queue.push(x)
  }

  pop(): number {
    let size = this.queue.length
    // 排除掉最后一个元素
    size--
    // 剩余元素从队头移动到队尾
    while (size--) {
      this.queue.push(this.queue.shift())
    }
    // 此时弹出元素的顺序就是栈的顺序
    return this.queue.shift()
  }

  top(): number {
    return this.queue[this.queue.length - 1]
  }

  empty(): boolean {
    return this.queue.length === 0
  }
}
```

## [有效的括号](https://leetcode.cn/problems/valid-parentheses/)

括号不匹配，一共有三种可能情况，分别是：

- 左括号多余了

![左括号多余了](left-bracket.png)

- 右括号多余了

![右括号多余了](right-bracket.png)

- 括号没有多余，但是匹配不上

![括号匹配不上](mismatch.png)

以上三种情况，有着对应的遍历结果：

1. 已经遍历完了字符串，但是栈不为空，说明相应的左括号没有右括号来匹配，左括号多余
2. 遍历字符串的过程中，栈已经为空了，没有匹配的字符了，说明还有右括号没有匹配完成，右括号多余
3. 遍历字符串匹配的过程中，发现栈里没有匹配的字符，则说明括号匹配不上

代码实现方面还有一些技巧，比如我们遇到左括号 `(` 的时候，不要直接把 `(` 加进去，因为这样的话后续又需要做一些条件判断，很不方便。我们其实可以直接把 `)` 加进去，然后出栈的括号比较是否与 `)` 相等即可，代码的实现可以得到优化。

```ts
function isValid(s: string): boolean {
  if (s.length % 2 !== 0) {
    return false
  }

  const stack: string[] = []
  for (const ch of s) {
    if (ch === '(') {
      stack.push(')')
    } else if (ch === '{') {
      stack.push('}')
    } else if (ch === '[') {
      stack.push(']')
    } else if (stack.length === 0 || stack[stack.length - 1] !== ch) {
      // 情况二和情况三
      return false
    } else {
      // 栈顶元素与当前相等，凑成一对匹配括号
      stack.pop()
    }
  }

  // 情况一
  return stack.length === 0
}
```

## [删除字符串中的所有相邻重复项](https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/)

遇到类似**消消乐**的题目，栈基本上都是实现的最佳选择。

```ts
function removeDuplicates(s: string): string {
  const stack: string[] = []
  for (const ch of s) {
    if (stack.length === 0 || ch !== stack[stack.length - 1]) {
      // 不相同
      stack.push(ch)
    } else {
      // 相同
      stack.pop()
    }
  }

  return stack.join('')
}
```

## [逆波兰表达式求值](https://leetcode.cn/problems/evaluate-reverse-polish-notation/)

关于波兰表达式的简单介绍可以看[这里](https://programmercarl.com/0150.%E9%80%86%E6%B3%A2%E5%85%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F%E6%B1%82%E5%80%BC.html#%E9%A2%98%E5%A4%96%E8%AF%9D)。对于本题我们只需要知道结论就可以处理。结论是：遇到数字则入栈，遇到符号则取出栈顶两个数字进行计算，并将结果压入栈中，最终得到的结果就是答案。

```ts
function evalRPN(tokens: string[]): number {
  const stack: number[] = []
  for (const ch of tokens) {
    if (ch === '+' || ch === '-' || ch === '*' || ch === '/') {
      const num1 = stack.pop()
      const num2 = stack.pop()
      if (ch === '+') {
        stack.push(num2 + num1)
      } else if (ch === '-') {
        stack.push(num2 - num1)
      } else if (ch === '*') {
        stack.push(num2 * num1)
      } else if (ch === '/') {
        stack.push(Math.trunc(num2 / num1))
      }
    } else {
      stack.push(Number(ch))
    }
  }

  return stack[stack.length - 1]
}
```

## [滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)

这道题运用到的数据结构是单调队列。单调队列就是指维护队列中的元素保持单调递增或递减，但是它本质上与优先级队列是不同的，如果使用优先级队列，那么元素的顺序其实是有可能会被颠倒的，所以这题单调队列内部的 `pop` 和 `push` 方法都是需要我们重新定义的。我们整体需要实现三个方法，一个 `pop` 方法，一个 `push` 方法，还有一个 `getMaxValue` 方法。具体的实现思路可以看[这里](https://programmercarl.com/0239.%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E6%9C%80%E5%A4%A7%E5%80%BC.html)。

```ts
function maxSlidingWindow(nums: number[], k: number): number[] {
  const result: number[] = []

  const queue = new MyQueue()
  for (let i = 0; i < k; i++) {
    queue.push(nums[i])
  }
  result.push(queue.getMaxValue())

  for (let i = k; i < nums.length; i++) {
    // 移除前面元素
    queue.pop(nums[i - k])
    // 添加新元素
    queue.push(nums[i])
    result.push(queue.getMaxValue())
  }

  return result
}

class MyQueue {
  private queue = []

  // 比较当前要弹出的数值是否等于队列出口元素的数值，如果相等则 pop
  pop(value: number) {
    if (this.queue.length && this.queue[0] === value) {
      this.queue.shift()
    }
  }

  // 如果 push 的数值大于入口元素的数值，那么就将队列后端的数值弹出，直到 push 的数值小于等于队列入口元素的数值为止
  push(value: number) {
    while (this.queue.length && this.queue[this.queue.length - 1] < value) {
      this.queue.pop()
    }
    this.queue.push(value)
  }

  getMaxValue() {
    return this.queue[0]
  }
}
```

## [前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/)

这道题其实是一道裸的堆题，但是 TS 里面并没有支持堆这种数据结构，所以还需要自行实现堆的数据结构，这里我也参考[波神](https://xiaozhuanlan.com/advance/4820753169)手动实现了一个堆。

```ts
class Heap<T> {
  private heap: T[] = [];
  private size = 0
  private compareFn: (...args: T[]) => boolean;

  /**
   * 
   * @param compareFn 比较函数
   * @param array 初始化数组
   */
  public constructor(compareFn: (...args: T[]) => boolean, array?: T[]) {
    if (compareFn.length !== 2) {
      throw new Error('The arguments\' length of the compare function must be two')
    }
    this.compareFn = compareFn
    if (array) {
      this.heap = array
      this.size = array.length
      this.buildHeap()
    }
  }

  public isEmpty() {
    return this.size === 0
  }

  private parentIndex(i: number) {
    return Math.floor((i - 1) / 2)
  }

  private parent(i: number) {
    return this.heap[this.parentIndex(i)]
  }

  private leftIndex(i: number) {
    return 2 * i + 1
  }

  private left(i: number) {
    return this.heap[this.leftIndex(i)]
  }

  private rightIndex(i: number) {
    return 2 * i + 2
  }

  private right(i: number) {
    return this.heap[this.rightIndex(i)]
  }

  private swapNodes(i: number, j: number) {
    const temp = this.heap[i]
    this.heap[i] = this.heap[j]
    this.heap[j] = temp
  }

  public push(node: T) {
    if (this.size === 0) {
      this.size++
      this.heap.push(node)
      return
    }
    this.size++
    // 获取最后一个节点
    let i = this.size - 1
    this.heap[i] = node
    // 节点上浮
    while (i !== 0 && this.compareFn(this.heap[i], this.parent(i))) {
      this.swapNodes(i, this.parentIndex(i))
       i = this.parentIndex(i)
    }
  }

  // 递归建堆
  private heapify(i: number) {
    const leftIndex = this.leftIndex(i)
    const rightIndex = this.rightIndex(i)
    const val = this.heap[i], leftVal = this.heap[leftIndex], rightVal = this.heap[rightIndex]

    // 寻找最小值
    let smallIndex = i
    if (leftIndex < this.size && this.compareFn(leftVal, val)) {
      smallIndex = leftIndex
    }
    if (rightIndex < this.size && this.compareFn(rightVal, this.heap[smallIndex])) {
      smallIndex = rightIndex
    }

    if (smallIndex !== i) {
      this.swapNodes(i, smallIndex)
      this.heapify(smallIndex)
    }
  }

  public pop() {
    if (this.size <= 0) {
      throw new Error('The heap is empty')
    }
    if (this.size === 1) {
      const node = this.heap[this.size - 1]
      this.size--
      this.heap.length--
      return node
    }
    const root = this.heap[0]
    this.heap[0] = this.heap[this.size - 1]
    this.size--
    this.heap.length--
    // 下沉
    this.heapify(0)
    return root
  }

  public top() {
    return this.heap[0]
  }

  public getHeap() {
    return this.heap
  }

  public getSize() {
    return this.size
  }

  private buildHeap() {
    for (let i = this.parentIndex(this.size - 1); i >= 0; i--) {
      this.heapify(i)
    }
  }
}
```

实现了堆之后，其实这道题本身还是比较简单的，直接使用 map 和 heap 求解即可。

```ts
function topKFrequent(nums: number[], k: number): number[] {
  const heap = new Heap<{key: number, value: number}>((a, b) => a.value - b.value < 0)
  const map = new Map<number, number>()

  nums.forEach((num) => {
    map.set(num, (map.get(num) || 0) + 1)
  })

  map.forEach((value, key) => {
    heap.push({ key, value })
    if (heap.getSize() > k) {
      heap.pop()
    }
  })

  return heap.getHeap().map((item) => item.key)
}
```
