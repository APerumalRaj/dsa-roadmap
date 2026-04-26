# Arrays — The Foundation of Everything

> Every data structure is built on top of arrays or pointers. Master this, and everything else becomes easier.

---

## 1. Intuition First

Think of an array as a **row of lockers in a school hallway**.

- Each locker has a **number** (index) starting from 0
- Each locker holds **one thing** (element)
- You can go directly to locker #47 without opening lockers 0–46 (random access)
- All lockers are the **same size** (same data type)
- The row has a **fixed length** — you can't magically add more lockers in the middle

That direct access is what makes arrays powerful. That fixed size is what makes them limited.

---

## 2. Core Idea

### What is it?
An array is a **contiguous block of memory** that stores elements of the same type, accessible by index.

### Why it exists
Because computers are really fast at one thing: **going to a memory address and reading what's there**. Arrays give every element a predictable address:

```
address of element[i] = base_address + (i × size_of_element)
```

This is why `arr[500]` is just as fast as `arr[0]` — it's just math, not searching.

---

## 3. Step-by-Step: Array Operations

### Creating an Array
```java
// Fixed size, initialized to 0s
int[] nums = new int[5];          // [0, 0, 0, 0, 0]

// With values
int[] nums = {10, 20, 30, 40, 50};

// Length
int size = nums.length;           // 5 (not a method, it's a field)
```

### Accessing Elements — O(1)
```java
int first = nums[0];   // 10
int last = nums[4];    // 50
// nums[5] → ArrayIndexOutOfBoundsException (classic beginner bug)
```

### Updating Elements — O(1)
```java
nums[2] = 99;  // [10, 20, 99, 40, 50]
```

### Traversing — O(n)
```java
// Standard for loop (use when you need the index)
for (int i = 0; i < nums.length; i++) {
    System.out.println("Index " + i + ": " + nums[i]);
}

// Enhanced for loop (use when you just need values)
for (int num : nums) {
    System.out.println(num);
}
```

### Inserting — O(n) worst case
Arrays don't have a built-in "insert". You shift elements manually:
```java
// Insert value 25 at index 2 in an array with room
// Before: [10, 20, 30, 40, 0]  (last slot is empty)
// After:  [10, 20, 25, 30, 40]

void insertAt(int[] arr, int index, int value, int currentSize) {
    // Shift everything from index onward to the right
    for (int i = currentSize; i > index; i--) {
        arr[i] = arr[i - 1];
    }
    arr[index] = value;
}
```
**Why O(n)?** In the worst case (insert at index 0), you shift ALL elements.

### Deleting — O(n) worst case
```java
// Delete element at index 2
// Before: [10, 20, 30, 40, 50]
// After:  [10, 20, 40, 50, 0]

void deleteAt(int[] arr, int index, int currentSize) {
    for (int i = index; i < currentSize - 1; i++) {
        arr[i] = arr[i + 1];
    }
    arr[currentSize - 1] = 0;  // Clear last slot
}
```

### Summary of Operations

| Operation | Time | Why |
|-----------|------|-----|
| Access by index | O(1) | Direct address calculation |
| Update by index | O(1) | Same as access |
| Search (unsorted) | O(n) | Must check every element |
| Insert at end | O(1) | If there's room |
| Insert at position | O(n) | Must shift elements |
| Delete | O(n) | Must shift elements |

---

## 4. Arrays vs ArrayList (Java)

```java
// Array: fixed size, primitive types OK
int[] arr = new int[10];

// ArrayList: dynamic size, objects only
ArrayList<Integer> list = new ArrayList<>();
list.add(42);        // Appends — O(1) amortized
list.get(0);         // Access — O(1)
list.remove(0);      // Delete — O(n) (shifts elements internally)
list.size();         // Length — O(1)
```

**Under the hood, ArrayList IS an array.** When it runs out of room, it creates a bigger array and copies everything over. That's why `add()` is "amortized O(1)" — usually O(1), occasionally O(n) when it resizes.

---

## 5. Essential Array Patterns (Beginner Level)

### Pattern 1: Linear Scan
Visit every element, do something.

```java
// Find the maximum element
int findMax(int[] arr) {
    int max = arr[0];
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}
```

### Pattern 2: Reverse an Array (In-Place)
```java
void reverse(int[] arr) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        // Swap
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
}
```
**Key insight:** Two pointers moving toward each other. Time: O(n). Space: O(1).
This is your first taste of the **two-pointer technique** (Week 2 deep dive).

