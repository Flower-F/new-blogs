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
