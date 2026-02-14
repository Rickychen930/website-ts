/**
 * Learning Seed – Curriculum data using the structure from learningSeedStructure.
 * Sections and topics are defined with contentBlocks; final output is built via buildLearningSections.
 */

import {
  buildLearningSections,
  validateLearningSeed,
  type SectionConfig,
} from "./learningSeedStructure";

const IMG: Record<string, string> = {
  learning:
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=400&fit=crop&q=80",
  algorithms:
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=400&fit=crop&q=80",
  complexity:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop&q=80",
  sorting:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&q=80",
  prefix:
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop&q=80",
  dp: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop&q=80",
  react:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop&q=80",
  interview:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop&q=80",
  nodejs:
    "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop&q=80",
  database:
    "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop&q=80",
  systemdesign:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop&q=80",
  networks:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&q=80",
  security:
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop&q=80",
  english:
    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=400&fit=crop&q=80",
  analytics:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&q=80",
  ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&q=80",
  backend:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&q=80",
  software:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop&q=80",
};

const sectionConfigs: SectionConfig[] = [
  {
    title: "How to Learn This Curriculum",
    slug: "how-to-learn",
    description:
      "Start here: suggested order, study tips (active recall, one topic at a time), time estimates, and how to use Jump to and bookmarks.",
    order: 0,
    published: true,
    topics: [
      {
        id: "learning-path-study-tips",
        title: "Learning Path & Study Tips",
        description:
          "Suggested order, time per topic, active recall, and practice strategy.",
        order: 0,
        imageKey: "learning",
        contentBlocks: {
          learningFlow: [
            "Read the suggested order and tips below so you know which topics to do first and how much time to set aside.",
            "Bookmark `/learning#section-{slug}` for each section (e.g. competitive-programming, react) so you can jump back quickly.",
            "Follow one topic at a time: read → summarize → try code → 1–2 practice problems. Finishing one topic before moving on builds retention.",
            "After each topic, do active recall: close the page and write three bullet points from memory or explain aloud.",
          ],
          learningFlowIntro: `**Your first step:** Open the Learning page, use Jump to → **Competitive Programming**, then open **Complexity & Strategy**. Read sections 1–8, type the code yourself, then try LeetCode Two Sum.

**Prerequisites (operational):** You are ready if you can: write variables, loops (for/while), arrays, and functions; read code that calls itself (recursion). If you have never done recursion, do 2–3 recursion problems on LeetCode before DP and Backtracking. If you are a complete beginner, start with an introductory programming course.

**By the end of this section you will:** Know the recommended study order, how long to spend per topic, and how to use active recall and bookmarks to remember better.`,
          material: `Each topic follows the same structure:
1. Learning flow → 2. Material → 3. Explanation → 4. Application → 5. How to implement → 6. Logic & code → 7. Example → 8. Additional info.

Suggested order (matches the order on the Learning page): How to Learn → Competitive Programming → CS Theory → Database & SQL → Computer Networks → OS & Concurrency → System Design → Software Design Principles → React → Node.js → Backend Development → Security → Interview Preparation → Programming Languages → Data Analytics → AI & Machine Learning → English for IELTS 8.

**In other words:** Follow the order on the Learning page; finish one topic (read → summarize → type code → 1–2 problems) before moving on. Active recall = close the page and write 3 points from memory — this strengthens retention better than re-reading.`,
          explanation: `Order is chosen so foundations (algorithms, CS theory, DB, networks, OS) come first; then system design and software design; then applied topics (React, Node, Backend, Security). Interview Preparation is best read after core technical sections, then revisited before interviews. Programming Languages, Data Analytics, AI/ML, and English are reference or parallel tracks.`,
          application: `Use this path for a full curriculum pass or for interview-only focus (Competitive Programming, CS Theory, Database, Networks, OS, System Design, Interview Prep). For backend/full-stack focus, follow through Backend Development and Security.`,
          howToImplement: `- For each topic: read first, then summarize in your own words (1–2 sentences per section).
- Type the code from the example by hand; avoid copy-paste.
- Do 1–2 practice problems (e.g. LeetCode). If stuck, re-read the Logic section.
- Use Jump to and bookmarks to navigate. After each topic, do active recall (3 bullets from memory).`,
          logicAndCode: `The suggested order forms one learning path. Active recall works because retrieving information from memory strengthens long-term retention more than re-reading.`,
          example: `Problem: Forgetting topics after a few days.
Solution: Active recall — after reading, close the page and write 3 key points or explain to a peer. For coding: type the code yourself. Spaced repetition: revisit with practice problems weekly. **Why:** Retrieval practice (recalling actively) strengthens memory more than re-reading.`,
          additionalInfo: `**Takeaway:** Finish one topic at a time; active recall after each topic (3 points from memory); type code don't copy-paste. Time: 15–30 min read + 15–30 min practice per topic. Full pass: 2–4 months; interview-only: 2–6 weeks. LeetCode/Codeforces for CP. **Note for non-C++ learners:** CP examples are in C++; same concepts in Python/JS — type the equivalent or use LeetCode's language switcher.`,
        },
        codeExample: `// Active recall template (after each topic)
// 1. Close the page
// 2. Write 3 key points from memory:
//    - Point 1: _______________
//    - Point 2: _______________
//    - Point 3: _______________
// 3. Compare with material; fill gaps
// Bookmark: /learning#section-competitive-programming`,
        codeLanguage: "text",
      },
    ],
  },
  {
    title: "Competitive Programming",
    slug: "competitive-programming",
    description:
      "Big O, two pointers, binary search, prefix sum, sliding window, DP, greedy, graphs, trees, heaps, Dijkstra, backtracking, intervals, stack, bit manipulation, and interview tips.",
    order: 1,
    published: true,
    topics: [
      {
        id: "complexity-and-strategy",
        title: "Complexity & Strategy",
        description: "Big O, time/space trade-offs, and practice approach.",
        order: 0,
        imageKey: "complexity",
        contentBlocks: {
          learningFlow: [
            "Read the material so you know what Big O is and how it describes growth with input size.",
            'Understand Big O for one loop (linear) and nested loops (quadratic). Practice by asking: "how many times does the body run?"',
            "Type the Two Sum example yourself so you see how one pass with a hash map gives O(n).",
            "Solve Two Sum on LeetCode.",
            "Estimate complexity for 3 of your own solutions.",
          ],
          learningFlowIntro: `**Your first step:** Open this topic, read sections 1–2 (Learning flow & Material), then type the Two Sum code from section 6–7 in your editor and run it.

**Prerequisites:** Basic programming (variables, loops, arrays, functions) in any language.

**By the end of this topic you will:** Describe Big O for common patterns (loop, nested loop, hash lookup), implement Two Sum in O(n) time, and state time/space complexity for your solutions.`,
          material: `Big O describes how time or space grows as input size n increases.
- O(1) = constant
- O(n) = linear
- O(n²) = quadratic
- O(log n) = logarithmic

Time vs space: you can often use extra memory (e.g. hash map) to reduce time.

**In other words:** Big O = a short answer to "how much does work grow when input grows". One loop n times → O(n); two nested loops each n → O(n²). Hash map = O(1) lookup on average; trade extra memory for less time.`,
          explanation: `Big O is an upper bound: we say an algorithm is O(n) if the number of steps is at most proportional to n for large n.

One loop over n elements is O(n). Two nested loops over n each is O(n²). In interviews, state your complexity and justify it.`,
          application: `Use Big O to choose between algorithms (e.g. O(n log n) sort vs O(n²) bubble), to explain your solution in interviews, and to spot bottlenecks (e.g. loop inside a loop → O(n²)).`,
          howToImplement: `(1) Count loops: one pass over n = O(n); two nested loops each over n = O(n²).
(2) Prefer built-in sort (O(n log n)) unless the problem asks for custom sort.
(3) For fast lookups ("have I seen this value?"), use a hash map — O(1) per operation on average.
(4) See the code block below; run it, then modify and reason about the new complexity.`,
          logicAndCode: `- Loop O(n): Iteration from i=0 to n-1; each iteration does constant work. Total = n → O(n).
- Nested loop O(n²): Outer n times, inner n times → n×n = n².
- Two Sum O(n): One pass with map. For each x, check if (target - x) is in the map. If yes, pair found. Insert x after check. Lookup O(1) per element.`,
          example: `Problem: Two Sum — Given array nums and target, return indices of two numbers that add up to target. See [LeetCode #1 Two Sum](https://leetcode.com/problems/two-sum/).

Solution (C++): Idea: for each number x, the pair we need is (target - x). We store "value → index" for what we've seen. At x, check if (target - x) is in the map; if so, that's the pair. One pass with unordered_map<int,int> (value → index). For each nums[i], if (target - nums[i]) exists in map, return {map[target-nums[i]], i}. Otherwise map[nums[i]] = i. Time O(n), space O(n). **Takeaway:** Big O = how time/space grows as input size grows; one loop + O(1) lookup → O(n).`,
          additionalInfo: `Strategy: practice daily on Codeforces or [LeetCode](https://leetcode.com/); focus on patterns (two pointers, sliding window, DP). Common complexities: O(1), O(log n), O(n), O(n log n), O(n²). Interview tip: State complexity when presenting; explain trade-off (e.g. O(n) time + O(n) space vs O(n²) time + O(1) space). **Takeaway:** Big O = a concise way to state "how much work grows when input grows" — one loop n times → O(n); two nested loops each n → O(n²).`,
        },
        codeExample: `// C++: Loop O(n) - one pass
for (int i = 0; i < n; i++) {
  // constant work per iteration
}
// Nested loop O(n²)
for (int i = 0; i < n; i++)
  for (int j = 0; j < n; j++)
    process(i, j);

// Two Sum - O(n) with hash map
vector<int> twoSum(vector<int>& nums, int target) {
  unordered_map<int,int> seen;
  for (int i = 0; i < nums.size(); i++) {
    int need = target - nums[i];
    if (seen.count(need)) return {seen[need], i};
    seen[nums[i]] = i;
  }
  return {};
}`,
        codeLanguage: "cpp",
      },
      {
        id: "sorting-and-searching",
        title: "Sorting & Searching",
        description: "Comparison sorts, binary search, two pointers.",
        order: 1,
        imageKey: "sorting",
        contentBlocks: {
          learningFlow: [
            "Read material so you know when to use sorting, binary search, and two pointers.",
            "Implement binary search: type it yourself and trace with [1,3,5,7], find 5.",
            "Solve Two Sum II (two pointers on sorted array).",
            "Try 3Sum — sort plus one fixed element and two pointers for the remaining pair.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Implement binary search: given sorted array and target, return index or -1; use lo, hi, mid and trace on [1,3,5,7] for target 5. Then solve Two Sum II (sorted array, two pointers).

**Prerequisites:** Complexity & Strategy (Big O). Arrays and loops.

**By the end of this topic you will:** Use built-in sort and know O(n log n), implement binary search and two pointers, and solve Two Sum II and 3Sum-style problems.`,
          material: `**Sorting:** Use built-in sort (C++ \`std::sort\`, Python \`sorted()\`) for O(n log n). Enables two pointers and binary search on the result.

**Binary search:** Find position in sorted array in O(log n). Maintain range [lo, hi]; compute mid = lo + (hi - lo) / 2; compare with target; set lo = mid + 1 or hi = mid - 1 until found or range empty.

**Two pointers:** Two indices (e.g. i at start, j at end); move based on condition. On sorted array: if sum < target then increase left; if sum > target then decrease right. Often O(n).

**When to use:** Sort when order helps (pairs, intervals); binary search for lookup or when answer is monotonic; two pointers for pairs or subarrays.

**In other words:** After sorting, many problems become easier: two pointers can find a pair with a given sum in O(n); binary search halves the range for O(log n). Always ask if the array is sorted or if you may sort it.`,
          explanation: `After sorting, many problems become easier: two pointers can find pairs with a given sum in O(n). Binary search works on the index space or on the answer space. Always clarify if the array is sorted or if you may sort it.`,
          application: `Sorting when order matters (pairs, merge intervals). Binary search for lookup in sorted data or when the answer is monotonic. Two pointers for pairs, subarrays, or removal in place.`,
          howToImplement: `(1) Sort with std::sort(a.begin(), a.end()) whenever you need ordered data.
(2) Binary search: range [lo, hi]; mid = lo + (hi - lo) / 2; compare a[mid] with target; set lo = mid + 1 or hi = mid - 1.
(3) Two pointers on sorted array: i=0, j=n-1; if a[i]+a[j]==target done; if sum < target then i++; else j--.

**Note:** Always use mid = lo + (hi - lo) / 2 instead of (lo + hi) / 2 to avoid integer overflow when lo and hi are large.`,
          logicAndCode: `Binary search: Each iteration halves the range → O(log n). Two pointers: i and j move toward each other; each step moves at least one pointer → O(n).`,
          example: `Problem: Two Sum II — Sorted array, find two numbers that add up to target. Return 1-based indices. See [LeetCode #167 Two Sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/).

Solution: Two pointers. i=0, j=n-1; while(i<j) { if(a[i]+a[j]==target) return {i+1,j+1}; if(sum<target) i++; else j--; } Time O(n), space O(1). **Why:** Array is sorted; if sum too small move left up, too large move right down; each step narrows the range.`,
          additionalInfo: `**Takeaway:** Sorted array + pair/subarray → two pointers O(n). Value lookup → binary search O(log n); use mid = lo + (hi-lo)/2 to avoid overflow. LeetCode: [Two Sum](https://leetcode.com/problems/two-sum/), [Two Sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/), [3Sum](https://leetcode.com/problems/3sum/). Clarify if array is sorted; if not, ask if you may sort.`,
        },
        codeExample: `// C++: Binary Search - find x in sorted array
int lo = 0, hi = n - 1;
while (lo <= hi) {
  int mid = lo + (hi - lo) / 2;
  if (a[mid] == x) return mid;
  if (a[mid] < x) lo = mid + 1;
  else hi = mid - 1;
}
return -1;

// Two Sum II - two pointers
vector<int> twoSum(vector<int>& a, int target) {
  int i = 0, j = (int)a.size() - 1;
  while (i < j) {
    int s = a[i] + a[j];
    if (s == target) return {i+1, j+1};
    if (s < target) i++; else j--;
  }
  return {};
}`,
        codeLanguage: "cpp",
      },
      {
        id: "prefix-sum-and-sliding-window",
        title: "Prefix Sum & Sliding Window",
        description:
          "Range queries O(1), fixed/variable window, subarray problems.",
        order: 2,
        imageKey: "prefix",
        contentBlocks: {
          learningFlow: [
            "Read so you understand: prefix sum turns range queries into O(1) lookups; sliding window keeps a segment [i,j] and updates it incrementally.",
            "Implement prefix sum (build pre[], then query sum(l..r)) and a sliding-window loop (expand j, shrink i while invalid).",
            "Solve Subarray Sum Equals K and Longest Substring with K Distinct.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Build prefix array for [1,2,3,4,5]: pre[0]=0, pre[1]=1, pre[2]=3, ...; then compute sum(1..3) = pre[4]-pre[1] = 9. Solve Subarray Sum Equals K (LeetCode #560) using a map of prefix sums.

**Prerequisites:** Complexity & Strategy, arrays. Sorting helps for "when to use which pattern."

**By the end of this topic you will:** Build and query prefix sum in O(1), implement sliding window (fixed and variable), and solve range-sum and substring problems.`,
          material: `**Prefix sum:** Precompute pre[i] = a[0]+...+a[i-1] (so pre[0]=0, pre[1]=a[0], ...). Then sum(l..r) = pre[r+1]-pre[l] in O(1). Build in O(n); each range query O(1).

**Sliding window:** Maintain contiguous segment [i,j]. Fixed size: move i and j together. Variable size: expand j until condition holds, then shrink i until invalid, update answer at each valid step; each element in/out at most twice → O(n).

**When to use:** Prefix sum for range sum, "subarray sum equals K" (with map of prefix sums). Sliding window for "longest subarray with sum ≤ K", "minimum window containing all", max in each window of size k.

**In other words:** Prefix sum = precompute cumulative sums; query sum(l..r) becomes pre[r+1]-pre[l] in O(1). Subarray sum K = for each ending index j, count how many previous prefixes have value (current_sum - K). Sliding window = maintain a valid segment [i,j]; expand right, shrink left; each element enters and leaves at most twice → O(n).`,
          explanation: `Prefix sum turns range-sum queries into two lookups.

Sliding window avoids re-scanning by moving the window one step and updating state (e.g. frequency map). Both are one-pass O(n) or O(1) per query.`,
          application: `Prefix sum: range sum, count in range, subarray divisibility. Sliding window: max/min in window, longest substring with at most K distinct, minimum window substring.`,
          howToImplement: `(1) Build pre: pre[0]=0, then pre[i+1]=pre[i]+a[i]. Query: sum(l..r) = pre[r+1]-pre[l].
(2) Sliding window: two pointers i, j; extend j and update state; when invalid, shrink i until valid; update answer at each valid step.
(3) Subarray sum equals K: map that counts prefixes with a given sum; for each j, add count of prefixes with sum = (current_sum - K).`,
          logicAndCode: `pre[r+1]-pre[l] = a[l]+...+a[r]. Subarray sum K: for subarray ending at j, we want pre[j+1]-pre[i]=K → pre[i]=pre[j+1]-K. Count how many pre[i] we have seen equal to pre[j+1]-K.`,
          example: `Problem: Subarray Sum Equals K — Count subarrays with sum K. See [LeetCode #560](https://leetcode.com/problems/subarray-sum-equals-k/).

Solution: Idea: prefix sum up to index j is the running sum. Subarray [i..j] has sum = prefix[j] - prefix[i-1]. We want prefix[j] - prefix[i-1] = K, so prefix[i-1] = prefix[j] - K. We count how many previous prefixes have value (current_sum - K); that's the number of subarrays ending here with sum K. cnt[0]=1 (so subarrays starting at index 0 are counted). For each x: sum+=x; ans+=cnt[sum-K]; cnt[sum]++. Time O(n), space O(n). **Why:** Each subarray [i..j] has sum = prefix[j]-prefix[i-1]; we count pairs (i,j) with that difference K. **Common mistake:** Forgetting to initialize cnt[0]=1; subarrays starting at index 0 won't be counted.`,
          additionalInfo: `**Takeaway:** Range sum O(1) → prefix sum; subarray sum K → map prefix sum, cnt[sum-K]. Sliding window: expand j, shrink i; variable window O(n). LeetCode: [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/), [Longest Substring with At Most K Distinct](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/), [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/). Variable window: expand right, shrink left while valid.`,
        },
        codeExample: `// Prefix sum - build and query O(1)
vector<int> pre(n+1);
pre[0] = 0;
for (int i = 0; i < n; i++)
  pre[i+1] = pre[i] + a[i];
// sum(l..r) = pre[r+1] - pre[l]

// Subarray Sum Equals K - O(n)
int subarraySum(vector<int>& nums, int k) {
  unordered_map<int,int> cnt;
  cnt[0] = 1;
  int sum = 0, ans = 0;
  for (int x : nums) {
    sum += x;
    ans += cnt[sum - k];
    cnt[sum]++;
  }
  return ans;
}`,
        codeLanguage: "cpp",
      },
      {
        id: "dynamic-programming",
        title: "Dynamic Programming",
        description:
          "Memoization, tabulation, state & recurrence; knapsack, LIS, LCS.",
        order: 3,
        imageKey: "dp",
        contentBlocks: {
          learningFlow: [
            'Read and identify state and recurrence — state is "where am I?" (e.g. index i, capacity w); recurrence is how the answer depends on smaller states.',
            "Implement 0/1 knapsack: build the table, then try the space-optimized version (one row, backward loop).",
            "Solve Climbing Stairs and Coin Change.",
            "Try LIS and LCS.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Solve Climbing Stairs (LeetCode #70): dp[i] = ways to reach step i; dp[i] = dp[i-1] + dp[i-2]; base dp[0]=1, dp[1]=1. Then implement with a 1D table.

**Prerequisites:** Complexity & Strategy, recursion, arrays. Sorting and Prefix Sum help for recognizing subproblems.

**By the end of this topic you will:** Define state and recurrence, implement top-down (memo) and bottom-up (table), and solve 1D/2D DP (stairs, knapsack, LCS).`,
          material: `DP needs optimal substructure (best solution uses best sub-solutions) and overlapping subproblems.

Define state (dp[i], dp[i][j]), recurrence, base case, and order. Memoization = top-down + cache; tabulation = bottom-up table.

**In other words:** DP = store answers to subproblems so we don't recompute. Simplest example: Fibonacci — F(i) = F(i-1) + F(i-2); we store F(0), F(1), ... so each F(k) is computed once. Knapsack uses the same idea with a 2D state (which item, capacity).`,
          explanation: `State encodes the "position" in the problem. Recurrence relates state to smaller states. Fill in order so dependencies are ready. Space can often be optimized (e.g. one row for knapsack). LIS = Longest Increasing Subsequence; LCS = Longest Common Subsequence — keduanya contoh DP klasik.`,
          application: `Classic: Fibonacci, Climbing Stairs, Coin Change, LIS (Longest Increasing Subsequence), 0/1 knapsack, LCS (Longest Common Subsequence), edit distance. Many string and sequence problems are DP.`,
          howToImplement: `(1) Write recurrence in words: "Best value for first i items with capacity w = max(skip: dp[i-1][w], take: value[i] + dp[i-1][w-weight[i]])."
(2) Base case: dp[0][w] = 0.
(3) Order: loop i from 1 to n, w from 0 to W. For space optimization: one row, loop w backwards.
(4) Return dp[n][W] or dp[W].`,
          logicAndCode: `0/1 Knapsack: dp[i][w] = max value with items 1..i, capacity w. Choices: skip i → dp[i-1][w]; take i (if fits) → val[i] + dp[i-1][w-weight[i]]. Space optimization: only one row; loop w backwards so dp[w-weight[i]] is not yet overwritten.`,
          example: `Problem: 0/1 Knapsack — n items (weight[], value[]), capacity W. Maximize total value. Each item at most once.

Solution: Idea: dp[w] = max value achievable with capacity w (using items we've looped over). For each item, we update dp from W down (not 0 up) so the dp[w-weight[i]] we use is still from "before this item was taken" — if we loop upward we could use the same item twice. vector<int> dp(W+1, 0); for(i) for(w=W; w>=weight[i]; w--) dp[w]=max(dp[w], value[i]+dp[w-weight[i]]); return dp[W]. Time O(n*W), space O(W). **Common mistake:** Forgetting to loop w backward; result becomes "unlimited copies" instead of 0/1.`,
          additionalInfo: `LeetCode: [Climbing Stairs #70](https://leetcode.com/problems/climbing-stairs/), [Coin Change](https://leetcode.com/problems/coin-change/), [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/), [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/). **Tip:** Start with brute-force recursion → memoization → tabulation. Space optimization: knapsack iterate w backwards.`,
        },
        codeExample: `// 0/1 Knapsack - tabulation 2D
vector<vector<int>> dp(n+1, vector<int>(W+1, 0));
for (int i = 1; i <= n; i++)
  for (int w = 0; w <= W; w++) {
    dp[i][w] = dp[i-1][w];
    if (weight[i-1] <= w)
      dp[i][w] = max(dp[i][w],
        val[i-1] + dp[i-1][w-weight[i-1]]);
  }
return dp[n][W];

// Space optimization O(W) - loop w backwards
vector<int> dp(W+1, 0);
for (int i = 0; i < n; i++)
  for (int w = W; w >= weight[i]; w--)
    dp[w] = max(dp[w], value[i] + dp[w-weight[i]]);
return dp[W];`,
        codeLanguage: "cpp",
      },
      {
        id: "greedy-algorithms",
        title: "Greedy Algorithms",
        description:
          "Local choices, proof of optimality, and complexity analysis.",
        order: 4,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read when greedy works: optimal substructure and greedy choice property.",
            "Prove or argue why the greedy choice is safe (exchange argument or induction).",
            "Implement 2–3 classics: Activity Selection, Coin Change (unlimited), Huffman.",
            "Analyze time and space complexity; state them before coding.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Solve Merge Intervals (LeetCode #56): sort by start, merge if overlap. Then Non-overlapping Intervals: sort by end time, take earliest end that doesn't overlap (greedy).

**Prerequisites:** Sorting & Searching; idea of "local choice → global optimum."

**By the end of this topic you will:** Recognize when greedy applies, implement interval and activity selection, and briefly justify the greedy choice.`,
          material: `**Greedy:** At each step, make the locally best choice; hope it leads to global optimum.

**When it works:** (1) Optimal substructure: optimal solution contains optimal solutions to subproblems. (2) Greedy choice property: local best choice is part of some global optimum. **Complexity:** Often O(n log n) if sorting, O(n) if one pass.

**Classics:** Activity selection (sort by end time), interval scheduling, Huffman coding, coin change (unlimited coins, greedy if denominations allow). **When it fails:** 0/1 knapsack (need DP), shortest path with negative edges (Bellman–Ford).

**In other words:** Greedy = no backtracking; once you choose, you commit. For it to be safe, the "locally best" choice must be provably part of some optimal solution (e.g. earliest finish → leaves the most time for other activities).`,
          explanation: `Greedy doesn't backtrack; once you choose, you commit. Proof techniques: exchange argument (swap greedy choice into any solution), or induction (greedy choice extends to optimal). In interviews, state "I'll try greedy; we need to prove the greedy choice is safe."`,
          application: `Use for scheduling (earliest deadline first), encoding (Huffman), caching (LRU), and many interval/ordering problems. If the problem has "choose best at each step" and no obvious counterexample, try greedy.`,
          howToImplement: `(1) Sort if needed (e.g. by end time, by ratio).
(2) One pass: for each item, if it's "compatible" with current solution, add it.
(3) Prove: "Suppose an optimal solution doesn't take our first greedy choice; then we can swap and get at least as good a solution."`,
          logicAndCode: `Activity selection: sort by end time; take first; then take next that starts after last end. O(n log n). Coin change (1,5,10): take most 10s, then 5s, then 1s — works for canonical systems.`,
          example: `Problem: Activity Selection — n activities [start, end]; max number of non-overlapping activities.

Solution: Sort by end time. Take first activity; for each next, if start >= lastEnd, take it and update lastEnd. Time O(n log n), space O(1). Proof: greedy choice (earliest finishing) leaves maximum room for rest.`,
          additionalInfo: `LeetCode: [Jump Game](https://leetcode.com/problems/jump-game/), [Merge Intervals](https://leetcode.com/problems/merge-intervals/), [Task Scheduler](https://leetcode.com/problems/task-scheduler/). Complexity: always state O(n) or O(n log n) and why. Interview: say "I'll try greedy" and give a one-line proof. **Takeaway:** Greedy = pick the best at each step without backtracking; for "max non-overlapping" intervals, sort by end time then take the one that finishes earliest.`,
        },
        codeExample: `// Activity Selection - O(n log n)
vector<pair<int,int>> activities; // (end, start)
sort(activities.begin(), activities.end());
int lastEnd = -1, count = 0;
for (auto& [e, s] : activities) {
  if (s >= lastEnd) { lastEnd = e; count++; }
}
return count;

// Coin change (greedy works for 1,5,10,25)
int coins = 0;
for (int c : {25, 10, 5, 1}) {
  coins += amount / c;
  amount %= c;
}
return coins;
`,
        codeLanguage: "cpp",
      },
      {
        id: "graphs-bfs-dfs",
        title: "Graphs: BFS & DFS",
        description:
          "Representation, BFS/DFS, cycle detection, and complexity.",
        order: 5,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read graph representation: adjacency list (vector of vectors or map) and when to use each.",
            "Implement BFS (queue) and DFS (stack or recursion); mark visited to avoid cycles.",
            "Solve: shortest path in unweighted (BFS), cycle detection (DFS), connected components.",
            "State time O(V+E) and space O(V) for both BFS and DFS.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Build an adjacency list for a small graph (e.g. 4 nodes), run BFS from node 0 and list visit order; then run DFS (recursive) and compare. Solve Number of Islands (LeetCode #200) with BFS or DFS.

**Prerequisites:** Complexity & Strategy, queues, recursion. CS Theory Graphs & Trees gives tree traversal; here we focus on general graphs and grid. **By the end of this topic you will:** Implement BFS/DFS on adj list or grid, use BFS for unweighted shortest path, and solve island/connected-component problems.`,
          material: `**Graph:** G = (V, E). V = vertices (nodes), E = edges.

**Adjacency list:** For each vertex, list of neighbors; space O(V+E); good for sparse graphs. **Adjacency matrix:** V×V matrix; space O(V²); edge lookup O(1).

**BFS (Breadth-First Search):** Use a queue; explore level by level; **shortest path** in unweighted graph; time O(V+E), space O(V). **DFS (Depth-First Search):** Use stack or recursion; go deep first; for cycle detection, topological sort, backtracking; time O(V+E), space O(V).

**In other words:** BFS = "layer by layer from the source"; first time we reach a node = shortest distance. DFS = "go deep to the end then backtrack"; must mark visited to avoid infinite loops on graphs with cycles.

**Directed vs undirected:** Undirected = each edge stored in both directions in the adjacency list.`,
          explanation: `BFS from source gives shortest path lengths in unweighted graph because we visit in order of distance. DFS visits all reachable nodes; use visited set to avoid infinite loop in cycles.

For weighted graphs use Dijkstra or Bellman–Ford.`,
          application: `BFS: shortest path (unweighted), level order, multi-source BFS. DFS: cycle detection, topological sort, count components, path finding, backtracking.`,
          howToImplement: `(1) Build adj list: vector<vector<int>> adj(n); for each edge (u,v) adj[u].push_back(v); (undirected: adj[v].push_back(u)).
(2) BFS: queue, visited array; push source; while queue not empty: pop, for each neighbor if !visited push and mark.
(3) DFS: visited array; function dfs(u): mark u; for v in adj[u]: if !visited[v] dfs(v).`,
          logicAndCode: `Each vertex enqueued/pushed once, each edge examined once → O(V+E). Space: queue or stack holds at most O(V) nodes; visited O(V).`,
          example: `Problem: Number of Islands — grid of '1' and '0'; count connected components of '1'. See [LeetCode #200](https://leetcode.com/problems/number-of-islands/).

Solution: Idea: each "island" is one connected component (adjacent 1s). For each cell that is '1' and not yet visited, run BFS or DFS from there to mark all connected '1s'; that's one island, count++. Grid = implicit graph (neighbors = up, down, left, right). Time O(rows*cols), space O(rows*cols). **Common mistake:** Forgetting to mark visited or flip '1' to '0' while exploring, so islands get counted multiple times.`,
          additionalInfo: `LeetCode: [Number of Islands](https://leetcode.com/problems/number-of-islands/), [Course Schedule](https://leetcode.com/problems/course-schedule/) (topological), [Clone Graph](https://leetcode.com/problems/clone-graph/). Interview: state "BFS for shortest path, DFS for explore all"; complexity O(V+E). **Takeaway:** BFS = shortest path unweighted; DFS = explore all + cycle/topological; always use visited.`,
        },
        codeExample: `// BFS - shortest path in unweighted graph
vector<int> dist(n, -1);
queue<int> q;
q.push(src);
dist[src] = 0;
while (!q.empty()) {
  int u = q.front(); q.pop();
  for (int v : adj[u]) {
    if (dist[v] == -1) {
      dist[v] = dist[u] + 1;
      q.push(v);
    }
  }
}

// DFS - recursion
vector<bool> vis(n);
function<void(int)> dfs = [&](int u) {
  vis[u] = true;
  for (int v : adj[u])
    if (!vis[v]) dfs(v);
};
dfs(0);
`,
        codeLanguage: "cpp",
      },
      {
        id: "trees-and-bst",
        title: "Trees & Binary Search Tree",
        description:
          "Tree traversal, BST property, LCA, validate BST; essential for Google & IMC.",
        order: 6,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read tree representation: node with left/right (or children); BST = left < root < right for every node.",
            "Implement inorder (LNR), preorder (NLR), postorder (LRN); iterative with stack.",
            "Solve Validate BST and Lowest Common Ancestor of a BST.",
            "Practice: Binary Tree Max Depth, Level Order, Serialize/Deserialize.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Implement inorder traversal (recursive then iterative with stack). Solve [Validate BST](https://leetcode.com/problems/validate-binary-search-tree/) — pass min/max range down; or use inorder and check ascending.

**Prerequisites:** Graphs BFS/DFS (traversal idea). Recursion.

**By the end of this topic you will:** Traverse trees (recursive and iterative), use BST property for O(h) search/LCA, and validate BST.`,
          material: `**Tree:** Rooted; each node has 0+ children. **Binary tree:** At most 2 children (left, right).

**BST (Binary Search Tree):** For every node, all keys in left subtree < root < all keys in right subtree; inorder (left–root–right) gives sorted order. **Traversal:** Inorder (LNR = Left, Node, Right) = sorted for BST; preorder (NLR) = root first; postorder (LRN) = children first then root. **LCA (Lowest Common Ancestor):** lowest shared ancestor. In BST: if both p and q < root, LCA is in left; both > root, LCA in right; if split (one left one right), root = LCA. **Complexity:** O(n) for full traversal; O(h) for BST operations (h = tree height).`,
          explanation: `BST property lets you discard half the tree per step → O(h). For "validate BST" pass (min, max) allowed range per node.

Iterative traversal uses explicit stack to avoid recursion stack overflow.`,
          application: `BST: search, insert, delete; Kth smallest (inorder); LCA; range queries. General tree: max depth, diameter, path sum, serialize. Often asked at Google and IMC.`,
          howToImplement: `(1) Inorder recursive: if (!root) return; inorder(root->left); process(root); inorder(root->right).
(2) Inorder iterative: stack; push left path, pop and process, then go right.
(3) Validate BST: helper(root, min, max); check root in (min,max); recurse left with (min, root->val), right with (root->val, max). Use long to avoid INT overflow.
(4) LCA BST: while (root) { if (p->val < root->val && q->val < root->val) root = root->left; else if (p->val > root->val && q->val > root->val) root = root->right; else return root; }`,
          logicAndCode: `Inorder iterative: simulate recursion with stack; go left until null, pop (process), then current = right. Validate BST: range shrinks at each step; if node outside range, invalid. LCA: first node where p and q diverge (one left, one right) is LCA.`,
          example: `Problem: Validate BST — Every node must be in (min, max) for its subtree. See [LeetCode #98](https://leetcode.com/problems/validate-binary-search-tree/).

Solution: Idea: for each node, value must be strictly between left bound (lo) and right bound (hi). Left child inherits (lo, root_val); right child inherits (root_val, hi). Recurse left and right; base case: null node = valid. bool valid(TreeNode* r, long lo, long hi) { if (!r) return true; if (r->val <= lo || r->val >= hi) return false; return valid(r->left, lo, r->val) && valid(r->right, r->val, hi); } Call with (LONG_MIN, LONG_MAX). **Takeaway:** BST = left < root < right at every node; validation = pass range (min, max) down.`,
          additionalInfo: `LeetCode: [Validate BST](https://leetcode.com/problems/validate-binary-search-tree/), [LCA of BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/), [Kth Smallest in BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/), [Binary Tree Level Order](https://leetcode.com/problems/binary-tree-level-order-traversal/), [Max Depth](https://leetcode.com/problems/maximum-depth-of-binary-tree/). **Tip:** Use long for BST range to avoid overflow with INT_MIN/INT_MAX.`,
        },
        codeExample: `// Inorder iterative (BST → sorted)
vector<int> inorder(TreeNode* root) {
  vector<int> out;
  stack<TreeNode*> st;
  while (root || !st.empty()) {
    while (root) { st.push(root); root = root->left; }
    root = st.top(); st.pop();
    out.push_back(root->val);
    root = root->right;
  }
  return out;
}

// LCA in BST - O(h)
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
  while (root) {
    if (p->val < root->val && q->val < root->val) root = root->left;
    else if (p->val > root->val && q->val > root->val) root = root->right;
    else return root;
  }
  return nullptr;
}`,
        codeLanguage: "cpp",
      },
      {
        id: "heaps-and-priority-queue",
        title: "Heaps & Priority Queue",
        description:
          "Min/max heap, top K, merge K sorted lists; common at Google and Optiver.",
        order: 7,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read heap: complete binary tree with heap property (min-heap: parent ≤ children).",
            "Implement extract-min and insert (bubble up/down); or use language PQ (C++ priority_queue, Python heapq).",
            "Solve Top K Frequent Elements and Merge K Sorted Lists.",
            "State complexity: insert/extract O(log n); top K with heap O(n log k).",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Solve [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/): count frequencies with map, then keep a min-heap of size K (if heap size > K pop smallest). Result = elements in heap. Time O(n log k).

**Prerequisites:** Trees (binary tree shape). Sorting.

**By the end of this topic you will:** Use heap for top-K, merge K sorted lists, find median; state O(log n) per operation.`,
          material: `**Heap:** Complete binary tree; min-heap = root is minimum (max-heap = root maximum). **Operations:** insert O(log n), extract-min O(log n), peek O(1). **Array representation:** parent at i → children at 2i+1, 2i+2; child at i → parent at (i-1)/2.

**Use cases:** Top K (min-heap of size K), merge K sorted (heap of head of each list), median (two heaps). **Language:** C++ \`priority_queue<int>\` is max-heap; min-heap = \`priority_queue<int, vector<int>, greater<int>>\`. Python \`heapq\` (min-heap only).`,
          explanation: `Top K: keep only K largest in min-heap; when size > K pop min. Merge K lists: push first node of each list; pop min, push next from same list. Two heaps for median: left = max-heap (first half), right = min-heap (second half); balance sizes.`,
          application: `Top K frequent, top K largest, merge K sorted lists, find median from stream, Dijkstra (priority queue). Frequently asked at Google and trading firms.`,
          howToImplement: `(1) Top K largest: min-heap of size K. For each x: push x; if size > K pop min. Final heap = K largest.
(2) Merge K sorted: heap of (value, listIndex, indexInList). Push (list[i][0], i, 0) for each list. Pop min, append to result; push next from same list if exists.
(3) C++: priority_queue<T, vector<T>, greater<T>> for min-heap.`,
          logicAndCode: `Heap maintains invariant: after each op, root is min (or max). Top K: invariant = "heap contains the current K largest seen so far". Merge K: invariant = "heap front is the smallest unprocessed element across all lists".`,
          example: `Problem: Merge K Sorted Lists — K linked lists, each sorted; return one sorted list. See [LeetCode #23](https://leetcode.com/problems/merge-k-sorted-lists/).

Solution: Min-heap of (node->val, list_id). Push head of each list. While heap not empty: pop min, append to result, push next from same list. Time O(N log K) where N = total nodes, K = lists.`,
          additionalInfo: `LeetCode: [Top K Frequent](https://leetcode.com/problems/top-k-frequent-elements/), [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/), [Kth Largest in Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/), [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/). **Note:** Optiver/IMC may ask "design a data structure" — two heaps for median is a classic. **Takeaway:** Heap = root is always min (or max); Top K = min-heap of size K (pop the smallest); Merge K sorted = heap holds head of each list, pop min then push next from that list.`,
        },
        codeExample: `// C++: Min-heap for top K largest (keep heap size = K)
vector<int> topK(vector<int>& nums, int k) {
  priority_queue<int, vector<int>, greater<int>> pq;
  for (int x : nums) {
    pq.push(x);
    if (pq.size() > k) pq.pop();
  }
  vector<int> ans;
  while (!pq.empty()) { ans.push_back(pq.top()); pq.pop(); }
  return ans;
}

// Merge K sorted lists - push (val, list index, node)
ListNode* mergeKLists(vector<ListNode*>& lists) {
  auto cmp = [](auto& a, auto& b) { return a.first > b.first; };
  priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(cmp)> pq(cmp);
  for (int i = 0; i < lists.size(); i++)
    if (lists[i]) pq.push({lists[i]->val, i});
  ListNode dummy; ListNode* tail = &dummy;
  while (!pq.empty()) {
    auto [v, i] = pq.top(); pq.pop();
    tail->next = lists[i]; tail = tail->next;
    lists[i] = lists[i]->next;
    if (lists[i]) pq.push({lists[i]->val, i});
  }
  return dummy.next;
}`,
        codeLanguage: "cpp",
      },
      {
        id: "dijkstra-shortest-path",
        title: "Dijkstra & Shortest Paths",
        description:
          "Weighted graphs, Dijkstra's algorithm, when to use BFS vs Dijkstra.",
        order: 8,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read: BFS = unweighted shortest path; Dijkstra = non-negative weighted shortest path.",
            "Implement Dijkstra with priority queue: (dist, node); relax edges from current node.",
            "Solve Network Delay Time or Cheapest Flights Within K Stops.",
            "State: Dijkstra O((V+E) log V) with PQ; negative edges need Bellman–Ford.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Implement Dijkstra from a single source: PQ of (distance, node), start with (0, src). Pop smallest dist; for each neighbor, if dist[u] + w < dist[v] then update and push (dist[v], v). Solve [Network Delay Time](https://leetcode.com/problems/network-delay-time/).

**Prerequisites:** Graphs BFS/DFS, Heaps (priority queue).

**By the end of this topic you will:** Implement Dijkstra, state when to use it vs BFS, and handle "shortest path with at most K edges" (BFS on state (node, steps)).`,
          material: `**BFS:** Unweighted graph; shortest path = fewest edges. **Dijkstra:** Weighted graph, non-negative weights; shortest path by total weight.

**Idea:** Always relax from the vertex with smallest known distance (greedy). **PQ (priority queue):** data structure that always yields the smallest element; we store (distance, node) and pop the one with smallest distance. **Relaxation:** update distance to neighbor v if we find a shorter path (dist[u] + w < dist[v]); then update dist[v] and push (dist[v], v) to PQ. **Complexity:** O((V+E) log V) with binary heap.

**Negative weights:** Dijkstra fails; use Bellman–Ford. **Variants:** "At most K stops" = BFS over state (node, steps used).

**In other words:** Dijkstra = always relax from the node with smallest known distance (greedy); the first time a node is popped from the PQ, its distance is final (because weights are non-negative). PQ stores (distance, node); we may push the same node multiple times with better distance — when popping, skip if the value is stale.`,
          explanation: `Dijkstra is greedy: the first time we pop a node, we have its final shortest distance (because weights are non-negative). Relaxation = only update dist[v] when we find a shorter path to v.`,
          application: `Single-source shortest path (routing, network delay). Google/IMC/Optiver may ask "shortest path in a grid with weights" or "cheapest flight with at most K stops".`,
          howToImplement: `(1) Initialize dist[src]=0, else INF. PQ = (0, src).
(2) While PQ not empty: pop (d, u). If d > dist[u] skip (stale).
(3) For each edge (u, v, w): if dist[u] + w < dist[v], set dist[v] = dist[u] + w, push (dist[v], v).
(4) Return dist[target] or max(dist) for "reach all".`,
          logicAndCode: `Each node can be pushed multiple times (with improved dist); we skip when we pop a stale (larger) distance. First time we pop a node = its distance is final.`,
          example: `Problem: Network Delay Time — n nodes, times[i] = (u, v, w). Signal from node k. Time for all to receive? See [LeetCode #743](https://leetcode.com/problems/network-delay-time/).

Solution: Dijkstra from k. Return max(dist); if any dist remains INF return -1. Time O((V+E) log V). **Why:** Once all nodes are reached, last arrival time = max(dist); if any INF remains some node is unreachable.`,
          additionalInfo: `**Takeaway:** Non-negative weighted graph, shortest path → Dijkstra + PQ (distance, node); relax = update dist[v] if dist[u]+w < dist[v]. Negative weights → Bellman–Ford. "At most K edges" → BFS on (node, steps). LeetCode: [Network Delay Time](https://leetcode.com/problems/network-delay-time/), [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/). **Important:** Dijkstra does not work with negative edge weights; mention Bellman–Ford if asked.`,
        },
        codeExample: `// Dijkstra - single source shortest path (non-negative weights)
vector<int> dijkstra(int n, vector<vector<pair<int,int>>>& adj, int src) {
  vector<int> dist(n, INT_MAX);
  dist[src] = 0;
  priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
  pq.push({0, src});
  while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue;
    for (auto [v, w] : adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.push({dist[v], v});
      }
    }
  }
  return dist;
}`,
        codeLanguage: "cpp",
      },
      {
        id: "backtracking-recursion",
        title: "Backtracking & Recursion",
        description:
          "Subsets, permutations, combinations; base case, choice, recurse, undo.",
        order: 9,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read backtracking template: base case → process; for each choice → try, recurse, undo.",
            "Implement Subsets (include/exclude each element) and Permutations (swap or used array).",
            "Solve Combination Sum and Letter Combinations of a Phone Number.",
            "State time: subsets O(2^n), permutations O(n!).",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Solve [Subsets](https://leetcode.com/problems/subsets/): for each index, either include or exclude the element; recurse; backtrack. Solve [Permutations](https://leetcode.com/problems/permutations/): for each position, try every unused element; recurse; undo.

**Prerequisites:** Recursion, arrays. DFS (backtracking is DFS on implicit "choice tree").

**By the end of this topic you will:** Write backtracking with clear base case, choice, recurse, undo; solve subset/permutation/combination problems.`,
          material: `**Backtracking:** Build solution incrementally; when stuck, undo last choice and try another.

**Template:** (1) Base case: add current state to result. (2) For each valid choice: make choice, recurse, undo choice. **Subsets:** 2^n; at each index include or not. **Permutations:** n!; at each position try each unused element (use \`used\` array or swap). **Combinations:** C(n,k); same as subsets but only add when path length = k.

**In other words — decision tree:** Imagine a tree: each level = one index. For subsets, each node has two branches: "take this element" and "don't take". dfs(i+1) after push = take branch; dfs(i+1) after pop = don't take branch. Backtrack = after finishing one branch, undo (pop) so the other branch sees the same state.

**Complexity:** Often exponential; prune invalid branches early.`,
          explanation: `The "undo" step restores state so the next sibling branch sees the same state. Used array (or swap) ensures each element used once per path. For "combination sum" allow reuse by not incrementing index; avoid duplicates by sorting and skipping same value.`,
          application: `Subsets, permutations, combinations; letter combinations; palindrome partitioning; Sudoku; N-queens. Very common at Google.`,
          howToImplement: `(1) Subsets: void dfs(int i) { if (i==n) { ans.push_back(path); return; } path.push_back(nums[i]); dfs(i+1); path.pop_back(); dfs(i+1); }
(2) Permutations: for (int j=0; j<n; j++) if (!used[j]) { used[j]=true; path.push_back(nums[j]); dfs(); path.pop_back(); used[j]=false; }
(3) Combination sum: sort; at each step take current or skip; if skip, skip all same values to avoid duplicate sets.`,
          logicAndCode: `Recursion tree: each node = state; children = choices. Backtrack = undo so parent can try next child. Pruning: if (sum > target) return; or if (path.size() == k) add and return.`,
          example: `Problem: Subsets — all subsets of distinct integers. See [LeetCode #78](https://leetcode.com/problems/subsets/).

Solution: path = []; dfs(0): if i==n push path and return. path.push_back(nums[i]); dfs(i+1); path.pop_back(); dfs(i+1). Time O(2^n), space O(n).`,
          additionalInfo: `LeetCode: [Subsets](https://leetcode.com/problems/subsets/), [Permutations](https://leetcode.com/problems/permutations/), [Combination Sum](https://leetcode.com/problems/combination-sum/), [Letter Combinations](https://leetcode.com/problems/letter-combinations-of-a-phone-number/). **Tip:** For "no duplicate subsets" when array has duplicates: sort and in the "skip" branch do while (i+1 < n && nums[i+1]==nums[i]) i++; then dfs(i+1).`,
        },
        codeExample: `// Subsets - include or exclude each element
vector<vector<int>> subsets(vector<int>& nums) {
  vector<vector<int>> ans;
  vector<int> path;
  function<void(int)> dfs = [&](int i) {
    if (i == nums.size()) { ans.push_back(path); return; }
    path.push_back(nums[i]);
    dfs(i + 1);
    path.pop_back();
    dfs(i + 1);
  };
  dfs(0);
  return ans;
}

// Permutations - try each unused element at current position
vector<vector<int>> permute(vector<int>& nums) {
  vector<vector<int>> ans;
  vector<int> path;
  vector<bool> used(nums.size());
  function<void()> dfs = [&]() {
    if (path.size() == nums.size()) { ans.push_back(path); return; }
    for (int j = 0; j < nums.size(); j++) {
      if (used[j]) continue;
      used[j] = true; path.push_back(nums[j]);
      dfs();
      path.pop_back(); used[j] = false;
    }
  };
  dfs();
  return ans;
}`,
        codeLanguage: "cpp",
      },
      {
        id: "intervals",
        title: "Intervals",
        description: "Merge, insert, non-overlapping; sort by start or end.",
        order: 10,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read: interval problems often sort by start or end; merge = sort by start, merge if overlap.",
            "Implement Merge Intervals and Insert Interval.",
            "Solve Non-overlapping Intervals (min removals) and Meeting Rooms.",
            "Clarify: inclusive/exclusive endpoints; overlapping definition.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Solve [Merge Intervals](https://leetcode.com/problems/merge-intervals/): sort by start; if current overlaps last in result (curr.start <= last.end), extend last.end = max(last.end, curr.end); else push new. Then [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/): sort by end; greedy take earliest end, skip overlapping.

**Prerequisites:** Sorting, Greedy.

**By the end of this topic you will:** Merge, insert, and minimize removals for interval problems; choose sort by start vs end.`,
          material: `**Merge:** Sort by start. Result = [first]. For each next: if overlaps result.back() (curr.start <= result.back().end), update result.back().end = max(end, curr.end); else push curr.

**Insert:** Add new interval; merge (or binary search for position then merge). **Non-overlapping (min removals):** Sort by end. Greedy: keep interval with smallest end that doesn't overlap previous. Count removals = n - kept.

**Overlap:** [a,b] and [c,d] overlap if a <= d and c <= b. **Meeting rooms:** Sort all starts and ends; sweep; count max concurrent.

**In other words:** Merge = sort by start, then merge overlapping intervals (curr.start <= last.end). Non-overlapping (min removals) = sort by end, greedily take the one that finishes earliest so remaining capacity is maximized.`,
          explanation: `Sort by start for merge (process in order). Sort by end for "max non-overlapping" (earliest end leaves most room). Insert = merge with one extra interval.`,
          application: `Merge intervals, insert interval, remove minimum to make non-overlapping, meeting rooms I/II, interval list intersection. Common at Google.`,
          howToImplement: `(1) Merge: sort(intervals by start); out = [intervals[0]]; for each int in intervals[1:]: if int.start <= out.back().end then out.back().end = max(out.back().end, int.end); else out.push_back(int).
(2) Non-overlapping: sort by end; lastEnd = -INF; count = 0; for each [s,e]: if s >= lastEnd then lastEnd = e, count++; return n - count.`,
          logicAndCode: `Merge: after sort, overlapping intervals are adjacent. Non-overlapping: greedy by end time is optimal (exchange argument).`,
          example: `Problem: Non-overlapping Intervals — min intervals to remove so rest are non-overlapping. See [LeetCode #435](https://leetcode.com/problems/non-overlapping-intervals/).

Solution: Sort by end. Keep intervals with start >= lastEnd; update lastEnd = end. Answer = n - count_kept. Time O(n log n). **Why:** Greedy by end leaves maximum room for the rest (exchange argument).`,
          additionalInfo: `LeetCode: [Merge Intervals](https://leetcode.com/problems/merge-intervals/), [Insert Interval](https://leetcode.com/problems/insert-interval/), [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/), [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/). **Takeaway:** Merge = sort by start, merge if overlapping; non-overlapping = sort by end, greedy keep earliest end. **Tip:** Clarify if [1,2] and [2,3] overlap (often yes for "merge", no for "non-overlapping" depending on problem).`,
        },
        codeExample: `// Merge intervals - sort by start
vector<vector<int>> merge(vector<vector<int>>& intervals) {
  if (intervals.empty()) return {};
  sort(intervals.begin(), intervals.end());
  vector<vector<int>> out = {intervals[0]};
  for (int i = 1; i < intervals.size(); i++) {
    if (intervals[i][0] <= out.back()[1])
      out.back()[1] = max(out.back()[1], intervals[i][1]);
    else
      out.push_back(intervals[i]);
  }
  return out;
}

// Non-overlapping - sort by end, greedy keep earliest end
int eraseOverlapIntervals(vector<vector<int>>& intervals) {
  sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) { return a[1] < b[1]; });
  int lastEnd = INT_MIN, kept = 0;
  for (auto& in : intervals)
    if (in[0] >= lastEnd) { lastEnd = in[1]; kept++; }
  return intervals.size() - kept;
}`,
        codeLanguage: "cpp",
      },
      {
        id: "stack-monotonic",
        title: "Stack & Monotonic Stack",
        description:
          "Valid parentheses, next greater element, daily temperatures.",
        order: 11,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read stack: LIFO; use for matching (parentheses), and monotonic stack for next greater/smaller.",
            "Implement Valid Parentheses and Next Greater Element I.",
            "Solve Daily Temperatures and Largest Rectangle in Histogram.",
            "State: one pass O(n) with monotonic stack.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Solve [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/): stack; for '(' push ')', for '[' push ']', etc.; for close pop and check match. Then [Next Greater Element](https://leetcode.com/problems/next-greater-element-i/): monotonic decreasing stack; when we see larger, pop and record next greater.

**Prerequisites:** Basic stack. Arrays.

**By the end of this topic you will:** Use stack for matching and monotonic stack for "next greater/smaller" in O(n).`,
          material: `**Stack:** LIFO; push, pop, top. **Valid parentheses:** For opening push expected closing; for closing pop and check match.

**Monotonic stack:** Stack whose contents are kept in sorted order (e.g. decreasing). **Next greater element** = for each element, the first element to the right that is larger. When we see a value larger than top, that value is the "next greater" for top; pop until stack is empty or top >= current. **Use:** Next greater (right), next smaller, previous greater (scan left).

**Largest rectangle:** For each bar, find left and right bounds (first smaller element); width = right - left - 1; area = height × width.

**In other words:** Monotonic stack = one pass O(n): keep "candidates" that haven't found their next greater yet; when we see a larger value, it becomes the next greater for what we pop.`,
          explanation: `Monotonic stack: we only keep "candidates" that might be the next greater for future elements. When a larger element comes, it is the next greater for all smaller elements we pop.`,
          application: `Valid parentheses, min stack, next greater element, daily temperatures, largest rectangle in histogram. Google and IMC ask these.`,
          howToImplement: `(1) Next greater (right): for i in 0..n: while stack not empty and a[stack.top()] < a[i], result[stack.top()] = a[i], pop; push i. Then pop remaining → no next greater (-1).
(2) Largest rectangle: for each index find prev smaller and next smaller (two monotonic stack passes); area = height * (next_smaller - prev_smaller - 1).`,
          logicAndCode: `Stack stores indices (to compute width). Monotonic decreasing: when we see larger, everyone in stack smaller than it has "next greater" = current.`,
          example: `Problem: Daily Temperatures — for each day, days until warmer. See [LeetCode #739](https://leetcode.com/problems/daily-temperatures/).

Solution: Monotonic decreasing stack (indices). For each i: while stack not empty and T[stack.top()] < T[i], ans[stack.top()] = i - stack.top(), pop; push i. Time O(n). **Why:** Each element is pushed and popped at most once. **Common mistake:** Forgetting to fill result for remaining items in stack (no next greater → -1 or 0).`,
          additionalInfo: `LeetCode: [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/), [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/), [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/), [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/). **Takeaway:** Next greater/smaller → monotonic stack one pass O(n); store indices to compute distance/width. **Tip:** For "min stack" (getMin in O(1)) use two stacks or one stack of (value, min_so_far).`,
        },
        codeExample: `// Valid parentheses
bool isValid(string s) {
  stack<char> st;
  for (char c : s) {
    if (c == '(') st.push(')');
    else if (c == '[') st.push(']');
    else if (c == '{') st.push('}');
    else if (st.empty() || st.top() != c) return false;
    else st.pop();
  }
  return st.empty();
}

// Next greater element (monotonic stack)
vector<int> nextGreater(vector<int>& a) {
  int n = a.size();
  vector<int> ans(n, -1);
  stack<int> st; // indices, stack values decreasing
  for (int i = 0; i < n; i++) {
    while (!st.empty() && a[st.top()] < a[i]) {
      ans[st.top()] = a[i];
      st.pop();
    }
    st.push(i);
  }
  return ans;
}`,
        codeLanguage: "cpp",
      },
      {
        id: "bit-manipulation",
        title: "Bit Manipulation",
        description: "XOR, masks, count set bits; useful for Optiver and IMC.",
        order: 12,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read: AND &, OR |, XOR ^, left shift <<, right shift >>; XOR same = 0, XOR with 0 = self.",
            "Implement Single Number (XOR all) and Count Set Bits (n & (n-1) or __builtin_popcount).",
            "Solve Subset XOR sum, Reverse Bits, or Power of Two.",
            "State: XOR for 'appears once'; bit mask for subsets.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Solve [Single Number](https://leetcode.com/problems/single-number/) — XOR all numbers; duplicates cancel (a^a=0), result = single. Solve [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/): while (n) { count += n & 1; n >>= 1; } or n &= n-1 to clear lowest set bit.

**Prerequisites:** Integers, binary representation.

**By the end of this topic you will:** Use XOR for "find unique", bit masks for subsets, and count set bits.`,
          material: `**XOR:** a^a=0, a^0=a; commutative. **Single number:** XOR all → duplicates cancel. **Set bits** = bits with value 1. n & (n-1) removes lowest set bit; count while n != 0. **Power of 2:** n > 0 && (n & (n-1)) == 0.

**Get/set/clear bit i:** (n >> i) & 1; n |= (1 << i); n &= ~(1 << i). **Subsets via bits:** for mask 0 to 2^n-1, mask's bits = which indices included. **Optiver/IMC:** Sometimes mental math or bit tricks in phone screens.

**In other words:** XOR all numbers = pairs cancel out (a^a=0), leaving the unique one. n & (n-1) clears the rightmost set bit, so the loop runs once per set bit.`,
          explanation: `XOR is its own inverse; order doesn't matter. So XOR of [a,a,b,b,c] = c. For "two numbers appear once, rest twice": XOR all = x^y; use any set bit in x^y to split array into two groups (that bit set vs not), then XOR each group.`,
          application: `Single number, two single numbers, count 1 bits, power of 2, subset XOR sum. Trading firms (Optiver, IMC) may ask bit tricks.`,
          howToImplement: `(1) Single number: int ans = 0; for (int x : nums) ans ^= x; return ans;
(2) Count set bits: int c = 0; while (n) { c++; n &= n - 1; } return c;
(3) Power of 2: return n > 0 && !(n & (n - 1));
(4) Get bit i: (n >> i) & 1. Set: n |= 1 << i. Clear: n &= ~(1 << i).`,
          logicAndCode: `XOR all cancels pairs. n & (n-1) drops lowest set bit so loop runs once per set bit. Subset iteration: for (int mask = 0; mask < (1<<n); mask++) { for (int i=0; i<n; i++) if (mask>>i&1) include element i; }`,
          example: `Problem: Single Number — every element appears twice except one. See [LeetCode #136](https://leetcode.com/problems/single-number/).

Solution: int x = 0; for (int a : nums) x ^= a; return x; Time O(n), space O(1). **Why:** XOR is commutative; pairs cancel to 0.`,
          additionalInfo: `LeetCode: [Single Number](https://leetcode.com/problems/single-number/), [Single Number II](https://leetcode.com/problems/single-number-ii/), [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/), [Reverse Bits](https://leetcode.com/problems/reverse-bits/). **Takeaway:** "One unique element, rest in pairs" → XOR all. Count set bits → n &= n-1 in a loop. **Tip:** Optiver/IMC may ask quick bit or mental math; practice XOR and n&(n-1).`,
        },
        codeExample: `// Single number - XOR all (duplicates cancel)
int singleNumber(vector<int>& nums) {
  int x = 0;
  for (int a : nums) x ^= a;
  return x;
}

// Count set bits - n & (n-1) removes lowest 1
int hammingWeight(uint32_t n) {
  int c = 0;
  while (n) { c++; n &= n - 1; }
  return c;
}

// Power of 2
bool isPowerOfTwo(int n) {
  return n > 0 && (n & (n - 1)) == 0;
}`,
        codeLanguage: "cpp",
      },
      {
        id: "tries-prefix-tree",
        title: "Tries (Prefix Tree)",
        description:
          "Autocomplete, word search, prefix matching; insert, search, prefix search.",
        order: 13,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read trie structure: root to leaf = string; each node has up to 26 (or 256) children.",
            "Implement insert(word) and search(word); then searchPrefix(prefix) for autocomplete.",
            "Solve Implement Trie and Add and Search Word (with '.' wildcard).",
            "State complexity: insert/search O(m), m = key length.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Implement a trie: struct Node { Node* child[26]; bool isEnd; }. insert: walk and create nodes; set isEnd at last char. search: walk and check isEnd at end. Then solve [Implement Trie](https://leetcode.com/problems/implement-trie-prefix-tree/).

**Prerequisites:** Trees, hash map. String handling.

**By the end of this topic you will:** Implement trie insert/search/prefix, use for autocomplete or word search; state O(m) per operation.`,
          material: `**Trie:** Tree where each path from root to node represents a prefix; root to leaf = full string.

**Node:** Array or map of children (e.g. 26 for lowercase letters); boolean \`isEnd\` = marks that this node ends a word (not just a prefix). **Operations:** insert(word): walk char by char, create child if missing, set isEnd at end. search(word): walk, return true only if isEnd at last char. startsWith(prefix): walk, return true if path exists.

**Use:** Autocomplete, spell check, word search in grid, IP routing. **Space:** O(total chars in all keys).

**In other words:** Trie = prefix tree: one path from root = one string/prefix; many words share the same prefix (one branch). Find prefix = walk from root; find full word = walk + check isEnd.`,
          explanation: `Trie trades space for fast prefix lookup. Multiple words share common prefix (one path). For "design add and search word" with '.', use DFS at each '.' trying all 26 children.`,
          application: `Implement Trie, Add and Search Word, Word Search II (grid + trie of words), prefix search, autocomplete. Often asked in coding rounds.`,
          howToImplement: `(1) Node: array<Node*, 26> or map<char, Node*>; bool isEnd.
(2) insert: Node* cur = root; for (char c : word) { int i = c-'a'; if (!cur->child[i]) cur->child[i] = new Node(); cur = cur->child[i]; } cur->isEnd = true;
(3) search: walk; at end return cur->isEnd. startsWith: walk; return true if path exists.
(4) Word with '.': DFS; at '.' try all 26 children.`,
          logicAndCode: `Each key is stored along one path. Prefix query = walk path; no need to scan all keys. Word Search II: build trie from words; for each cell DFS in grid, follow trie; when node isEnd add word to result.`,
          example: `Problem: Implement Trie — insert, search, and startsWith. See [LeetCode #208](https://leetcode.com/problems/implement-trie-prefix-tree/).

Solution: Node with child[26] and isEnd. insert: walk and create. search: walk and check isEnd. startsWith: walk and return true. Time O(m) per op, space O(sum of key lengths). **Why:** Prefix lookup = follow the path, no need to scan all keys.`,
          additionalInfo: `LeetCode: [Implement Trie](https://leetcode.com/problems/implement-trie-prefix-tree/), [Design Add and Search Word](https://leetcode.com/problems/design-add-and-search-words-data-structure/), [Word Search II](https://leetcode.com/problems/word-search-ii/). **Takeaway:** Prefix/autocomplete → trie; insert/search/startsWith O(m). Word with '.' → DFS at node, try all 26 children. **Tip:** Use array of size 26 for lowercase; for generic use unordered_map<char, Node*>.`,
        },
        codeExample: `// Trie node and basic operations
struct TrieNode {
  TrieNode* child[26] = {};
  bool isEnd = false;
};
void insert(TrieNode* root, const string& word) {
  TrieNode* cur = root;
  for (char c : word) {
    int i = c - 'a';
    if (!cur->child[i]) cur->child[i] = new TrieNode();
    cur = cur->child[i];
  }
  cur->isEnd = true;
}
bool search(TrieNode* root, const string& word) {
  TrieNode* cur = root;
  for (char c : word) {
    int i = c - 'a';
    if (!cur->child[i]) return false;
    cur = cur->child[i];
  }
  return cur->isEnd;
}`,
        codeLanguage: "cpp",
      },
      {
        id: "union-find-dsu",
        title: "Union-Find (Disjoint Set Union)",
        description:
          "Connected components, dynamic connectivity; find with path compression, union by rank.",
        order: 14,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read DSU: maintain disjoint sets; find(x) returns representative; union(x,y) merges sets.",
            "Implement find with path compression and union by rank (or size).",
            "Solve Number of Connected Components and redundant connection (detect cycle in undirected).",
            "State: amortized O(α(n)) ≈ O(1) per operation.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Implement DSU: parent[i]=i initially; find(x): if parent[x]!=x then parent[x]=find(parent[x]); return parent[x]. union(x,y): link find(x) and find(y). Solve [Number of Connected Components](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/): start with n components; for each edge union(u,v); count distinct roots.

**Prerequisites:** Graphs (connected components). Arrays.

**By the end of this topic you will:** Use DSU for connected components, cycle detection in undirected graph, and "merge sets" problems.`,
          material: `**DSU (Disjoint Set Union):** Each element has a parent; **representative** = root of the set (element whose parent is itself). Same root = same set.

**Find:** Follow parent until root; **path compression:** during find, set parent[x]=root so next find is O(1). **Union:** Link root of one set to root of the other; **union by rank** (attach smaller tree under larger) keeps tree height small.

**Use:** Connected components, cycle in undirected graph, minimum spanning tree (Kruskal), dynamic connectivity. **Complexity:** Amortized O(α(n)) per op with both optimizations.

**In other words:** DSU = merge sets and ask "same set or not" via find. Path compression + union by rank make amortized cost nearly O(1) per operation.`,
          explanation: `Path compression makes future finds fast. Union by rank keeps the tree shallow. Together they give near-constant time per operation. For "redundant connection": add edges one by one; if both endpoints already in same set, that edge creates a cycle.`,
          application: `Number of connected components, redundant connection, accounts merge, Kruskal MST. Commonly used for graph and "merge groups" problems.`,
          howToImplement: `(1) parent.resize(n); iota(parent.begin(), parent.end(), 0); rank or size optional.
(2) int find(int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); }
(3) void unite(int x, int y) { x = find(x); y = find(y); if (x == y) return; if (rank[x] < rank[y]) swap(x,y); parent[y] = x; if (rank[x] == rank[y]) rank[x]++; }
(4) Components: for (int i = 0; i < n; i++) if (find(i) == i) count++;`,
          logicAndCode: `Find returns the set representative. Union merges two sets. After processing all edges, number of components = number of nodes where find(i)==i.`,
          example: `Problem: Number of Connected Components in Undirected Graph — n nodes, edge list; return number of components. See [LeetCode #323](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/) (premium) or same idea in [Redundant Connection](https://leetcode.com/problems/redundant-connection/).

Solution: DSU with n sets. For each edge (u,v): if find(u) != find(v) union(u,v). Return count of i where find(i)==i. **Why:** After processing all edges, each component has one root; number of roots = number of components.`,
          additionalInfo: `LeetCode: [Redundant Connection](https://leetcode.com/problems/redundant-connection/), [Number of Islands II](https://leetcode.com/problems/number-of-islands-ii/) (add cells one by one, union with neighbors). **Takeaway:** Connected components / merge sets → DSU; find + path compression, union by rank. Cycle in undirected graph = when union(u,v) but find(u)==find(v). **Tip:** Template DSU is short; memorize find and union.`,
        },
        codeExample: `// DSU with path compression and rank
vector<int> parent, rank;
int find(int x) {
  return parent[x] == x ? x : parent[x] = find(parent[x]);
}
void unite(int x, int y) {
  x = find(x); y = find(y);
  if (x == y) return;
  if (rank[x] < rank[y]) swap(x, y);
  parent[y] = x;
  if (rank[x] == rank[y]) rank[x]++;
}
// init: parent[i]=i, rank[i]=0. Components: count i where find(i)==i`,
        codeLanguage: "cpp",
      },
      {
        id: "linked-list-patterns",
        title: "Linked List: Classic Patterns",
        description:
          "Reverse, merge, cycle detection, reorder; dummy node and two pointers.",
        order: 15,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read: dummy node simplifies edge cases; reverse in-place by changing next pointers.",
            "Implement reverse list, merge two sorted lists, and detect cycle (Floyd).",
            "Solve Reorder List (find mid, reverse half, merge) and Remove Nth From End.",
            "State: reverse O(n); cycle detection O(n) time O(1) space.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Implement reverse: ListNode* prev = nullptr; while (head) { auto next = head->next; head->next = prev; prev = head; head = next; } return prev; Then [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/): dummy node, while (l1 && l2) attach smaller, then attach rest.

**Prerequisites:** Pointers, recursion. Two pointers.

**By the end of this topic you will:** Reverse, merge, detect cycle, reorder list; use dummy node for cleaner code.`,
          material: `**Dummy node:** ListNode dummy; dummy.next = head; then work with a pointer to the current node; return dummy.next. Avoids special handling for the head.

**Reverse:** Iterative: prev=nullptr; while (head) swap next; or recursive: reverse(rest), then rest->next = head, head->next = nullptr. **Merge two sorted:** Compare heads, attach the smaller, advance. **Cycle:** **Floyd (tortoise & hare):** slow and fast; if they meet there is a cycle.

**Reorder list:** Find middle (slow/fast), reverse second half, merge the two halves. **Nth from end:** Two pointers n apart; when front is at end, back is n from end.

**In other words:** Dummy = sentinel node in front of head so the "first node" is treated like any other. Floyd = fast moves 2× slow; if there is a cycle they must meet inside it.`,
          explanation: `Dummy node lets you treat "first node" like any other. Floyd cycle: fast goes 2x speed; if cycle exists they meet inside cycle. Reorder: L0→L1→...→Lmid, Lmid+1→...→Ln; reverse second half then weave.`,
          application: `Reverse linked list, merge two sorted lists, merge K sorted (heap or divide-conquer), cycle detection, reorder list, remove nth from end, palindrome linked list. Very common in coding rounds.`,
          howToImplement: `(1) Reverse: prev=nullptr; while (head) { next=head->next; head->next=prev; prev=head; head=next; } return prev;
(2) Merge: ListNode dummy; ListNode* t=&dummy; while (l1&&l2) { if (l1->val<=l2->val) { t->next=l1; l1=l1->next; } else { t->next=l2; l2=l2->next; } t=t->next; } t->next=l1?l1:l2; return dummy.next;
(3) Cycle: slow=fast=head; while (fast&&fast->next) { slow=slow->next; fast=fast->next->next; if (slow==fast) return true; } return false;`,
          logicAndCode: `Reverse: each node's next points to previous. Merge: same as merge in merge sort. Cycle: meeting implies cycle (proof by distance).`,
          example: `Problem: Merge Two Sorted Lists — merge two sorted linked lists. See [LeetCode #21](https://leetcode.com/problems/merge-two-sorted-lists/).

Solution: Dummy node; while both non-null attach smaller; attach remaining. Time O(n+m), space O(1). **Why:** Dummy removes the need to treat head as a special case; merge is the same as in merge sort.`,
          additionalInfo: `LeetCode: [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/), [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/), [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/), [Reorder List](https://leetcode.com/problems/reorder-list/), [Remove Nth Node From End](https://leetcode.com/problems/remove-nth-node-from-end-of-list/). **Takeaway:** Reverse/merge → dummy node; cycle → Floyd (slow/fast). Reorder = find mid, reverse second half, merge. **Common mistake:** Forgetting to check empty list or single node; check fast->next before accessing fast->next->next.`,
        },
        codeExample: `// Reverse linked list - iterative
ListNode* reverseList(ListNode* head) {
  ListNode* prev = nullptr;
  while (head) {
    ListNode* next = head->next;
    head->next = prev;
    prev = head;
    head = next;
  }
  return prev;
}

// Cycle detection - Floyd
bool hasCycle(ListNode* head) {
  ListNode *slow = head, *fast = head;
  while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
    if (slow == fast) return true;
  }
  return false;
}`,
        codeLanguage: "cpp",
      },
      {
        id: "design-lru-minstack",
        title: "Design: LRU Cache & Min Stack",
        description:
          "Design data structure; LRU cache (list + map), min stack in O(1).",
        order: 16,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read LRU: evict least recently used when full; get and put must be O(1).",
            "Design LRU: hash map (key → list iterator) + doubly linked list (order of use).",
            "Design Min Stack: two stacks (values + min-so-far) or one stack of (val, min).",
            "Solve LRU Cache and Min Stack on LeetCode.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. For LRU: use list (order of use) + unordered_map<key, list<pair<key,value>>::iterator>. get: if not in map return -1; move node to front (splice), return value. put: if exists update and move to front; else if size==capacity evict back, then push front. Solve [LRU Cache](https://leetcode.com/problems/lru-cache/).

**Prerequisites:** Hash map, linked list (or list in C++). Stack.

**By the end of this topic you will:** Implement LRU cache and min stack; explain why your design meets the complexity requirement.`,
          material: `**LRU Cache:** get(key) and put(key, value) in O(1). When capacity full, evict least recently used.

**Design:** Map from key to iterator in a list; list stores (key, value) in order of use (front = most recent). get: find in map, move to front (splice), return value. put: if key exists update and move to front; else if size==capacity remove list.back() and its map entry, then push front and set map[key].

**Min Stack:** getMin() in O(1). Option 1: two stacks (value stack + min stack; push min(stack.top(), x) on min stack). Option 2: one stack of pair(value, min_so_far). **Complexity:** LRU get/put O(1); min stack push/pop/getMin O(1).

**In other words:** LRU = list for order of use (front = most recent) + map for O(1) lookup and O(1) move to front. Min stack = each element stores "min so far at this level" so after pop the min stays correct.`,
          explanation: `List gives O(1) move to front (splice) and O(1) remove back. Map gives O(1) lookup. For min stack, we need to know minimum at each "level" so when we pop we know the new min.`,
          application: `LRU cache is a classic design question. Min stack and "stack with getMin" also common. Sometimes asked as "design a cache" or "design a stack that also returns min".`,
          howToImplement: `(1) LRU: list<pair<int,int>> list; unordered_map<int, list<...>::iterator> map; capacity.
(2) get(key): if map.count(key)==0 return -1; auto it = map[key]; int val = it->second; list.erase(it); list.push_front({key, val}); map[key] = list.begin(); return val;
(3) put: if key exists erase from list then same as below. If size==cap erase list.back() and map entry. list.push_front({key, value}); map[key] = list.begin();
(4) Min stack: stack<pair<int,int>> st; push (val, min(val, st.empty()?val:st.top().second)); getMin = st.top().second.`,
          logicAndCode: `LRU: list front = most recent, back = least recent. Map points to node so we can move it in O(1). Min stack: each element carries the minimum of all elements below it.`,
          example: `Problem: LRU Cache — get(key), put(key, value); evict LRU when at capacity. See [LeetCode #146](https://leetcode.com/problems/lru-cache/).

Solution: list + map as above. get O(1), put O(1). Eviction: remove last of list and corresponding map entry. **Why:** List = order of use; map to iterator = move to front (splice) and remove in O(1).`,
          additionalInfo: `LeetCode: [LRU Cache](https://leetcode.com/problems/lru-cache/), [Min Stack](https://leetcode.com/problems/min-stack/). **Takeaway:** LRU = list (order) + map (lookup & iterator); evict from back, move to front on access. Min stack = store (value, min_so_far) per element. **Tip:** For LRU state "list for order, map for lookup; splice to move to front." For min stack state "we store min so far with each value so pop still gives correct min."`,
        },
        codeExample: `// Min Stack - each element stores (value, min_so_far)
class MinStack {
  stack<pair<int,int>> st;
public:
  void push(int val) {
    int m = st.empty() ? val : min(st.top().second, val);
    st.push({val, m});
  }
  void pop() { st.pop(); }
  int top() { return st.top().first; }
  int getMin() { return st.top().second; }
};

// LRU: list<pair<int,int>> + unordered_map<int, list<...>::iterator>
// get: move node to front, return value. put: if full erase back; push front.`,
        codeLanguage: "cpp",
      },
      {
        id: "strings-palindrome-sliding",
        title: "Strings: Palindrome & Sliding Window",
        description:
          "Longest palindromic substring, substring with K distinct; expand and sliding window.",
        order: 17,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read: palindrome expand from center (odd and even length); substring with K distinct = sliding window.",
            "Implement longest palindromic substring (expand around each center) and longest substring with at most K distinct.",
            "Solve Valid Palindrome II (one removal) and Minimum Window Substring.",
            "State: expand O(n²); sliding window O(n).",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. For longest palindromic substring: for each center i (or pair i, i+1 for even), expand while s[l]==s[r]. Track longest. Solve [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/). For K distinct: sliding window with frequency map; when map.size() > K shrink from left.

**Prerequisites:** Two pointers, hash map. Prefix sum/sliding window.

**By the end of this topic you will:** Solve palindrome problems (expand or DP) and substring problems with sliding window.`,
          material: `**Palindrome:** Same forward and backward. **Expand around center:** For each position (or gap), expand left and right while chars match. Centers: n for odd-length, n-1 for even. Total O(n²).

**Longest substring with K distinct:** Sliding window; map char → count; when map.size() > K move left and decrement/remove until size ≤ K. **Minimum window substring:** Find minimum window in s that contains all chars of t; sliding window + count of required chars.

**Valid Palindrome II:** One removal allowed; two pointers from both ends, on first mismatch try skip left or skip right.

**In other words:** Palindrome substring = for each "center" (character or gap between characters), expand left-right while equal. Substring with K distinct = sliding window + frequency map; if distinct > K, shrink from the left.`,
          explanation: `Expand works because each palindrome has a center. Sliding window for "at most K distinct" keeps a valid window and updates result when window is valid. Minimum window: expand until valid, then shrink from left to minimize.`,
          application: `Longest palindromic substring, palindromic substrings count, longest substring with at most K distinct, minimum window substring, valid palindrome II. Often asked for string problems.`,
          howToImplement: `(1) Expand: for (int i = 0; i < n; i++) { expand(i, i); expand(i, i+1); } expand(l, r): while (l>=0 && r<n && s[l]==s[r]) l--, r++; update best.
(2) K distinct: i=0; for j in 0..n: add s[j], while len(map)>K remove s[i] and i++; update ans = max(ans, j-i+1).
(3) Min window: need = count(t); have = 0; when have == need shrink and update min len.`,
          logicAndCode: `Expand: 2n-1 centers (each char + each gap). K distinct: invariant = window has at most K distinct; when we add a char we may need to shrink.`,
          example: `Problem: Longest Palindromic Substring — return longest palindrome in s. See [LeetCode #5](https://leetcode.com/problems/longest-palindromic-substring/).

Solution: Expand around center for each i and (i,i+1). Return substring of max length. Time O(n²), space O(1). **Why:** Every palindrome has one center; 2n-1 centers (n chars + n-1 gaps).`,
          additionalInfo: `LeetCode: [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/), [Longest Substring with At Most K Distinct](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/), [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/), [Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii/). **Takeaway:** Longest palindrome substring → expand around center (2n-1 centers). Substring K distinct / min window → sliding window + frequency map. **Tip:** For "count palindromic substrings" use expand and at each center count how many expansions (each gives one substring).`,
        },
        codeExample: `// Longest palindromic substring - expand around center
string longestPalindrome(string s) {
  int n = s.size(), start = 0, best = 1;
  auto expand = [&](int l, int r) {
    while (l >= 0 && r < n && s[l] == s[r]) l--, r++;
    if (r - l - 1 > best) { best = r - l - 1; start = l + 1; }
  };
  for (int i = 0; i < n; i++) {
    expand(i, i);
    if (i + 1 < n) expand(i, i + 1);
  }
  return s.substr(start, best);
}`,
        codeLanguage: "cpp",
      },
      {
        id: "coding-interview-strategy",
        title: "Coding Interview Strategy",
        description:
          "Flow: clarify, example, approach, code, test. How to prepare and present.",
        order: 18,
        imageKey: "interview",
        contentBlocks: {
          learningFlow: [
            "Read the standard flow: clarify input, work 1–2 examples, state approach and complexity, code, test.",
            "Practice 2–3 problems per pattern; time yourself (e.g. 25 min per problem).",
            "Do mock interviews; record yourself and review clarity and complexity explanation.",
            "Prepare a few 'I optimized from O(n²) to O(n)' stories for behavioral.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Pick one pattern (e.g. two pointers) and solve 2 problems timed. Practice stating: brute force first, then "we can do better with a hash map in one pass, O(n) time."

**Prerequisites:** All CP topics above (complexity, two pointers, DP, graphs, trees, heaps, design, etc.).

**By the end of this topic you will:** Follow a repeatable flow (clarify → example → approach → code → test) and tailor preparation by pattern.`,
          material: `**Standard flow:** (1) Clarify: input range, duplicates, sorted? return value? (2) Example: work 1–2 small examples and one edge case. (3) Approach: state brute force and complexity; then optimize and state new complexity. (4) Code: clear variable names; say what you are doing. (5) Test: run through your example and edge case (empty, n=1). **What interviewers look for:** Clear communication, correctness, complexity analysis, edge cases, clean code. **Design problems (e.g. LRU):** Requirements → interface (get, put) → data structures (list + map) → operations and complexity. **Preparation:** Cover all patterns (arrays, two pointers, sliding window, DP, graphs, trees, heaps, backtracking, intervals, stack, design); 2–3 problems per pattern; time yourself.

**In other words:** Don't jump to code. Clarify first (1 min), work a small example (1–2 min), state approach + complexity (2–3 min), then code (15–20 min), then test with your example and edge cases. Saying "I'll start with brute force O(n²), then we can improve with a hash map to O(n)" is better than writing code immediately.`,
          explanation: `Stating brute force shows you can solve it; then optimizing shows you know better. Always state time and space complexity. Testing catches off-by-one and edge cases.`,
          application: `Use this flow in every practice and real interview. Prioritize patterns you see most often: two pointers, hash map, DP, trees, heaps, design (LRU, min stack).`,
          howToImplement: `(1) Always: clarify input (sorted? duplicates? range), state brute force and complexity, then optimize.
(2) Write clean, correct code first; mention further optimization if time.
(3) Talk through 2–3 examples, then code; at the end run through your example and one edge case (empty, n=1).`,
          logicAndCode: `Interview flow: Read problem → Clarify (1 min) → Example (1–2 min) → Approach + complexity (2–3 min) → Code (15–20 min) → Test (2–3 min). For design: requirements → interface → data structures → operations.`,
          example: `Problem: Find two numbers in a sorted array that sum to target.

Clarify: Sorted? Yes. Duplicates? Maybe. Return indices or values? Indices. Approach: Two pointers at start and end; if sum < target move left up, if sum > target move right down. O(n) time, O(1) space. Code, then test with [1,2,3,4], target 6 → (1,3).`,
          additionalInfo: `**Takeaway:** Flow: clarify → example → approach + complexity → code → test. Prepare 2–3 problems per pattern; practice with a timer. Resources: [LeetCode](https://leetcode.com/) (Easy/Medium by pattern), mock interviews (Pramp, Interviewing.io). **Tip:** For "tell me about a hard problem you solved," pick one where you improved from brute force to optimal. Focus on: two pointers, binary search, hash map, DP, graphs, trees, heaps, backtracking, intervals, stack, design (LRU, MinStack), tries, linked list. For system design and behavioral (STAR), see **Interview Preparation** → System Design & Behavioral.`,
        },
        codeExample: `// Two Sum II (sorted) - clean and correct
vector<int> twoSum(vector<int>& a, int target) {
  int i = 0, j = (int)a.size() - 1;
  while (i < j) {
    int s = a[i] + a[j];
    if (s == target) return {i + 1, j + 1};
    if (s < target) i++; else j--;
  }
  return {};
}`,
        codeLanguage: "cpp",
      },
      {
        id: "binary-search-on-answer",
        title: "Binary Search on Answer (Search Space)",
        description:
          "When the answer is in a range; binary search on the answer value with a check function.",
        order: 19,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read: when the problem asks for minimum/maximum value and we can check 'can we achieve x?' in O(n), binary search on the answer range.",
            "Implement check(cap) for 'Capacity to Ship Packages' or check(speed) for 'Koko Eating Bananas'.",
            "Solve Split Array Largest Sum and Minimum Capacity.",
            "State: binary search O(log R) iterations, each check O(n); total O(n log R).",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. For [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/): answer is in [1, max(piles)]; for mid = speed, check if she can finish in h hours (sum of ceil(pile/mid)); binary search for smallest speed that works.

**Prerequisites:** Sorting & Searching (binary search on array). Complexity.

**By the end of this topic you will:** Identify when to binary search on the answer; implement check(x) and binary search over range.`,
          material: `**Idea:** Answer is in range [lo, hi]. For a candidate value \`mid\`, we can check in O(n) whether \`mid\` is feasible (e.g. "can we ship all in \`mid\` days?"). If feasible, try smaller (hi = mid); else try larger (lo = mid + 1). **Template:** lo = min possible, hi = max possible; while (lo < hi) { mid = lo + (hi - lo) / 2; if (check(mid)) hi = mid; else lo = mid + 1; } return lo. **Classic problems:** Koko eating bananas (speed), capacity to ship (capacity), split array largest sum (max subarray sum), minimum in rotated array (index). **Note:** Use when "minimum x such that condition holds" or "maximum x such that condition holds".

**In other words:** We are not binary searching on array index but on the **answer value**. Requirement: we can write check(x) = "can we achieve x?" that is monotonic (if x works then x+1 works, or vice versa). Then binary search over the answer range; O(log R) iterations × O(n) per check = O(n log R).`,
          explanation: `We are not binary searching on the array index — we are binary searching on the value of the answer. The check function is the key: it must be monotonic (if x works, then x+1 works; or if x works, then x-1 works).`,
          application: `Koko eating bananas, capacity to ship packages within D days, split array largest sum, minimum size subarray sum (with binary search on window size), aggressive cows. Very common pattern.`,
          howToImplement: `(1) Identify the range [lo, hi] for the answer.
(2) Write bool check(int x) that returns true if x is feasible.
(3) Binary search: while (lo < hi) { mid = lo + (hi-lo)/2; if (check(mid)) hi = mid; else lo = mid+1; } return lo;
(4) Handle edge: sometimes answer is "first true" (hi = mid) or "last true" (lo = mid+1, then return lo-1).`,
          logicAndCode: `check(mid) is typically O(n): simulate with mid and see if constraint is satisfied. Binary search narrows the range; final lo is the minimum (or maximum) feasible value.`,
          example: `Problem: Koko Eating Bananas — piles[i] = bananas; h = hours. She must finish all. Speed k = bananas per hour. Find minimum k. See [LeetCode #875](https://leetcode.com/problems/koko-eating-bananas/).

Solution: lo=1, hi=max(piles). check(speed): hours = sum(ceil(pile/speed)); return hours <= h. Binary search for smallest speed where check is true. Time O(n log max). **Why:** check(speed) is monotonic: if k works, k+1 works too; we find the first value that is true.`,
          additionalInfo: `LeetCode: [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/), [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/), [Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/). **Takeaway:** "Minimum/maximum x such that P(x)" and check(x) O(n) → binary search on answer; template first-true (hi=mid) or last-true (lo=mid+1). **Tip:** If "minimum x such that P(x)" use first-true template (hi = mid). If "maximum x such that P(x)" use last-true (lo = mid + 1, return lo - 1).`,
        },
        codeExample: `// Binary search on answer - minimum speed to eat all bananas in h hours
int minEatingSpeed(vector<int>& piles, int h) {
  int lo = 1, hi = *max_element(piles.begin(), piles.end());
  auto check = [&](int k) {
    long hours = 0;
    for (int p : piles) hours += (p + k - 1) / k;
    return hours <= h;
  };
  while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (check(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
        codeLanguage: "cpp",
      },
    ],
  },
  {
    title: "Node.js",
    slug: "nodejs",
    description:
      "Event loop, async/await, Express, REST APIs, and backend best practices.",
    order: 9,
    published: true,
    topics: [
      {
        id: "event-loop-and-async",
        title: "Event Loop & Async",
        description:
          "How the event loop works; callbacks, Promises, async/await.",
        order: 0,
        imageKey: "nodejs",
        contentBlocks: {
          learningFlow: [
            "Read how the event loop handles I/O and timers so you know why async code is non-blocking.",
            "Trace a small script with setTimeout and Promise to see the order of execution.",
            "Write an async function that awaits fetch() or fs.promises; handle errors with try/catch.",
            "Use Promise.all for parallel async work.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2, then in Node run a script with setTimeout and a Promise and observe the order of console.log output.

**Prerequisites:** JavaScript (functions, callbacks); basic idea of I/O (file, network) taking time.

**By the end of this topic you will:** Explain why async code does not block, use async/await with error handling, and run independent async operations in parallel with Promise.all.`,
          material: `Node.js runs JavaScript on the server with a single-threaded event loop. I/O (file, network) is delegated to the system; when ready, callbacks are queued and run.

**Event loop:** Run one task from the queue; when call stack is empty, take the next task. **Async patterns:** callbacks → Promises → async/await.

**In other words:** There is only one thread; when one operation waits on I/O (read file, HTTP), the thread must not block — we use async: "start I/O, continue with other code; when I/O completes, run the callback/Promise." So one thread serves many I/O operations by interleaving.`,
          explanation: `Blocking the event loop blocks the whole process. So we use async I/O: start the operation, pass a callback or return a Promise; when the operation completes, the callback (or .then) runs.

async/await is syntax over Promises: await pauses the function until the Promise resolves.`,
          application: `Use async/await for any I/O: reading files, HTTP requests, database queries. Use Promise.all when multiple independent async operations can run in parallel.`,
          howToImplement: `(1) Prefer async/await over raw .then() for readability.
(2) Always handle errors: try/catch around await, or .catch() on the Promise.
(3) Export async route handlers in Express: (req, res) => { ... await ...; res.json(...); } and catch errors in middleware.
(4) For parallel work: const [a, b] = await Promise.all([fetchA(), fetchB()]);`,
          logicAndCode: `Event loop: one thread; queue of "tasks" (callbacks, microtasks). Run current task to completion; then run all microtasks (Promise callbacks); then next task. So await schedules the rest of the function as a microtask.`,
          example: `Problem: Read two files and merge their contents.

Solution: const [a, b] = await Promise.all([fs.promises.readFile('a.txt', 'utf8'), fs.promises.readFile('b.txt', 'utf8')]); return a + b; Use try/catch for missing files. **Why:** Promise.all runs both file reads in parallel; waits for both to finish then merges.`,
          additionalInfo: `**Takeaway:** Single thread + event loop; async = non-blocking (I/O delegated). Use async/await + try/catch; independent parallel work → Promise.all. Don't use sync API in request handlers. Use async middleware (express-async-errors or wrap).catch(next).`,
        },
        codeExample: `// async/await with error handling
async function getData() {
  try {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Parallel with Promise.all
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]);`,
        codeLanguage: "javascript",
      },
      {
        id: "express-and-rest",
        title: "Express & REST",
        description:
          "Create a simple API with Express; routes, middleware, and JSON.",
        order: 1,
        imageKey: "nodejs",
        contentBlocks: {
          learningFlow: [
            "Read how Express handles routes and middleware.",
            "Create a minimal app with app.get('/') and app.listen(port).",
            "Add a JSON route (e.g. GET /api/users) and return res.json(data).",
            "Add a middleware (e.g. express.json()) and a POST route that reads req.body.",
          ],
          learningFlowIntro: `**Your first step:** Create a new folder, npm init -y, npm install express. Create index.js with the minimal app from the code example; run with node index.js and open http://localhost:4000 in the browser.

**Prerequisites:** Event Loop & Async (Node.js); Computer Networks (HTTP & TCP Basics) — understanding HTTP methods and request/response helps before building REST APIs.

**By the end of this topic you will:** Build a minimal REST API with GET and POST, use express.json() and error middleware, and understand route and middleware order.`,
          material: `**Express** is a minimal web framework for Node. **Routes:** \`app.get(path, handler)\`, \`app.post(path, handler)\`; handler receives (req, res); use \`res.json(obj)\`, \`res.status(code)\`, \`res.send()\`. **Middleware** = functions that run in order before/after routes; \`next()\` passes to the next; \`express.json()\` parses request body into \`req.body\`. **REST:** Use HTTP methods (GET read, POST create, PUT replace, DELETE remove) and noun URLs (\`/api/users\`, \`/api/users/:id\`). **Error handling:** Middleware (err, req, res, next) returns 500 and message. **Order matters:** Body parser and CORS before routes; error handler last.

**In other words:** Express = routing + middleware. Each request passes through middleware in order; the route that matches path & method handles it. REST = convention: URL = resource, method = action.`,
          explanation: `Middleware runs in order; next() passes to the next middleware or route. res.json(obj) sets Content-Type and sends the body. Status codes: 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error.`,
          application: `Use Express for REST APIs, file uploads, server-rendered pages. Use middleware for auth, logging, CORS, rate limiting.`,
          howToImplement: `(1) const express = require('express'); const app = express(); app.use(express.json()).
(2) app.get('/api/items', (req, res) => res.json(items)); app.post('/api/items', (req, res) => { ...; res.status(201).json(newItem); }).
(3) app.listen(PORT, () => console.log('Listening on', PORT)); (4) Handle errors in middleware: (err, req, res, next) => res.status(500).json({ error: err.message });`,
          logicAndCode: `express.json() reads the request body and puts it in req.body. Route handlers run when the path and method match. Order of middleware matters: put body parsers and CORS before routes.`,
          example: `Problem: Expose a list of items as GET /api/items and add one via POST /api/items.

Solution: const items = []; app.get('/api/items', (req, res) => res.json(items)); app.post('/api/items', (req, res) => { const item = { id: Date.now(), ...req.body }; items.push(item); res.status(201).json(item); }); **Why:** express.json() must be mounted so req.body is populated; 201 = Created for successful POST.`,
          additionalInfo: `**Takeaway:** Routes + middleware in order; body parser & CORS before routes, error handler last. REST = GET/POST/PUT/DELETE + noun URLs. **Common mistake:** Forgetting app.use(express.json()) so req.body is undefined; async handler without try/catch/next(err). Use environment variables for PORT and secrets. In production use helmet(), rate limiting, and validate input. For async handlers use express-async-errors or wrap in try/catch and next(err).`,
        },
        codeExample: `const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const item = { id: Date.now(), ...req.body };
  items.push(item);
  res.status(201).json(item);
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
app.listen(process.env.PORT || 4000);`,
        codeLanguage: "javascript",
      },
    ],
  },
  {
    title: "Database & SQL",
    slug: "database-sql",
    description:
      "Relational model, SQL queries, indexing, transactions, and practical patterns.",
    order: 3,
    published: true,
    topics: [
      {
        id: "sql-queries",
        title: "SQL Queries",
        description: "SELECT, JOIN, WHERE, GROUP BY, and subqueries.",
        order: 0,
        imageKey: "database",
        contentBlocks: {
          learningFlow: [
            "Read the material so you know SELECT, JOIN, and GROUP BY basics.",
            "Write a query that joins two tables and filters with WHERE.",
            "Write a query with GROUP BY and aggregate (COUNT, SUM).",
            "Try a subquery (e.g. WHERE id IN (SELECT ...)).",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2, then open a SQL playground (e.g. PostgreSQL, SQLite) and run the example queries at the end of this topic.

**Prerequisites:** Basic idea of tables, rows, and columns (spreadsheet or any DB).

**By the end of this topic you will:** Write SELECT with WHERE and JOIN, use GROUP BY with COUNT/SUM, and read or write a simple subquery.`,
          material: `**SELECT:** Choose columns; FROM table; WHERE condition; ORDER BY; LIMIT.

**JOIN:** Combines tables on a key. **INNER JOIN** = only rows that match in both tables. **LEFT JOIN** = all rows from left table; if no match on right, right columns = NULL. ON = join condition (usually key column).

**GROUP BY:** Group rows by column values; use with COUNT, SUM, AVG, MAX, MIN. **HAVING** = filter after aggregation (e.g. HAVING COUNT(*) > 5).

**Subquery:** (SELECT ...) used as a value or in IN / EXISTS.

**In other words:** JOIN = combine two tables on a common column (e.g. user_id). GROUP BY = "group rows with the same column values" then aggregate (count, sum) per group.`,
          explanation: `JOIN connects tables by a key; INNER keeps only rows that match in both. LEFT JOIN keeps all left rows and fills NULL for right when no match. GROUP BY collapses rows into one per group; aggregates compute over each group.`,
          application: `Use JOIN for related data (users + orders). Use GROUP BY for counts and sums (orders per user, total by category). Use subqueries when you need a list or single value from another table.`,
          howToImplement: `(1) Start with FROM and JOIN to list tables; add ON.
(2) Add WHERE for filters (before grouping).
(3) Add GROUP BY columns; add SELECT aggregates and grouped columns.
(4) Add HAVING if you need to filter by aggregate.
(5) Add ORDER BY and LIMIT last.`,
          logicAndCode: `SELECT runs in logical order: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT (aggregates) → ORDER BY → LIMIT. Write in that order when building a query.`,
          example: `Problem: List users with the count of their orders.

Solution: Idea: join users and orders on user_id (LEFT JOIN so users with no orders still appear), then group by user and count orders. COUNT(o.id) counts orders per user (o.id NULL not counted). SELECT u.id, u.name, COUNT(o.id) AS order_count FROM users u LEFT JOIN orders o ON o.user_id = u.id GROUP BY u.id, u.name; **Takeaway:** JOIN to combine tables; GROUP BY + COUNT/SUM for per-group aggregation.`,
          additionalInfo: `Use meaningful aliases (u, o). Prefer JOIN over multiple FROM + WHERE for clarity. Index columns used in WHERE and JOIN. In interviews, state schema and then write the query step by step. **Curriculum:** This section is a prerequisite for Backend Development (Auth & Databases) and System Design.`,
        },
        codeExample: `-- Join and filter
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON o.user_id = u.id
WHERE o.created_at >= '2024-01-01';

-- Group and aggregate
SELECT category, COUNT(*) AS cnt, SUM(amount) AS total
FROM orders
GROUP BY category
HAVING COUNT(*) > 5
ORDER BY total DESC
LIMIT 10;`,
        codeLanguage: "sql",
      },
      {
        id: "indexes-and-query-performance",
        title: "Indexes & Query Performance",
        description:
          "How indexes work, when to index, EXPLAIN, and avoiding slow queries.",
        order: 1,
        imageKey: "database",
        contentBlocks: {
          learningFlow: [
            "Read what an index is: B-tree (or hash) structure that speeds up WHERE and JOIN on indexed columns.",
            "Identify columns to index: WHERE, JOIN ON, ORDER BY, GROUP BY; avoid over-indexing (writes get slower).",
            "Use EXPLAIN (or EXPLAIN ANALYZE) to see query plan and spot full table scans.",
            "Fix one slow query: add index, rewrite query, or denormalize if needed.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. In your DB (or SQL playground), run EXPLAIN on a query that filters by a column; if it shows a full table scan, add an index on that column and run EXPLAIN again.

**Prerequisites:** SQL Queries topic (SELECT, JOIN, GROUP BY); you have run queries on a real or sample database.

**By the end of this topic you will:** Choose which columns to index, read EXPLAIN output, and fix N+1 and full scan issues.`,
          material: `**Index:** Data structure (usually B-tree) that lets the DB find rows by key without scanning the whole table.

**When to index:** Columns in WHERE, JOIN ON, ORDER BY; primary key and foreign key are usually indexed by default. **Composite index:** (a, b) helps WHERE a=? AND b=? or ORDER BY a, b; column order matters. **EXPLAIN:** Shows query execution plan. **Seq Scan (sequential scan)** = read entire table — avoid on large tables. **Index Scan** = use index to find rows — preferred. **N+1 problem:** 1 query for list + N queries for each item's details; fix with JOIN or IN (SELECT ...) to get 1–2 queries.

**Cost:** Index speeds up reads but slows writes (insert/update must update the index). **Covering index:** Index contains all columns needed so the DB doesn't need to read the table. **Full table scan:** Same as Seq Scan; avoid on large tables.`,
          explanation: `B-tree allows O(log n) lookup by key. Without index, DB scans every row (O(n)). Composite index (a, b) can be used for "a = ?" or "a = ? AND b = ?" but not for "b = ?" alone. EXPLAIN shows which index is used.`,
          application: `Use for production DBs: index columns in frequent filters and joins; run EXPLAIN on slow queries; add index and measure. In interviews: explain why a query is slow and how you'd fix it.`,
          howToImplement: `(1) CREATE INDEX idx_users_email ON users(email); CREATE INDEX idx_orders_user_created ON orders(user_id, created_at); (2) EXPLAIN SELECT * FROM users WHERE email = 'x'; (3) If "Seq Scan", add index on email. (4) Avoid SELECT * when you need few columns; consider covering index.`,
          logicAndCode: `Query planner chooses index if it estimates lower cost. High selectivity (many distinct values) = index useful; low (e.g. boolean) = often full scan anyway. N+1: many small queries; fix with JOIN or IN (SELECT ...).`,
          example: `Problem: SELECT * FROM orders WHERE user_id = 123 AND created_at > '2024-01-01' is slow.

Solution: CREATE INDEX idx_orders_user_created ON orders(user_id, created_at); EXPLAIN shows Index Scan using idx_orders_user_created. If still slow, check if table is huge and consider partitioning by date.`,
          additionalInfo: `PostgreSQL: EXPLAIN ANALYZE runs query and shows actual time. MySQL: EXPLAIN; check "type" (ref good, ALL bad). Index types: B-tree (default), Hash (equality), GIN (array/JSON). **Curriculum:** Prerequisite for Backend (Auth & Databases) — indexes and N+1 matter in production.`,
        },
        codeExample: `-- Create index
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);

-- Explain plan (PostgreSQL)
EXPLAIN ANALYZE
SELECT u.name, o.total
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.created_at >= '2024-01-01';
-- Look for: Index Scan using idx_orders_user_created
`,
        codeLanguage: "sql",
      },
      {
        id: "transactions-and-acid",
        title: "Transactions & ACID",
        description:
          "ACID properties, BEGIN/COMMIT/ROLLBACK, isolation levels.",
        order: 2,
        imageKey: "database",
        contentBlocks: {
          learningFlow: [
            "Read ACID: Atomicity (all or nothing), Consistency (invariants hold), Isolation (concurrent transactions), Durability (committed data persists).",
            "Write a transaction: BEGIN; several statements; COMMIT or ROLLBACK on error.",
            "Read isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable; know phantom read vs dirty read.",
            "Use a savepoint (SAVEPOINT / ROLLBACK TO) in one exercise.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. In a SQL client run: BEGIN; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2; COMMIT; (or ROLLBACK to undo). Then read isolation levels.

**Prerequisites:** SQL Queries (SELECT, UPDATE); basic idea of concurrency.

**By the end of this topic you will:** Explain ACID, write BEGIN/COMMIT/ROLLBACK, and name isolation levels and their trade-offs.`,
          material: `**ACID:** **Atomicity:** Transaction is all-or-nothing; if one statement fails, roll back all. **Consistency:** DB invariants hold before and after (e.g. sum of balances unchanged). **Isolation:** Concurrent transactions do not see each other's uncommitted changes; level controls how much they see. **Durability:** Once committed, data survives crash (WAL, disk).

**BEGIN / COMMIT / ROLLBACK:** Start transaction; commit makes changes permanent; rollback undoes. **Isolation levels:** Read Uncommitted (dirty reads); Read Committed (no dirty read, default in many DBs); Repeatable Read (same row same value in transaction); Serializable (strictest, no phantom reads).

**Phantom read:** New row appears in range; **dirty read:** see uncommitted data. **SAVEPOINT:** Name a point; ROLLBACK TO savepoint to undo part of transaction.

**In other words:** ACID = transaction all-or-nothing (Atomicity), invariants hold (Consistency), concurrent transactions don't interfere (Isolation), committed data persists (Durability). Money transfer = BEGIN → two UPDATEs → COMMIT; if either fails ROLLBACK.`,
          explanation: `Atomicity is implemented with a log: either all operations are applied or none. Isolation is implemented with locking or MVCC; higher isolation = less concurrency, fewer anomalies. Durability = write-ahead log + fsync.`,
          application: `Use transactions for multi-step updates (e.g. transfer: debit one account, credit another). Choose isolation: Read Committed often enough; Repeatable Read for reports; Serializable when you need strict consistency.`,
          howToImplement: `(1) BEGIN; (or START TRANSACTION;) (2) Run INSERT/UPDATE/DELETE; (3) On success COMMIT; on error ROLLBACK; (4) In app code: start transaction, run statements, commit or rollback in finally. (5) SET TRANSACTION ISOLATION LEVEL READ COMMITTED; (syntax varies by DB).`,
          logicAndCode: `Commit writes log and makes changes visible. Rollback uses log to undo. Isolation: Read Committed typically releases row locks after read; Repeatable Read holds them until end of transaction.`,
          example: `Problem: Transfer 100 from A to B.

Solution: BEGIN; UPDATE accounts SET balance = balance - 100 WHERE id = A AND balance >= 100; UPDATE accounts SET balance = balance + 100 WHERE id = B; if both rows updated then COMMIT; else ROLLBACK. Use application check or DB constraint to ensure balance never negative. **Why:** Without a transaction, if the two UPDATEs are separate we could have debit succeed but credit fail (inconsistent).`,
          additionalInfo: `**Takeaway:** Multi-step update that must stay consistent → use a transaction (BEGIN/COMMIT/ROLLBACK). ACID = all-or-nothing, invariants, isolation, durability. PostgreSQL: default Read Committed; SERIALIZABLE for strict. MySQL: REPEATABLE READ default. Interview: define ACID; when to use transaction; isolation levels in one sentence. **Curriculum:** Prerequisite for Backend (Auth & Databases) when implementing multi-step updates.`,
        },
        codeExample: `-- Transaction: transfer
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1 AND balance >= 100;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
-- If both succeed:
COMMIT;
-- On error:
-- ROLLBACK;

-- Isolation (PostgreSQL)
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
`,
        codeLanguage: "sql",
      },
    ],
  },
  {
    title: "React",
    slug: "react",
    description:
      "Components, JSX, props & state, hooks, context, routing, and best practices for building modern UIs.",
    order: 4,
    published: true,
    topics: [
      {
        id: "react-fundamentals-and-jsx",
        title: "Fundamentals & JSX",
        description: "Components, JSX syntax, and rendering.",
        order: 0,
        imageKey: "react",
        contentBlocks: {
          learningFlow: [
            "Read what a component is and how JSX maps to React.createElement.",
            "Create a small component (e.g. Button or Card) and render it in App.",
            "Use props to pass data and children.",
            "Try conditional rendering and list rendering with key.",
          ],
          learningFlowIntro: `**Your first step:** Create a new React app (Vite or CRA), open App.jsx, and add a small component (e.g. function Greeting({ name }) { return <h1>Hello, {name}</h1>; }).

**Prerequisites:** JavaScript (functions, arrays, objects); basic HTML.

**By the end of this topic you will:** Build a component that accepts props, render a list with key, and understand why key is required.`,
          material: `React is a library for building UIs with components. Each component is a function (or class) that returns JSX. JSX is syntax sugar for React.createElement(type, props, ...children). Components can receive props and render other components.

**In other words:** Component = reusable UI block (button, card, form). Props = data passed from parent to child. Key = unique identifier for each list item so React can update only what changed, not the whole list.`,
          explanation: `Components let you split the UI into reusable pieces. JSX looks like HTML but is JavaScript; you can embed expressions with {}.

The key prop is required when rendering lists so React can track identity.`,
          application: `Use components for buttons, cards, forms, pages. Use props for configuration and data. Use key when mapping over arrays.`,
          howToImplement: `(1) Create a .jsx or .tsx file; export a function that returns JSX.
(2) Accept props as the first argument; use them inside JSX with {props.name}.
(3) For lists: array.map(item => <Item key={item.id} {...item} />).`,
          logicAndCode: `React compares the previous and current element tree (virtual DOM). When state or props change, the component re-runs and React updates the real DOM only where needed. key helps React match list items correctly.`,
          example: `Problem: Display a list of users with name and email.

Solution: const UserList = ({ users }) => ( <ul> {users.map(u => <li key={u.id}>{u.name} — {u.email}</li>)} </ul> ); Use key={u.id} so React can track list items.`,
          additionalInfo: `Use PascalCase for components, camelCase for props. Avoid mutating props. Prefer function components + hooks over class components. **Takeaway:** Component = function that returns JSX; props = input from parent; key required in list so React can track items. **Common mistake:** Using index as key when list can be reordered or items removed — use unique id.`,
        },
        codeExample: `// Simple component with props
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// List with key
function UserList({ users }) {
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}`,
        codeLanguage: "javascript",
      },
      {
        id: "react-hooks",
        title: "Hooks",
        description: "useState, useEffect, and rules of hooks.",
        order: 1,
        imageKey: "react",
        contentBlocks: {
          learningFlow: [
            "Read what hooks are and the rules (only at top level, only in React functions).",
            "Build a small counter with useState.",
            "Add a useEffect that runs on mount (e.g. fetch or document.title).",
            "Try a custom hook (e.g. useWindowWidth) to reuse stateful logic.",
          ],
          learningFlowIntro: `**Your first step:** In your React app, add a counter: const [n, setN] = useState(0); and a button that calls setN(n => n + 1). Then add useEffect(() => { document.title = \`Count: \${n}\`; }, [n]).

**Prerequisites:** React Fundamentals & JSX (components, props, JSX).

**By the end of this topic you will:** Use useState and useEffect correctly, follow the rules of hooks, and write a simple custom hook.`,
          material: `**Hooks** let you use state and other React features in function components.

**useState(initial)** returns [value, setter]; call setter to update and re-render. **useEffect(fn, deps)** runs fn after render; deps = [] runs once (mount), deps = [x] when x changes.

**Rules of Hooks:** Only call hooks at the top level (not inside loops/conditions); only from function components or custom hooks.

**In other words:** useState = local state per component; setter triggers re-render. useEffect = "after render, do this" (fetch, subscription, side effect); dependency array controls when it runs. React relies on hook call order, so don't call hooks conditionally.`,
          explanation: `useState keeps state across re-renders; each call to setState schedules an update. useEffect runs after the browser has painted; the cleanup (if you return a function) runs before the next effect or unmount. Custom hooks are functions that call other hooks so you can reuse logic.`,
          application: `Use useState for form fields, toggles, counters. Use useEffect for subscriptions, fetching data, syncing with DOM or external APIs. Use custom hooks to share logic (e.g. useDebounce, useLocalStorage).`,
          howToImplement: `(1) useState: const [value, setValue] = useState(initial); in event handler call setValue(newValue) or setValue(prev => prev + 1).
(2) useEffect: useEffect(() => { ...; return () => cleanup; }, [dep1, dep2]); empty deps = run once.
(3) Custom hook: function useMyHook() { const [state, setState] = useState(...); ...; return state; }`,
          logicAndCode: `React tracks hooks by call order, so you must not call them conditionally. setState is async; React batches updates. useEffect runs after commit; cleanup runs in reverse order of effect registration.`,
          example: `Problem: Counter that increments and shows document.title in sync.

Solution: const [n, setN] = useState(0); useEffect(() => { document.title = \`Count: \${n}\`; }, [n]); return <button onClick={() => setN(c => c + 1)}>{n}</button>; **Why:** [n] in useEffect = run again when n changes; setter form (c => c + 1) is safe for updates based on latest state.`,
          additionalInfo: `**Takeaway:** useState for state; useEffect for side effects (fetch, subscription); deps [] = run once on mount, [x] = when x changes. **Common mistake:** Hooks inside if/loop (breaks rules); empty dependency array when you need latest value; forgetting cleanup (interval/listener) in useEffect return. Other hooks: useRef (mutable ref), useContext (read context), useMemo/useCallback (memoization). Don't use hooks in class components. ESLint plugin react-hooks enforces the rules.`,
        },
        codeExample: `// useState
const [count, setCount] = useState(0);
<button onClick={() => setCount((c) => c + 1)}>{count}</button>

// useEffect - run once on mount
useEffect(() => {
  const id = setInterval(() => setCount((c) => c + 1), 1000);
  return () => clearInterval(id);
}, []);

// Custom hook
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
}`,
        codeLanguage: "javascript",
      },
      {
        id: "react-context-and-state",
        title: "Context & State Management",
        description:
          "useContext, lifting state, and when to use Redux or Zustand.",
        order: 2,
        imageKey: "react",
        contentBlocks: {
          learningFlow: [
            "Read what Context is: pass data through the tree without prop drilling.",
            "Create a ThemeContext (or UserContext) and consume it with useContext.",
            "Understand when to lift state up vs Context vs global store.",
            "Try a small app with Context; then read when Redux/Zustand are better.",
          ],
          learningFlowIntro: `**Your first step:** In your React app create a context: const ThemeContext = createContext('light'); wrap a subtree with <ThemeContext.Provider value={theme}>; in a child use const theme = useContext(ThemeContext). Toggle theme and see the child update.

**Prerequisites:** React Fundamentals and Hooks (useState, useEffect).

**By the end of this topic you will:** Use Context for theme or user, know when to use Context vs lift state vs Redux/Zustand, and avoid unnecessary re-renders (value identity).`,
          material: `**Context:** Provides one value to all descendants without **prop drilling** (passing props down every level). CreateContext(default), Provider wraps a subtree, useContext in child. **When to use:** Theme, locale, current user.

**State management:** Local state (useState) for a single component; lift state up to share between siblings; Context for app-wide data that changes rarely; Redux/Zustand for complex global state or many subscribers. **Redux:** Single store, actions, reducers; good for predictable updates and DevTools. **Zustand:** Simpler API, less boilerplate.

**In other words:** Context = "broadcast" one value down the component tree. Every consumer re-renders when value changes; don't put frequently changing data in Context (use a state library instead).`,
          explanation: `Context triggers re-render of all consumers when value changes; avoid putting frequently changing data in Context (use state library instead). Context is great for "set once" or "changes rarely" data like theme or user.`,
          application: `Use Context for theme, auth user, locale. Use Redux/Zustand for cart, form state across pages, or when many components need the same data with frequent updates.`,
          howToImplement: `(1) const ThemeContext = createContext('light'); (2) Wrap tree: <ThemeContext.Provider value={theme}>; (3) In child: const theme = useContext(ThemeContext). (4) For global state: consider createContext + useReducer, or add Zustand/Redux.`,
          logicAndCode: `Provider re-renders consumers when value identity changes. So pass value={useMemo(() => ({ user, login }), [user])} to avoid unnecessary re-renders.`,
          example: `Problem: Pass theme (dark/light) to many nested components without prop drilling.

Solution: ThemeContext with default 'light'; App wraps with <ThemeContext.Provider value={theme}>; any child does const theme = useContext(ThemeContext) and uses it. **Why:** Provider value flows down; only the wrapped subtree can read the context.`,
          additionalInfo: `**Takeaway:** Context = skip prop drilling; Provider value + useContext. To avoid excessive re-renders, stabilize value (useMemo) or split context. **Common mistake:** New value object every render (value={{ user, login }}) so all consumers re-render. Don't overuse Context for everything. For forms: React Hook Form or Formik. For server state: React Query or SWR.`,
        },
        codeExample: `const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar onToggle={() => setTheme(t => t === 'light' ? 'dark' : 'light')} />
    </ThemeContext.Provider>
  );
}

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}
`,
        codeLanguage: "javascript",
      },
      {
        id: "react-routing-and-data-fetching",
        title: "Routing & Data Fetching",
        description:
          "React Router, loading states, and fetching data (useEffect, React Query).",
        order: 3,
        imageKey: "react",
        contentBlocks: {
          learningFlow: [
            "Read React Router: Routes, Route, Link, useParams, useNavigate.",
            "Build a small app with 2–3 routes and a dynamic route (e.g. /user/:id).",
            "Fetch data on mount with useEffect and show loading/error state.",
            "Optional: try React Query or SWR for caching and refetch.",
          ],
          learningFlowIntro: `**Your first step:** Install react-router-dom. Add <Routes><Route path="/" element={<Home />} /><Route path="/user/:id" element={<User />} /></Routes>. In User, use const { id } = useParams() and fetch(\`/api/users/\${id}\`) in useEffect; show loading and data.

**Prerequisites:** React Fundamentals and Hooks (useState, useEffect).

**By the end of this topic you will:** Set up routes and dynamic segments, fetch data per route and handle loading/error, and optionally use React Query for cache.`,
          material: `**React Router:** Declarative routing. BrowserRouter, Routes, Route path="/" element={<Home />}, Route path="/user/:id". **Hooks:** useParams() for :id value, useNavigate() for programmatic navigation, useLocation() for current path.

**Data fetching:** In useEffect call fetch/axios; set loading true → fetch → set data and loading false; handle errors. **React Query:** useQuery(key, fetchFn) gives data, isLoading, error, refetch; cache and deduplication built-in. **SWR:** Similar; stale-while-revalidate.

**In other words:** Route matches URL to component; :id becomes a parameter. Fetch in useEffect with dependency [id] so when the user changes the data is refetched; show loading/error in JSX.`,
          explanation: `Router matches first Route that fits; put specific routes before generic. Fetch in useEffect with empty deps for "on mount"; cleanup with abort controller if component unmounts. React Query avoids duplicate requests and gives cache.`,
          application: `Use Router for multi-page SPA. Use useEffect + fetch for simple cases; React Query for lists, detail pages, and when you need cache/refetch.`,
          howToImplement: `(1) <Routes><Route path="/" element={<Home />} /><Route path="/user/:id" element={<User />} /></Routes>. (2) In User: const { id } = useParams(); useEffect(() => { fetch(\`/api/users/\${id}\`).then(r=>r.json()).then(setUser); }, [id]); (3) Show loading and error in JSX.`,
          logicAndCode: `useEffect runs after paint; so you'll see loading first, then data. For React Query: data is cached by query key; same key = same cache; refetch on window focus or interval if configured.`,
          example: `Problem: User list page and user detail page; fetch user by id on detail.

Solution: Route path="/users/:id"; in component const { id } = useParams(); useEffect(() => { fetch(...).then(setUser); }, [id]); return loading ? <Spinner /> : <Profile user={user} />; **Why:** [id] in useEffect = refetch when id from URL changes; loading state avoids flashing old data.`,
          additionalInfo: `**Takeaway:** useParams for :id; fetch in useEffect([id]); always show loading and error. React Query/SWR simplify cache and refetch. React Router v6: use Routes not Switch; element not component. Lazy load routes with React.lazy and Suspense. For auth: protect routes with a wrapper that checks token and redirects. **Curriculum:** Computer Networks (HTTP & TCP) helps when calling REST APIs from fetch().`,
        },
        codeExample: `import { Routes, Route, useParams } from 'react-router-dom';

function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(\`/api/users/\${id}\`).then(r => r.json())
      .then(setUser).finally(() => setLoading(false));
  }, [id]);
  if (loading) return <Spinner />;
  return <div>{user?.name}</div>;
}

// Routes
<Routes>
  <Route path="/users/:id" element={<UserPage />} />
</Routes>
`,
        codeLanguage: "javascript",
      },
    ],
  },
  {
    title: "Interview Preparation",
    slug: "interview-preparation",
    description:
      "Coding interviews, system design, OOD, behavioral questions, resume, and timeline.",
    order: 5,
    published: true,
    topics: [
      {
        id: "coding-interviews",
        title: "Coding Interviews",
        description:
          "How to approach coding problems, communication, and practice.",
        order: 0,
        imageKey: "interview",
        contentBlocks: {
          learningFlow: [
            "Read the steps: clarify, examples, approach, implement, test.",
            "Practice 2–3 problems while talking aloud as if in an interview.",
            "Time yourself (e.g. 25 min).",
            "Review feedback: did you state complexity? Handle edge cases?",
          ],
          learningFlowIntro: `**Your first step:** Read the flow below, then pick one LeetCode Easy (e.g. Two Sum) and solve it while speaking aloud: clarify → example → approach → code → test.

**Prerequisites:** You have done at least a few coding problems; familiarity with one language and basic data structures.

**By the end of this topic you will:** Follow a repeatable interview flow, state time/space complexity, and communicate your approach before coding.`,
          material: `Typical flow: (1) Clarify problem (inputs, outputs, edge cases). (2) Work through 1–2 examples. (3) Describe approach (brute force first, then optimize). (4) State time/space complexity. (5) Code clearly. (6) Test with examples and edge cases.

**In other words:** Repeat the problem in your own words and ask one clarifying question. Work through one small example and one edge case (empty, n=1). State approach and complexity before writing code; the interviewer wants to see structured thinking.`,
          explanation: `Interviewers care about communication and structured thinking. Saying "I'll start with a brute force, then optimize" is better than jumping to code. State your complexity before and after coding.`,
          application: `Use this flow in every practice session. Record yourself or practice with a peer. Focus on clarity and correctness first, then optimization.`,
          howToImplement: `(1) Repeat the problem in your own words and ask one clarifying question.
(2) Walk through a small example and a larger one.
(3) Describe approach in 2–3 sentences; mention complexity.
(4) Code with clear variable names; say what you're doing.
(5) Run through your examples and n=0, n=1, or empty input.`,
          logicAndCode: `The flow ensures you don't miss requirements and that the interviewer follows your reasoning. Complexity discussion shows you understand trade-offs.`,
          example: `Problem: "Given an array, find two numbers that add up to target."

Clarify: Sorted? Duplicates? Return indices or values? Then: brute force O(n²) → hash map O(n). Code, test, done.`,
          additionalInfo: `**Takeaway:** Clarify → example → approach + complexity → code → test. Practice speaking while coding; state complexity. Practice on [LeetCode](https://leetcode.com/) (Easy/Medium). Do mock interviews (Pramp, Interviewing.io). Review patterns: two pointers, sliding window, DP, BFS/DFS. Start with [Two Sum](https://leetcode.com/problems/two-sum/). For pattern-by-pattern practice and design (LRU, MinStack), see **Competitive Programming** → Coding Interview Strategy.`,
        },
        codeExample: `// Example: state your approach first
// "I'll use a hash map: for each number, check if
// (target - num) is already seen. O(n) time, O(n) space."

function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}`,
        codeLanguage: "javascript",
      },
      {
        id: "system-design-and-behavioral",
        title: "System Design & Behavioral",
        description:
          "System design interview flow and behavioral (STAR) questions.",
        order: 1,
        imageKey: "interview",
        contentBlocks: {
          learningFlow: [
            "Read the system design interview flow: clarify, scale, high-level, deep dive.",
            "Practice one design (e.g. URL shortener, chat) end-to-end; draw and explain trade-offs.",
            "Learn STAR for behavioral: Situation, Task, Action, Result; prepare 3–5 stories.",
            "Match stories to common themes: conflict, failure, leadership, learning.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Then pick one design (e.g. URL shortener): on paper, write 3 clarifying questions, estimate QPS and storage, and draw Client → LB → App → DB + Cache.

**Prerequisites:** System Design Basics (in this curriculum); Database & SQL and Computer Networks help for scale and components. You should have built or discussed at least one backend or API.

**By the end of this topic you will:** Run a system design interview (clarify, scale, diagram, deep dive) and answer behavioral questions using STAR with 3–5 prepared stories.`,
          material: `**System design flow:** (1) Clarify requirements (functional, non-functional, scale). (2) Estimate: **QPS** (queries per second), storage, bandwidth. (3) High-level: clients, **LB** (load balancer), app servers, DB, cache. (4) Deep dive: one component (e.g. DB schema, cache strategy). (5) Trade-offs and bottlenecks.

**Behavioral (STAR):** **S**ituation (context), **T**ask (your goal), **A**ction (what you did), **R**esult (outcome, metric). Prepare stories for: conflict with a teammate, missed deadline, leadership, learning something new, failure and recovery.

**Common questions:** "Tell me about a time you disagreed with a colleague." "Describe a challenging project." "How do you prioritize?"

**In other words:** System design = clarify → estimate (QPS, storage) → high-level diagram → deep dive one part → discuss trade-offs. Behavioral = answer with STAR structure so it's concise and concrete (not a long story without outcome).`,
          explanation: `System design shows you can think at scale; no single "correct" answer. Interviewers want structure and trade-off discussion. Behavioral shows soft skills; STAR keeps answers concise and concrete.`,
          application: `Use for any senior or full-stack interview. System design: 30–45 min; practice 5–10 designs. Behavioral: 2–3 min per answer; have 5 stories that you can adapt.`,
          howToImplement: `(1) System design: Start with "Who are the users? What do they do?" Then "What's the scale?" Then draw diagram. Say "I'll focus on X next" and go deep. (2) Behavioral: Pick a story that fits; 1 min situation+task, 1–2 min action, 30 sec result. End with what you learned.`,
          logicAndCode: `Scale estimate: 1M DAU → ~100 QPS average; 1K QPS write → 86M rows/day. System design: no code unless asked; pseudocode or "we'd use a queue" is enough.`,
          example: `Problem: "Design a rate limiter."

Clarify: Per user? Per IP? Limit by requests per minute? High-level: Client → API → rate limiter (check counter) → backend. Rate limiter: sliding window or token bucket; store in Redis (key=user_id, value=count or timestamp). Deep dive: token bucket algorithm; Redis INCR + EXPIRE.`,
          additionalInfo: `**Takeaway:** System design: clarify → estimate (QPS, storage) → diagram → deep dive one component. Behavioral: STAR (Situation, Task, Action, Result); prepare 3–5 stories you can adapt. Books: Designing Data-Intensive Applications. Practice: ByteByteGo, Exponent. **Curriculum:** For system design flow and scaling deep dives, complete **System Design** section (Basics, Scaling & Caching) first.`,
        },
        codeExample: `// STAR example (structure only)
// S: "On my previous team we had a legacy API that was causing timeouts."
// T: "I was tasked with improving latency without a full rewrite."
// A: "I added caching with Redis, identified N+1 queries and fixed them with batch loads, and introduced read replicas for reporting."
// R: "P99 latency dropped from 2s to 200ms; we met the SLA."

// Rate limiter (conceptual)
// key = "ratelimit:user_123", value = count, TTL = 60s
// if count < limit: INCR key, return allow; else return 429
`,
        codeLanguage: "text",
      },
    ],
  },
  {
    title: "System Design",
    slug: "system-design-devops",
    description:
      "Scalability, load balancing, caching, databases, and high-level design for interviews.",
    order: 6,
    published: true,
    topics: [
      {
        id: "system-design-basics",
        title: "System Design Basics",
        description:
          "Requirements, scale estimation, high-level design, and key trade-offs.",
        order: 0,
        imageKey: "systemdesign",
        contentBlocks: {
          learningFlow: [
            "Read how to clarify requirements (functional, non-functional) and estimate scale (QPS, storage).",
            "Draw a high-level diagram: clients, load balancer, app servers, database, cache.",
            "Discuss trade-offs: vertical vs horizontal scaling, SQL vs NoSQL, caching strategy.",
            "Practice one problem end-to-end (e.g. design a URL shortener).",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2, then on paper or a whiteboard draw the high-level diagram (Client → LB → App servers → DB, Cache). Try explaining it in one minute.

**Prerequisites:** Computer Networks (HTTP & TCP), Database & SQL (so you know what DB and APIs are), and ideally Node.js or Backend (you have built or used at least one API).

**By the end of this topic you will:** Clarify requirements and estimate scale (QPS, storage), draw a standard high-level design, and discuss trade-offs (e.g. SQL vs NoSQL, cache strategy).`,
          material: `**Requirements:** Functional (what the system does), non-functional (latency, availability, consistency). **Scale:** QPS = queries per second (request load); DAU = daily active users (unique users per day); storage growth = data growth per year.

**Components:** Load balancer (LB) = distributes traffic to multiple app servers; app servers = stateless, can be added (scale out); database = persistent storage; cache = stores frequently read data to reduce DB load. **CAP:** Consistency (all nodes read latest data), Availability (every request gets a response), Partition tolerance (system keeps running when network partitions); in practice you pick two of three.

**In other words:** Clarify first (what we're building, scale, latency); then estimate QPS & storage (back-of-envelope); draw diagram Client → LB → App → DB (+ Cache if read-heavy); deep dive one component. Don't go straight to detail — structure first, then go deep on one part.`,
          explanation: `Start with requirements so you don't over-engineer. Back-of-envelope: 1M DAU → ~10–100 QPS average; peak 2–3×. Load balancer + multiple app servers give horizontal scaling. Cache (e.g. Redis) for hot data reduces DB load. Replication and sharding for DB scale.`,
          application: `Use in system design interviews: clarify scope, estimate numbers, draw diagram, discuss bottlenecks and trade-offs. Common topics: URL shortener, chat, news feed, rate limiter.`,
          howToImplement: `(1) Clarify: "Is this read-heavy or write-heavy? Latency requirement? Consistency vs availability?"
(2) Estimate: QPS, storage per year, bandwidth.
(3) High-level: Client → LB → App servers → DB; add cache between app and DB if read-heavy.
(4) Deep dive: DB schema, cache invalidation, scaling strategy.`,
          logicAndCode: `Load balancer: round-robin or least connections. Cache: write-through or cache-aside. DB: primary-replica for reads; sharding by key (e.g. user_id) for write scale.`,
          example: `Problem: Design a URL shortener (e.g. bit.ly).

Solution: (1) API: POST /shorten (long URL → short code), GET /:code (redirect). (2) Short code: base62 from auto-increment ID or hash — base62 for short URL and to decode back to ID. (3) Storage: DB (id, long_url, short_code, created_at). (4) Scale: cache short_code → long_url (read very often); DB shard by id for write scale. (5) Redirect: 301 (permanent, cacheable) or 302 (track clicks per redirect). **Why:** Cache for read path (GET very frequent); shard by id distributes writes; 301 vs 302 = cache vs track. **Takeaway:** Clarify → estimate (QPS, storage) → high-level diagram → deep dive one component.`,
          additionalInfo: `**Takeaway:** Clarify → estimate → diagram → deep dive. Books: Designing Data-Intensive Applications. Practice: ByteByteGo, System Design Interview. Interview: state assumptions, draw clearly, discuss trade-offs.`,
        },
        codeExample: `// Back-of-envelope: QPS and storage
// 1M DAU, 10 requests/user/day → 1M * 10 / 86400 ≈ 116 QPS (avg)
// Peak 3x → ~350 QPS
// 100M URLs, 500 bytes/row → 50 GB DB

// High-level components (pseudo)
// [Client] → [Load Balancer] → [App Server x N] → [Cache] → [DB Primary]
//                                      ↓                        ↓
//                                 [Queue]              [DB Replicas (read)]
`,
        codeLanguage: "text",
      },
      {
        id: "scaling-caching-and-queues",
        title: "Scaling, Caching & Message Queues",
        description:
          "Cache strategies, replication, sharding, and async processing with queues.",
        order: 1,
        imageKey: "systemdesign",
        contentBlocks: {
          learningFlow: [
            "Read cache strategies: cache-aside, write-through, write-behind; and when each fits.",
            "Understand DB replication (primary-replica for reads) and sharding (partition by key).",
            "Learn when to use a message queue: decouple producers/consumers, async jobs, reliability.",
            "Apply to one design: e.g. news feed (cache + queue for fanout).",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Then draw a diagram: App → Cache (Redis) → DB; and App → Queue → Worker → DB. Label "cache-aside" on read path and "queue" for async task.

**Prerequisites:** System Design Basics (high-level components, scale, trade-offs).

**By the end of this topic you will:** Choose cache strategy and invalidation, explain replication vs sharding, and when to add a message queue in a design.`,
          material: `**Cache-aside:** App checks cache first; on miss, read from DB then write to cache. **Write-through:** Every write goes to cache and DB together. **Write-behind:** Write to cache first; flush to DB async (faster, risk of data loss on crash). **TTL (time-to-live):** How long data may stay in cache before considered stale; reduces stale reads.

**Replication:** Primary accepts writes; replica replicates; read from replica to scale reads. **Sharding:** Partition data by key (e.g. user_id); each shard is one DB; for write scale. **Message queue:** Producer sends messages; consumer processes async. Used for: async tasks (email, image processing), decoupling, smoothing load. **Kafka/RabbitMQ:** Kafka = log, many consumers; RabbitMQ = queue + routing.

**Consistency:** Cache invalidation = on write, delete/update cache; eventual consistency = with replication/queue, data eventually same on all nodes.

**In other words:** Cache-aside = read from cache first; on miss → read DB, fill cache. Write-through = write to cache and DB together. Queue = heavy/async work (email, thumbnail) moved to workers so response stays fast; consumer idempotent so retries are safe. Sharding = partition data by key to scale writes; avoid hot shards.`,
          explanation: `Cache reduces DB load for hot data; invalidation is hard (TTL or invalidate on write). Sharding spreads write load but adds complexity (cross-shard queries, rebalancing). Queues let you process in background and retry on failure.`,
          application: `Use cache for read-heavy (e.g. profile, feed). Use queue for "fire and forget" (send email, generate thumbnail). Use sharding when single DB can't handle write volume. In interviews: draw cache layer and queue in diagram; discuss consistency.`,
          howToImplement: `(1) Cache: Redis; key = entity id, value = JSON; TTL 5–60 min; on write delete key or update. (2) Queue: push job (e.g. { type: 'email', to, body }) to Redis list or RabbitMQ; worker pops and processes. (3) Sharding: choose shard by hash(user_id) % N; store mapping.`,
          logicAndCode: `Cache hit = read from cache; miss = read DB, set cache. Queue: at-least-once (ack after process; redeliver if crash) vs at-most-once. Shard key must distribute evenly; avoid hot shards.`,
          example: `Problem: Design a news feed; millions of users, each follows hundreds; feed = recent posts from followees.

Solution: (1) Write path: on new post, push to queue; worker fans out to each follower's feed cache (list in Redis). (2) Read path: get feed from Redis; if miss, rebuild from DB (or precompute). (3) Alternative: pull model — on read, get followees, fetch recent posts, merge (simpler but slower). **Why:** Fan-out on write = read feed is very fast (just read cache); trade-off is heavier writes. Pull on read = light writes, slow read when many followees.`,
          additionalInfo: `**Takeaway:** Read-heavy → cache (cache-aside, TTL, invalidate on write). Write scale → sharding; read scale → replication. Async/decouple → message queue; consumer idempotent. Cache stampede: lock or probabilistic early expiry. DDIA Part II (replication, partitioning). **Curriculum:** Core for system design interviews; practice after System Design Basics.`,
        },
        codeExample: `// Cache-aside (pseudo)
function get_user(id) {
  let u = cache.get("user:" + id);
  if (!u) {
    u = db.query("SELECT * FROM users WHERE id = ?", id);
    cache.set("user:" + id, u, ttl=300);
  }
  return u;
}
// On update: cache.delete("user:" + id) or cache.set(..., u)

// Queue - producer
queue.push({ type: "send_email", to: "u@x.com", template: "welcome" });
// Worker
while (job = queue.pop()) {
  process(job);
  queue.ack(job);
}
`,
        codeLanguage: "text",
      },
    ],
  },
  {
    title: "CS Theory",
    slug: "cs-theory",
    description:
      "Data structures overview, graphs, trees, heaps, tries for interviews and problem-solving.",
    order: 7,
    published: true,
    topics: [
      {
        id: "data-structures-overview",
        title: "Data Structures Overview",
        description:
          "Array, linked list, stack, queue, hash table: operations, Big O, when to use.",
        order: 0,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read the core structures: array, linked list, stack, queue, hash table; note access/insert/delete complexity.",
            "Compare: array O(1) access vs linked list O(n); linked list O(1) insert at head vs array shift O(n).",
            "Identify in code: stack for LIFO (undo, paren match); queue for FIFO (BFS); hash for O(1) lookup.",
            "Implement a simple stack (push/pop) and a queue (enqueue/dequeue) in your language.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. In your language, create an array and a Map (or dict) and compare: arr[i] vs map.get(key). Then implement a stack with push/pop and a queue with enqueue/dequeue (e.g. using array or linked list).

**Prerequisites:** Basic programming (variables, loops, functions). Big O notation helps (see Complexity & Strategy).

**By the end of this topic you will:** State time complexity of access/insert/delete for array, linked list, stack, queue, hash table; choose the right structure for a problem.`,
          material: `**Array:** Contiguous memory; index access O(1); insert/delete at end O(1) amortized; at middle O(n). **Linked list:** Nodes with next (and prev for doubly); insert/delete at head/tail O(1); access by index O(n). **Stack:** LIFO; push, pop, peek O(1); use for undo, parentheses, DFS. **Queue:** FIFO; enqueue, dequeue O(1); use for BFS, task queue. **Hash table:** Key-value; insert, delete, lookup O(1) average; collision by chaining or open addressing; use for fast lookup, dedup, count. **When to use:** Array when you need index or iteration; linked list when you insert/delete at ends often; stack for LIFO; queue for FIFO; hash for O(1) lookup by key.

**In other words:** Array = fast index access, shifting elements is costly. Linked list = no shifting needed, but access to the i-th node requires walking from head. Stack = last in first out (undo, parentheses, DFS). Queue = first in first out (BFS). Hash = find by key O(1); trade-off is more memory.`,
          explanation: `Array gives fast random access but shifting is costly. Linked list avoids shifting but no random access. Stack and queue are interfaces; implement with array or linked list. Hash table trades space for time; good when you need "find by key" often.`,
          application: `Array: list of items, matrix. Linked list: LRU cache (with hash), queue when you need both ends. Stack: DFS, expression eval, undo. Queue: BFS, level order, producers/consumers. Hash: cache, set, frequency map, two-sum style.`,
          howToImplement: `(1) Array: language built-in; arr[i], arr.push(x), arr.splice(i, 1). (2) Stack: array with push/pop only, or linked list with insert/delete at head. (3) Queue: array with shift (O(n)) or use two stacks; better: linked list with head and tail pointers. (4) Hash: Map, dict, object; get, set, delete.`,
          logicAndCode: `Stack: last in, first out; one pointer (top). Queue: first in, first out; two pointers (front, rear) or head/tail in linked list. Hash: hash(key) → bucket; handle collisions.`,
          example: `Problem: Check balanced parentheses.

Solution: Stack. For each char: if opening, push; if closing, pop and check match. If stack empty at end and no mismatch, balanced. Time O(n), space O(n). **Why:** Open-close order must match; stack holds "what hasn't been closed yet".`,
          additionalInfo: `**Takeaway:** Array = random access; linked list = insert/delete at ends; stack = LIFO (undo, parentheses, DFS); queue = FIFO (BFS); hash = O(1) lookup. Interview: state "array for random access", "hash for O(1) lookup", "stack for LIFO/DFS", "queue for BFS". LeetCode: [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/), [Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/).`,
        },
        codeExample: `// Stack (array)
const stack = [];
stack.push(1); stack.push(2);
console.log(stack.pop()); // 2

// Queue (array - dequeue O(n); for O(1) use linked list)
const queue = [];
queue.push(1); queue.push(2);
console.log(queue.shift()); // 1

// Hash for O(1) lookup
const map = new Map();
map.set('a', 1); map.get('a'); // 1
`,
        codeLanguage: "javascript",
      },
      {
        id: "graphs-and-trees",
        title: "Graphs & Trees",
        description: "BFS, DFS, tree traversal, and when to use each.",
        order: 1,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read the difference between graph (adjacency list/matrix) and tree (no cycles, root).",
            "Implement BFS with a queue and DFS (recursive and iterative with stack).",
            "Implement tree traversals: inorder, preorder, postorder.",
            "Solve one BFS problem (e.g. level order) and one DFS (e.g. path sum).",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2, then implement BFS in your language (queue: push start; while not empty, pop, visit, push neighbors). Run it on a small graph or tree.

**Prerequisites:** Complexity & Strategy and basic data structures (array, queue, stack). Recursion helps for DFS.

**By the end of this topic you will:** Implement BFS and DFS, choose between them for shortest path vs path finding/cycles, and do inorder/preorder/postorder on trees.`,
          material: `**Graph:** Vertices + edges. Represent as adjacency list (list of neighbors per node) or matrix. **Tree:** Connected acyclic graph; has root. **BFS:** Queue; level-by-level; shortest path in unweighted graph. **DFS:** Stack or recursion; explore depth-first; cycles, topological order. **Tree traversal:** Inorder (left, root, right), preorder (root, left, right), postorder (left, right, root).

**In other words:** BFS = layer by layer from the source; first time we reach a node = shortest distance (unweighted graph). DFS = go deep first; good for "visit all", cycle detection, topological sort. Inorder on BST = sorted order.`,
          explanation: `BFS guarantees shortest path in unweighted graphs because we visit nodes in order of distance. DFS is simpler for "visit all" or when you need to backtrack. Inorder on BST gives sorted order.`,
          application: `BFS: level-order tree, shortest path, word ladder. DFS: cycle detection, topological sort, path finding, connected components. Tree: BST operations, LCA, diameter.`,
          howToImplement: `(1) BFS: queue.push(start); while (queue) { node = queue.shift(); visit(node); for (neighbor of node) queue.push(neighbor); }
(2) DFS recursive: visit(node); for (child of node) dfs(child);
(3) DFS iterative: stack.push(start); while (stack) { node = stack.pop(); visit(node); push neighbors. }
(4) Tree inorder: if (!node) return; inorder(node.left); process(node); inorder(node.right);`,
          logicAndCode: `BFS: first-in-first-out ensures we process by level. DFS: last-in-first-out (stack) or call stack (recursion) goes deep first. Mark visited to avoid cycles in graphs.`,
          example: `Problem: Binary Tree Level Order Traversal (LeetCode #102).

Solution: BFS with queue. While queue not empty: record level size, pop that many nodes, add values to level list, push children. Push each level to result. Time O(n), space O(width). **Why:** One "batch" of pops = one level; we know how many nodes in that level from the queue size at the start of the level.`,
          additionalInfo: `**Takeaway:** BFS = shortest path (unweighted), level order; DFS = visit all, cycle, topological. Tree: inorder/preorder/postorder; inorder in BST = sorted. LeetCode: [Number of Islands](https://leetcode.com/problems/number-of-islands/), [Course Schedule](https://leetcode.com/problems/course-schedule/), [Binary Tree Level Order](https://leetcode.com/problems/binary-tree-level-order-traversal/), [Max Depth](https://leetcode.com/problems/maximum-depth-of-binary-tree/). Interview: state BFS vs DFS; use visited for graphs with cycles.`,
        },
        codeExample: `// BFS - level order
function levelOrder(root) {
  if (!root) return [];
  const q = [root], result = [];
  while (q.length) {
    const level = [], n = q.length;
    for (let i = 0; i < n; i++) {
      const node = q.shift();
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    result.push(level);
  }
  return result;
}

// DFS - inorder (BST → sorted)
function inorder(node) {
  if (!node) return;
  inorder(node.left);
  console.log(node.val);
  inorder(node.right);
}
`,
        codeLanguage: "javascript",
      },
      {
        id: "heaps-tries-and-advanced-structures",
        title: "Heaps, Tries & Advanced Structures",
        description:
          "Heap (min/max), trie, when to use; complexity and interview patterns.",
        order: 2,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read heap: complete binary tree; parent ≤ children (min-heap) or parent ≥ children (max-heap); O(log n) insert and extract-min/max.",
            "Implement or use heap: top K elements (min-heap of size K), merge K sorted lists.",
            "Read trie: tree of characters; path = prefix; O(m) insert/lookup for string length m.",
            "Solve one heap problem (e.g. Kth largest) and one trie problem (e.g. prefix search).",
          ],
          learningFlowIntro: `**Your first step:** In Python run: import heapq; h = [5, 2, 8]; heapq.heapify(h); print(heapq.heappop(h)). Read sections 1–2 to see why this is a min-heap and how "top K" uses a heap of size K.

**Prerequisites:** Graphs & Trees (or equivalent); basic trees and complexity.

**By the end of this topic you will:** Use a heap for top K and merge K sorted, implement or use a trie for prefix search, and state time complexity.`,
          material: `**Heap:** Complete binary tree; min-heap (root = minimum) or max-heap (root = maximum). **Operations:** insert O(log n), extract-min O(log n), peek O(1). **Use:** Priority queue, top K, merge K sorted, Dijkstra. **Language:** C++ priority_queue; Python heapq; Java PriorityQueue. **Trie:** Root to leaf = string; each node has up to 26 (or 256) children. **Operations:** insert O(m), search O(m), prefix search O(m + k) for k matches. **Use:** Autocomplete, spell check, IP routing. **Other:** Segment tree (range queries), Fenwick tree (prefix sum updates), DSU (disjoint set union for connected components). **Complexity:** Heap insert/extract O(log n); trie per key O(m).

**In other words:** Top K = keep a min-heap of size K; if a new element is larger than the heap minimum, replace it. Merge K sorted = heap holds the head of each list; pop min, push the next element from that list. Trie = same prefix shares a branch; find prefix = walk from root.`,
          explanation: `Heap keeps min/max at root; after extract, we heapify (bubble down). Top K: keep min-heap of size K; if new element > min, pop min and push new; at end heap contains K largest. Trie compresses common prefixes; good for "all keys with prefix X".`,
          application: `Heap: Kth largest, merge K lists, task scheduler (by frequency). Trie: autocomplete, word search. In CP: segment tree for range sum/min and point updates.`,
          howToImplement: `(1) Min-heap top K: heap = []; for x in arr: if len(heap) < K: heappush(heap, x); else if x > heap[0]: heapreplace(heap, x). (2) Trie: node has children dict; insert: for char in word, go to child or create; set node.is_end = True. (3) Prefix search: traverse to prefix node; DFS to collect all is_end below.`,
          logicAndCode: `Heap is stored as array; parent at i has children at 2i+1, 2i+2. Heapify: compare with children, swap with smaller (min-heap), repeat. Trie: each node = map char → next node.`,
          example: `Problem: Kth Largest Element in Stream (LeetCode #703).

Solution: Keep min-heap of size K. On add: if heap size < K, push; else if val > heap[0], pop then push val. Return heap[0] for getKthLargest. Time O(log K) per add, space O(K). **Why:** Heap always holds the K largest elements so far; minimum in heap = K-th largest.`,
          additionalInfo: `**Takeaway:** Top K → min-heap of size K; merge K sorted → heap holds head of each list. Trie → prefix/autocomplete O(m). LeetCode: [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/), [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/), [Kth Largest in Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/), [Implement Trie](https://leetcode.com/problems/implement-trie-prefix-tree/). Interview: state "heap for top K" or "trie for prefix"; give complexity.`,
        },
        codeExample: `// Python - top K with heapq (min-heap of size K)
import heapq
def top_k(arr, k):
  heap = arr[:k]
  heapq.heapify(heap)
  for x in arr[k:]:
    if x > heap[0]:
      heapq.heapreplace(heap, x)
  return heap[0]  # Kth largest

// Trie - insert and search (conceptual)
class TrieNode:
  children = {}  # char -> TrieNode
  is_end = False
def insert(root, word):
  node = root
  for c in word:
    node = node.children.setdefault(c, TrieNode())
  node.is_end = True
`,
        codeLanguage: "python",
      },
    ],
  },
  {
    title: "Computer Networks",
    slug: "computer-networks",
    description:
      "HTTP, TCP/IP basics, REST, and networking concepts for backend and system design.",
    order: 4,
    published: true,
    topics: [
      {
        id: "http-and-tcp-basics",
        title: "HTTP & TCP Basics",
        description: "Protocols, status codes, and how the web works.",
        order: 0,
        imageKey: "networks",
        contentBlocks: {
          learningFlow: [
            "Read the OSI layers (focus: application HTTP, transport TCP) and what happens when you type a URL.",
            "Understand HTTP methods (GET, POST, PUT, DELETE) and status codes (200, 201, 400, 404, 500).",
            "Try a request with curl or fetch; inspect headers and body.",
            "Explain the difference between TCP (reliable) and UDP (best-effort).",
          ],
          learningFlowIntro: `**Your first step:** Open DevTools → Network, load a page, and inspect one request: method, URL, status code, and response headers. Then read sections 1–2.

**Prerequisites:** Basic idea of "browser requests a URL and gets a response."

**By the end of this topic you will:** List what happens when you type a URL and press Enter, use HTTP methods and status codes correctly in REST, and distinguish TCP from UDP.`,
          material: `**HTTP:** Application-layer protocol; request (method, URL, headers, body) and response (status, headers, body). **Methods:** GET (idempotent), POST (create), PUT (replace), DELETE. **Status:** 2xx success, 3xx redirect, 4xx client error, 5xx server error.

**TCP:** Connection-oriented, reliable, ordered; three-way handshake. **UDP:** No connection, no guarantee; used for streaming, DNS. **DNS:** Resolves domain to IP; cached at OS and resolver.

**In other words:** Type URL + Enter = DNS (name → IP) → TCP (reliable connection) → TLS (encryption) → HTTP request → server sends response → browser renders. REST uses HTTP method + status code for resource and action.`,
          explanation: `When you type a URL: DNS lookup → TCP connection → HTTP request → server response → render. HTTPS adds TLS (encryption). REST uses HTTP methods and status codes to represent resources and actions.`,
          application: `Use HTTP semantics in REST APIs. Understand TCP for "why connection matters" (latency, keep-alive). DNS for caching and CDN. In interviews: explain "what happens when you hit Enter".`,
          howToImplement: `(1) REST: GET /users (list), GET /users/:id (one), POST /users (create), PUT /users/:id (update), DELETE /users/:id (delete).
(2) Return correct status: 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error.
(3) Headers: Content-Type (application/json), Authorization (Bearer token).`,
          logicAndCode: `HTTP is stateless: each request has everything needed. TCP ensures bytes arrive in order and retransmits on loss. TLS sits on top of TCP and encrypts the payload.`,
          example: `Problem: "What happens when you type https://google.com and press Enter?"

Solution: (1) DNS lookup: google.com → IP. (2) TCP 3-way handshake to IP:443. (3) TLS handshake. (4) HTTP GET / over TLS. (5) Server responds with HTML. (6) Browser parses, loads assets (CSS, JS), renders. **Why:** TCP ensures data arrives in order; TLS encrypts; HTTP defines request/response.`,
          additionalInfo: `**Takeaway:** URL → DNS → TCP → TLS → HTTP → response. REST: GET/POST/PUT/DELETE + status 2xx/4xx/5xx. Idempotent: GET, PUT, DELETE. Safe: GET. Status codes: 200, 201, 204, 301, 302, 400, 401, 403, 404, 500. **Curriculum:** Prerequisite for Express & REST and REST API Design.`,
        },
        codeExample: `// HTTP request (conceptual)
// GET /api/users/1
// Host: api.example.com
// Accept: application/json

// Response
// 200 OK
// Content-Type: application/json
// {"id":1,"name":"Alice"}

// curl example
// curl -X GET https://api.example.com/users/1
// curl -X POST -H "Content-Type: application/json" -d '{"name":"Bob"}' https://api.example.com/users
`,
        codeLanguage: "text",
      },
    ],
  },
  {
    title: "OS & Concurrency",
    slug: "operating-systems-concurrency",
    description:
      "Processes, threads, concurrency, and synchronization for system design and backend.",
    order: 5,
    published: true,
    topics: [
      {
        id: "processes-threads-concurrency",
        title: "Processes, Threads & Concurrency",
        description:
          "Difference between process and thread; race conditions and locks.",
        order: 0,
        imageKey: "complexity",
        contentBlocks: {
          learningFlow: [
            "Read the difference: process (own memory space) vs thread (shared memory within process).",
            "Understand race condition: two threads updating same variable without synchronization.",
            "Learn mutex/lock: only one thread holds lock; others wait.",
            "Try a simple producer-consumer or counter with threads (e.g. in Python or Java).",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. If you have Python or Java, write a program where two threads increment a shared counter 1000 times each without a lock (wrong total), then add a lock (correct 2000).

**Prerequisites:** Basic programming; idea of "multiple things running" (async or threads). Node.js/Event Loop topic helps for contrast (single-threaded + async).

**By the end of this topic you will:** Explain process vs thread, race condition and deadlock, and when to use a mutex or avoid shared state.`,
          material: `**Process:** Independent program in execution; own memory space; created by fork/spawn; heavy (separate memory). **Thread:** Lightweight unit inside a process; shares memory with other threads; cheaper to create.

**Race condition:** Result depends on order of execution; occurs when two+ threads read/write shared mutable state without synchronization. **Mutex (lock):** Only one thread holds the lock; others block until it is released; protects critical section. **Deadlock:** Two or more threads each hold a lock and wait for the other's lock → no progress. **Avoiding deadlock:** Lock ordering (always acquire A then B); timeouts; or design without circular wait.

**Concurrency vs parallelism:** Concurrency = managing many tasks (e.g. async I/O); parallelism = executing at the same time (multiple cores).

**In other words:** Process = program with its own memory space; thread = unit inside a process that shares memory. Race condition = two threads update the same variable without synchronization → non-deterministic result. Mutex = only one thread may enter the critical section; others wait. Deadlock = A holds L1 waiting for L2, B holds L2 waiting for L1 → no progress.`,
          explanation: `Processes are isolated (crash in one doesn't kill others) but slower to create and communicate (IPC). Threads share memory so they need synchronization (locks, atomics) to avoid races. In Node.js, one thread runs JS; I/O is delegated. In Go/Java, many goroutines/threads can run concurrently.`,
          application: `Use when designing multi-threaded servers, job queues, or discussing scalability. "Horizontal scaling" often means more processes (or containers); "thread pool" means threads within one process.`,
          howToImplement: `(1) Identify shared state that multiple threads write.
(2) Protect with mutex: lock before read/write, unlock after.
(3) Avoid deadlock: always acquire locks in same order (e.g. A then B).
(4) Prefer higher-level constructs: queues, atomics, or single-threaded + async (Node).`,
          logicAndCode: `Lock ensures mutual exclusion: only one thread in critical section. If thread A holds L1 and wants L2, and thread B holds L2 and wants L1 → deadlock. Fix: both acquire L1 then L2.`,
          example: `Problem: Thread-safe counter. Multiple threads increment; final count must equal total increments.

Solution: Use a mutex. Before count++, lock(mutex); after count++, unlock(mutex). Or use atomic increment if available (e.g. atomic_int in C++, AtomicInteger in Java). **Why:** Without lock, two threads can read the same old value, increment, write — one overwrites; total is wrong.`,
          additionalInfo: `**Takeaway:** Process = separate memory; thread = shared memory, needs synchronization. Race condition → mutex or atomic. Deadlock → lock ordering (always A then B). Node.js: single JS thread + async I/O. Concurrency vs parallelism: concurrency = many tasks; parallelism = many cores. **Curriculum:** Useful before System Design (scaling, workers, thread pools).`,
        },
        codeExample: `// Pseudocode: mutex for counter
// shared: count = 0, mutex

// Thread 1:
// lock(mutex); count++; unlock(mutex);

// Thread 2:
// lock(mutex); count++; unlock(mutex);

// Result: count = 2 (correct). Without lock, count could be 1 (race).
`,
        codeLanguage: "text",
      },
    ],
  },
  {
    title: "Security",
    slug: "security-testing",
    description:
      "Authentication, authorization, common vulnerabilities, and secure coding basics.",
    order: 11,
    published: true,
    topics: [
      {
        id: "security-basics",
        title: "Security Basics",
        description:
          "Auth, HTTPS, and common vulnerabilities (XSS, CSRF, injection).",
        order: 0,
        imageKey: "security",
        contentBlocks: {
          learningFlow: [
            "Read the difference between authentication (who are you?) and authorization (what can you do?).",
            "Understand HTTPS: TLS encrypts data in transit; always use for login and sensitive data.",
            "Learn XSS (script injection in page) and SQL injection (query built from input); how to prevent.",
            "Apply: hash passwords (bcrypt), use parameterized queries, sanitize output.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Then in any project that has a DB, find one query that uses string concatenation with user input and rewrite it as a parameterized query.

**Prerequisites:** Node.js (Express & REST) or Backend Development (routes, APIs); Database & SQL (so you can write parameterized queries). Frontend (e.g. React) helps for XSS context.

**By the end of this topic you will:** Explain auth vs authz, why HTTPS and password hashing matter, and how to prevent XSS and SQL injection in code.`,
          material: `**Authentication (authn):** Verifying identity (who you are) — e.g. password, OAuth. **Authorization (authz):** Checking permissions (what you are allowed to do) — e.g. role-based access. **HTTPS:** TLS encrypts client–server traffic; prevents eavesdropping and tampering.

**XSS (Cross-Site Scripting):** Attacker injects script into the page (e.g. via user input); browser runs that script. Prevent: escape output (e.g. < → &lt;) and Content-Security-Policy. **SQL injection:** User input is used as part of the query string; attacker can change the query. Prevent: **parameterized queries** — send values as separate parameters, not concatenated into the SQL string; DB driver handles escaping. **Password:** Store as hash (bcrypt, argon2); never plain text. **CSRF (Cross-Site Request Forgery):** Fake request from another site using victim's cookie; prevent: SameSite cookie or CSRF token.`,
          explanation: `Auth is "login"; authorization is "can this user do X?". Hashing is one-way (can't get password from hash); use salt to avoid rainbow tables. Parameterized queries send input as data, not as part of SQL string.`,
          application: `Use in every web app: HTTPS in production, hash passwords, parameterized queries, validate and sanitize input, set secure headers (e.g. helmet in Express).`,
          howToImplement: `(1) Passwords: hash with bcrypt (cost factor 10–12); compare with bcrypt.compare(plain, hash).
(2) SQL: use parameterized queries — db.query("SELECT * FROM users WHERE id = ?", [id]).
(3) XSS: escape user content in HTML; or use framework that escapes by default (React).
(4) HTTPS: use TLS certificate; redirect HTTP to HTTPS.`,
          logicAndCode: `bcrypt hashes with salt; same password → different hashes each time; verify with compare. Parameterized query: DB driver treats input as data, not SQL. Escaping: convert < to &lt; so browser doesn't run script.`,
          example: `Problem: Prevent SQL injection when searching users by name.

Solution: Never concatenate: "SELECT * FROM users WHERE name = '" + input + "'". Use parameterized: query("SELECT * FROM users WHERE name = ?", [input]). Driver escapes input.`,
          additionalInfo: `**Important:** Never concatenate user input into SQL — always use parameterized queries. OWASP Top 10: injection, broken auth, XSS, broken access control, security misconfiguration, etc. Interview: explain auth vs authz, how you'd secure an API, what HTTPS does.`,
        },
        codeExample: `// Password hashing (Node.js - bcrypt)
// const hash = await bcrypt.hash(password, 10);
// const ok = await bcrypt.compare(plainPassword, hash);

// Parameterized query (avoid SQL injection)
// db.query('SELECT * FROM users WHERE email = ?', [email]);

// Never: db.query('SELECT * FROM users WHERE email = "' + email + '"');
`,
        codeLanguage: "text",
      },
    ],
  },
  {
    title: "Software Design Principles",
    slug: "software-design",
    description:
      "OOP fundamentals, SOLID, DRY, KISS, design patterns, and clean code.",
    order: 7,
    published: true,
    topics: [
      {
        id: "oop-fundamentals",
        title: "OOP Fundamentals",
        description:
          "Encapsulation, inheritance, polymorphism, abstraction; class vs object.",
        order: 0,
        imageKey: "software",
        contentBlocks: {
          learningFlow: [
            "Read the four pillars: encapsulation (hide data, expose methods), inheritance (reuse via is-a), polymorphism (same interface, different behavior), abstraction (hide complexity).",
            "Write a small class with private fields and public methods; then a subclass that overrides a method.",
            "Identify polymorphism in your codebase (e.g. different implementations of the same interface).",
            "Explain when to use composition (has-a) vs inheritance (is-a).",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. In your language, define a class (e.g. \`User\`) with a constructor, private fields, and public getters/setters. Then create a subclass (e.g. \`Admin extends User\`) that overrides one method.

**Prerequisites:** Basic programming (variables, functions). Any language with classes (Java, C#, TypeScript, Python, C++).

**By the end of this topic you will:** Define encapsulation, inheritance, polymorphism, and abstraction with examples; write a class and subclass; choose composition vs inheritance.`,
          material: `**Class vs Object:** Class = blueprint; object = instance. **Encapsulation:** Bundle data and methods; hide internal state (private/protected); expose only what callers need (public API). **Inheritance:** Subclass extends superclass; reuse code; override methods.

**Polymorphism:** Same interface (method name), different behavior (subclass implementation); caller depends on interface, not concrete type. **Abstraction:** Hide implementation details behind a simple interface (e.g. \`List\` abstracts array vs linked list). **Composition vs Inheritance:** Prefer composition (has-a) when behavior can be combined; use inheritance (is-a) for true subtype and Liskov substitution. **Constructor:** Initialize object state; can call super() in subclass.

**In other words:** Encapsulation = hide details, expose API. Polymorphism = one interface, many implementations (caller doesn't care about concrete type). Composition over inheritance = "has-a" is often more flexible than "is-a".`,
          explanation: `Encapsulation reduces coupling and allows changing internals without breaking callers. Polymorphism lets you add new types without changing existing code (open/closed). Inheritance can lead to fragile base classes; composition is often more flexible.`,
          application: `Use encapsulation in every class (private fields, public API). Use inheritance for clear is-a (e.g. \`Admin\` is a \`User\`). Use polymorphism when you have multiple implementations (e.g. \`PaymentGateway\`: Stripe, PayPal). Prefer composition for "has a" (e.g. \`Car\` has an \`Engine\`).`,
          howToImplement: `(1) Class: define fields (private), constructor, and methods (public for API, private for helpers).
(2) Inheritance: class Child extends Parent { constructor() { super(); } override method() { ... } }
(3) Polymorphism: declare variable as interface/abstract type; assign concrete implementation; call method (runtime picks implementation).
(4) Composition: class A { private b: B; constructor(b: B) { this.b = b; } }`,
          logicAndCode: `Private fields are only accessible inside the class; getters/setters can validate or compute. Overriding: subclass method is called when instance is subclass type. Composition: A holds reference to B; A delegates to B.`,
          example: `Problem: Model a shape hierarchy. Shape has area(); Circle and Rectangle extend Shape and implement area() differently.

Solution: abstract class Shape { abstract area(): number; } class Circle extends Shape { constructor(private r: number) { super(); } area() { return Math.PI * this.r ** 2; } } class Rectangle extends Shape { constructor(private w: number, private h: number) { super(); } area() { return this.w * this.h; } } Polymorphism: (s: Shape) => s.area() works for Circle and Rectangle. **Why:** Caller only calls area(); runtime picks implementation based on object type.`,
          additionalInfo: `**Takeaway:** Four pillars: encapsulation (hide, expose API), inheritance (reuse), polymorphism (one interface many implementations), abstraction (hide complexity). Composition over inheritance for flexibility. In interviews: define the four pillars and give a one-line example each. Know override vs overload. **Curriculum:** Take before or in parallel with React (components) and Node/Backend (API design) for cleaner structure.`,
        },
        codeExample: `// Encapsulation: private fields, public API
class BankAccount {
  private balance: number = 0;
  deposit(amount: number) {
    if (amount <= 0) throw new Error("Invalid");
    this.balance += amount;
  }
  getBalance(): number { return this.balance; }
}

// Inheritance & polymorphism
abstract class Shape {
  abstract area(): number;
}
class Circle extends Shape {
  constructor(private r: number) { super(); }
  area() { return Math.PI * this.r * this.r; }
}
// Usage: (s: Shape) => s.area() — polymorphism`,
        codeLanguage: "typescript",
      },
      {
        id: "oop-solid-dry-kiss",
        title: "OOP, SOLID, DRY & KISS",
        description: "SOLID principles, DRY, KISS, and clean code practices.",
        order: 1,
        imageKey: "software",
        contentBlocks: {
          learningFlow: [
            "Read OOP: encapsulation, inheritance, polymorphism, abstraction.",
            "Learn SOLID: Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion.",
            "Apply DRY (Don't Repeat Yourself) and KISS (Keep It Simple, Stupid) in small refactors.",
            "Review one class or module and refactor using these principles.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Then open any small class in your codebase and ask: "Does it have one reason to change?" If it does two things, note how you'd split it (S) or depend on an interface (D).

**Prerequisites:** You have written or read object-oriented code (classes, methods) in any language.

**By the end of this topic you will:** Name and apply SOLID (especially S and D), use DRY and KISS in refactors, and explain dependency inversion with an example.`,
          material: `**OOP:** Encapsulation (bundle data + methods; hide internals). Inheritance (reuse via is-a). Polymorphism (same interface, different behavior). Abstraction (hide complexity behind interface).

**SOLID:** **(S)** Single Responsibility — one class, one reason to change. **(O)** Open/Closed — open for extension (new classes), closed for modification (don't change existing). **(L)** Liskov — subtype must be substitutable for base without breaking. **(I)** Interface Segregation — many small interfaces better than one fat interface. **(D)** Dependency Inversion — depend on abstraction (interface), not concrete (class).

**DRY:** Every piece of knowledge in one place. **KISS:** Simple is better than clever. **YAGNI:** You Aren't Gonna Need It — don't build ahead.

**In other words:** S = one class one job. D = high-level module doesn't import low-level; both depend on interface; inject implementation (dependency injection). DRY = don't copy-paste logic; KISS = don't over-engineer.`,
          explanation: `SOLID reduces coupling and makes code testable and changeable. DRY avoids bugs from updating in multiple places. KISS keeps code readable. Dependency injection (D) lets you swap implementations and test with mocks.`,
          application: `Use in every codebase: small classes (S), extend with new types not by editing old (O), design interfaces so callers don't depend on details (D). Refactor duplicated logic into one function or module (DRY).`,
          howToImplement: `(1) Extract small classes; name by responsibility. (2) Depend on interfaces/abstract classes; inject concrete in main or tests. (3) Replace copy-paste with shared function or component. (4) Simplify: remove unused code, split long functions.`,
          logicAndCode: `Single Responsibility: one class = one job. Dependency Inversion: high-level module imports interface; low-level implements it; inject at runtime. DRY: if you change logic in two places, extract to one.`,
          example: `Problem: Payment module has validation, API call, and email logic in one class.

Solution: Split into Validator, PaymentGateway, and Notifier; PaymentService depends on their interfaces; inject implementations. Each class has one reason to change. **Why:** S = each can be changed/tested independently; D = can swap gateway (Stripe/PayPal) without changing PaymentService.`,
          additionalInfo: `**Takeaway:** S = one class one responsibility; D = depend on interface, inject concrete. Refactor duplication (DRY) and simplify (KISS). Books: Clean Code (Martin), Design Patterns (GoF). Interview: explain S and D with example; when you refactored for SOLID or DRY.`,
        },
        codeExample: `// Dependency Inversion: depend on abstraction
interface PaymentGateway {
  charge(amount: number): Promise<Result>;
}
class StripeGateway implements PaymentGateway { ... }
class PaymentService {
  constructor(private gateway: PaymentGateway) {}
  async pay(amount: number) {
    return this.gateway.charge(amount);
  }
}
// Inject in main: new PaymentService(new StripeGateway())
`,
        codeLanguage: "typescript",
      },
      {
        id: "design-patterns",
        title: "Design Patterns: Creational, Structural, Behavioral",
        description:
          "Singleton, Factory, Observer, Strategy; when to use and code examples.",
        order: 2,
        imageKey: "software",
        contentBlocks: {
          learningFlow: [
            "Read creational: Singleton (one instance), Factory (create without exposing constructor).",
            "Read behavioral: Observer (notify subscribers), Strategy (interchangeable algorithm).",
            "Implement one pattern in a small example (e.g. Factory for different payment types).",
            "Identify a pattern in an existing codebase (e.g. Observer in event systems).",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Implement a simple Factory: a function that returns an object based on a type parameter (e.g. createLogger('file') vs createLogger('console')). Then read Observer: one subject, many observers; when subject changes, notify all.

**Prerequisites:** OOP Fundamentals (classes, interfaces). SOLID helps (depend on abstractions).

**By the end of this topic you will:** Name and apply Singleton, Factory, Observer, Strategy; know when each fits; give a one-line use case in interviews.`,
          material: `**Creational:** **Singleton** = only one global instance (e.g. DB connection, config). **Factory** = create objects without calling constructor directly; creation logic centralized (e.g. createUser(type) returns Admin or Customer).

**Structural:** **Adapter** = wrap an incompatible interface to match what callers expect. **Decorator** = add behavior by wrapping (e.g. logging around a service). **Behavioral:** **Observer** = subject notifies list of observers on change; decouples publisher and subscribers (events, reactive UI). **Strategy** = interchangeable algorithm (e.g. SortStrategy: QuickSort, MergeSort); inject at runtime.

**When to use:** Singleton for truly one instance; Factory when creation is complex or type-dependent; Observer for event-driven; Strategy when you have multiple algorithms. **Interview:** Name the pattern, one-sentence use case, short code sketch.

**In other words:** Pattern = common solution to recurring design problems. Singleton = one instance; Factory = hide how objects are created; Observer = publish-subscribe; Strategy = swap algorithm without changing the client.`,
          explanation: `Patterns are common solutions to recurring design problems. Singleton ensures one instance (careful with testing). Factory hides creation and supports polymorphism. Observer enables loose coupling (publish-subscribe). Strategy supports open/closed (add new algorithm without changing client).`,
          application: `Singleton: config, connection pool. Factory: create different handlers by type. Observer: UI events, WebSocket messages, state changes. Strategy: sorting, compression, validation rules. Often asked in system design or OOD interviews.`,
          howToImplement: `(1) Singleton: private constructor, static getInstance() returns same instance.
(2) Factory: function create(type) { switch(type) { case 'A': return new ImplA(); case 'B': return new ImplB(); } }
(3) Observer: subject has addObserver(o), removeObserver(o), notify(); observers have update(data). On change, subject.notify().
(4) Strategy: interface Strategy { execute(); } class Client { constructor(private s: Strategy) {} setStrategy(s) { this.s = s; } }`,
          logicAndCode: `Singleton: store instance in static field; create once in getInstance(). Observer: subject holds list of observers; notify() calls each observer.update(). Strategy: client holds reference to strategy; delegates call to strategy.execute().`,
          example: `Problem: Multiple payment methods (card, PayPal); client should not know creation details.

Solution: PaymentFactory.create('card', params) returns CardPayment; PaymentFactory.create('paypal', params) returns PayPalPayment. Both implement Payment interface. Client uses factory and calls pay() on result. **Why:** Client doesn't know concrete class; add new payment method = add class + case in factory, without changing client (Open/Closed).`,
          additionalInfo: `**Takeaway:** Singleton = one instance; Factory = centralize creation, client uses interface; Observer = subject → observers; Strategy = inject algorithm. Use pattern when the problem clearly fits; don't over-engineer. GoF book: 23 patterns. For interviews focus on: Singleton, Factory, Observer, Strategy, Decorator. Clean Code and Refactoring (Martin) show when to apply.`,
        },
        codeExample: `// Singleton
class Config {
  private static instance: Config;
  private constructor() {}
  static getInstance(): Config {
    if (!Config.instance) Config.instance = new Config();
    return Config.instance;
  }
}

// Strategy
interface SortStrategy {
  sort(arr: number[]): number[];
}
class QuickSort implements SortStrategy { sort(arr) { /* ... */ return arr; } }
class Client {
  constructor(private strategy: SortStrategy) {}
  setStrategy(s: SortStrategy) { this.strategy = s; }
  sort(arr: number[]) { return this.strategy.sort(arr); }
}`,
        codeLanguage: "typescript",
      },
    ],
  },
  {
    title: "English for IELTS 8",
    slug: "english-learning",
    description:
      "Grammar, vocabulary, listening, reading, writing, speaking — when to use what, accurate implementation, then IELTS band 8.",
    order: 12,
    published: true,
    topics: [
      {
        id: "grammar-for-accuracy",
        title: "Grammar for Accuracy: When to Use What",
        description:
          "Tenses (present perfect vs past simple), articles (a/an/the), modals, conditionals — clear rules and examples in context.",
        order: 0,
        imageKey: "english",
        contentBlocks: {
          learningFlow: [
            "Read the rules for Present Perfect vs Past Simple: Perfect = result now / experience / unfinished period; Past = clear past time, completed.",
            "Read articles: a/an (first mention, singular); the (already known / unique); no article (plural/uncountable in general).",
            "Modals: can (ability); must (obligation); should (advice); may/might (possibility); would (conditional/polite).",
            "Conditionals: If + present → will (real); If + past → would (unreal now); If + had done → would have (unreal past). Practise: write 3 sentences in context (when to use which).",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. Write two sentences: (1) I have finished the report (present perfect — result now). (2) I finished the report yesterday (past simple — clear time). Understand the difference.

**Prerequisites:** Basic English (subject, verb, object).

**By the end of this topic you will:** Choose the right tense and article from context; use modals and conditionals accurately.`,
          material: `**Present Perfect vs Past Simple:** Perfect: have/has + past participle. Use when: result still relevant (I have lost my key), life experience (I have been to Japan), unfinished period (this week). Past: verb+ed/irregular. Use when: specific past time (yesterday, in 2019, when I was young). **Articles:** a/an = singular, first mention, non-specific. the = already known or unique (the sun, the report we discussed). No article: plural/uncountable in general (water, people, life). **Modals:** can = ability/permission; must = obligation (strong); should = advice; may/might = possibility; would = conditional/polite request. **Conditionals:** Type 1 (real): If it rains, I will stay. Type 2 (unreal now): If I had time, I would go. Type 3 (unreal past): If I had known, I would have told you. **Accuracy:** Context decides — finished time or not? Specific or general?`,
          explanation: `Accurate grammar means the reader or listener is not confused. Present perfect links the past to now; past simple cuts it off. The article the signals we already know which one. Modals express level of certainty or obligation.`,
          application: `Writing: choose tense consistently (past narrative = past; general fact = present). Speaking: I have been working here for 2 years (still); I worked there in 2020 (no longer). Email: Could you send... (polite); You must submit by Friday (formal).`,
          howToImplement: `(1) Before writing/speaking: ask "finished time?" → Yes: past simple. No / result now: present perfect. (2) Noun: first mention / general → a/an or no article; already clear which → the. (3) Advice → should; obligation → must; possibility → may/might. (4) Conditional: real (can happen) → present + will; unreal → past + would.`,
          logicAndCode: `Decision: Specific past time word (yesterday, last week) → past simple. None / this week / so far → consider present perfect. Article: use the only if the listener knows the referent.`,
          example: `Fill in: I ___ (see) that film last year. Answer: saw (past simple — last year = clear time). She ___ (work) here since 2020. Answer: has worked (present perfect — since = from then until now). We need ___ decision. Answer: a (singular, first mention, not the).`,
          additionalInfo: `Resources: English Grammar in Use (Murphy), Grammarly. When in doubt: present simple for facts; past simple for stories. IELTS: variety of tenses and conditionals raises grammatical range score. **Curriculum:** Separate language track; take in parallel with technical sections if targeting IELTS or professional English.`,
        },
        codeExample: `// When Present Perfect vs Past Simple
// Present Perfect: result/experience/unfinished period
I have finished.  She has been to Tokyo.  We have had three meetings this week.

// Past Simple: clear past time
I finished yesterday.  She went to Tokyo in 2022.  We had a meeting last Monday.

// Articles: a/an vs the
I need a laptop. (any)  The laptop you gave me is fast. (already known)
Life is short. (general, no article)

// Conditional — choose from context
If you submit today, we will review it. (real)
If I had more time, I would help. (unreal now)
If I had known, I would have called. (unreal past)
`,
        codeLanguage: "text",
      },
      {
        id: "vocabulary-and-collocations",
        title: "Vocabulary & Collocations: The Right Word at the Right Time",
        description:
          "Do vs make, collocations (verb+noun), formal vs informal, synonyms that differ by context.",
        order: 1,
        imageKey: "english",
        contentBlocks: {
          learningFlow: [
            "Learn do vs make patterns: do (task, job, homework, research, your best); make (decision, mistake, plan, money, sense, a difference).",
            "Learn common collocations: take a break, give feedback, reach a conclusion, draw attention, play a role.",
            "Register: formal (commence, purchase, assist) vs informal (start, buy, help); choose by context (essay vs chat).",
            "Synonyms in context: big/large (large for size), great (great idea), major (major problem); use in full sentences.",
          ],
          learningFlowIntro: `**Your first step:** Write 5 sentences: do the homework, make a decision, do research, make a mistake, make sense. Read sections 1–2 and add 5 more collocations (take, give, reach, draw, play).

**Prerequisites:** Basic vocabulary (common verbs, nouns).

**By the end of this topic you will:** Choose do/make and collocations correctly; distinguish formal/informal and context-appropriate synonyms.`,
          material: `**Do vs Make:** Do = activity/task (do homework, do your job, do research, do exercise). Make = create/produce (make a decision, make a mistake, make money, make sense, make a plan, make progress). **Collocations:** Verb+noun often used together: take a break/photo; give feedback/advice; reach a conclusion/agreement; draw attention/conclusion; play a role/part; have an impact/effect; meet a deadline/requirement. **Formal vs informal:** Formal (academic/business writing): commence, purchase, assist, inquire, facilitate. Informal (conversation): start, buy, help, ask. **Synonyms in context:** Big (general); large (size/number); great (excellent); major (important); significant (statistics/research). **Accuracy:** The right word = what natives commonly use in that context; learn from example sentences, not word lists only.`,
          explanation: `Collocation = words that commonly go together; wrong choice (e.g. make homework) sounds odd. Formal/informal affects tone; IELTS essay = semi-formal. Synonyms are not always interchangeable (large problem vs major problem).`,
          application: `Writing Task 2: make a difference, have a significant impact, reach a conclusion. Speaking: do my best, make a point. Work email: please advise (formal) vs let me know (informal). Avoid near-misses — check a corpus or examples.`,
          howToImplement: `(1) When writing: unsure do/make? Remember: create/produce → make; perform task → do. (2) Learn by phrase: write take a break not just take. (3) Read example sentences for each new word. (4) Essay: avoid slang; use assist, demonstrate, significant.`,
          logicAndCode: `Do + activity/task. Make + result/creation. Collocation: store in Anki/flashcards with full sentence. Test: can you swap a synonym without changing meaning? If not, it is a fixed collocation.`,
          example: `We need to ___ a decision. Answer: make. I have to ___ my homework. Answer: do. Formal: The study demonstrates that... (not shows). Considerable progress (not big progress) — fits academic style.`,
          additionalInfo: `Resources: Oxford Collocations Dictionary, AWL (Academic Word List), Lextutor. IELTS: lexical resource is scored on variety + accuracy; correct collocation beats a difficult word used wrongly.`,
        },
        codeExample: `// Do vs Make — choose from context
do: homework, research, your best, the shopping, a favour
make: a decision, a mistake, money, sense, progress, a difference

// Collocations — learn as phrases
take a break / take responsibility
give feedback / give a presentation
reach a conclusion / reach an agreement
have an impact / have difficulty (in) -ing

// Formal (essay) vs Informal (speaking)
conduct research (formal) / do research (ok)
obtain information / get information
demonstrate / show
`,
        codeLanguage: "text",
      },
      {
        id: "listening-and-pronunciation",
        title: "Listening & Pronunciation: Understand and Be Understood",
        description:
          "Listening strategy (predict, keywords), pronunciation (stress, linking) for quick comprehension and accurate answers.",
        order: 2,
        imageKey: "english",
        contentBlocks: {
          learningFlow: [
            "Listening: before audio — read questions, underline keywords, predict answer type (number? name? date?).",
            "While listening: focus on paraphrase (answers rarely word-for-word); spelling matters (names, places).",
            "Pronunciation: word stress (PHO-to-graph vs pho-TO-gra-phy); sentence stress (content words vs function words).",
            "Linking: consonant + vowel (turn off → tur_noff); practise with shadowing (follow audio for 1–2 minutes).",
          ],
          learningFlowIntro: `**Your first step:** Play a 1-minute podcast or news clip. Before playing: predict the topic from the title. After: write 3 points you caught. Then read sections 1–2.

**Prerequisites:** Can read English text; basic sound awareness.

**By the end of this topic you will:** Have a listening strategy (predict, keywords) and basics of pronunciation (stress, linking) to understand quickly and be understood.`,
          material: `**Listening strategy:** Predict — from the question guess answer type (number, name, date). Underline keywords — what you must hear. Paraphrase — answers often use synonyms (e.g. expensive in audio, high cost in question). Spelling — names, places, terms may be spelled out; write correctly. **Pronunciation:** Word stress: one main stress per word (e.g. PHOtograph, phoTOgraphy). Sentence stress: content words (noun, verb, adj) stressed; function words (the, a, of) weak. Linking: consonant end + vowel start → join (an apple → a_napple). **Intonation:** Yes/no questions rise at end; statements fall. **Practice:** Shadowing = listen and speak almost together; record yourself and compare.`,
          explanation: `Prediction reduces cognitive load — you are listening for a specific type of info. Paraphrase is the IELTS rule; answers are not always word-for-word. Stress and linking make your speech more natural and easier to follow.`,
          application: `IELTS Listening: read questions first; during breaks read the next set. Meetings/podcasts: note keywords; fill in with paraphrase. Presentations: stress key words; link words for fluency.`,
          howToImplement: `(1) Every listening: 30 sec read questions, underline, guess number/name/date. (2) While listening: do not write long; keep it short, spell correctly. (3) Pronunciation: pick 5 difficult words, check stress in dictionary (e.g. Cambridge); say 10x. (4) Shadowing: 1 min per day; build up to 2 min.`,
          logicAndCode: `Flow: Predict → Listen for paraphrase → Write short → Check spelling. Pronunciation: word stress first, then sentence; linking last. Record yourself once a week to track progress.`,
          example: `Question: The project will be completed by ___. Predict: date or month. Audio: We are aiming to finish by the end of March. Answer: (end of) March. Pronunciation: photograph → PHO-to-graph (first syllable); I want to go → linking want to → wanna (informal) or want_to.`,
          additionalInfo: `Resources: Cambridge Dictionary (pronunciation), BBC Learning English, IELTS Liz listening. Record Part 2 Speaking and check: is stress clear? Are words linked?`,
        },
        codeExample: `// Listening — before audio
// 1. Read questions
// 2. Underline: What, When, Who, number?
// 3. Predict: date / name / number / adjective

// Pronunciation — word stress (CAPS = stress)
PHOtograph    phoTOgraphy    photoGRAphic
eCONomy       eCO-nomic

// Linking (consonant + vowel)
turn off → tur_noff
an hour → a_nour
`,
        codeLanguage: "text",
      },
      {
        id: "reading-for-understanding",
        title: "Reading for Understanding: Fast and Accurate Strategies",
        description:
          "Skimming, scanning, inference; question types and when to read fast vs in depth.",
        order: 3,
        imageKey: "english",
        contentBlocks: {
          learningFlow: [
            "Skimming: read quickly for main idea — title, first and last paragraph, first sentence of each paragraph; 1–2 min per text.",
            "Scanning: look for numbers, names, dates, keywords; move eyes quickly, stop only at relevant words.",
            "Inference: answer not stated literally; infer from context (tone, cause-effect).",
            "Question types: headings → match paragraph idea; T/F/NG → note False vs Not Given; summary → fill gap from text (paraphrase).",
          ],
          learningFlowIntro: `**Your first step:** Take one 300-word article. Skim for 1 min: title + first sentence of each paragraph. Write one sentence: What is this article about? Then read sections 1–2.

**Prerequisites:** Basic vocabulary; can read full sentences.

**By the end of this topic you will:** Skim for gist, scan for detail, and answer inference questions accurately.`,
          material: `**Skimming:** Goal = main idea, structure. Read: title, para 1, first sentence of each para, last paragraph. Do not read every word. **Scanning:** Goal = find specific info. Look for numbers, names, years, keywords; move eyes quickly vertically/horizontally. **Inference:** Answer not copy-paste from text; read context — implies, suggests = inference. **True/False/Not Given:** True = matches text. False = contradicts text. Not Given = no info in text (do not guess). **Headings:** Choose heading that covers paragraph idea, not just one sentence. **Summary/Completion:** Fill gap; often paraphrase (wording in question differs from text). **Time:** IELTS Reading ~20 min per passage; skim first, then do questions.`,
          explanation: `Skimming saves time and gives a map of the text. Scanning is efficient for where X is mentioned. Not Given is often wrong — if the text is silent, answer NG. Paraphrase is the rule: answers use synonyms.`,
          application: `IELTS: read questions first for one set, then skim text, then scan for answers. Work: read executive summary (skimming); find numbers in report (scanning).`,
          howToImplement: `(1) Every text: 1–2 min skim (title + first sentence each para). (2) Read questions; identify keywords; scan text for keyword or paraphrase. (3) T/F/NG: find relevant sentence; same = T, opposite = F, no info = NG. (4) Summary: find matching part of text; fill gap with word from text (check grammar).`,
          logicAndCode: `Flow: Skim → Read questions → Scan for each question → Write answer. Do not read the whole text for every question; jump to the relevant part.`,
          example: `Question: The writer suggests that X is... Text: Many believe X could improve productivity. Answer: True (suggests = many believe). Question: The experiment was conducted in ___. Scan for experiment, conducted, year or place; fill gap. Not Given: text only says some studies; question asks most studies — no info → NG.`,
          additionalInfo: `Resources: Cambridge IELTS Reading, IELTS Liz. Time: do not get stuck on one question; skip, return later. Spelling and word form (singular/plural, verb form) must be correct.`,
        },
        codeExample: `// Skimming — read only:
// - Title
// - Para 1 (full or first sentence)
// - First sentence of each middle paragraph
// - Last paragraph

// T/F/NG — decision
// Text agrees with statement → TRUE
// Text says the opposite → FALSE
// Text gives no info → NOT GIVEN (do not infer)

// Summary — fill gap
// 1. Read summary sentence
// 2. Find part of text that paraphrases
// 3. Take word from text; match grammar (singular/plural, tense)
`,
        codeLanguage: "text",
      },
      {
        id: "writing-structure-and-coherence",
        title:
          "Writing: Structure & Coherence — Answer Precisely, Order Clearly",
        description:
          "Paragraph structure, linking words, task response; ready-to-use templates for Task 1 and Task 2.",
        order: 4,
        imageKey: "english",
        contentBlocks: {
          learningFlow: [
            "Task response: read the question twice; identify all parts (e.g. agree/disagree + why + example); answer all of them.",
            "Paragraph structure: intro (paraphrase + thesis); body = topic sentence + 2–3 supporting + example; conclusion = restate + summary.",
            "Linking: add idea (Furthermore, In addition); contrast (However, On the other hand); cause (Therefore, As a result); order (First, Secondly, Finally); conclusion (In conclusion).",
            "Task 1: overview first (main trend); then key features with data; no opinion. Task 2: plan 2–3 min; write to plan.",
          ],
          learningFlowIntro: `**Your first step:** Take one Task 2 prompt. In 2 minutes write on paper: (1) paraphrase of prompt, (2) thesis (agree/disagree/partly), (3) 2 body points + 1 example. Then read sections 1–2.

**Prerequisites:** Basic grammar, sufficient vocabulary.

**By the end of this topic you will:** Have a fixed template for Task 1 and Task 2; know the right linking words; and always answer every part of the question.`,
          material: `**Task response (TR):** Top marks = answer every part of the question; develop with explanation + example; clear position (opinion essay). **Coherence:** One idea per paragraph; logical order; linking words between sentences and paragraphs. **Linking:** Addition: Furthermore, Moreover, In addition. Contrast: However, On the other hand, Although. Cause/effect: Therefore, As a result, Consequently. Order: First, Secondly, Finally. Conclusion: In conclusion, To sum up. **Task 1 structure:** Intro: paraphrase + overview (e.g. The graph shows... Overall, X increased while Y decreased.). Body: 2 paragraphs, each key feature + data. No conclusion required; one sentence is fine. **Task 2 structure:** Intro: paraphrase + thesis. Body 1–2 (or 3): topic sentence + support + example. Conclusion: restate thesis + summarise points. **Word count:** Task 1 min 150; Task 2 min 250; under = score penalty.`,
          explanation: `TR is the first Writing criterion; not answering every part caps your score. Coherence = reader can follow the flow. Right linking (However for contrast, not Furthermore) shows control. Overview in Task 1 is required for a high score.`,
          application: `Every Task 2: checklist have I answered every part? Every paragraph: topic sentence at the start. Every transition: choose the right linking (add vs contrast vs cause). Task 1: always write overview in the intro.`,
          howToImplement: `(1) Read prompt twice; circle keywords; write Parts to answer: 1... 2... 3... (2) Plan: intro thesis; body 1 point A + example; body 2 point B + example. (3) Write; each paragraph starts with topic sentence. (4) Before submit: check TR (all parts?), word count, linking.`,
          logicAndCode: `Intro = paraphrase + thesis. Body = topic sentence + support + example (repeat). Conclusion = restate + summary. Linking: do not overuse (one per paragraph transition is enough). Task 1: overview = 1–2 sentences for main trend.`,
          example: `Prompt: Technology has made life more complicated. To what extent do you agree? Parts: (1) extent agree/disagree, (2) why, (3) example. Intro: While technology has simplified many tasks, it has also introduced complexity. I partly agree because... Body 1: On the one hand, technology has simplified... For example, online banking... Body 2: On the other hand, it has made... For instance, constant notifications... Conclusion: In conclusion, I partly agree; technology both simplifies and complicates...`,
          additionalInfo: `Resources: IELTS Liz Writing, E2 IELTS. Avoid: irrelevant template; too many linkers; no example. Check: singular/plural, tense, articles.`,
        },
        codeExample: `// Task 2 — template
// Intro: Paraphrase + Thesis (e.g. I agree / I partly agree because X and Y)
// Body 1: Topic sentence. Support. For example, ...
// Body 2: Topic sentence. However, / Furthermore, ... Example.
// Conclusion: In conclusion, [restate thesis]. To sum up, [points].

// Task 1 — template
// Intro: The [graph/table] shows ... Overall, [main trend].
// Body 1: [Feature 1]. In 2020, X was ... while Y ...
// Body 2: [Feature 2]. By contrast, ...

// Linking — choose one per transition
// + Furthermore / In addition   - However / On the other hand
// → Therefore / As a result     # First, Secondly, Finally
`,
        codeLanguage: "text",
      },
      {
        id: "speaking-fluency-and-real-use",
        title:
          "Speaking: Fluency & Real Use — Fluent and Right for the Context",
        description:
          "Extend answers, signposting, acceptable fillers; interview, presentation, daily conversation.",
        order: 5,
        imageKey: "english",
        contentBlocks: {
          learningFlow: [
            "Extend: do not answer in one sentence; add reason, example, or comparison. Part 1: 2–3 sentences; Part 3: 2–4 sentences.",
            "Signposting: Well I think / For example / On the other hand / So to sum up — help the listener follow your flow.",
            "Acceptable fillers: Well, Let me see, That is a good question (brief); avoid long eee — a short pause is better.",
            "Context: interview (formal, STAR); presentation (intro, points, conclusion); daily (natural, informal is fine).",
          ],
          learningFlowIntro: `**Your first step:** Record yourself answering What do you do in your free time? Listen: is it only one sentence? Add I like X because... For example, last week I... Record again. Then read sections 1–2.

**Prerequisites:** Can form basic sentences; enough vocabulary.

**By the end of this topic you will:** Extend answers, use signposting, and adapt style (formal vs informal) to context.`,
          material: `**Fluency:** Speak without long pauses; extend = add reason, example, detail. Part 1: 2–3 sentences. Part 2: follow bullet points; 1.5–2 min. Part 3: 2–4 sentences; give opinion + reason + example. **Signposting:** Well, I think... / In my view... / For example... / On the other hand... / So, to sum up... / That is why... **Filler:** Okay, Well, Let me see, That is a good question — use briefly; do not repeat. A 1–2 second pause is better than a long eee. **Context:** Job interview: STAR structure (Situation, Task, Action, Result); formal. Presentation: intro (what I will cover), body (points), conclusion (summary). Daily: natural; I guess, kind of are fine. **Pronunciation:** Stress important words; no need for native accent, but clear. **Coherence:** Logical order; link when you change idea.`,
          explanation: `Extend shows fluency and lexical resource. Signposting helps coherence — examiner sees you control the flow. Short filler is normal; long silence feels less fluent. Context sets the level of formality.`,
          application: `IELTS Part 2: use 1 min prep for outline (2–3 points); when speaking follow outline + signposting. Interview: prepare 2–3 STAR stories. Meeting: I would like to make two points. First... Second... So, in summary...`,
          howToImplement: `(1) Every answer: direct answer + because or for example + one more sentence. (2) Practise: record 5 Part 1 questions; listen; add extend where still short. (3) Memorise 3–5 signposts: Well, For example, On the other hand, So overall. (4) Interview: prepare 2 stories (challenge, success); structure Situation, Task, Action, Result.`,
          logicAndCode: `Answer = Direct answer + Reason/Example + (optional) Contrast or summary. Signpost at the start of a sentence when you change idea. Do not repeat the question at length; answer then develop.`,
          example: `Q: Do you like reading? Bad: Yes, I do. Good: Yes, I do. I mainly read non-fiction, especially about technology, because it helps me at work. For example, last month I read a book about AI and used some ideas in a project. Part 2: I would like to talk about... First of all,... Secondly,... So, overall it was a great experience.`,
          additionalInfo: `Resources: IELTS Liz Speaking, E2. Record yourself once a week; compare with band 8 samples. Interview: practise STAR with a friend or mentor.`,
        },
        codeExample: `// Extend — formula
// Direct answer + Because/For example + One more sentence

// Signposting — use when changing idea
// Well, I think...   For example...   On the other hand...
// So, to sum up...   That is why...

// Part 2 — structure (1 min prep)
// 1. Intro: I would like to talk about...
// 2. First point (bullet 1)
// 3. Second point (bullet 2)
// 4. Third point (bullet 3)
// 5. Conclusion: So, overall...

// STAR (interview)
// Situation → Task → Action → Result
`,
        codeLanguage: "text",
      },
      {
        id: "ielts-8-complete-guide",
        title: "IELTS 8 Complete Guide",
        description:
          "Strategies and practice for Listening, Reading, Writing, Speaking to achieve band 8.",
        order: 6,
        imageKey: "english",
        contentBlocks: {
          learningFlow: [
            "Understand the four sections: Listening (4 parts), Reading (3 passages), Writing (Task 1 + 2), Speaking (3 parts).",
            "Learn band 8 criteria: fluency, coherence, lexical resource, grammatical range, pronunciation (Speaking); task response, coherence, vocabulary, grammar (Writing).",
            "Practice with official materials: do full tests under timed conditions; review answers and band descriptors.",
            "Build vocabulary (academic word list, collocations) and grammar (complex sentences, variety) for Writing and Speaking.",
          ],
          learningFlowIntro: `**Your first step:** Do one full practice test (e.g. Cambridge IELTS) under timed conditions, then read the band descriptors for Writing and Speaking to see what "8" means.

**Prerequisites:** English at roughly B2–C1 (comfortable reading and speaking); the topics above (Grammar, Vocabulary, Listening, Reading, Writing, Speaking) will help you apply skills at the right moment.

**By the end of this topic you will:** Know the structure and timing of each section, what band 8 requires, and how to plan essays and Part 2 answers.`,
          material: `**Listening (40 min):** 4 sections; note completion, matching, MC; predict and underline keywords; check spelling. **Reading (60 min):** 3 long texts; skimming/scanning; headings, T/F/NG, summary; manage time (e.g. 15–20 min per passage). **Writing:** Task 1 (150 words): describe graph/diagram; Task 2 (250 words): essay (opinion, discuss both, problem/solution); plan 2–3 min; intro, body paragraphs, conclusion. **Speaking (11–14 min):** Part 1 short answers; Part 2 long turn (1 min prep, 2 min speak); Part 3 discussion. **Band 8:** Few errors; wide vocabulary; complex structures; fully addresses task; speaks at length with coherence.`,
          explanation: `Band 8 = "fully operational command"; minor errors only; wide range of vocabulary and grammar; answers all parts of the question. Focus on task response in Writing (answer the question fully) and fluency in Speaking (extend answers, use linkers).`,
          application: `Use for university admission, immigration, or professional registration. Practice daily: one Reading or Listening section; one Writing task; record Speaking answers and compare to band 8 samples.`,
          howToImplement: `(1) Listening: practice with Cambridge IELTS; predict before each part; write answers as you hear; transfer carefully (spelling counts). (2) Reading: skim first paragraph; read questions; scan for keywords; paraphrase in mind. (3) Writing: learn one structure for Task 1 (overview + key features); for Task 2 (intro + 2–3 body + conclusion); plan before writing. (4) Speaking: use Part 1 to warm up; Part 2 use the bullet points; Part 3 give extended answers with examples.`,
          logicAndCode: `Scoring: each section 0–9; overall = average. Band 8 in each = overall 8. Focus on weakest section. Time management: Reading and Writing are tight; practice under time.`,
          example: `Problem: Writing Task 2 — "Some people think that technology has made life more complicated. To what extent do you agree?"

Solution: Plan: intro (paraphrase + opinion); body 1 (technology has simplified X, Y); body 2 (however, it has added complexity in A, B); conclusion (balance). Use linking: Furthermore, On the other hand, In conclusion. Aim 250+ words; check grammar and spelling.`,
          additionalInfo: `Resources: Cambridge IELTS 15–18, British Council practice, IELTS Liz. Vocabulary: academic word list (AWL), topic-based (environment, education, technology). Grammar: conditionals, relative clauses, passive, hedging (may, might, could).`,
        },
        codeExample: `// Essay structure (Task 2)
// 1. Introduction (2–3 sentences): paraphrase topic + thesis
// 2. Body 1: topic sentence + 2–3 supporting ideas + example
// 3. Body 2: topic sentence + 2–3 supporting ideas + example
// 4. Conclusion: restate thesis + summary of main points

// Speaking Part 2 - structure
// 1. Direct answer to the question
// 2. "First of all..." - first point with detail
// 3. "Secondly..." - second point
// 4. "Finally..." - conclusion or summary
`,
        codeLanguage: "text",
      },
      {
        id: "common-errors-quick-fixes",
        title: "Common Errors & Quick Fixes",
        description:
          "Since vs for, its vs it's, affect vs effect, prepositions; quick fixes for accuracy.",
        order: 7,
        imageKey: "english",
        contentBlocks: {
          learningFlow: [
            "Since vs for: since + point in time (since 2020, since Monday); for + duration (for 2 years, for three days).",
            "Its vs it's: its = possessive (the company and its goals); it's = it is (it's clear).",
            "Affect vs effect: affect = verb (to influence); effect = noun (the impact); affect on is wrong, effect on is correct.",
            "Prepositions: depend on (not depend from); interested in; good at; different from (or than in US). Check verb+preposition pairs.",
          ],
          learningFlowIntro: `**Your first step:** Write 3 sentences: (1) I have lived here since 2020. (2) I have lived here for three years. (3) The report and its conclusions. Read sections 1–2 and memorise since/for and its/it's.

**Prerequisites:** Basic grammar (present perfect, possessive).

**By the end of this topic you will:** Avoid common errors in since/for, its/it's, affect/effect, and prepositions; Writing/Speaking scores more stable.`,
          material: `**Since vs for:** Since = start of period (since January, since I was young). For = length of period (for two weeks, for a long time). Present perfect: I have been here since Monday / for five days. **Its vs it's:** Its = possessive, no apostrophe (the dog wagged its tail). It's = it is or it has (it's raining, it's been years). **Affect vs effect:** Affect = verb (stress affects health). Effect = noun (the effect of stress); have an effect on. **Prepositions:** depend on; interested in; good at / bad at; different from; responsible for; focus on; consist of; agree with (person), agree on (topic). **Others:** There/their/they're; your/you're; fewer (countable) vs less (uncountable); than vs then. **Quick fix:** Before submit, search for it's and ask: can I replace with it is? If not, use its.`,
          explanation: `These errors often go unnoticed because they sound or look similar. Wrong since/for = tense becomes ambiguous. Wrong its/it's = looks careless. Wrong preposition = collocation error in lexical resource.`,
          application: `Writing: before sending, search it's and its; check every since/for and affect/effect. Speaking: practise for two years not since two years. Self-check list: since+point in time, for+duration; its possessive; affect verb, effect noun.`,
          howToImplement: `(1) Make a list of 10 preposition pairs (depend on, interested in, ...); read once a day for a week. (2) Every time you write: Ctrl+F it's — mentally replace with it is; if it does not fit, use its. (3) Affect/effect: need a verb? Use affect; need a noun? Use effect (the effect). (4) Practise: fill blank — I have worked here ___ 2020 (since); ___ three years (for).`,
          logicAndCode: `Since = since + date/time point. For = for + number + unit. Its = possessive (like his, her). It's = it is. Affect = verb. Effect = noun (often with the/an). Preposition: learn per verb (interested in, not interested about).`,
          example: `Wrong: I have been studying since three years. Right: for three years. Wrong: The company announced it's new product. Right: its new product. Wrong: The study examined the affect of sleep. Right: the effect of sleep. Wrong: It depends from the situation. Right: depends on.`,
          additionalInfo: `Resources: Grammarly, English Grammar in Use. IELTS: frequent errors = grammar band drops. Make a personal checklist (since/for, its/it's, affect/effect, 5 prepositions) and use it every review.`,
        },
        codeExample: `// Since vs For
// since + point: since 2020, since Monday, since I left
// for + duration: for 2 years, for three days, for a long time

// Its vs It's
// its = possessive: The app has its limitations.
// it's = it is: It's important to plan.

// Affect (v) vs Effect (n)
// Stress affects performance.  The effect of stress is clear.

// Prepositions — learn pairs
// depend on, interested in, good at, different from, focus on
`,
        codeLanguage: "text",
      },
      {
        id: "academic-writing-hedging",
        title: "Academic Writing: Hedging & Formal Style",
        description:
          "May, might, could; passive voice; avoid contractions; formal vocabulary for Task 2 and essays.",
        order: 8,
        imageKey: "english",
        contentBlocks: {
          learningFlow: [
            "Hedging: use may, might, could, tend to, it appears that, suggests that — for claims that are not absolute (academic).",
            "Passive: when the doer is unimportant or you want to focus on the result (The study was conducted; Data were collected).",
            "Avoid contractions in Writing Task 2: do not not don't; it is not it's; cannot not can't.",
            "Formal vocabulary: demonstrate (not show); indicate, suggest; significant (not big); obtain (not get); commence (not start) — use consistently.",
          ],
          learningFlowIntro: `**Your first step:** Take one paragraph of your Task 2. Replace every show with demonstrate or indicate; replace don't with do not; add one sentence with may or might. Then read sections 1–2.

**Prerequisites:** Writing structure (topic sentence, support); basic grammar.

**By the end of this topic you will:** Write with appropriate hedging, passive when needed, no contractions, and formal vocabulary — ready for band 7–8 Writing.`,
          material: `**Hedging:** Reduce absolute certainty: may, might, could, tend to, it is possible that, it appears that, the evidence suggests that, research indicates that. Use when: generalisations, research results, predictions. **Passive:** Subject = receiver of action; doer optional (by X). Use when: doer unimportant (Experiments were conducted); focus on process (Data were analysed). **No contractions:** Write do not, cannot, it is, there is, would not. **Formal lexis:** demonstrate, indicate, suggest, reveal; significant, considerable, substantial; obtain, acquire; commence, conclude; facilitate, enable; prior to, subsequent to; however, furthermore, consequently. **Avoid:** get (use obtain/receive); big (use large/significant); thing (use aspect/factor); lots of (use many/significant number of). **Balance:** Do not over-hedge (every sentence with might); 1–2 hedges per body paragraph is enough.`,
          explanation: `Hedging shows you distinguish fact from interpretation — important in academic writing. Passive makes the tone objective. Contractions are considered informal; Task 2 is semi-formal. Formal vocabulary raises lexical resource score.`,
          application: `Task 2: every body paragraph at least one hedge (Research suggests...; This may lead to...). Passive for methodology (was conducted, were collected). Proofread: find don't, can't, it's and replace. Use thesaurus for words that are too informal.`,
          howToImplement: `(1) Draft freely first; when editing: replace show→demonstrate, get→obtain, big→significant. (2) Check: any strong claim without hedging? Add may or research suggests. (3) Check: sentence where focus is on the action (who did it unimportant)? Change to passive. (4) Find: apostrophe → replace contraction with full form.`,
          logicAndCode: `Hedging = modal (may/might/could) or phrase (it seems, evidence suggests). Passive = be + past participle; past passive = was/were + pp. Formal = one level above conversation; consistent across the essay.`,
          example: `Without hedging: Technology destroys jobs. With hedging: Technology may lead to job displacement in some sectors. Passive: The survey was conducted in 2023. (not We conducted) Formal: The findings demonstrate that... (not The findings show that...) Informal: It's clear that we don't have enough data. Formal: It is clear that we do not have sufficient data.`,
          additionalInfo: `Resources: Academic Phrasebank (Manchester), IELTS Liz. Do not use slang (kids, stuff, gonna). Abbreviations: first mention full form (e.g. World Health Organization (WHO)); then WHO.`,
        },
        codeExample: `// Hedging — choose by strength of claim
// may / might / could + verb
// It is possible that...  Research suggests that...
// tend to, is likely to, appears to

// Passive — when doer is not the focus
// The data were collected over six months.
// A survey was conducted among 500 participants.

// Formal substitutes
// show → demonstrate, indicate   get → obtain, receive
// big → significant, considerable   thing → aspect, factor
// don't → do not   it's → it is
`,
        codeLanguage: "text",
      },
      {
        id: "ielts-task-1-graphs-charts",
        title: "IELTS Task 1: Graphs, Charts & Diagrams",
        description:
          "Line, bar, pie, table, map, process — what to describe, overview, and key features per type.",
        order: 9,
        imageKey: "english",
        contentBlocks: {
          learningFlow: [
            "Line/bar: trend (increase, decrease, fluctuate); compare lines/bars; overview = main trend (e.g. overall increase).",
            "Pie/table: compare proportions or largest/smallest figures; overview = dominant category or general pattern.",
            "Map: change from A to B (new facilities, area development); overview = main changes (e.g. more facilities, expanded).",
            "Process: sequence of steps from start to end; overview = number of stages and final output; use passive (is produced, are mixed).",
          ],
          learningFlowIntro: `**Your first step:** Find one Task 1 image (line graph or bar chart). In 2 minutes write: (1) one overview sentence (main trend), (2) two key features with figures. Then read sections 1–2.

**Prerequisites:** Writing structure (intro, body); number vocabulary (increase, decrease, percentage).

**By the end of this topic you will:** Know what to write for each Task 1 type; overview always included; key features with data.`,
          material: `**Line graph:** Axis: time vs value. Describe: trend (rise, fall, stability), comparison between lines, turning points. Overview: e.g. overall, X increased while Y decreased. **Bar chart:** Compare categories; note highest/lowest; change over time if two time points. Overview: e.g. A was the highest; B showed the sharpest growth. **Pie chart:** Proportions; compare slices; often two pies = compare over time. Overview: e.g. X accounted for the largest share. **Table:** Rows/columns; identify max, min, patterns. Overview: main pattern or comparison. **Map:** Before/after or two locations; describe new buildings, roads, changes. Overview: e.g. the area became more developed with new facilities. **Process:** Steps from input to output; use sequencing (First, Then, After that); passive (The material is heated). Overview: e.g. the process consists of X stages and produces Y. **Rules:** No opinion; overview in intro or after intro; 2–3 body paragraphs; include specific data (numbers, dates). **Word count:** Minimum 150; aim 160–180.`,
          explanation: `Overview is a Task Achievement criterion; without it your score is capped. Each type has a pattern: line = trend; pie = proportion; process = sequence. Specific data (numbers, percentages) is required.`,
          application: `Practise per type: 1 line, 1 bar, 1 pie, 1 table, 1 map, 1 process. Each answer: intro (paraphrase + overview), body (key features + data). Do not list every number; choose what stands out (highest, lowest, biggest change).`,
          howToImplement: `(1) Read title and axes; identify main trend → write overview. (2) Choose 2–3 key features (e.g. highest value, biggest increase, comparison). (3) Write body: one paragraph per feature or per time period. (4) Process: read left to right / top to bottom; write one sentence per step with passive. (5) Proofread: data included? Overview? No opinion?`,
          logicAndCode: `Overview = 1–2 sentences answering What is the main trend or pattern? Key features = 2–3 points with numbers. Structure: Intro (paraphrase + overview) → Body 1 (feature 1 + data) → Body 2 (feature 2 + data). Process: First... Then... After that... Finally... (passive).`,
          example: `Line graph: The line graph shows energy consumption from 1980 to 2020. Overall, renewable energy increased while coal decreased. In 1980, coal accounted for 60%; by 2020 it had fallen to 25%. Renewables rose from 5% to 35% over the same period. Map: The maps show a town in 1990 and 2010. Overall, the town expanded with new housing and a road. In 2010, a new school and hospital had been built in the north, and the main road was extended to the east.`,
          additionalInfo: `Resources: Cambridge IELTS Task 1, IELTS Liz. Time: 20 minutes for Task 1. Paraphrase the title (The graph shows → The line graph illustrates). Data: round if needed (e.g. about 35% or approximately 40%).`,
        },
        codeExample: `// Task 1 — intro + overview
// The [line graph/bar chart/pie chart/table/map/process diagram]
// shows/illustrates ... [paraphrase title].
// Overall, [main trend: X increased / A was highest / the process has N stages].

// Line/bar — key features
// X rose from ... to ...  Y fell sharply.  Z remained stable.
// By [year], X had overtaken Y.

// Process — passive
// First, the raw material is collected. Then, it is heated...
// After that, ... Finally, the product is packaged.
`,
        codeLanguage: "text",
      },
      {
        id: "ielts-speaking-parts-deep-dive",
        title: "IELTS Speaking: Parts 1, 2 & 3 Deep Dive",
        description:
          "Common Part 1 topics, Part 2 structure (cue card), Part 3 extended answers; sample questions and answer frames.",
        order: 10,
        imageKey: "english",
        contentBlocks: {
          learningFlow: [
            "Part 1: topics (work, study, hometown, hobbies, daily routine); answer in 2–3 sentences; direct answer + reason or example; natural, do not memorise long scripts.",
            "Part 2: read cue card; 1 min prep — outline 2–3 points following bullets; speak 1.5–2 min; short intro then follow points; close with So overall.",
            "Part 3: abstract/general questions (why, how, compare); answer in 3–4 sentences: opinion + reason + example or contrast; use In my view, For instance, On the other hand.",
            "Practise: record Part 1 (5 questions), Part 2 (1 cue card), Part 3 (3 questions); listen and check: enough extend? Signposting there?",
          ],
          learningFlowIntro: `**Your first step:** Practise Part 1: answer Where do you live? in 3 sentences (place + why you like/don't + one detail). Timer 30 seconds. Then read sections 1–2.

**Prerequisites:** Speaking basics (extend, signposting from the Speaking topic above).

**By the end of this topic you will:** Know typical topics per part, answer structure, and frame (intro–points–conclusion) for Part 2 and Part 3.`,
          material: `**Part 1 (4–5 min):** Topics: work, studies, hometown, home, family, hobbies, food, travel, weather, etc. Format: 2–3 questions per topic. Strategy: direct answer + because/for example + one more sentence. Do not answer in one word. **Part 2 (3–4 min):** Cue card: Describe X. You have 1 min to prepare. Speak 1–2 min. Bullet points on card = outline. Structure: (1) Intro: I would like to talk about... (2) Point 1 (bullet 1). (3) Point 2 (bullet 2). (4) Point 3 (bullet 3). (5) So overall / In conclusion. **Part 3 (4–5 min):** Discussion; more general/abstract questions (Why do people...? How has X changed? Compare A and B). Strategy: state view + reason + example or On the other hand. 3–4 sentences. **Common Part 1:** Do you work or study? Where do you live? What do you do in your free time? **Common Part 2:** Describe a place, person, event, object, experience. **Common Part 3:** Follow-up from Part 2 topic (e.g. after describe a book → Why do people read? How has reading changed?). **Fluency:** Do not stay silent long; use Well, Let me see; extend every answer.`,
          explanation: `Part 1 = warm-up; examiner scores fluency and range. Part 2 = monologue; outline in prep time helps a lot; follow bullets so you do not forget. Part 3 = discussion; longer answers with reason and example raise your score.`,
          application: `Prepare 2–3 stories (place, person, experience) that you can reuse for different cue cards. Part 1: practise 10 common questions; every answer at least 2 sentences. Part 3: practise In my view... because... For example... for 5 abstract questions.`,
          howToImplement: `(1) Part 1: list 20 common questions; answer with 30s timer; check if reason/example is there. (2) Part 2: take 3 cue cards; 1 min prep write outline (3 points); speak 2 min; record and listen. (3) Part 3: take 5 Why/How questions; answer with In my view + because + For example. (4) Full mock: Part 1 → Part 2 → Part 3 with partner or self-record.`,
          logicAndCode: `Part 1: Answer + Because/For example + 1 sentence. Part 2: Intro → Bullet 1 → Bullet 2 → Bullet 3 → So overall. Part 3: Opinion + Reason + Example (or contrast). Record and check: under 2 sentences in Part 1? Add extend. Part 2 under 1.5 min? Add detail per bullet.`,
          example: `Part 1 Q: Do you like reading? A: Yes, I do. I mainly read non-fiction, especially about technology, because it helps me at work. For example, last month I read a book about AI and used some ideas in a project. Part 2 (Describe a place): Intro — I would like to talk about a café in my hometown. First of all, it is located... Secondly, I go there because... Finally, the atmosphere is... So overall, it is my favourite place to relax. Part 3 Q: Why do people travel? A: In my view, people travel for different reasons. Some travel to relax and escape routine. Others want to learn about new cultures. For example, I have a friend who...`,
          additionalInfo: `Resources: IELTS Liz Speaking, British Council. Do not memorise a script; memorise structure and 2–3 flexible stories. Examiner may interrupt Part 2 after 2 min; that is normal. Part 3 may be 2–3 questions; answer fully.`,
        },
        codeExample: `// Part 1 — formula
// Direct answer. [Because / For example] + 1-2 sentences.

// Part 2 — outline (1 min prep)
// 1. Intro: I would like to talk about...
// 2. [Bullet 1]: First of all, ...
// 3. [Bullet 2]: Secondly, ...
// 4. [Bullet 3]: Finally, ...
// 5. So overall, ...

// Part 3 — formula
// In my view, [opinion]. This is because [reason].
// For example, ... / On the other hand, ...
`,
        codeLanguage: "text",
      },
      {
        id: "time-management-exam-day",
        title: "Time Management & Exam Day",
        description:
          "Time split for Listening, Reading, Writing; exam day checklist; transfer and proofread tips.",
        order: 11,
        imageKey: "english",
        contentBlocks: {
          learningFlow: [
            "Listening: 4 sections ~30 min; 10 min transfer — use to check spelling and word count; do not leave blanks.",
            "Reading: 60 min total; 15–20 min per passage; read questions first then skimming/scanning; skip hard questions, return later.",
            "Writing: Task 1 max 20 min (plan 2, write 16, check 2); Task 2 min 40 min (plan 5, write 32, check 3); Task 2 worth more, prioritise it.",
            "Exam day: ID, venue, sleep well; read instructions for each section; note word count (Task 1 min 150, Task 2 min 250).",
          ],
          learningFlowIntro: `**Your first step:** Do one full Reading (60 min) with a timer. Note: how many minutes per passage? Any passage where you ran out of time? Then read sections 1–2.

**Prerequisites:** Familiar with IELTS format (Listening, Reading, Writing, Speaking).

**By the end of this topic you will:** Have a clear time split per section and a checklist for exam day; avoid running out of time or forgetting to transfer.`,
          material: `**Listening:** ~30 min audio + 10 min transfer. During audio: write in booklet; keep it short, spell correctly. During transfer: move to answer sheet; check spelling (capitalisation, singular/plural); fill all — blank = wrong. **Reading:** 60 min, 3 passages, 40 questions. Strategy: 15–20 min per passage; read questions first; skim text; scan for answers. Skip stuck questions; note blank numbers; return in the last 5 min. **Writing:** 60 min total. Task 1: 20 min (150+ words). Task 2: 40 min (250+ words). Task 2 = 2/3 of Writing score; do not spend 30 min on Task 1. Plan: Task 1 (2 min), Task 2 (5 min). **Speaking:** Usually on another day; 11–14 min. Bring ID; arrive on time; stay calm, extend answers. **Exam day:** Bring ID/passport; check venue and time; sleep well; eat breakfast; read instructions (e.g. no more than three words). **Word count:** Task 1 under 150 / Task 2 under 250 = penalty; aim 160–180 and 260–280.`,
          explanation: `Listening: transfer time is part of the test; use it to check. Reading: time is tight; do not read the whole text first. Writing: Task 2 has more weight; if in doubt, cut Task 1 so Task 2 is finished.`,
          application: `Every practice test: use exact timer (Listening 30+10, Reading 60, Writing 60). Note where you fell behind; adjust strategy (e.g. read questions before text). Exam day: print checklist (ID, location, time); read instructions every section.`,
          howToImplement: `(1) Listening: practise with 10 min transfer; fill answer sheet; check spelling. (2) Reading: timer 20 min per passage; if passage 1 takes over 20 min, speed up skimming. (3) Writing: set timer Task 1 = 20 min, Task 2 = 40 min; stop at the bell. (4) Checklist: ID, stationery, water; know where toilet is; arrive 30 min early. (5) Proofread: last 2–3 min of Writing for grammar and word count.`,
          logicAndCode: `Listening: 30 min listen + 10 transfer. Reading: 3 x (read Q → skim → scan). Writing: 20 (Task 1) + 40 (Task 2). Never leave blank: guess. Answer sheet: numbers match; double-check.`,
          example: `Reading: Passage 1 done 18 min, Passage 2 done 38 min, Passage 3 done 58 min — 2 min to check. Writing: Task 1 done 20 min (170 words); Task 2 start plan; done 58 min (270 words); 2 min proofread. Listening: Section 4 done; 10 min transfer + check accommodation (double m), February (spelling).`,
          additionalInfo: `Resources: British Council, IDP. Computer-based: timer on screen; word count automatic. Paper: count words (average words per line x lines). Do not write in margin; answers in the correct area.`,
        },
        codeExample: `// Time split
// Listening: 30 min listen, 10 min transfer (check spelling)
// Reading: 15-20 min per passage; skip hard Q, return later
// Writing: Task 1 = 20 min, Task 2 = 40 min (prioritise Task 2)

// Exam day checklist
// [ ] ID/passport   [ ] Know venue & time
// [ ] Sleep well    [ ] Read instructions (e.g. no more than 3 words)
// [ ] Task 1 min 150 words   Task 2 min 250 words
`,
        codeLanguage: "text",
      },
      {
        id: "phrasal-verbs-and-sentence-variety",
        title: "Phrasal Verbs & Sentence Variety",
        description:
          "Common phrasal verbs (take off, look into, carry out); complex sentences and variety for band 7–8.",
        order: 12,
        imageKey: "english",
        contentBlocks: {
          learningFlow: [
            "Phrasal verbs: verb + particle (take off, look into, carry out, find out, set up); meaning often different from the verb alone; learn in sentences.",
            "When to use: Speaking and informal writing — phrasal verbs sound natural; formal Writing Task 2 — use single verbs (investigate not look into) or phrasal if common (carry out research).",
            "Sentence variety: mix simple, compound (and, but, so), complex (although, when, because, which); use relative clauses (which, who, that) and participle clauses (Having finished, ...).",
            "Practise: rewrite 3 simple sentences as one complex sentence; use 2–3 phrasal verbs in a Speaking answer.",
          ],
          learningFlowIntro: `**Your first step:** Learn 5 phrasal verbs with example sentences: look into (investigate), carry out (do), find out (discover), set up (establish), take off (succeed or leave). Then read sections 1–2.

**Prerequisites:** Basic grammar (clauses, conjunctions); Vocabulary & Collocations topic.

**By the end of this topic you will:** Use common phrasal verbs appropriately; vary sentence structure (simple, compound, complex) for a higher grammar score.`,
          material: `**Phrasal verbs:** Verb + adverb/preposition; meaning often idiomatic. Common: look into (investigate), carry out (do/conduct), find out (discover), set up (establish), take off (succeed/leave ground), turn down (refuse), bring about (cause), deal with (handle). **Register:** Speaking: phrasal verbs are natural (I need to find out more). Formal writing: prefer single verb when possible (conduct research, not carry out research; but carry out is acceptable in academic contexts). **Sentence variety:** Simple: one clause. Compound: two independent clauses (and, but, so, or). Complex: main clause + subordinate (although, when, because, which, who). **Complex structures:** Relative clause: The report, which was published in 2023, shows... Participle: Having completed the survey, we analysed the data. **Band 7–8:** Use a mix of sentence types; avoid only simple sentences; use at least one complex structure per paragraph.`,
          explanation: `Phrasal verbs make speech natural; overusing single verbs in Speaking can sound stiff. Sentence variety shows grammatical range; only simple sentences cap your grammar score. Relative and participle clauses add variety without error if used correctly.`,
          application: `Speaking: use find out, look into, carry out, set up where they fit. Writing Task 2: one or two complex sentences per body paragraph (e.g. Although X, Y; The trend, which began in 2020, ...). Proofread: do you have at least 2–3 complex sentences in the essay?`,
          howToImplement: `(1) Learn 10 phrasal verbs with one example each; use 2–3 in your next Speaking practice. (2) Take one Task 2 body paragraph; add one sentence with although or which. (3) Combine two short sentences into one using who/which/that or Having + past participle. (4) Checklist: simple + compound + complex in the same paragraph.`,
          logicAndCode: `Phrasal verb = verb + particle; meaning in dictionary or corpus. Complex = main + subordinate clause. Relative: which/who/that after noun. Participle: -ing or -ed clause (Having done..., Made of...).`,
          example: `Phrasal: We need to look into this. (investigate) The project took off after the first year. (succeeded) Formal alternative: We need to investigate this. Complex: Although technology has benefits, it can also create dependency. The data, which was collected in 2023, shows an increase. Having considered both views, I believe that...`,
          additionalInfo: `Resources: Cambridge Phrasal Verbs Dictionary, English Grammar in Use (complex sentences). IELTS: grammatical range = variety of structures; accuracy still matters — do not use a complex structure you are unsure about.`,
        },
        codeExample: `// Phrasal verbs — learn with examples
// look into = investigate   carry out = do/conduct
// find out = discover   set up = establish
// take off = succeed / leave (plane)

// Sentence variety
// Simple: The rate increased.
// Compound: The rate increased and costs fell.
// Complex: Although the rate increased, costs fell.
// Relative: The rate, which had been stable, increased.
// Participle: Having risen for two years, the rate then fell.
`,
        codeLanguage: "text",
      },
      {
        id: "software-engineering-key-terms",
        title: "Software Engineering: Key Terms & Professional Language",
        description:
          "Essential technical terms, jargon, and professional phrases used in software engineering with clear explanations.",
        order: 13,
        imageKey: "english",
        contentBlocks: {
          learningFlow: [
            "Learn core technical terms: API, deployment, scalability, latency, refactoring, stack, repository, sprint, backlog; know what each means and when to use it.",
            "Learn professional phrases: push back the deadline, scope creep, stakeholder, action items, circle back, touch base, blocker, bandwidth (capacity); use them correctly in meetings and emails.",
            "Distinguish similar terms: frontend vs backend; bug vs defect; commit vs push; merge vs rebase; staging vs production.",
            "Practise: write one email using 3 professional phrases; explain one technical term (e.g. API or scalability) in one sentence to a non-technical person.",
          ],
          learningFlowIntro: `**Your first step:** Read the material and make a short list of 5 terms you did not know (e.g. API, deployment, latency). Look up each and write one sentence explaining it. Then read the professional phrases section.

**Prerequisites:** Basic programming or interest in software engineering; English at intermediate level.

**By the end of this topic you will:** Understand and use key technical terms and professional language in software engineering contexts; explain terms clearly when needed.`,
          material: `**Technical terms — Core:** **API (Application Programming Interface):** A way for programs to talk to each other; you call an API to get data or trigger an action (e.g. weather API returns temperature). **Deployment:** Putting your code live so users can use it; deploy to production = release. **Scalability:** How well a system handles more load; scalable = can grow (more users, more data) without breaking. **Latency:** Delay between request and response; low latency = fast. **Throughput:** How much work per unit time; high throughput = many requests per second. **Refactoring:** Improving code structure without changing behaviour; make it cleaner, not new features. **Legacy (code/system):** Old code still in use; often hard to change. **Stack:** The set of technologies you use (e.g. React + Node + PostgreSQL = full stack). **Repository (repo):** Where code is stored (e.g. GitHub repo). **Commit:** Save a snapshot of changes in version control. **Push:** Send your commits to the remote repo. **Merge:** Combine branches (e.g. merge feature branch into main). **Rebase:** Replay your commits on top of another branch; cleaner history. **Sprint:** A short fixed period of work (e.g. 2 weeks) in Agile. **Backlog:** List of work to do; product backlog = all features/tasks. **Staging:** Environment that mirrors production for testing before go-live. **Production (prod):** The live system users use. **Bug:** Defect in code that causes wrong behaviour. **Blocker:** Something that stops you from progressing; I am blocked by X = I cannot continue until X is fixed. **Bandwidth:** In professional talk often means capacity or time (I do not have the bandwidth = I do not have time/capacity). **Professional phrases:** **Push back (the deadline):** Postpone; we need to push back the release. **Scope creep:** When requirements keep growing; the project scope is creeping. **Stakeholder:** Someone with an interest (client, manager, user). **Action items:** Things to do after a meeting; next steps. **Circle back:** Return to a topic later; let us circle back to this next week. **Touch base:** Have a short check-in; let us touch base on Friday. **Follow-up:** Something done after (e.g. follow-up meeting, follow-up email). **ASAP:** As soon as possible. **EOD:** End of day. **ETA:** Estimated time of arrival (or estimated time to complete). **Stand-up:** Short daily meeting where each person says what they did, will do, and any blockers. **Sync (meeting):** Short for synchronise; a meeting to align. **Onboarding:** Process of bringing someone new into the team or project. **Offboarding:** Process when someone leaves. **Best practice:** Recommended way to do something. **Edge case:** Unusual situation that might break the code; we need to handle this edge case.`,
          explanation: `Technical terms let you communicate precisely with other engineers; using them correctly builds credibility. Professional phrases are standard in emails and meetings; they sound natural and show you understand workplace norms. Mixing up terms (e.g. commit vs push) can cause confusion in code reviews or stand-ups.`,
          application: `In stand-ups: I am blocked on the API integration; I will push the fix by EOD. In emails: Let us touch base tomorrow to discuss the scope. With non-technical people: An API is like a waiter — you ask for something (request) and get a response. In documentation: Use staging for testing before deployment to production.`,
          howToImplement: `(1) Add 2–3 new terms to your vocabulary each week; use them in a sentence (written or spoken). (2) In your next meeting or email, use one professional phrase (e.g. action items, circle back). (3) Explain one technical term (API, deployment, latency) in one sentence to a friend or in a note. (4) When you hear an unknown term (e.g. in a meeting), note it and look it up; add to your list with a short explanation.`,
          logicAndCode: `Technical term = precise meaning in engineering. Professional phrase = common in workplace communication; use in the right context (e.g. blocker in stand-up, touch base in scheduling). When explaining to non-technical people: use an analogy (API = waiter) or outcome (deployment = when the app goes live).`,
          example: `Technical: Our API has high latency under load — we need to optimise or scale. The feature is in staging; we will deploy to production after QA. Professional: Here are the action items from the call: (1) John to follow up with the stakeholder; (2) we will circle back on the deadline next Monday. I do not have bandwidth this week for the extra task. Explaining to non-technical: Scalability means our app can handle more users without slowing down or crashing.`,
          additionalInfo: `Resources: Glossaries (e.g. AWS, Martin Fowler), company internal wikis, and observing how senior engineers and managers speak in meetings and emails. In interviews: use terms correctly (e.g. I refactored the legacy module to improve maintainability); avoid jargon if the interviewer is non-technical unless you explain it.`,
        },
        codeExample: `// Technical terms — one-line definitions
// API = way for programs to request data or actions
// Deployment = releasing code to a live environment
// Scalability = system can handle more load
// Latency = delay (e.g. response time)
// Refactoring = improve code structure, same behaviour
// Repo = code repository (e.g. GitHub)
// Commit = save snapshot; Push = send to remote
// Sprint = short work period (e.g. 2 weeks); Backlog = work to do
// Staging = test environment; Production = live

// Professional phrases
// push back = postpone   scope creep = requirements growing
// stakeholder = person with interest   action items = next steps
// circle back = return to topic later   touch base = short check-in
// blocker = something stopping progress   bandwidth = capacity/time
// EOD = end of day   ASAP = as soon as possible
`,
        codeLanguage: "text",
      },
    ],
  },
  {
    title: "Data Analytics",
    slug: "data-analytics",
    description:
      "From foundations (SQL, Excel, visualization) to advanced (Python, statistics, ML for analytics).",
    order: 13,
    published: true,
    topics: [
      {
        id: "data-analytics-foundations",
        title: "Data Analytics Foundations",
        description: "SQL for analysis, Excel, and data visualization basics.",
        order: 0,
        imageKey: "analytics",
        contentBlocks: {
          learningFlow: [
            "Use SQL for aggregation: GROUP BY, COUNT, SUM, AVG; filter with WHERE and HAVING.",
            "Practice Excel: pivot tables, VLOOKUP/XLOOKUP, basic charts.",
            "Create clear visualizations: choose chart type (bar, line, scatter); label axes and title.",
            "Interpret results: what does the metric mean? What action does it suggest?",
          ],
          learningFlowIntro: `**Your first step:** If you have a database or CSV, write one query (or formula) that groups by a dimension and sums or counts a metric. Then read sections 1–2.

**Prerequisites:** SQL Queries topic (SELECT, JOIN, GROUP BY) or equivalent; basic Excel/Sheets.

**By the end of this topic you will:** Write analytical SQL and simple Excel pivot/charts, and interpret metrics (conversion, retention) with clear labels.`,
          material: `**SQL for analytics:** SELECT with GROUP BY; aggregates COUNT, SUM, AVG, MIN, MAX; HAVING to filter on aggregates; JOIN to combine tables. **Excel:** Pivot tables (rows/columns/values); VLOOKUP(index, range, col); charts — bar (categories), line (time), scatter (correlation). **Visualization:** Bar = comparison; line = trends; scatter = relationship; always title and axis labels; avoid 3D and too many colors. **Metrics:** Conversion rate, retention, ARPU; define before analyzing.`,
          explanation: `SQL gives you flexibility to slice data; Excel is quick for ad-hoc; visualization makes patterns visible. Good analytics answers: "What happened?" (descriptive), "Why?" (diagnostic), "What will happen?" (predictive).`,
          application: `Use for business reports, dashboards, A/B test analysis, cohort analysis. Start with one question (e.g. "Which channel has highest conversion?") and write the SQL or Excel steps.`,
          howToImplement: `(1) Write query: SELECT channel, COUNT(*) as conversions FROM events WHERE type='signup' GROUP BY channel ORDER BY conversions DESC. (2) In Excel: pivot table from data; rows = channel, values = count. (3) Chart: bar chart of channel vs conversions.`,
          logicAndCode: `GROUP BY collapses rows; aggregates compute per group. HAVING filters groups (e.g. HAVING COUNT(*) > 100). JOIN brings in related columns; use LEFT JOIN to keep all from left table.`,
          example: `Problem: Weekly signups by source for the last 12 weeks.

Solution: SQL: SELECT DATE_TRUNC('week', created_at) as week, source, COUNT(*) FROM signups WHERE created_at >= NOW() - INTERVAL '12 weeks' GROUP BY 1, 2 ORDER BY 1, 2. Export to Excel or tool; line chart with week on X, count on Y, one line per source.`,
          additionalInfo: `Tools: SQL (PostgreSQL, BigQuery), Excel/Google Sheets, Looker Studio, Tableau. Next step: Python (pandas) for larger data and automation. **Curriculum:** Optional track; take after Database & SQL if you want analytics; can run in parallel with core backend/frontend.`,
        },
        codeExample: `-- Signups by source and week
SELECT
  DATE_TRUNC('week', created_at) AS week,
  source,
  COUNT(*) AS signups
FROM users
WHERE created_at >= NOW() - INTERVAL '12 weeks'
GROUP BY 1, 2
ORDER BY 1, 2;

-- Conversion rate by channel
SELECT channel,
  COUNT(*) FILTER (WHERE event = 'purchase') * 100.0 / COUNT(*) AS conversion_pct
FROM events
GROUP BY channel;
`,
        codeLanguage: "sql",
      },
      {
        id: "data-analytics-advanced",
        title: "Data Analytics Advanced",
        description:
          "Python pandas, statistics, and ML for analytics (regression, classification).",
        order: 1,
        imageKey: "analytics",
        contentBlocks: {
          learningFlow: [
            "Use pandas: read CSV/Excel, filter, groupby, merge; compute metrics and export.",
            "Apply statistics: mean, median, std; correlation; confidence intervals; A/B test (t-test or chi-square).",
            "Build a simple model: linear regression for prediction; or logistic for classification; interpret coefficients.",
            "Present: Jupyter notebook with code, plots, and narrative; or dashboard in Streamlit.",
          ],
          learningFlowIntro: `**Your first step:** Install Python and pandas (pip install pandas). Read sections 1–2, then load a CSV with pd.read_csv, run groupby and one aggregate, and make a simple plot.

**Prerequisites:** Data Analytics Foundations (SQL, metrics, charts); basic Python (lists, dicts, loops).

**By the end of this topic you will:** Use pandas for aggregation and merge, run a t-test or chi-square for A/B tests, fit a linear regression and interpret coefficients, and present in a notebook.`,
          material: `**Pandas:** DataFrame; read_csv, df[col], df.groupby('col').agg(), df.merge(); handle missing (fillna, dropna). **Statistics:** Mean vs median (skew); std for spread; correlation (Pearson); p-value and significance; t-test for means, chi-square for proportions. **Regression:** Linear regression (predict continuous); R², coefficients; check residuals. **Classification:** Logistic regression (probability); accuracy, precision, recall, ROC. **ML for analytics:** Use models to segment (clustering) or predict (churn, LTV); interpret feature importance.`,
          explanation: `Pandas is the standard for tabular data in Python. Statistics help you say "this difference is significant." Models extend from description to prediction; always validate on holdout data.`,
          application: `Use for large datasets, automated reports, forecasting, customer segmentation, churn prediction. Combine with SQL to pull data, pandas to transform, sklearn or statsmodels to model.`,
          howToImplement: `(1) df = pd.read_csv('data.csv'); df.groupby('segment')['revenue'].sum(). (2) from scipy import stats; stats.ttest_ind(group_a, group_b). (3) from sklearn.linear_model import LinearRegression; model.fit(X, y); model.coef_. (4) Plot with matplotlib or seaborn; document in Jupyter.`,
          logicAndCode: `groupby().agg() is like SQL GROUP BY. merge(on='key') is like JOIN. t-test: H0 = means equal; p < 0.05 → reject, difference significant. Regression: y = b0 + b1*x1 + ...; coefficient = change in y per unit x.`,
          example: `Problem: A/B test — variant B has 5% higher conversion (1000 vs 950). Is it significant?

Solution: Two proportions: n1=10000, p1=0.095; n2=10000, p2=0.10. Chi-square test or z-test for proportions. If p < 0.05, reject null; B is significantly better. Report: "Variant B showed 5% relative lift (p=0.02)."`,
          additionalInfo: `Libraries: pandas, numpy, scipy, sklearn, matplotlib, seaborn. Next: time series (ARIMA, Prophet), causal inference (experiments, diff-in-diff).`,
        },
        codeExample: `import pandas as pd
from scipy import stats

# A/B test
df = pd.read_csv('experiment.csv')
a = df[df.variant=='A'].converted
b = df[df.variant=='B'].converted
t_stat, p_value = stats.ttest_ind(a, b)
print(f'p-value: {p_value}')  # < 0.05 → significant

# Linear regression
from sklearn.linear_model import LinearRegression
model = LinearRegression().fit(X[['feature1','feature2']], y)
print(model.coef_)  # interpretation: unit increase in feature1 → coef1 change in y
`,
        codeLanguage: "python",
      },
    ],
  },
  {
    title: "AI & Machine Learning",
    slug: "ai-ml",
    description:
      "From ML foundations (supervised, unsupervised, regression, classification) to deep learning and NLP.",
    order: 15,
    published: true,
    topics: [
      {
        id: "ml-foundations",
        title: "ML Foundations",
        description:
          "Supervised vs unsupervised, regression, classification, and evaluation.",
        order: 0,
        imageKey: "ai",
        contentBlocks: {
          learningFlow: [
            "Read the difference: supervised (labels) vs unsupervised (no labels); regression (continuous) vs classification (discrete).",
            "Implement linear regression and logistic regression from scratch or with sklearn.",
            "Split data: train/validation/test; avoid leakage.",
            "Evaluate: MSE/MAE for regression; accuracy, precision, recall, F1, ROC-AUC for classification.",
          ],
          learningFlowIntro: `**Your first step:** Install Python, pandas, and sklearn (pip install pandas scikit-learn). Read sections 1–2, then run the code example at the bottom (train_test_split → LinearRegression → predict).

**Prerequisites:** Python basics; basic statistics (mean, variance). Data Analytics or similar is helpful but not required.

**By the end of this topic you will:** Distinguish supervised vs unsupervised and regression vs classification, fit and evaluate a linear and logistic model, and interpret train/test split and basic metrics.`,
          material: `**Supervised:** Learn from (X, y); predict y for new X. **Unsupervised:** Only X; clustering, dimensionality reduction. **Regression:** y continuous; linear regression, decision trees, neural nets. **Classification:** y discrete; logistic regression, SVM, random forest, XGBoost. **Train/test split:** e.g. 80/20; fit on train, evaluate on test. **Overfitting:** Model memorizes train; regularize (L1/L2), more data, simpler model. **Metrics:** Regression: MSE, MAE, R². Classification: accuracy, precision (of predicted positive, how many correct), recall (of actual positive, how many found), F1, ROC-AUC. **Bias-variance:** Underfit = high bias; overfit = high variance; balance with complexity and data.`,
          explanation: `Labels = ground truth we want to predict. Train set = fit parameters; test set = estimate real-world performance (never use test during training). Precision/recall trade-off: threshold for positive class.`,
          application: `Use for prediction (sales, churn), recommendation, fraud detection, image/speech. Start with linear or logistic; move to tree-based (RF, XGB) for tabular; neural nets for images/text.`,
          howToImplement: `(1) from sklearn.model_selection import train_test_split; X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2). (2) model = LinearRegression(); model.fit(X_train, y_train); model.predict(X_test). (3) from sklearn.metrics import mean_squared_error, accuracy_score; evaluate on test.`,
          logicAndCode: `Linear regression: minimize MSE; closed form or gradient descent. Logistic: sigmoid(z); z = Xw; minimize cross-entropy. Gradient descent: update weights by minus learning_rate * gradient.`,
          example: `Problem: Predict house price from size and bedrooms.

Solution: Linear regression: price = b0 + b1*size + b2*bedrooms. Fit on train; R² on test. Check residuals (should be random). If non-linear, try polynomial features or tree model.`,
          additionalInfo: `Sklearn: fit/predict API. Next: regularization (Ridge, Lasso), cross-validation, hyperparameter tuning (GridSearchCV). Then: deep learning (PyTorch/TensorFlow). **Curriculum:** Optional track; take after or in parallel with core backend/frontend; Data Analytics helps for metrics and data handling.`,
        },
        codeExample: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.metrics import mean_squared_error, accuracy_score, classification_report

# Regression
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = LinearRegression().fit(X_train, y_train)
print('MSE:', mean_squared_error(y_test, model.predict(X_test)))

# Classification
model = LogisticRegression().fit(X_train, y_train)
print(classification_report(y_test, model.predict(X_test)))
`,
        codeLanguage: "python",
      },
      {
        id: "deep-learning-and-nlp",
        title: "Deep Learning & NLP Overview",
        description:
          "Neural networks, CNNs, RNNs, transformers, and LLMs at a high level.",
        order: 1,
        imageKey: "ai",
        contentBlocks: {
          learningFlow: [
            "Read neural network basics: layers, activation, backprop, gradient descent.",
            "Understand CNN for images (convolution, pooling) and RNN/Transformer for sequence.",
            "Learn what transformers and attention are; how LLMs (GPT, BERT) use them.",
            "Try a pre-trained model: sentiment with Hugging Face or image classification.",
          ],
          learningFlowIntro: `**Your first step:** pip install transformers torch. Read sections 1–2, then run: from transformers import pipeline; nlp = pipeline('sentiment-analysis'); print(nlp('I loved it')).

**Prerequisites:** ML Foundations (supervised learning, train/test, metrics); Python and basic linear algebra help.

**By the end of this topic you will:** Explain neural nets, CNN vs Transformer, and use a pre-trained model (Hugging Face) for a simple task; know when to fine-tune vs prompt.`,
          material: `**Neural net:** Layers of weights + activation (ReLU); input → hidden → output; train with backprop and gradient descent. **CNN:** Convolution filters (detect edges, patterns); pooling (downsample); used for images. **RNN/LSTM:** Process sequence; hidden state; good for time series, early NLP. **Transformer:** Self-attention (each token attends to all); parallel; no recurrence. **BERT/GPT:** Pre-trained on large text; fine-tune for task (classification, QA, generation). **LLM:** Large language model; autoregressive (next token); prompt engineering, RAG (retrieve + generate). **Fine-tuning vs prompt:** Few-shot in prompt vs update weights on your data.`,
          explanation: `Deep learning = many layers; learns hierarchical features. Attention = weighted combination of other tokens; captures long-range dependency. Pre-trained models transfer knowledge; fine-tune on your task with less data.`,
          application: `Use for image classification, object detection, machine translation, chatbots, code completion, summarization. Start with Hugging Face pipelines; then customize with your data.`,
          howToImplement: `(1) Install: pip install transformers torch. (2) from transformers import pipeline; classifier = pipeline('sentiment-analysis'); classifier('I loved it'). (3) For custom: load pre-trained, add head, train on your labels. (4) For LLM: use API (OpenAI, Claude) or run local (Llama); design prompt.`,
          logicAndCode: `Backprop: chain rule through layers; compute gradient of loss w.r.t. each weight. Attention: Q, K, V from input; scores = QK^T/sqrt(d); weights = softmax(scores); output = weights * V.`,
          example: `Problem: Classify support tickets into 5 categories.

Solution: Use BERT or similar; add classification head (linear layer to 5 classes); fine-tune on labeled tickets (epochs 2–3, small LR). Or use GPT with few-shot prompt: "Classify: ... Category:".`,
          additionalInfo: `Resources: fast.ai, Stanford CS224n (NLP), Hugging Face course. Ethics: bias, hallucination, privacy. Production: latency, cost, quantization.`,
        },
        codeExample: `# Hugging Face - sentiment
from transformers import pipeline
nlp = pipeline('sentiment-analysis')
print(nlp('This product is great!'))  # [{'label': 'POSITIVE', 'score': 0.99}]

# Fine-tune (conceptual)
from transformers import AutoModelForSequenceClassification, Trainer
model = AutoModelForSequenceClassification.from_pretrained('bert-base', num_labels=5)
trainer = Trainer(model=model, train_dataset=dataset, ...)
trainer.train()
`,
        codeLanguage: "python",
      },
    ],
  },
  {
    title: "Programming Languages",
    slug: "programming-languages",
    description:
      "C++, Python, and TypeScript in depth: syntax, idioms, and use cases for CP, backend, and frontend.",
    order: 13,
    published: true,
    topics: [
      {
        id: "cpp-complete",
        title: "C++ for Competitive Programming & Systems",
        description:
          "STL, pointers, memory, and fast I/O for CP and systems programming.",
        order: 0,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read C++ basics: types, loops, functions, references vs pointers.",
            "Master STL: vector, set, map, unordered_map, pair, sort; complexity of each.",
            "Practice fast I/O and common patterns (binary search, two pointers) in C++.",
            "Understand stack vs heap; RAII; when to use new/delete (prefer RAII and smart pointers).",
          ],
          learningFlowIntro: `**Your first step:** Install a C++ compiler (g++, clang, or MSVC). Read sections 1–2, then type the code example at the bottom (vector, sort, unordered_map) and run it.

**Prerequisites:** Basic programming (variables, loops, arrays) in any language. Competitive Programming topics help for problem context.

**By the end of this topic you will:** Use STL (vector, map, sort) and know their complexity, write fast I/O for CP, and understand when to use stack vs heap and smart pointers.`,
          material: `**Basics:** int, long long, vector<T>, string; for (auto& x : v); functions by value vs reference. **STL:** vector (dynamic array; O(1) amortized push_back); set (sorted, unique; O(log n) insert/find); map (key-value, sorted); unordered_map (hash; O(1) avg); pair; sort(begin, end); lower_bound, upper_bound. **Complexity:** vector[i] O(1); set.insert O(log n); unordered_map O(1) avg. **Pointers:** *p dereference; &x address; nullptr. **Memory:** Stack (local vars); heap (new/delete); prefer vector and smart pointers (unique_ptr, shared_ptr). **CP tips:** Use long long for integers; sync_with_stdio(false) for fast I/O; #define ll long long.`,
          explanation: `C++ is fast and STL gives ready-made data structures. References avoid copy; const reference for read-only. In CP, unordered_map often faster than map; set when you need order.`,
          application: `Use C++ for competitive programming (speed), systems code, game engines. Use Python for scripts, data, ML. Use TypeScript for web and Node.`,
          howToImplement: `(1) #include <bits/stdc++.h>; using namespace std; (2) vector<int> v(n); sort(v.begin(), v.end()); (3) unordered_map<int,int> cnt; cnt[x]++; (4) for (auto& [k,v] : map) ... (C++17). (5) Fast I/O: ios_base::sync_with_stdio(false); cin.tie(nullptr);`,
          logicAndCode: `vector stores contiguously; random access O(1). set is a balanced tree; ordered. unordered_map is hash table; key must have hash. sort is O(n log n); stable_sort keeps order for equal elements.`,
          example: `Problem: Count frequency of each element in array.

Solution: unordered_map<int,int> freq; for (int x : a) freq[x]++; Then iterate or use freq.find(). Time O(n), space O(n). For sorted output use map.`,
          additionalInfo: `C++17: structured bindings, optional. C++20: ranges. CP: know segment tree, Fenwick, DSU. Books: Competitive Programmer's Handbook, CP-Algorithms. **Curriculum:** Reference section; use when you need C++ for CP or systems; can be taken in parallel with Competitive Programming.`,
        },
        codeExample: `#include <bits/stdc++.h>
using namespace std;

int main() {
  ios_base::sync_with_stdio(false); cin.tie(nullptr);
  int n; cin >> n;
  vector<int> a(n);
  for (int i = 0; i < n; i++) cin >> a[i];
  sort(a.begin(), a.end());
  unordered_map<int,int> cnt;
  for (int x : a) cnt[x]++;
  for (auto& [k, v] : cnt) cout << k << ": " << v << "\\n";
  return 0;
}
`,
        codeLanguage: "cpp",
      },
      {
        id: "python-complete",
        title: "Python for Data & Backend",
        description:
          "Syntax, data structures, libraries, and best practices for data and API development.",
        order: 1,
        imageKey: "algorithms",
        contentBlocks: {
          learningFlow: [
            "Read Python basics: types, list/dict/set, comprehensions, functions, classes.",
            "Use list, dict, set and their time complexities; use collections (defaultdict, Counter).",
            "Write a small API with FastAPI or Flask; use type hints and venv.",
            "Use pandas and numpy for data; know when to use list vs array.",
          ],
          learningFlowIntro: `**Your first step:** Install Python, create a venv (python -m venv venv), and run the code example (Counter, defaultdict). Then read sections 1–2.

**Prerequisites:** Basic programming in any language. Data or backend focus helps but not required.

**By the end of this topic you will:** Use list/dict/set and collections, write a minimal FastAPI or Flask route, and know list vs dict complexity and type hints.`,
          material: `**Types:** int, float, str, bool; list, dict, set, tuple. **List:** append O(1); index O(n); sort O(n log n). **Dict:** get/set O(1) avg; keys, values, items. **Set:** unique; add O(1); in O(1). **Comprehensions:** [x*2 for x in lst], {k: v for k,v in d.items()}. **Functions:** def f(a, b=0): ...; *args, **kwargs. **Classes:** __init__, self; inheritance. **Libraries:** requests, pandas, numpy, FastAPI/Flask. **Virtual env:** python -m venv venv; source venv/bin/activate; pip install. **Type hints:** def f(x: int) -> str: ...`,
          explanation: `Python is interpreted; dynamic typing but type hints help. Dict and set are hash-based; list is array. Use venv to isolate project dependencies. FastAPI gives auto docs and validation.`,
          application: `Use for scripts, data pipelines, ML, APIs, automation. Backend: FastAPI or Flask + SQLAlchemy or raw SQL. Data: pandas DataFrame, numpy arrays.`,
          howToImplement: `(1) List comp: [x for x in lst if x > 0]. (2) Dict: d.get(key, default); d[key] = value. (3) FastAPI: @app.get("/"); def root(): return {"ok": True}. (4) pandas: df = pd.read_csv('f.csv'); df.groupby('col').agg(...).`,
          logicAndCode: `list is dynamic array; dict is hash table. Mutable default in def f(x=[]): is dangerous (same list reused); use def f(x=None): x = x or [].`,
          example: `Problem: Group list of dicts by key and sum a value.

Solution: from collections import defaultdict; d = defaultdict(int); for item in data: d[item['key']] += item['value']. Or pandas: df.groupby('key')['value'].sum().`,
          additionalInfo: `Style: PEP 8; black for format. Async: asyncio, async def. Testing: pytest. Packaging: pyproject.toml, pip install -e . **Curriculum:** Reference section; use for data (pandas, ML) or backend (FastAPI/Flask); can run in parallel with Data Analytics or Backend.`,
        },
        codeExample: `# List/dict
from collections import defaultdict, Counter
lst = [1, 2, 2, 3]
cnt = Counter(lst)  # {1:1, 2:2, 3:1}
d = defaultdict(list)
for k, v in pairs:
    d[k].append(v)

# FastAPI
from fastapi import FastAPI
app = FastAPI()
@app.get("/items/{id}")
def get_item(id: int):
    return {"id": id}
`,
        codeLanguage: "python",
      },
      {
        id: "typescript-complete",
        title: "TypeScript for Frontend & Full-Stack",
        description:
          "Types, interfaces, generics, and Node/React with TypeScript.",
        order: 2,
        imageKey: "react",
        contentBlocks: {
          learningFlow: [
            "Read TypeScript: types (string, number, boolean, array, object), interfaces, type alias.",
            "Use union types, optional (?), and generics (Array<T>, Promise<T>).",
            "Write a small React component and API route in TypeScript.",
            "Configure tsconfig; strict mode; understand any vs unknown.",
          ],
          learningFlowIntro: `**Your first step:** In a JS/React project run npm install -D typescript @types/node; npx tsc --init. Add an interface User and a function fetchUser(id: number): Promise<User>; read sections 1–2.

**Prerequisites:** JavaScript and React (or Node) basics. You have written at least one API or component.

**By the end of this topic you will:** Define interfaces and use generics, type a React component and an async function, and use strict mode and unknown instead of any.`,
          material: `**Types:** let x: string; const arr: number[]; interface User { id: number; name: string; optional?: string }. **Union:** type Id = string | number. **Generics:** function first<T>(arr: T[]): T. **React:** FC or (props: Props) => JSX.Element; type Props = { name: string }. **Node:** req: Request, res: Response; type for query/body. **Config:** tsconfig.json — strict: true, target ES2020, module ESNext. **Any vs unknown:** any disables checks; unknown requires type guard before use. **Utility types:** Partial<T>, Pick<T,K>, Omit<T,K>, Record<K,V>.`,
          explanation: `TypeScript adds static types to JavaScript; catches errors at compile time. Interfaces define shape; generics make code reusable. Strict mode avoids implicit any and null.`,
          application: `Use for all frontend (React, Vue) and Node backend when you want type safety. Types document APIs and enable autocomplete.`,
          howToImplement: `(1) interface User { id: number; name: string }; const u: User = { id: 1, name: 'A' }. (2) function fetchUser(id: number): Promise<User> { return fetch(...).then(r => r.json()); }. (3) React: const Card: FC<{ title: string }> = ({ title }) => <div>{title}</div>; (4) npm install -D typescript @types/node; npx tsc --init.`,
          logicAndCode: `Type inference: let x = 1 → x is number. Generic: Promise<User> means resolve value is User. Strict null: string | undefined; check before use or use optional chaining (?.).`,
          example: `Problem: Type a function that fetches a user and returns name or throws.

Solution: async function getUserName(id: number): Promise<string> { const res = await fetch(\`/api/users/\${id}\`); if (!res.ok) throw new Error('Not found'); const user: User = await res.json(); return user.name; }. User interface has name: string.`,
          additionalInfo: `Handbook: typescriptlang.org/docs. React: use type for props; useState<User | null>. Node: type env with process.env. Zod or io-ts for runtime validation. **Curriculum:** Reference section; take after React or Node.js when you want type safety in frontend or backend.`,
        },
        codeExample: `interface User {
  id: number;
  name: string;
  email?: string;
}

async function fetchUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error('Not found');
  return res.json();
}

// React
const Card: FC<{ title: string; onClick?: () => void }> = ({ title, onClick }) => (
  <div onClick={onClick}>{title}</div>
);
`,
        codeLanguage: "typescript",
      },
    ],
  },
  {
    title: "Backend Development",
    slug: "backend",
    description:
      "REST API design, databases, authentication, and deployment beyond a single framework.",
    order: 10,
    published: true,
    topics: [
      {
        id: "rest-api-design",
        title: "REST API Design",
        description:
          "Resources, HTTP methods, status codes, versioning, and documentation.",
        order: 0,
        imageKey: "backend",
        contentBlocks: {
          learningFlow: [
            "Read REST: resources as nouns, HTTP methods (GET, POST, PUT, PATCH, DELETE), status codes.",
            "Design a small API: 2–3 resources; list, get by id, create, update, delete.",
            "Document with OpenAPI/Swagger; test with Postman or curl.",
            "Handle errors consistently: 4xx client, 5xx server; body with message and code.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2, then design on paper: 2 resources (e.g. users, tasks), list endpoints (GET/POST/PUT/DELETE) and which status code each returns.

**Prerequisites:** Computer Networks (HTTP & TCP Basics) and Node.js (Express & REST); you should have built or used at least one API so you know how HTTP methods and status codes map to operations.

**By the end of this topic you will:** Design a REST API with clear resources and status codes, and document it (e.g. OpenAPI) for clients and tests.`,
          material: `**REST:** Representational State Transfer. **Resources:** URL = noun (e.g. /users, /users/1). **Methods:** GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE (remove). **Status:** 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error. **Versioning:** URL /v1/users or header Accept-Version. **Documentation:** OpenAPI (Swagger); describe paths, params, body, responses. **Errors:** JSON body { "error": "code", "message": "human message" }. **Pagination:** ?page=1&limit=20 or cursor-based. **Filtering:** ?status=active&sort=-createdAt.

**In other words:** URL = resource (noun); method = action. GET is safe and idempotent; POST creates; PUT replaces; PATCH updates partially; DELETE removes. Consistent status codes make clients easier; OpenAPI docs enable codegen and testing.`,
          explanation: `REST uses HTTP semantics; clients and caches understand GET is safe and idempotent. Consistent status codes and error format make clients easier to write. OpenAPI enables codegen and testing.`,
          application: `Use for any backend API: mobile app, SPA, or service-to-service. Design first (resources and operations), then implement. Version when you break compatibility.`,
          howToImplement: `(1) GET /users → list; GET /users/:id → one; POST /users → create (body); PUT /users/:id → replace; DELETE /users/:id. (2) Return 201 for POST with Location header. (3) Validate body (e.g. Joi, Zod); return 400 with message. (4) OpenAPI: paths, components/schemas.`,
          logicAndCode: `Idempotent: GET, PUT, DELETE (same result if repeated). Safe: GET (no side effect). POST is neither. Use PUT when client sends full resource; PATCH for partial.`,
          example: `Problem: Design API for "tasks" (title, status, dueDate).

Solution: GET /tasks (list, ?status=open); GET /tasks/:id; POST /tasks (body: title, dueDate); PATCH /tasks/:id (body: status); DELETE /tasks/:id. Return 200 + body for GET/PATCH; 201 + body for POST; 204 for DELETE. **Why:** POST returns 201 + the newly created resource; DELETE success with no body = 204.`,
          additionalInfo: `**Takeaway:** Resource = noun URL; method = GET/POST/PUT/PATCH/DELETE; consistent status; uniform error body; OpenAPI docs. GraphQL is an alternative; gRPC for performance. REST is most common; master it first.`,
        },
        codeExample: `// REST endpoints (conceptual)
// GET    /api/v1/tasks       → 200 [{ id, title, status }]
// GET    /api/v1/tasks/1     → 200 { id, title, status, dueDate }
// POST   /api/v1/tasks       → 201 { id, ... }  Location: /api/v1/tasks/1
// PATCH  /api/v1/tasks/1    → 200 { id, ... }
// DELETE /api/v1/tasks/1    → 204

// Error response
// 400: { "error": "VALIDATION_ERROR", "message": "title is required" }
`,
        codeLanguage: "text",
      },
      {
        id: "backend-auth-and-databases",
        title: "Auth & Databases in Backend",
        description:
          "JWT, sessions, OAuth; SQL vs NoSQL; migrations and connection pooling.",
        order: 1,
        imageKey: "backend",
        contentBlocks: {
          learningFlow: [
            "Implement auth: hash password (bcrypt), issue JWT or use sessions; protect routes.",
            "Read SQL (PostgreSQL, MySQL) vs NoSQL (MongoDB): when to use each; schema design.",
            "Use an ORM or query builder (Prisma, TypeORM, Mongoose); run migrations.",
            "Understand connection pooling, indexes, and N+1 query problem.",
          ],
          learningFlowIntro: `**Your first step:** Read sections 1–2. In any backend project, add a route that verifies a JWT from the Authorization header and attaches the user to the request (or returns 401).

**Prerequisites:** REST API Design and one of Node/Express or similar; Security Basics (hashing, JWT idea).

**By the end of this topic you will:** Implement login with JWT or sessions, choose SQL vs NoSQL for a use case, and use an ORM with migrations and avoid N+1.`,
          material: `**Auth:** Register (hash password, store user); login (verify password, issue JWT or set session cookie). **JWT:** Header.payload.signature; payload has userId, exp; sign with secret; client sends in Authorization: Bearer <token>. **OAuth:** Redirect to provider (Google, GitHub); callback with code; exchange for token; create or link user. **SQL:** Relational; ACID; schema; JOIN; use for structured, transactional data. **NoSQL:** Document (MongoDB), key-value; flexible schema; scale horizontally; use for logs, catalogs. **ORM:** Map tables to classes; migrations for schema changes. **Pooling:** Reuse DB connections; limit pool size. **Indexes:** Speed up WHERE, JOIN; cost on writes. **N+1:** Loop + query per item; fix with eager load or batch.

**In other words:** JWT = stateless token; server only verifies the signature. Session = stateful; ID stored in cookie. Never store password in plain text — hash (bcrypt). N+1 = one query inside a loop; fix with eager load or batch query.`,
          explanation: `JWT is stateless; server verifies signature. Session is stateful; store session id in cookie. SQL gives consistency and relations; NoSQL gives flexibility. ORM abstracts SQL but know the generated queries.`,
          application: `Use JWT for APIs (SPA, mobile); sessions for server-rendered. Use SQL for users, orders, reporting; NoSQL for events, feeds. Always use migrations for schema.`,
          howToImplement: `(1) JWT: on login, sign({ userId, exp }); middleware: verify token, attach user to req. (2) Prisma: schema.prisma with model; prisma migrate; prisma.client.user.findMany(). (3) Index: CREATE INDEX ON users(email); (4) Eager load: include: { posts: true } to avoid N+1.`,
          logicAndCode: `JWT verify: decode, check exp, check signature with same secret. Password: never store plain; bcrypt.hash then bcrypt.compare. Migration: versioned SQL or ORM migration; run in order.`,
          example: `Problem: Protect /api/users/me so only logged-in user gets their data.

Solution: Middleware: extract Bearer token; verify JWT; attach user to req; next(). In route: return req.user. If no token or invalid, return 401. **Why:** One middleware protects all routes that need auth; route just reads req.user.`,
          additionalInfo: `**Takeaway:** Login → hash password, issue JWT; protect routes = middleware verify JWT, attach user. SQL for structured data & transactions; NoSQL for flexibility & scale. Avoid N+1: eager load or batch. Refresh token: long-lived, rotate; access short-lived. Rate limit auth; never commit credentials.`,
        },
        codeExample: `// JWT (Node.js)
const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
// Middleware
const decoded = jwt.verify(req.headers.authorization?.split(' ')[1], process.env.JWT_SECRET);
req.userId = decoded.userId;

// Prisma - avoid N+1
const users = await prisma.user.findMany({
  include: { posts: true }  // one query with JOIN
});
`,
        codeLanguage: "javascript",
      },
    ],
  },
];

validateLearningSeed(sectionConfigs, IMG);
export const learningSections = buildLearningSections(sectionConfigs, IMG);
