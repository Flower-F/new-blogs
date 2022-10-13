---
title: '滑动窗口'
date: '2022-10-13'
keywords: ['Algorithm']
---

## [长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/)

注意这道题的限定条件，每个元素都是大于 0 的，所以我们可以使用滑动窗口进行求解，因为当元素从左边离开窗口时，窗口内数字之和一定是减小的，当元素从右边进入窗口时，窗口内的数字之和一定是增加的，这里需要与[最大子数组和](https://leetcode.cn/problems/maximum-subarray/)一题进行区分。窗口始终维持 `[l, r)` 左闭右开。

```ts
function minSubArrayLen(target: number, nums: number[]): number {
  let left = 0, right = 0
  let currentSum = 0, res = Number.MAX_VALUE
  while (right < nums.length) {
    currentSum += nums[right++]

    while (currentSum >= target) {
      res = Math.min(res, right - left)
      currentSum -= nums[left++]
    }
  }

  return res === Number.MAX_VALUE ? 0 : res
}
```
