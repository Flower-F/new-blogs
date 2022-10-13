---
title: '模拟'
date: '2022-10-13'
keywords: ['Algorithm']
---

## [螺旋矩阵 II](https://leetcode.cn/problems/spiral-matrix-ii/)

纯模拟题，超出边界条件，或者所在位置已经被占有的话就拐弯。

```ts
function generateMatrix(n: number): number[][] {
	const res = new Array(n).fill(null).map(() => new Array<number>(n).fill(0))
  const direction = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  let row = 0, col = 0
  let directionIndex = 0
  
  for (let i = 1; i <= n * n; i++) {
		res[row][col] = i
    let newX = row + direction[directionIndex][0]
    let newY = col + direction[directionIndex][1]

    // 超出边界条件，或者所在位置已经被占有的话就拐弯
    if (newX >= n || newX < 0 || newY >= n || newY < 0 || res[newX][newY] !== 0) {
			directionIndex = (directionIndex + 1) % direction.length
      newX = row + direction[directionIndex][0]
      newY = col + direction[directionIndex][1]
    }

    row = newX
    col = newY
  }

  return res
}
```