### Pattern 3: Rotate Array by K Positions
```java
// Rotate [1,2,3,4,5] by k=2 → [4,5,1,2,3]
// The trick: three reverses

void rotate(int[] arr, int k) {
    int n = arr.length;
    k = k % n;  // Handle k > n
    reverse(arr, 0, n - 1);      // Reverse all:    [5,4,3,2,1]
    reverse(arr, 0, k - 1);      // Reverse first k: [4,5,3,2,1]
    reverse(arr, k, n - 1);      // Reverse rest:    [4,5,1,2,3]
}

void reverse(int[] arr, int start, int end) {
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}
```
**Why this works:** Reversing is like flipping a string. Three strategic flips put everything in place. Time: O(n). Space: O(1).

### Pattern 4: Move Zeros to End
```java
// [0, 1, 0, 3, 12] → [1, 3, 12, 0, 0]
void moveZeros(int[] arr) {
    int insertPos = 0;
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] != 0) {
            arr[insertPos] = arr[i];
            insertPos++;
        }
    }
    // Fill remaining with zeros
    while (insertPos < arr.length) {
        arr[insertPos] = 0;
        insertPos++;
    }
}
```
**Key insight:** `insertPos` tracks where the next non-zero should go. One pass. O(n).

---

## 6. Common Mistakes

| Mistake | Fix |
|---------|-----|
| `arr[arr.length]` — off by one | Last valid index is `arr.length - 1` |
| Forgetting arrays are 0-indexed | Index 0 is the first element |
| Modifying array while iterating | Use a separate pointer or iterate backwards |
| Not handling empty arrays | Always check `if (arr == null \|\| arr.length == 0)` |
| Using `==` to compare arrays | Use `Arrays.equals(arr1, arr2)` |
| Confusing `.length` (array) with `.length()` (String) and `.size()` (List) | Arrays use `.length` (no parentheses) |

---

## 7. Patterns & Recognition

**"I need to process every element"** → Linear scan, O(n)

**"I need to find something in a sorted array"** → Binary search, O(log n) (Week 8)

**"I need to rearrange elements in-place"** → Two pointers / swap technique

**"I need to track something about elements I've seen"** → Use a HashMap (Week 4)

**"The brute force is O(n²) nested loops"** → Look for two-pointer or hashmap optimization

---

## 8. Practice Problems

### Easy (Do all of these)
1. **Find the second largest element** — Don't sort! One pass, O(n).
2. **Check if array is sorted** — Compare each element with the next.
3. **Remove duplicates from sorted array** — In-place, return new length.
4. **Find missing number** — Array of 0 to n with one missing. Use math: sum formula.
5. **Merge two sorted arrays** — Into a third array. (Don't worry about in-place yet.)

### Medium (Push yourself)
6. **Two Sum** — Given array and target, find two numbers that add to target. Start brute force O(n²), then think about O(n) with HashMap.
7. **Best time to buy/sell stock** — Find max profit with one transaction. Think: "what's the minimum price so far?"
8. **Product of array except self** — Without using division. Use prefix and suffix products.

### Hard (Stretch goal — revisit later if stuck)
9. **Trapping rain water** — Classic interview problem. Uses the idea of "max from left" and "max from right."
10. **Next permutation** — Rearrange to the next lexicographically greater permutation.

---

## 9. Thinking Process for Array Problems

When you see an array problem:

1. **What's the brute force?** (Usually nested loops, O(n²) or worse)
2. **Can I sort first?** (Sometimes sorting simplifies everything, costs O(n log n))
3. **Can I use a single pass with extra space?** (HashMap, extra array)
4. **Can I use two pointers?** (Especially if sorted or searching for pairs)
5. **Am I doing repeated work?** (Look for prefix sums, precomputation)

**Don't jump to optimization.** Get brute force working first, then improve.

---

## 10. Mini Challenges

**Challenge 1:** Given `[1, 2, 3, 4, 5]`, predict the output of:
```java
for (int i = arr.length - 1; i >= 0; i--) {
    System.out.print(arr[i] + " ");
}
```
*(Think before running: 5 4 3 2 1)*

**Challenge 2:** Write a function `boolean containsDuplicate(int[] arr)` two ways:
- Brute force: O(n²) — compare every pair
- Optimal: O(n) — use a HashSet

**Challenge 3:** Without running the code, what does this produce?
```java
int[] a = {1, 2, 3};
int[] b = a;
b[0] = 99;
System.out.println(a[0]);
```
*(Think: Is `b` a copy of `a`, or do they point to the same array?)*
→ Answer: **99**. Arrays in Java are reference types. `b = a` copies the reference, not the data.

**Challenge 4:** Write `int[] intersection(int[] a, int[] b)` that returns elements common to both arrays.
- Start with brute force
- Then optimize using a HashSet
