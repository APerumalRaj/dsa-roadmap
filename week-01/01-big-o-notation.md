# Big O Notation — Time & Space Complexity

> Before you write a single algorithm, you need to know how to **judge** one. This is that skill.

---

## 1. Intuition First

Imagine you're ordering food at two restaurants:
- **Restaurant A:** Takes 5 minutes no matter how many people are there.
- **Restaurant B:** Takes 5 minutes per person ahead of you.

If there are 3 people ahead? Restaurant B takes 15 min. 100 people? 500 min.

**Restaurant A is O(1)** — constant time.
**Restaurant B is O(n)** — linear time, grows with input.

Big O answers one question: **As my input grows, how much slower does my code get?**

---

## 2. Core Idea

### What is it?
Big O notation describes the **upper bound** of how an algorithm's time or space grows relative to input size `n`.

### Why it exists
Because we don't care about exact milliseconds. We care about **scalability**.

An algorithm that takes 0.001 seconds for 10 items but 10 hours for 1 million items is **useless** in production. Big O helps you spot that before you ship it.

---

## 3. Step-by-Step Explanation

### The Common Complexities (Ranked Best → Worst)

| Big O | Name | Example | 1,000 items | 1,000,000 items |
|-------|------|---------|-------------|-----------------|
| O(1) | Constant | Array access by index | 1 op | 1 op |
| O(log n) | Logarithmic | Binary search | ~10 ops | ~20 ops |
| O(n) | Linear | Loop through array | 1,000 ops | 1,000,000 ops |
| O(n log n) | Linearithmic | Merge sort | ~10,000 ops | ~20,000,000 ops |
| O(n²) | Quadratic | Nested loops | 1,000,000 ops | 1,000,000,000,000 ops |
| O(2ⁿ) | Exponential | Recursive subsets | Forget it | Heat death of universe |

### Rules for Calculating Big O

**Rule 1: Drop constants**
```
O(2n) → O(n)
O(500) → O(1)
```
Why? When n is a billion, the constant doesn't matter.

**Rule 2: Drop non-dominant terms**
```
O(n² + n) → O(n²)
O(n + log n) → O(n)
```
The biggest term dominates everything else at scale.

**Rule 3: Different inputs = different variables**
```java
void process(int[] a, int[] b) {
    for (int x : a) { ... }  // O(a)
    for (int y : b) { ... }  // O(b)
}
// Total: O(a + b), NOT O(n)
```

**Rule 4: Nested loops multiply**
```java
for (int i = 0; i < n; i++) {       // O(n)
    for (int j = 0; j < n; j++) {   // O(n)
        // ...
    }
}
// Total: O(n × n) = O(n²)
```

---

## 4. Code Examples — Analyzing Complexity

### O(1) — Constant Time
```java
int getFirst(int[] arr) {
    return arr[0];  // One operation, always
}
```
No matter if the array has 10 or 10 million elements. One step.

### O(n) — Linear Time
```java
int findMax(int[] arr) {
    int max = arr[0];
    for (int i = 1; i < arr.length; i++) {  // Visits every element once
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
```
If array doubles in size, work doubles. That's linear.

### O(n²) — Quadratic Time
```java
void printPairs(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        for (int j = 0; j < arr.length; j++) {
            System.out.println(arr[i] + ", " + arr[j]);
        }
    }
}
```
For 100 elements: 10,000 pairs. For 1,000 elements: 1,000,000 pairs. Grows fast.

### O(log n) — Logarithmic Time
```java
int binarySearch(int[] arr, int target) {
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;  // Halves the search space each time
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
```
Each step cuts the problem **in half**. 1 billion elements? Only ~30 steps.

---

## 5. Space Complexity

Same idea, but for **memory** instead of time.

```java
// O(1) space — uses fixed variables
int sum(int[] arr) {
    int total = 0;
    for (int x : arr) total += x;
    return total;
}

// O(n) space — creates a new array
int[] doubled(int[] arr) {
    int[] result = new int[arr.length];  // New array of size n
    for (int i = 0; i < arr.length; i++) {
        result[i] = arr[i] * 2;
    }
    return result;
}
```

