---
title: '链表'
date: '2022-10-16'
keywords: ['Data Structure']
---

## [移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/)

想要移除一个链表的节点，其实特别简单，只需要 `p.next = p.next.next` 即可。也就是说，要想删除某个节点，只要找到删除节点的前一个节点 p，然后让 p 的下一个节点指向删除节点的下一个节点即可。但是问题在于，如果移动的是头节点呢？头节点找不到前一个节点，所以我们其实只需要把头节点指向下一个节点就行了。但是这样删除方法其实并没有统一，这就是 dummyHead 虚拟头节点引入的意义 —— 统一头节点和非头节点的处理方法。

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

这是一道非常非常复杂的模拟题，甚至比 LRU 还要复杂得多，复杂主要体现在太容易出错了，我也因为一些细节问题 debug 了挺长时间。题目要求我们可以在单链表和双链表之间做选择，很显然这里选择双链表会更合适，可以保证时间复杂度更小。因为对于尾部的插入我们可以直接利用虚拟尾节点实现 O(1) 插入；对于中间部分的节点插入，我们也可以计算出该节点的遍历方向，靠左就从左向右遍历，靠右就从右向左遍历，保证了最小遍历次数。但是对于节点的插入，依然是很容易出错的，这里建议是使用画图的方法，确保不要写漏其中的某个关系。以 `addAtIndex` 函数为例：

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

