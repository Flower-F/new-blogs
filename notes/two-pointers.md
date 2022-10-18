---
title: '双指针'
date: '2022-10-18'
keywords: ['Algorithm']
---

## [移除元素](https://leetcode.cn/problems/remove-element/)

```ts
function removeElement(nums: number[], val: number): number {
  // 快指针去探查是否存在不等于 val 的元素，慢指针用来记录符合条件的值
  let slow = 0, fast = 0
  while (fast < nums.length) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast]
      slow++
    }
    fast++
  }
  return slow
};
```

## [有序数组的平方](https://leetcode.cn/problems/squares-of-a-sorted-array/)

这道题很容易想到要使用双指针解决，但是如果按照原题意求解非递减排序的结果，我们似乎没办法使用双指针解答，因为小的值按道理应该在中间，但是具体在哪里我们不清楚。所以我们可以逆向思维，思考求解递减的结果，然后将其倒序即可得到答案。

```ts
function sortedSquares(nums: number[]): number[] {
  let left = 0, right = nums.length - 1
  const res: number[] = []
  while (left <= right) {
    if (Math.abs(nums[left]) >= Math.abs(nums[right])) {
      res.push(nums[left] * nums[left])
      left++
    } else if (Math.abs(nums[left]) < Math.abs(nums[right])) {
      res.push(nums[right] * nums[right])
      right--
    }
  }

  return res.reverse()
}
```

## [三数之和](https://leetcode.cn/problems/3sum/)

这道题实现的大体方法走向其实是基本确定的，通过排序 + 双指针结合的方式就可以做到。但是这道题的难点并不在于解法，而是具体去重的实现细节。由于都是小细节点不方便解释，我就写到代码注释里去了。

```ts
function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b)

  const res: number[][] = []
  for (let i = 0; i < nums.length; i++) {
    // 剪枝：如果 nums[i] 大于 0，那么后面的数字不可能凑成等于 0 的结果
    if (nums[i] > 0) {
      break
    }

    // a 的去重判断，这里必须要是 nums[i] === nums[i - 1] 而不是 nums[i] === nums[i + 1]，因为是与前面一个数进行比较
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }

    let left = i + 1, right = nums.length - 1
    // 严格不等于，因为假如 left 和 right 相等，三个数就变成两个数了
    while (right > left) {
      const leftNum = nums[left], rightNum = nums[right]
      if (nums[i] + leftNum + rightNum > 0) {
        right--
      } else if (nums[i] + leftNum + rightNum < 0) {
        left++
      } else {
        // b 去重
        while (nums[left] === nums[left + 1]) left++
        // c 去重
        while (nums[right] === nums[right - 1]) right--
        // 收集答案
        res.push([leftNum, rightNum, nums[i]])
        left++
        right--
      }
    }
  }

  return res
}
```

## [四数之和](https://leetcode.cn/problems/4sum/)

这道题的难点主要在于剪枝和去重，其余逻辑与三数之和基本相同。这里要注意只有 `nums[i] > 0` 的时候才能进行剪枝，因为一个数加上一个负数之后是会越来越小的，必须加一个正数才会变大。二层剪枝的时候，直接把 `nums[i] + nums[j]` 看成了一个整体，用这个整体来与 target 做比较，原理一样也是必须要加上正数才会变大。

```ts
function fourSum(nums: number[], target: number): number[][] {
  nums.sort((a, b) => a - b)

  const res: number[][] = []
  for (let i = 0; i < nums.length; i++) {
    // 一层剪枝
    if (nums[i] > target && nums[i] > 0) {
      break
    }

    // 去重
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }

    for (let j = i + 1; j < nums.length; j++) {
      // 二层剪枝
      if (nums[i] + nums[j] > target && nums[i] + nums[j] > 0) {
        break
      }

      // 去重，注意这里是 j > i + 1
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue
      }

      // 复用三数之和逻辑
      let left = j + 1, right = nums.length - 1

      // 严格不等于，因为假如 left 和 right 相等，三个数就变成两个数了
      while (right > left) {
        const leftNum = nums[left], rightNum = nums[right]
        if (nums[i] + nums[j] + leftNum + rightNum > target) {
          right--
        } else if (nums[i] + nums[j] + leftNum + rightNum < target) {
          left++
        } else {
          // b 去重
          while (nums[left] === nums[left + 1]) left++
          // c 去重
          while (nums[right] === nums[right - 1]) right--
          res.push([leftNum, rightNum, nums[i], nums[j]])
          left++
          right--
        }
      }
    }
  }

  return res
}
```
