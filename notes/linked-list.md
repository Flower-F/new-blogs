---
title: '链表'
date: '2022-10-14'
keywords: ['Data Structure']
---

## [移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/)

想要移除一个链表的节点，其实特别简单，只需要 `p.next = p.next.next` 即可。也就是说，要想删除某个节点，只要找到删除节点的前一个节点 p，然后让 p 的下一个节点指向删除节点的下一个节点即可。但是问题在于，如果移动的是头节点呢？头节点找不到前一个节点，所以我们其实只需要把头节点指向下一个节点就行了。但是这样删除方法其实并没有统一，这就是 dummyHead 虚拟头节点引入的意义 ———— 统一头节点和非头节点的处理方法。

另外，这里 while 循环的条件为什么是 p.next，而不是 p 呢？因为假设我们要删除某个节点，就需要找到它的前一个节点，但是对于单向链表来说，前一个节点是获取不到的，所以我们只能换一种思考方式：从前一个节点 p 开始遍历，然后需要删除的时候删除掉 p.next 这个节点。

```ts
function removeElements(head: ListNode | null, val: number): ListNode | null {
  const dummyHead = new ListNode(-1, head)
  // 这里 p 指向的是被删元素的上一个元素
  let p = dummyHead
  while (p.next) {
    if (p.next.val === val) {
      p.next = p.next.next
    } else {
      p = p.next
    }
  }

  return dummyHead.next
}
```

## [设计链表](https://leetcode.cn/problems/design-linked-list/)

这是一道非常非常复杂的模拟题，甚至比 LRU 还要复杂得多，主要体验在太容易出错了，我也因为一些细节问题 debug 了挺长时间。题目要求我们可以在单链表和双链表之间做选择，很显然这里选择双链表会更合适，可以保证时间复杂度更小。因为对于尾部的插入我们可以直接利用虚拟尾节点实现 O(1) 插入；对于中间部分的节点插入，我们也可以计算出该节点的遍历方向，靠左就从左向右遍历，靠右就从右向左遍历，保证了最小遍历次数。但是对于节点的插入，依然是很容易出错的，这里建议是使用画图的方法，确保不要写漏其中的某个关系。以 `addAtIndex` 函数为例：

![addAtIndex](add-at-index.png)

```ts
class LinkedNode {
  public prev: null | LinkedNode = null
  public next: null | LinkedNode = null
  public val: number

  constructor(val: number) {
    this.val = val
  }
}

class MyLinkedList {
  private dummyHead = new LinkedNode(-1)
  private dummyTail = new LinkedNode(-1)
  private length = 0

  constructor() {
    this.dummyHead.next = this.dummyTail
    this.dummyTail.prev = this.dummyHead
  }

  get(index: number) {
    if (index >= this.length || index < 0) {
      return -1
    }

    return this.getNode(index).val
  }

  addAtHead(val: number) {
    const newHead = new LinkedNode(val)
    newHead.next = this.dummyHead.next
    newHead.prev = this.dummyHead
    newHead.next.prev = newHead
    this.dummyHead.next = newHead
    this.length++
  }

  addAtTail(val: number) {
    const newTail = new LinkedNode(val)
    newTail.prev = this.dummyTail.prev
    newTail.next = this.dummyTail
    newTail.prev.next = newTail
    this.dummyTail.prev = newTail
    this.length++
  }

  addAtIndex(index: number, val: number) {
    if (index > this.length) {
      return
    }
    if (index < 0) {
      this.addAtHead(val)
      return
    }
    if (index === this.length) {
      this.addAtTail(val)
      return
    }
    const p = this.getNode(index)
    const newNode = new LinkedNode(val)
    newNode.next = p
    newNode.prev = p.prev
    p.prev.next = newNode
    p.prev = newNode
    this.length++
  }

  deleteAtIndex(index: number) {
    if (index >= 0 && index < this.length) {
      const p = this.getNode(index)
      p.prev.next = p.next
      p.next.prev = p.prev
      this.length--
    }
  }

  /** 注意该函数不包括边界判断 */
  private getNode(index: number) {
    const findFromLeft = index < Math.floor(this.length / 2)
    if (!findFromLeft) {
      index = this.length - 1 - index
    }
    let p = findFromLeft ? this.dummyHead.next : this.dummyTail.prev
    for (let i = 0; i < index; i++) {
      p = findFromLeft ? p.next : p.prev
    }
    return p
  }
}
```

## [反转链表](https://leetcode.cn/problems/reverse-linked-list/)

反转链表有双指针和递归两种写法，都需要掌握。双指针的解法比较容易理解，但是递归的方法会让人比较懵。我们可以选择从双指针解法推导出递归的解法。具体怎么推导有点玄学，可以看[代码随想录的视频讲解](https://www.bilibili.com/video/BV1nB4y1i7eL)。

```ts
function reverseList(head: ListNode | null): ListNode | null {
  let prev = null, cur = head
  // 边界条件，当 cur 为 null 时，pre（cur 的前一个节点）刚好指向链表尾部，也就是反转之后的头节点
  while (cur) {
    // 存储 cur 的下一个节点，否则链表无法继续遍历下去
    const temp = cur.next
    cur.next = prev
    prev = cur
    cur = temp
  }
  return prev
}
```

```ts
function reverseList(head: ListNode | null): ListNode | null {
  return helper(null, head)
  
  function helper(prev: ListNode | null, cur: ListNode | null) {
    if (!cur) {
      return prev
    }
    const temp = cur.next
    cur.next = prev
    return helper(cur, temp)
  }
}
```