反转链表有双指针和递归两种写法，都需要掌握。双指针的解法比较容易理解，但是递归的方法会让人比较懵。我们可以选择从双指针解法推导出递归的解法。具体怎么推导有点玄学，文字很难说明清楚，可以看[代码随想录的视频讲解](https://www.bilibili.com/video/BV1nB4y1i7eL)。

```ts
// 双指针
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
// 递归
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

## [两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/)

![图示](swap-nodes-in-pairs-1.png)

这道题目也算是有一定难度的题目，对于边界的处理和链表基本操作的要求都比较高。

先思考一下边界条件，这道题要两两交换链表的节点，比如说要交换 2 和 3 节点，就需要在 2 前面的节点 1（假设叫 p）执行类似 `p.next.next = 节点 2` 的操作，那么对于头节点我们就要额外判断处理。所以这里为了统一操作，我们可以选择使用 dummyHead，如下所示。

![dummyHead](swap-nodes-in-pairs-2.png)

然后思考边界条件，分为奇偶处理。如果现在有奇数个节点，比如图中有 5 个节点，我们的 current 指针会依次指向 dummyHead，进行节点 1 和节点 2 的交换；然后指向节点 2，进行节点 3 和 节点 4 的交换；然后指向节点 4，此时节点 5 已经是尽头，不需要再进行交换。所以当有奇数个节点时边界为 `current.next.next !== null`。然后我们再设想一下，对于偶数个节点，例如现在如果没有节点 5，那么 4 相当于直接指向了 null，此时的边界条件很显然是 `current.next !== null`。综上可得边界条件是 `current.next !== null && current.next.next !== null`。

现在开始进行交换。让 dummyHead 的指针指向 2，然后 2 的指针再指向 1，然后 1 的指针再指向 3。

![交换节点](swap-nodes-in-pairs-3.png)

这里就涉及到如果获取节点 1 了，我们执行完 `current.next = current.next.next` 之后，其实 current.next 就已经不再是节点 1 了，所以我们需要先用一个临时变量存储一下节点 1。同样的道理，我们节点 2 指向节点 1 之后，就拿不到节点 3 了，那 1 就没办法指向节点 3 了，所以我们还需要一个临时变量来存储一下节点 3 的值。明白这些之后我们就可以实现这道题的代码了。实现起来还是比较复杂的，但是只要结合画图解决问题，就会难度小很多。

```ts
function swapPairs(head: ListNode | null): ListNode | null {
  const dummyHead = new ListNode(-1, head)
  let p = dummyHead
  while (p.next && p.next.next) {
    const temp = p.next // 节点 1
    const temp1 = p.next.next.next // 节点 3
    p.next = p.next.next // dummy 指向节点 2
    p.next.next = temp // 节点 2 指向节点 1
    temp.next = temp1 // 节点 1 指向节点 3
    p = p.next.next // 移动指针
  }
  return dummyHead.next
}
```

## [删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)

![图示](remove-nth-node-from-end-of-list.png)

这道题其实是一个经典的快慢指针问题。首先思考一下，要删除一个节点该怎么做，很显然，我们需要获得这个节点的前一个节点。现在假设 n = 3。令快指针 fast 和慢指针 slow 都指向 dummyHead，然后我们让指针 fast 先走 n 步，fast 就会来到指针 3 的位置。然后我们再同时移动 fast 和 slow 直到 fast 移动到 null。显然此时 fast 指向 null，而 slow 指向 2。我们要删除倒数第 3 个节点 2，就要让 slow 指向 1，而 现在 slow 指向了 2，多指了一位，所以 fast 要移动多一步，也就是我们开始的时候需要先让 fast 移动 n + 1 步。

```ts
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummyHead = new ListNode(-1, head)
  let fast = dummyHead, slow = dummyHead
  for (let i = 0; i < n + 1; i++) {
    fast = fast.next
  }
  while (fast) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next

  return dummyHead.next
}
```

## [链表相交](https://leetcode.cn/problems/intersection-of-two-linked-lists/)

我们先明确一下自己需要解决的问题。假设目前 curA 指向链表 A 的头结点，curB 指向链表 B 的头结点，如果 curA 和 curB 分别直接在两条链表上移动，并不能同时走到公共节点，也就无法得到相交节点了。所以我们要解决的问题就是**通过某些方式，使得 curA 和 curB 能够同时到达相交节点**。而且我们很容易知道，如果节点 A 和节点 B 相交于点 P，则 P 后面的部分都是两链表的重叠部分。因此，只要让两个链表的尾部对齐，就可以进行对比了。

![图示](intersection-of-two-linked-lists-1.png)

我们先求出两个链表的长度，并求出两个链表长度的差值，然后让 curA 移动，直到两个链表尾部对齐，而且可以同步移动节点，如图：

![图示](intersection-of-two-linked-lists-2.png)

此时我们就可以比较 curA 和 curB 是否相同，如果不相同，同时向后移动 curA 和 curB，如果遇到 `curA === curB`，则找到交点。

```ts
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  let curA = headA, curB = headB
  let lenA = 0, lenB = 0
  while (curA) {
    lenA++
    curA = curA.next
  }
  while (curB) {
    lenB++
    curB = curB.next
  }

  curA = headA
  curB = headB

  if (lenA < lenB) {
    [lenA, lenB, curA, curB] = [lenB, lenA, curB, curA]
  }

  let gap = lenA - lenB
  // 补齐两个链表长度之差
  while (gap--) {
    curA = curA.next
  }

  while (curA) {
    if (curA === curB) {
      return curA
    }
    curA = curA.next
    curB = curB.next
  }

  return null
}
```

## [环形链表II](https://leetcode.cn/problems/linked-list-cycle-ii/)

这道题定义快慢指针，快指针一次走 2 个节点，慢指针一次走一个节点。那么为什么要这么定义呢？假设现在快慢指针都已经进入到了环内，那么**快指针相对于慢指针的移动速度是一次一个节点**，所以快指针是一个节点一个节点地靠近慢指针，也就是必定会在环内相遇；反之如果快慢指针最终没有相遇，则说明链表无环。此时已经可以判断链表是否有环了，那么接下来要找这个环的入口了。

![图示](linked-list-cycle-1.png)

相遇时：slow 指针走过的节点数为: `x + y`， fast 指针走过的节点数：`x + y + n (y + z)`，n 为 fast 指针在环内走了 n 圈才遇到 slow 指针，`(y+z)` 为一圈内节点的个数。

因为 fast 指针一步走两个节点，slow 指针一步走一个节点， 所以 fast 指针走过的节点数 = slow 指针走过的节点数 * 2，也就是

```bash
(x + y) * 2 = x + y + n (y + z)
```

两边消掉一个（x+y）后得到：

```bash
x + y = n (y + z)
```

因为要找环形的入口，也就是说要求的是 x。将 x 单独放在左边：

```bash
x = n (y + z) - y
```

再从 `n (y+z)` 中提出一个 `(y+z)` 来，整理公式之后为如下公式：

```bash
x = (n - 1) (y + z) + z
```

注意这里 n 一定是大于等于 1 的，因为 fast 指针至少要多走一圈才能相遇 slow 指针。当 n 为 1 的时候，公式就化为：

```bash
x = z
```

这就意味着，从头结点 index1 出发一个指针，从相遇节点 index2 也出发一个指针，这两个指针每次只走一个节点，那么当这两个指针相遇的时候就是环形入口的节点。那么 n 如果大于 1 是什么情况呢，就是 fast 指针在环形转 n 圈之后才遇到 slow 指针。其实这种情况和 n 为 1 的时候效果是一样的，一样可以通过这个方法找到环形的入口节点，只不过，index2 指针在环里多转了(n - 1) 圈，然后再遇到 index1，相遇点其实依然是环形的入口节点。

知道原理之后，其实这道题的代码实现倒是几乎没什么难度。

```ts
function detectCycle(head: ListNode | null): ListNode | null {
  let fast = head, slow = head

  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next

    if (slow === fast) {
      let index1 = head, index2 = slow
      while (index1 !== index2) {
        index1 = index1.next
        index2 = index2.next
      }
      return index1
    }
  } 

  return null
}
```
