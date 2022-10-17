---
title: '哈希表'
date: '2022-10-17'
keywords: ['Data Structure']
---

## [有效的字母异位词](https://leetcode.cn/problems/valid-anagram/)

这题基本上没什么太大难度，直接写就行了

```ts
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) {
    return false
  }

  const record = new Map<string, number>()
  for (const ch of s) {
    record.set(ch, (record.get(ch) || 0) + 1)
  }

  for (const ch of t) {
    if (record.has(ch)  && record.get(ch) > 0) {
      record.set(ch, record.get(ch) - 1)
    } else {
      return false
    }
  }

  return true
}
```

## [两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays/)

这道题也是相对比较简单的，最后结果这里通过 `Array.from(arr)` 将哈希表转换为了数组。

```ts
function intersection(nums1: number[], nums2: number[]): number[] {
  const record = new Set<number>()
  for (const num of nums1) {
    record.add(num)
  }

  const res = new Set<number>()
  for (const num of nums2) {
    if (record.has(num)) {
      res.add(num)
    }
  }

  return Array.from(res)
}
```

## [快乐数](https://leetcode.cn/problems/happy-number/)

题目中说了会无限循环，也就是说求和的过程中，sum 会重复出现。所以我们可以用一个哈希表来存储 sum，如果重复返回 false 就行了。

```ts
function isHappy(n: number): boolean {
  const record = new Set()
  while (true) {
    const sum = getSum(n)
    if (sum === 1) {
      return true
    }

    if (record.has(sum)) {
      return false
    }
    record.add(sum)
    n = sum
  }
  
  function getSum(n: number) {
    let sum = 0;
    while (n) {
      sum += (n % 10) * (n % 10)
      n = Math.floor(n / 10)
    }
    return sum
  }
}
```

但是这道题其实还有其他的解法。现在我们的时间复杂度是 `O(N)`，因为我们用了一个哈希表。其实这道题是可以在 `O(1)` 空间内求解的，用的是快慢指针的解法。快指针每次走两步，慢指针每次走一步，当二者相等时，即为一个循环周期。此时，判断是不是因为 1 引起的循环，是的话就是快乐数，否则不是快乐数。

```ts
function isHappy(n: number): boolean {
  let slow  = n, fast = getSum(n)
  while (slow !== fast) {
    slow = getSum(slow)
    fast = getSum(getSum(fast))
  }
  return slow === 1
  
  function getSum(n: number) {
    let sum = 0;
    while (n) {
      sum += (n % 10) * (n % 10)
      n = Math.floor(n / 10)
    }
    return sum
  }
}
```

## [两数之和](https://leetcode.cn/problems/two-sum/)

经典第一题，没什么好说的。

```ts
function twoSum(nums: number[], target: number): number[] {
  const record = new Map()
  for (let i = 0; i < nums.length; i++) {
    const another = target - nums[i]
    if (record.has(another)) {
      return [i, record.get(another)]
    }
    record.set(nums[i], i)
  }
}
```
