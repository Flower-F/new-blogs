---
title: '双指针'
date: '2022-10-12'
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
