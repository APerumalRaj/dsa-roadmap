# Week 1 — Practice Session Guide

> This is your practice plan for the week. 10 hours total. Don't rush.

---

## Schedule Suggestion

| Day | Focus | Hours | What to Do |
|-----|-------|-------|------------|
| Day 1 | Big O Notation | 2h | Read `01-big-o-notation.md`. Do all mini challenges. |
| Day 2 | Arrays — Concepts | 2h | Read `02-arrays-basics.md`. Code all patterns from scratch. |
| Day 3 | Arrays — Easy Problems | 2h | Solve problems 1–5 from the practice list below. |
| Day 4 | Arrays — Medium Problems | 2h | Solve problems 6–8. Brute force first, then optimize. |
| Day 5 | Revision + Challenges | 2h | Redo anything you struggled with. Try the hard problems. |

---

## Problem Set — Solve In Order

### Easy (Must complete all)

#### 1. Find Second Largest Element
**Input:** `[12, 35, 1, 10, 34, 1]`
**Output:** `34`

**How to think:**
- Brute force: Sort, pick second from end. But that's O(n log n).
- Better: Track two variables — `largest` and `secondLargest`. One pass, O(n).

```java
int secondLargest(int[] arr) {
    int first = Integer.MIN_VALUE;
    int second = Integer.MIN_VALUE;

    for (int num : arr) {
        if (num > first) {
            second = first;
            first = num;
        } else if (num > second && num != first) {
            second = num;
        }
    }
    return second;
}
```
**Edge cases to consider:** All elements same? Array of size < 2?

---

#### 2. Check if Array is Sorted
**Input:** `[1, 2, 3, 4, 5]` → `true`
**Input:** `[1, 3, 2, 4, 5]` → `false`

**How to think:** Just check if each element is ≤ next element.

```java
boolean isSorted(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) return false;
    }
    return true;
}
```

---

#### 3. Remove Duplicates from Sorted Array (In-Place)
**Input:** `[1, 1, 2, 2, 3]`
**Output:** New length = `3`, array starts with `[1, 2, 3, ...]`

**How to think:**
- Since it's sorted, duplicates are adjacent.
- Use a "write pointer" that only advances when we see a new value.

```java
int removeDuplicates(int[] arr) {
    if (arr.length == 0) return 0;

    int writeIdx = 1;  // First element is always unique
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] != arr[i - 1]) {
            arr[writeIdx] = arr[i];
            writeIdx++;
        }
    }
    return writeIdx;
}
```
**Time:** O(n). **Space:** O(1). This is a LeetCode classic.

---

#### 4. Find Missing Number
**Input:** Array contains numbers 0 to n with one missing. `[3, 0, 1]`
**Output:** `2`

**How to think:**
- Math approach: Expected sum of 0 to n = `n*(n+1)/2`. Subtract actual sum.
- No extra space needed!

```java
int missingNumber(int[] arr) {
    int n = arr.length;
    int expectedSum = n * (n + 1) / 2;
    int actualSum = 0;
    for (int num : arr) actualSum += num;
    return expectedSum - actualSum;
}
```

---

#### 5. Merge Two Sorted Arrays
**Input:** `[1, 3, 5]` and `[2, 4, 6]`
**Output:** `[1, 2, 3, 4, 5, 6]`

**How to think:** Two pointers, one in each array. Always pick the smaller one.

```java
int[] mergeSorted(int[] a, int[] b) {
    int[] result = new int[a.length + b.length];
    int i = 0, j = 0, k = 0;

    while (i < a.length && j < b.length) {
        if (a[i] <= b[j]) {
            result[k++] = a[i++];
        } else {
            result[k++] = b[j++];
        }
    }
    while (i < a.length) result[k++] = a[i++];
    while (j < b.length) result[k++] = b[j++];

    return result;
}
```
**Time:** O(a + b). This is the core of Merge Sort — you'll see it again in Week 7.

---

### Medium (Push yourself — brute force first, then optimize)

#### 6. Two Sum
**Problem:** Given an array and a target, return indices of two numbers that add up to the target.

**Input:** `[2, 7, 11, 15]`, target = `9`
**Output:** `[0, 1]` (because 2 + 7 = 9)

**Brute force — O(n²):**
```java
int[] twoSumBrute(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return new int[]{i, j};
            }
        }
    }
    return new int[]{};
}
```

**Optimal — O(n) with HashMap:**
```java
int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    return new int[]{};
}
```
**The insight:** For each number, you already know what you're looking for (target - current). Store what you've seen in a HashMap for O(1) lookup.

---

#### 7. Best Time to Buy and Sell Stock
**Problem:** Given daily prices, find max profit from one buy and one sell.

**Input:** `[7, 1, 5, 3, 6, 4]`
**Output:** `5` (buy at 1, sell at 6)

**How to think:** Track the minimum price seen so far. At each price, check the profit if you sold now.

```java
int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int maxProfit = 0;

    for (int price : prices) {
        if (price < minPrice) {
            minPrice = price;
        } else {
            maxProfit = Math.max(maxProfit, price - minPrice);
        }
    }
    return maxProfit;
}
```
**Time:** O(n). **Space:** O(1). One of the most-asked interview questions.

---

#### 8. Product of Array Except Self
**Problem:** Return an array where each element is the product of all other elements. No division allowed.

**Input:** `[1, 2, 3, 4]`
**Output:** `[24, 12, 8, 6]`

**How to think:**
- For index `i`, the answer = (product of all left of i) × (product of all right of i)
- Build prefix products and suffix products.

```java
int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];

    // Pass 1: result[i] = product of everything LEFT of i
    result[0] = 1;
    for (int i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }

    // Pass 2: multiply by product of everything RIGHT of i
    int rightProduct = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }

    return result;
}
```
**Time:** O(n). **Space:** O(1) extra (output doesn't count). Beautiful problem.

---

## End of Week Checklist

- [ ] I can look at code and estimate Big O in under 30 seconds
- [ ] I can implement array reverse, rotation, move-zeros from memory
- [ ] I solved all 5 easy problems without looking at solutions
- [ ] I understand the HashMap optimization in Two Sum
- [ ] I can explain the stock problem's approach to someone else
- [ ] I understand WHY each solution has its time/space complexity

---

## If You're Struggling

That's normal. Here's what to do:

1. **Re-read the concept note** — don't just re-read, re-code the examples
2. **Trace through with a small input** — literally write out what happens at each step
3. **Draw it** — arrays on paper with arrows showing pointer movements
4. **Sleep on it** — seriously, your brain consolidates patterns during sleep

**Don't move to Week 2 until this checklist is done.** Speed comes from strong foundations, not from rushing.
