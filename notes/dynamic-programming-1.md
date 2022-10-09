---
title: '动态规划从入门到入土（一）'
date: '2022-10-09'
keywords: ['50 days']
---

本文为[《labuladong 的算法小抄》](https://labuladong.github.io/algo/)的阅读笔记。

## 满足什么条件的是动态规划

- 一般情况下目标就是求最值
- 核心问题是**穷举**
- 子问题存在**重叠**，且具有**最优子结构**

## 解题思路

- 如何判断题目是 dp
  - 遇到**最值**相关的问题，先思考一下穷举的复杂度，如何**复杂度爆炸增长**，就很有可能是动态规划
  - 涉及到**子序列**的问题，通常情况下都是需要使用 dp 进行处理的
- 思考 base case，也就是所谓的边界情况
- 思考状态
- 思考状态转移，也即是什么改变会引起状态改变
- 如何判断 dp 数组遍历方向
  - 遍历过程中，所需的状态必须是已经计算出来的
  - 遍历的终点必须是存储结果的那个位置

## [从斐波那契数列开始](https://leetcode.cn/problems/fibonacci-number/)

斐波那契是一个经典的递归问题。

```ts
function fib(n: number) {
  if (n === 0) return 0
  if (n === 1 || n === 2) return 1
  return fib(n - 1) + fib(n - 2)
}
```

![递归树](fib.png)

画出斐波那契的递归树，我们可以计算本递归算法的时间复杂度。**递归算法的时间复杂度就是由子问题的个数乘以解决每一个子问题所需要的时间。**首先计算子问题的个数，子问题个数就是递归树节点的个数，这里显然是 `2^n`；然后是子问题的时间，这里只是计算 `f(n - 1) + f(n - 2)`，所以时间复杂度就是 `O(1)`。所以，这个算法的总复杂度就是 `O(2^n)`。

分析递归树可以知道，算法低效的原因是：存在着大量重复的计算，比如图中 `f(18)` 被计算了两次，而且以 `f(18)` 为根的子树其实非常巨大，每次计算会耗费很多的时间，更何况还不止 `f(18)` 节点会被重复计算。这个就是前面所说的动态规划的其中一个特征：具备**重叠子问题情况**。

那么如何解决这个问题呢，我们前面说到它低效的原因是存在着大量的重复计算，那么如果我们通过一个**备忘录**来记录所有的计算结果，遇到新的计算时，我们先去备忘录中查询一下之前是否存在过计算的结果，如果存在我们就直接复用原来的计算结果就行了，不需要重复计算了。

原来的备忘录算法经过改造后就会变成类似这样的算法：

```ts
function fib(n: number) {
  if (n === 0) return 0
  const memo = new Array<number>(n + 1).fill(0)
  return helper(memo, n)
}

function helper(memo: number[], n: number) {
  if (n === 1 || n === 2) return 1
  if (memo[n] !== 0) return memo[n]
  memo[n] = helper(memo, n - 1) + helper(memo, n - 2)
  return memo[n]
}
```

其实就是原来的算法添加了一个备忘录数组，写法上基本上没什么不同之处。分析这个算法的时间复杂度，由于不存在冗余的计算，可以很容易得出该算法的时间复杂度就是 O(N)。

实际上，这种备忘录算法的时间复杂度已经与所谓的动态规划算法持平了，只不过与动态规划比较，**备忘录算法是自顶向下的，而 DP 算法是自底向上的。**

所谓自顶向下，就是说递归树的形成过程，是从上往下延伸形成的，比如 `f(20)` 是从上往下逐渐分解问题的规模，一直到边界 `f(1)` 和 `f(2)` 这两个 base case，然后逐层返回答案；所谓自底向上，是指从 base case `f(1)` 和 `f(2)` 向上推导计算答案，直到推导到了 `f(20)`，这就是所谓动态规划的核心思想。

这种自底向上思想从代码上体现就是从 base case 直接开始进行计算。

```ts
function fib(n: number) {
  if (n === 0) return 0
  if (n === 1 || n === 2) return 1

  const dp = new Array<number>(n + 1).fill(0)
  dp[1] = dp[2] = 1
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
}
```

当然，这里还涉及到 dp 的一个常见的空间优化手段，也就是所谓的滚动数组。因为 `dp[i]` 的计算只与 `dp[i - 1]` 和 `dp[i - 2]` 两个数字相关，所以我们只需要用两个变量记录这两个值，然后不断滚动更新这两个值就行了，并不需要一个 n + 1 长度的数组。

```ts
function fib(n: number) {
  if (n === 0) return 0
  if (n === 1 || n === 2) return 1

  let pre = 1, cur = 1
  for (let i = 3; i <= n; i++) {
    const sum = cur + pre
    // 滚动
    pre = cur
    cur = sum
  }

  return cur
}
```

## [零钱兑换](https://leetcode.cn/problems/coin-change/)

思路：

- **base case**：显然当 amount 为 0 时算法返回 0，因为不需要任何硬币
- **状态**：由题目可见显然硬币的数量是无限的，硬币的金额也是给定的，所以唯一的状态就是 amount
- **选择**：目标金额为什么会发生变化呢，是因为你做了选择。你每选择一枚硬币，就减少了 amount
- **定义 dp**：dp 的参数一般就是指状态，也就是这里的 amount，dp 的值一般就是我们所要求解的结果，也就是凑成 amount 需要的最少硬币数量。那么 `dp[amount]` 就是我们最终所要求解的值

```ts
function coinChange(coins: number[], amount: number): number {
  // 当目标金额为 i 时，最少需要 dp[i] 枚硬币
  const dp = new Array<number>(amount + 1).fill(Number.MAX_VALUE)
  // base case
  dp[0] = 0

  // 外层遍历所有 dp 状态
  for (let i = 0; i < dp.length; i++) {
    // 内层遍历求所有选择的最小值
    for (let j = 0; j < coins.length; j++) {
      if (i - coins[j] < 0) continue
      // 选择
      dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
    }
  }

  return dp[amount] === Number.MAX_VALUE ? -1 : dp[amount]
}
```

## [最长递增自序列 LIS](https://leetcode.cn/problems/longest-increasing-subsequence/)

动态规划的核心思想是数学归纳法。数学归纳法指的是先假设这个结论在 `k < n` 的时候成立，然后根据这个假设想办法推导出当 `k = n` 的时候也成立。如果能够证明出来，就说明对于任意 `k <= n`，这个结论都成立。

类似的，对于动态规划，假设 `dp[0...i - 1]` 已经被计算出来了，那么我们可以思考，如何通过 `dp[0...i - 1]` 计算出 `dp[i]` 呢？

这里以最长递增子序列举例子。在举例之前，我们先要定义 dp 数组的含义。这里 dp[i] 指的是**以 nums[i] 为结尾的最长递增子序列的长度**。这是一个解题套路，在这里我们先默认接受它。

根据这个定义，我们可以推导出 base case：dp 数组的每一项初始值都应该是 1，因为以 `nums[i]` 为结尾的最长递增子序列最少也要包含它自己。下面我们来思考状态转移，我们运用数学归纳法的思想解决问题。

假设现在有数组 `nums = [1, 4, 3, 4, 2, 3]`，而且我们已知 dp[0...4] 的结果是 `dp = [1, 2, 2, 3, 2, ?]`，现在要我们求解 `dp[5]` 的值，那么我们应该如何推导呢？首先回归 dp 数组的定义，`dp[i]` 是以 `nums[i]` 为结尾的最长递增子序列的长度。那么要求解 `dp[5]`，就是要求解以 `nums[5]` 为结尾的最长递增子序列的长度。由于 `nums[5] = 3`，所以就算求解以 3 为结尾的最长递增子序列的长度，那只要在前面 `nums[0...4]` 中找到结尾小于 3 的子序列，然后我们把 3 接到这个子序列的后面，就可以得到一个新的递增子序列，这个新的递增子序列长度是原递增子序列的长度加 1。所以我们可以写出这样的状态转移方程：

```ts
for (let i = 0; i < nums.length; i++) {
  // 遍历前面的所有已知子序列
  for (let j = 0; j < i; j++) {
    // 如果结尾数字小于当前数字
    if (nums[i] > nums[j]) {
      dp[i] = Math.max(dp[i], dp[j] + 1)
    }
  }
}
```

结合前面的 base case，我们就可以求解出答案为：

```ts
function lengthOfLIS(nums: number[]): number {
  const dp = new Array<number>(nums.length).fill(1)

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }

  return Math.max(...dp)
}
```

当然此题还有另外一种比较神奇的二分解法，时间复杂度是 `O(NlogN)`，但是由于不属于动态规划的讨论范畴，这里略过。

## [俄罗斯套娃问题](https://leetcode.cn/problems/russian-doll-envelopes/)

这题本质上其实是 LIS 上升到二维空间的变种。但是 LIS 只能够在一维数组中寻找最长子序列，但是这里信封是由 `(w, h)` 这样的二维数组对组成的，如何做到复用 LIS 算法呢？

我们其实很容易会想到排序，那么如何排序呢？这里是先对 w 进行排序，如果遇到 w 相同的情况，就按照高度 h 降序排序。然后把所有的 h 作为一个数组，在这个数组上计算出的 LIS 就是最终答案。

举个例子，`envelopes = [[5, 4], [6, 4], [5, 2], [6, 7], [1, 8], [2, 3]]`，按照上述规则排序后则为 `[[1, 8], [2, 3], [5, 4], [5, 2], [6, 7], [6, 4]]`。然后在 h 数组 `[8, 3, 4, 2, 7, 4]` 上寻找最长递增子序列，也就是 `[3, 4, 7]`。那么这个子序列就是最优解。

那么为什么要这样排序呢？因为 2 个 w 相同的信封不能相互嵌套，w 相同的时候将 h 逆序排序，就可以保证 h 数组中最多只会有一个被选进这个递增子序列中，保证了最终的信封序列中不会出现 w 相同的情况。

当然，反过来也是一样的，先对 h 排序，当 h 相同时 w 按逆序排序，最后在 w 上查找递增子序列，也是一样的。

根据上面的思路，我们可以得出以下的代码实现：

```ts
function maxEnvelopes(envelopes: number[][]): number {
  envelopes.sort((a, b) => {
    return a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]
  })

  const h: number[] = []
  for (let i = 0; i < envelopes.length; i++) {
    h[i] = envelopes[i][1]
  }

  return lengthOfLIS(h)
}
```

## [最大子数组和](https://leetcode.cn/problems/maximum-subarray/)

见到这道题目，其实第一印象很容易想到滑动窗口算法，但是这里还真的无法使用滑动窗口，原因是数组中数字可以是负数。滑动窗口本质上是用双指针形成的窗口扫描数组，但是我们需要有一个明确的条件判断什么时候收缩左窗口，什么时候扩大右窗口。但是对于这道题目，当窗口扩大的时候可能遇到负数，窗口中的值就有可能减小了；同理，当窗口缩小时可能会抛弃掉负数。所以我们不清楚何时去收缩和扩大窗口。

这个问题也是一个 dp 问题，但是 dp 的定义比较特殊。按照 dp 的常规思路，我们通常会这样定义 dp 数组：`nums[0...i]` 中最大子数组和为 `dp[i]`。假设我们现在这样定义了，按照数学归纳法，如果已知 `dp[i - 1]`，可以推断出 dp[i] 吗？实际上是不行的，因为子数组一定是连续的，但是我们无法保证 `nums[0...i]` 中的最大子数组和 `nums[i + 1]` 是相邻的，所以无论我们如何推导都找不到结果。

这道题正确的 dp 定义是：以 `nums[i]` 为结尾的最大子数组和为 `dp[i]`。跟上面 LIS 一样，这种定义形式的 dp，最后获取答案时需要遍历 dp 数组并获取最大值，而不是直接返回 `dp[n]`。

定义 dp 数组后，我们通过数学归纳法寻找状态转移方程。假设已经有了 `dp[i - 1]`，如何计算 `dp[i]` 呢？很显然，`dp[i]` 有两种选择，一个是跟前面的数组**一起组合成新的子数组，一个是自己独立成团，开启新的子数组**。所以我们只需要选择这两种选择中最大的一个就可以了。同时 base case 也很简单，第一个元素的前面没有子数组，所以 `dp[0]` 就等于 `nums[0]`。

```ts
dp[i] = Math.max(nums[i], nums[i] + dp[i - 1])
```

根据状态转移方程和 base case，我们可以写出完整的代码：

```ts
function maxSubArray(nums: number[]): number {
  if (nums.length === 0) return 0
  const dp = new Array<number>(nums.length)
  dp[0] = nums[0]
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i])
  }

  return Math.max(...dp)
}
```

当然这里还可以结合前面说的滚动数组空间压缩方法，进一步把空间复杂度压缩到 O(1)。

```ts
function maxSubArray(nums: number[]): number {
  if (nums.length === 0) return 0
  let pre = nums[0], cur = 0, res = nums[0]
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], pre + nums[i])
    res = Math.max(cur, res)
    pre = cur
  }

  return res
}
```

## [最长公共子序列 LCS](https://leetcode.cn/problems/longest-common-subsequence/)

对于两个字符串的动态规划问题，套路都是通用的，一般都需要一个二维 dp 数组，每一维用于服务一个字符串。这里也一样，`dp[i][j]` 的定义是，对于 `s1[0...i]` 和 `s2[0...j]`，它们的 LCS 长度是 `dp[i][j]`。下面思考 base case，根据前面的定义，很容易得出 `dp[0][...]` 和 `dp[...][0]` 初始化都是 0，因为肯定不存在公共子序列。

接下来思考状态转移，也就是做选择。这里思考的角度比较独特，我们可以想想，对于 s1 和 s2 中的每一个字符，有什么选择呢？其实很简单，只有两种选择，一个是在 LCS 中，一个是不在 LCS 中。那么对于 `s1[i]` 和 `s2[j]`，如何判断它们在不在 LCS 中呢？结合 LCS 的定义我们可以知道，如果它在 LCS 中，那么它肯定也同时存在于 s1 和 s2 中。那么如果 `s1[i] === s2[j]`，则这个字符一定在 LCS 中，如果我们已知了 `s1[0...i - 1]` 和 `s2[0...j - 1]` 中 LCS 的长度 `dp[i - 1][j - 1]`，那么加上这个字符后 LCS 的长度就会加 1，也就是 `dp[i][j] = dp[i - 1][j - 1] + 1`。而如果 `s1[1] !== s2[j]` 呢？此时说明 `s1[i]` 和 `s2[j]` 中至少有一个字符不在 LCS 中，那到底是哪个不在 LCS 中呢？都有可能，所以这里就两个都算出来然后取最大就行了，也就是 `Math.max(dp[i - 1][j], dp[i][j - 1])`。再考虑一下，如果两个字符都不在 LCS 中呢？也有这种可能，这种情况下就是 `dp[i - 1][j - 1]` 了。所以综上所述就是 `dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1])`。

```ts
function longestCommonSubsequence(s1: string, s2: string): number {
  const dp = new Array(s1.length + 1).fill(null).map(() => new Array<number>(s2.length + 1).fill(0))
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1])
      }
    }
  }
  return dp[s1.length][s2.length]
}
```

## [编辑距离](https://leetcode.cn/problems/edit-distance/)

前面说了，涉及到两个字符串的 dp 问题，通常都是用一个二维 dp 数组来解决，当然这里也不例外。`dp[i][j]` 定义就是 `s1[0...i]` 和 `s2[0...j]` 的最小编辑距离。对于这道题来说，其实无论是从 s1 变到 s2，还是从 s2 变到 s1，结果都是一样的，这里以 s1 变为 s2 为例。先说一下 base case，显然对于所有 i，`dp[i][0]` 需要初始化为 i；同理，对于所有 j，`dp[0][j]` 需要初始化为 j。

下面考虑状态和状态选择：

```bash
if s1[i] == s2[j]:
  skip
  i, j 同时向前移动
else:
  insert、delete、replace 三选一
```

本题中状态就是指针 i 和 j 的位置，选择就是指 skip、insert、delete、replace 这 4 种操作。

这里 可以得出 dp[i-1][j-1] 表示替换操作，dp[i-1][j] 表示删除操作，dp[i][j-1] 表示插入操作，原因如下：

以 word1 为 "horse"，word2 为 "ros"，且 dp[5][3] 为例，即要将 word1 的前 5 个字符转换为 word2 的前 3 个字符，也就是将 horse 转换为 ros，此时有：
1. dp[i-1][j-1]，即先将 word1 的前 4 个字符 hors 转换为 word2 的前 2 个字符 ro，然后将第五个字符 word1[4]（因为下标基数以 0 开始） 由 e 替换为 s（即替换为 word2 的第三个字符，word2[2]）
2. dp[i][j-1]，即先将 word1 的前 5 个字符 horse 转换为 word2 的前 2 个字符 ro，然后在末尾补充一个 s，即插入操作
3. dp[i-1][j]，即先将 word1 的前 4 个字符 hors 转换为 word2 的前 3 个字符 ros，然后删除 word1 的第 5 个字符

最后综合上面的分析，我们可以得到以下代码：

```ts
function minDistance(s1: string, s2: string): number {
  const dp = new Array(s1.length + 1).fill(null).map(() => new Array<number>(s2.length + 1).fill(0))
  for (let i = 1; i <= s1.length; i++) {
    dp[i][0] = i;
  }
  for (let j = 1; j <= s2.length; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
      }
    }
  }

  return dp[s1.length][s2.length]
}
```
