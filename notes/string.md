---
title: '字符串'
date: '2022-10-19'
keywords: ['Data Structure']
---

## [反转字符串](https://leetcode.cn/problems/reverse-string/)

这道题刚开始看到题目我有点疑惑，因为与 C++ 不同， JS 的字符串都是常量，无法改变的，后来一看题目才知道，这里是通过 `string[]` 来模拟了一个 string，有点尴尬，不过这题对于 JS 意义不大就是了，但算是对后面题目的一个启发。后面题目很多原本对于 C++ 可以 `O(1)` 空间求解的题目对于 JS 也都是必须被迫只能申请 `O(N)` 空间，所以其实意义都不大，但是可以作为自己思路的拓展。

```ts
function reverseString(s: string[]): void {
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    [s[i], s[j]] = [s[j], s[i]]
  }
}
```

## [反转字符串 II](https://leetcode.cn/problems/reverse-string-ii/)

这题稍微正常一些，不需要动用语言的不同特性。核心思想就是根据区间右边界是否在数组范围内，来确定翻转字符串的右边界。

```ts
function reverseStr(s: string, k: number): string {
  const charArr = s.split('')
  for (let i = 0; i < charArr.length; i += 2 * k) {
    let left = i
    let right = i + k - 1 > s.length ? s.length - 1 : i + k - 1
    while (left < right) {
      [charArr[left], charArr[right]] = [charArr[right], charArr[left]]
      left++
      right--
    }
  }

  return charArr.join('')
}
```

## [替换空格](https://leetcode.cn/problems/ti-huan-kong-ge-lcof/)

首先扩充数组到每个空格替换成 `%20` 之后的大小。然后从后向前移动双指针替换空格。这里为什么要从后向前填充，而不能是从前向后填充呢？因为从前向后填充就是 `O(N^2)` 的算法了，每次添加元素都要将添加元素之后的所有元素向后移动。**数组填充类的问题，很多都可以先预先给数组扩容带填充后的大小，然后再从后向前进行操作**。

```ts
function replaceSpace(s: string): string {
  let spaceCount = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') {
      spaceCount++
    }
  }

  // s 长度扩充为原来的 3 倍，也就是字符串的总长度比原来多了 spaceCount * 2
  const charArr = s.split('').concat(new Array(spaceCount * 2).fill(''))
  // 填充前后长度
  const oldLength  = s.length, newLength = charArr.length
  // 从后往前填充
  for (let i = newLength - 1, j = oldLength - 1; i > j; i--, j--) {
    if (charArr[j] !== ' ') {
      charArr[i] = charArr[j]
    } else {
      charArr[i] = '0'
      charArr[i - 1] = '2'
      charArr[i - 2] = '%'
      i -= 2
    }
  }

  return charArr.join('')
}
```

## [反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/)

这里要求在原题目的基础上添加条件：`不要使用辅助空间，空间复杂度要求为 O(1)`。我们可以先将整个字符串都反转过来，只不过这样会导致单词本身也倒序了，那么再把每个单词都单独反转一下，就解决掉这个问题了。但是反转之前，我们还需要先取出多余的空格。这里删除空格也是有技巧的，我们可以参考[双指针章节](https://yunhan.fun/notes/two-pointers)的移除元素一题，使用快慢指针进行空格的删除。这道题的整体实现细节很多，难度比较大，具体实现细节可以看注释。

```ts
function reverseWords(s: string): string {
  const charArr = s.split('')
  removeExtraSpaces(charArr)
  reverseString(charArr, 0, charArr.length - 1)

  let start = 0
  for (let i = 0; i <= charArr.length; i++) {
    // 到达空格或者串尾，说明一个单词结束，需要进行翻转
    if (i === charArr.length || charArr[i] === ' ') { 
      // 注意反转区间是左闭右闭的
      reverseString(charArr, start, i - 1)
      // 更新下一个单词的开始下标 start
      start = i + 1
    }
  }

  return charArr.join('')

  /** 删除多余的空格 */
  function removeExtraSpaces(s: string[]) {
    let slow = 0, fast = 0
    while (fast < s.length) {
      if (s[fast] !== ' ') {
        // 如果不是第一个单词，需要在单词前面手动添加一个空格
        if (slow !== 0) {
          s[slow++] = ' '
        } 
        while (fast < s.length && s[fast] !== ' ') {
          s[slow++] = s[fast++]
        }
      }
      fast++
    }
    s.length = slow
  }

  /** 反转字符串，区间左闭右闭 */
  function reverseString(s: string[], start: number, end: number): void {
    for (let i = start, j = end; i < j; i++, j--) {
      [s[i], s[j]] = [s[j], s[i]]
    }
  }
}
```

## [左旋转字符串](https://leetcode.cn/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/)

这道题的解法还是比较 hack 的，也比较有趣，这里以一个具体的例子作为演示。

比如说对于 `输入: s = "abcdefg", k = 2`，通过以下三步即可得到正确答案：

![图例](zuo-xuan-zhuan-zi-fu-chuan.png)

```ts
function reverseLeftWords(s: string, n: number): string {
  const charArr = s.split('')
  reverseString(charArr, 0, n - 1)
  reverseString(charArr, n, charArr.length - 1)
  reverseString(charArr, 0, charArr.length - 1)

  return charArr.join('')
  
  /** 反转字符串，区间左闭右闭 */
  function reverseString(s: string[], start: number, end: number): void {
    for (let i = start, j = end; i < j; i++, j--) {
      [s[i], s[j]] = [s[j], s[i]]
    }
  }
}
```

## [实现 strStr](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/)

本题是 KMP 经典题目。