**Key insight:** If your algorithm uses extra space that grows with input, that's not free.

---

## 6. Common Mistakes

| Mistake | Reality |
|---------|---------|
| "O(2n) is different from O(n)" | No. Drop constants. They're the same. |
| "My code runs fast so it's O(1)" | Speed depends on hardware. Big O is about *growth rate*. |
| "Big O is the exact number of operations" | No. It's the *category* of growth. |
| "O(n) is always better than O(n²)" | Usually, but for tiny n (like 5 elements), it doesn't matter. |
| Ignoring space complexity | Interviewers WILL ask about it. |

---

## 7. Patterns & Recognition

When you see... → Think...

| Pattern | Complexity |
|---------|-----------|
| Single loop through array | O(n) |
| Nested loop (both depend on n) | O(n²) |
| Halving the input each step | O(log n) |
| Sorting then doing something | O(n log n) + something |
| Trying all subsets | O(2ⁿ) |
| Trying all permutations | O(n!) |
| HashMap lookup inside a loop | O(n) total (O(1) per lookup) |

---

## 8. Practice Problems

### Easy
1. **What's the Big O?** Look at this code and determine complexity:
   ```java
   for (int i = 0; i < n; i++) {
       for (int j = i; j < n; j++) {
           System.out.println(i + j);
       }
   }
   ```
   *Think about it: j starts at i, not 0. Does that change the Big O?*
   → Still O(n²). It's n + (n-1) + (n-2) + ... + 1 = n(n+1)/2 → O(n²)

2. **What's the Big O?**
   ```java
   for (int i = 1; i < n; i *= 2) {
       System.out.println(i);
   }
   ```
   *Hint: how many times can you double before reaching n?*
   → O(log n)

### Medium
3. **Analyze this function:**
   ```java
   void mystery(int n) {
       for (int i = 0; i < n; i++) {
           for (int j = 0; j < 100; j++) {
               System.out.println(i + j);
           }
       }
   }
   ```
   *The inner loop runs 100 times — constant! So O(100n) → O(n)*

4. **Two separate loops:**
   ```java
   for (int i = 0; i < n; i++) { /* O(n) */ }
   for (int i = 0; i < m; i++) { /* O(m) */ }
   ```
   *Total: O(n + m), NOT O(n²) — they're sequential, not nested*

### Hard
5. **Recursive complexity:**
   ```java
   int fib(int n) {
       if (n <= 1) return n;
       return fib(n - 1) + fib(n - 2);
   }
   ```
   *Each call branches into 2 more. Depth is n. Total calls ≈ 2ⁿ → O(2ⁿ)*
   *This is why naive Fibonacci is terrible.*

---

## 9. Thinking Process

When someone asks "What's the complexity?" do this:

1. **Find the loops.** How many? Are they nested or sequential?
2. **What does each loop depend on?** The input n? A constant? A different variable?
3. **Nested loops multiply.** Sequential loops add.
4. **Drop constants and lower terms.**
5. **For recursion:** Draw the call tree. Count total nodes.

---

## 10. Mini Challenges

**Challenge 1:** Write a function that checks if an array has duplicates.
- First write the O(n²) brute force (nested loops)
- Then write the O(n) version (using a HashSet)
- Explain WHY the second one is faster

**Challenge 2:** You have a sorted array. You need to find if a number exists.
- What's the brute force complexity? O(n)
- What's the optimal complexity? O(log n)
- Write both and explain the difference

**Challenge 3:** For each of these, guess the complexity BEFORE running:
```java
// A
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        for (int k = 0; k < n; k++)
            count++;

// B
for (int i = n; i > 0; i /= 2)
    count++;

// C
for (int i = 0; i < n; i++)
    for (int j = 0; j < 10; j++)
        count++;
```
*Answers: A = O(n³), B = O(log n), C = O(n)*
