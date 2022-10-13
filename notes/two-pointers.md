---
title: '双指针'
date: '2022-10-13'
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
