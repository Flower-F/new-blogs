---
title: '二分查找'
date: '2022-10-12'
keywords: ['Algorithm']
---

二分查找有左闭右开和左闭右闭两种写法，均需要掌握。

左闭右闭：

定义 target 在 `[left, right]` 区间，所以有如下两点：

- while (left <= right) 要使用 <= ，因为 left === right 是有意义的，所以使用 <=
- if (nums[mid] > target) right 要赋值为 mid - 1，因为当前这个 `nums[mid]` 一定不是target，那么接下来要查找的左区间结束下标位置就是 mid - 1

```ts
function search(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1
  while (left <= right) {
    const mid = ((right - left) >> 1) + left
    if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] < target) {
      left = mid + 1
    } else {
      return mid
    }
  }
  return -1
}
```

左闭右开：

定义 target 在 `[left, right)` 区间，所以有如下两点：

- while (left < right) 要使用 < ，因为 left === right 在区间 `[left, right)` 是没有意义的，所以使用 <
- if (nums[mid] > target) right 更新为 mid，因为当前 `nums[mid]` 不等于 target，去左区间继续寻找，而寻找区间是左闭右开区间，所以 right 更新为 mid，因为下一个查询区间依然不会去比较 `nums[mid]`

```ts
function search(nums: number[], target: number): number {
  let left = 0, right = nums.length
  while (left < right) {
    const mid = ((right - left) >> 1) + left
    if (nums[mid] > target) {
      right = mid
    } else if (nums[mid] < target) {
      left = mid + 1
    } else {
      return mid
    }
  }
  return -1
}
```
