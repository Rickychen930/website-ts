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

**Prerequisites:** Basic programming in one language (variables, loops, functions). If you are completely new, start with an introductory programming course first.

**By the end of this section you will:** Know the recommended study order, how long to spend per topic, and how to use active recall and bookmarks to remember better.`,
          material: `Each topic follows the same structure:
1. Learning flow → 2. Material → 3. Explanation → 4. Application → 5. How to implement → 6. Logic & code → 7. Example → 8. Additional info.

Suggested order: How to Learn → Competitive Programming → CS Theory → Database & SQL → Computer Networks → OS & Concurrency → System Design → React & Node.js → Security → Interview Preparation.`,
          explanation: `Order is chosen so foundations (algorithms, theory, DB, networks, OS) come before applied topics (React, Node, security). Interview Prep is useful to read early for planning and again before interviews.`,
          application: `Use this path for a full curriculum pass or for interview-only focus (CP, CS Theory, Networks, OS, System Design, Interview Prep).`,
          howToImplement: `- For each topic: read first, then summarize in your own words (1–2 sentences per section).
- Type the code from the example by hand; avoid copy-paste.
- Do 1–2 practice problems (e.g. LeetCode). If stuck, re-read the Logic section.
- Use Jump to and bookmarks to navigate. After each topic, do active recall (3 bullets from memory).`,
          logicAndCode: `The suggested order forms one learning path. Active recall works because retrieving information from memory strengthens long-term retention more than re-reading.`,
          example: `Problem: Forgetting topics after a few days.
Solution: Active recall — after reading, close the page and write 3 key points or explain to a peer. For coding: type the code yourself. Spaced repetition: revisit with practice problems weekly.`,
          additionalInfo: `Time: 15–30 min read + 15–30 min practice per topic. Full pass: 2–4 months with practice; interview-only: 2–6 weeks. Use LeetCode or Codeforces for CP.`,
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
      "Foundation for coding interviews: Big O, sorting, binary search, prefix sum, sliding window, greedy, DP, graphs, trees, and more. Start with Complexity & Strategy.",
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

Time vs space: you can often use extra memory (e.g. hash map) to reduce time.`,
          explanation: `Big O is an upper bound: we say an algorithm is O(n) if the number of steps is at most proportional to n for large n. One loop over n elements is O(n). Two nested loops over n each is O(n²). In interviews, state your complexity and justify it.`,
          application: `Use Big O to choose between algorithms (e.g. O(n log n) sort vs O(n²) bubble), to explain your solution in interviews, and to spot bottlenecks (e.g. loop inside a loop → O(n²)).`,
          howToImplement: `(1) Count loops: one pass over n = O(n); two nested loops each over n = O(n²).
(2) Prefer built-in sort (O(n log n)) unless the problem asks for custom sort.
(3) For fast lookups ("have I seen this value?"), use a hash map — O(1) per operation on average.
(4) See the code block below; run it, then modify and reason about the new complexity.`,
          logicAndCode: `- Loop O(n): Iteration from i=0 to n-1; each iteration does constant work. Total = n → O(n).
- Nested loop O(n²): Outer n times, inner n times → n×n = n².
- Two Sum O(n): One pass with map. For each x, check if (target - x) is in the map. If yes, pair found. Insert x after check. Lookup O(1) per element.`,
          example: `Problem: Two Sum — Given array nums and target, return indices of two numbers that add up to target. (LeetCode #1.)

Solution (C++): One pass with unordered_map<int,int> (value → index). For each nums[i], if (target - nums[i]) exists in map, return {map[target-nums[i]], i}. Otherwise map[nums[i]] = i. Time O(n), space O(n).`,
          additionalInfo: `Strategy: practice daily on Codeforces or LeetCode; focus on patterns (two pointers, sliding window, DP). Common complexities: O(1), O(log n), O(n), O(n log n), O(n²). Interview tip: State complexity when presenting; explain trade-off (e.g. O(n) time + O(n) space vs O(n²) time + O(1) space).`,
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
**Two pointers:** Two indices (e.g. i at start, j at end); move based on condition. On sorted array: if sum < target then increase left; if sum > target then decrease right. Often O(n). **When to use:** Sort when order helps (pairs, intervals); binary search for lookup or when answer is monotonic; two pointers for pairs or subarrays.`,
          explanation: `After sorting, many problems become easier: two pointers can find pairs with a given sum in O(n). Binary search works on the index space or on the answer space. Always clarify if the array is sorted or if you may sort it.`,
          application: `Sorting when order matters (pairs, merge intervals). Binary search for lookup in sorted data or when the answer is monotonic. Two pointers for pairs, subarrays, or removal in place.`,
          howToImplement: `(1) Sort with std::sort(a.begin(), a.end()) whenever you need ordered data.
(2) Binary search: range [lo, hi]; mid = lo + (hi - lo) / 2; compare a[mid] with target; set lo = mid + 1 or hi = mid - 1.
(3) Two pointers on sorted array: i=0, j=n-1; if a[i]+a[j]==target done; if sum < target then i++; else j--.`,
          logicAndCode: `Binary search: Each iteration halves the range → O(log n). Two pointers: i and j move toward each other; each step moves at least one pointer → O(n).`,
          example: `Problem: Two Sum II — Sorted array, find two numbers that add up to target. Return 1-based indices. (LeetCode #167.)

Solution: Two pointers. i=0, j=n-1; while(i<j) { if(a[i]+a[j]==target) return {i+1,j+1}; if(sum<target) i++; else j--; } Time O(n), space O(1).`,
          additionalInfo: `LeetCode: Two Sum, 3Sum, Binary Search. Use lo + (hi-lo)/2 to avoid overflow. Clarify if array is sorted; if not, ask if you may sort.`,
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
          material: `**Prefix sum:** Precompute pre[i] = a[0]+...+a[i-1] (so pre[0]=0, pre[1]=a[0], ...). Then sum(l..r) = pre[r+1]-pre[l] in O(1). Build in O(n); each range query O(1). **Sliding window:** Maintain contiguous segment [i,j]. Fixed size: move i and j together. Variable size: expand j until condition holds, then shrink i until invalid, update answer at each valid step; each element in/out at most twice → O(n). **When to use:** Prefix sum for range sum, "subarray sum equals K" (with map of prefix sums). Sliding window for "longest subarray with sum ≤ K", "minimum window containing all", max in each window of size k.`,
          explanation: `Prefix sum turns range-sum queries into two lookups. Sliding window avoids re-scanning by moving the window one step and updating state (e.g. frequency map). Both are one-pass O(n) or O(1) per query.`,
          application: `Prefix sum: range sum, count in range, subarray divisibility. Sliding window: max/min in window, longest substring with at most K distinct, minimum window substring.`,
          howToImplement: `(1) Build pre: pre[0]=0, then pre[i+1]=pre[i]+a[i]. Query: sum(l..r) = pre[r+1]-pre[l].
(2) Sliding window: two pointers i, j; extend j and update state; when invalid, shrink i until valid; update answer at each valid step.
(3) Subarray sum equals K: map that counts prefixes with a given sum; for each j, add count of prefixes with sum = (current_sum - K).`,
          logicAndCode: `pre[r+1]-pre[l] = a[l]+...+a[r]. Subarray sum K: for subarray ending at j, we want pre[j+1]-pre[i]=K → pre[i]=pre[j+1]-K. Count how many pre[i] we have seen equal to pre[j+1]-K.`,
          example: `Problem: Subarray Sum Equals K — Count subarrays with sum K. (LeetCode #560.)

Solution: cnt[0]=1. For each x: sum+=x; ans+=cnt[sum-K]; cnt[sum]++. Time O(n), space O(n).`,
          additionalInfo: `LeetCode: Subarray Sum Equals K, Longest Substring with At Most K Distinct, Minimum Window Substring. Variable window: expand right, shrink left while valid.`,
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
          material: `DP needs optimal substructure (best solution uses best sub-solutions) and overlapping subproblems. Define state (dp[i], dp[i][j]), recurrence, base case, and order. Memoization = top-down + cache; tabulation = bottom-up table.`,
          explanation: `State encodes the "position" in the problem. Recurrence relates state to smaller states. Fill in order so dependencies are ready. Space can often be optimized (e.g. one row for knapsack).`,
          application: `Classic: Fibonacci, Climbing Stairs, Coin Change, LIS, 0/1 knapsack, LCS, edit distance. Many string and sequence problems are DP.`,
          howToImplement: `(1) Write recurrence in words: "Best value for first i items with capacity w = max(skip: dp[i-1][w], take: value[i] + dp[i-1][w-weight[i]])."
(2) Base case: dp[0][w] = 0.
(3) Order: loop i from 1 to n, w from 0 to W. For space optimization: one row, loop w backwards.
(4) Return dp[n][W] or dp[W].`,
          logicAndCode: `0/1 Knapsack: dp[i][w] = max value with items 1..i, capacity w. Choices: skip i → dp[i-1][w]; take i (if fits) → val[i] + dp[i-1][w-weight[i]]. Space optimization: only one row; loop w backwards so dp[w-weight[i]] is not yet overwritten.`,
          example: `Problem: 0/1 Knapsack — n items (weight[], value[]), capacity W. Maximize total value. Each item at most once.

Solution: vector<int> dp(W+1, 0); for(i) for(w=W; w>=weight[i]; w--) dp[w]=max(dp[w], value[i]+dp[w-weight[i]]); return dp[W]. Time O(n*W), space O(W).`,
          additionalInfo: `LeetCode: Climbing Stairs, Coin Change, LIS, Partition Equal Subset Sum. Interview tip: Start with brute-force recursion → memoization → tabulation. Space optimization: knapsack iterate w backwards.`,
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
          material: `**Greedy:** At each step, make the locally best choice; hope it leads to global optimum. **When it works:** (1) Optimal substructure: optimal solution contains optimal solutions to subproblems. (2) Greedy choice property: local best choice is part of some global optimum. **Complexity:** Often O(n log n) if sorting, O(n) if one pass. **Classics:** Activity selection (sort by end time), interval scheduling, Huffman coding, coin change (unlimited coins, greedy if denominations allow). **When it fails:** 0/1 knapsack (need DP), shortest path with negative edges (Bellman–Ford).`,
          explanation: `Greedy doesn't backtrack; once you choose, you commit. Proof techniques: exchange argument (swap greedy choice into any solution), or induction (greedy choice extends to optimal). In interviews, state "I'll try greedy; we need to prove the greedy choice is safe."`,
          application: `Use for scheduling (earliest deadline first), encoding (Huffman), caching (LRU), and many interval/ordering problems. If the problem has "choose best at each step" and no obvious counterexample, try greedy.`,
          howToImplement: `(1) Sort if needed (e.g. by end time, by ratio).
(2) One pass: for each item, if it's "compatible" with current solution, add it.
(3) Prove: "Suppose an optimal solution doesn't take our first greedy choice; then we can swap and get at least as good a solution."`,
          logicAndCode: `Activity selection: sort by end time; take first; then take next that starts after last end. O(n log n). Coin change (1,5,10): take most 10s, then 5s, then 1s — works for canonical systems.`,
          example: `Problem: Activity Selection — n activities [start, end]; max number of non-overlapping activities.

Solution: Sort by end time. Take first activity; for each next, if start >= lastEnd, take it and update lastEnd. Time O(n log n), space O(1). Proof: greedy choice (earliest finishing) leaves maximum room for rest.`,
          additionalInfo: `LeetCode: Jump Game, Merge Intervals, Task Scheduler. Complexity: always state O(n) or O(n log n) and why. Interview: say "I'll try greedy" and give a one-line proof.`,
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
          material: `**Graph:** G = (V, E). **Adjacency list:** For each vertex, list of neighbors; space O(V+E); best for sparse graphs. **Adjacency matrix:** O(V²) space; O(1) edge lookup. **BFS:** Queue; explores level by level; **shortest path** in unweighted graph; time O(V+E), space O(V). **DFS:** Stack or recursion; explores depth-first; good for cycles, topological sort, backtracking; time O(V+E), space O(V) (or O(V) recursion stack). **Complexity:** V vertices, E edges; each vertex and edge processed once. **Directed vs undirected:** Undirected each edge stored twice in adj list.`,
          explanation: `BFS from source gives shortest path lengths in unweighted graph because we visit in order of distance. DFS visits all reachable nodes; use visited set to avoid infinite loop in cycles. For weighted graphs use Dijkstra or Bellman–Ford.`,
          application: `BFS: shortest path (unweighted), level order, multi-source BFS. DFS: cycle detection, topological sort, count components, path finding, backtracking.`,
          howToImplement: `(1) Build adj list: vector<vector<int>> adj(n); for each edge (u,v) adj[u].push_back(v); (undirected: adj[v].push_back(u)).
(2) BFS: queue, visited array; push source; while queue not empty: pop, for each neighbor if !visited push and mark.
(3) DFS: visited array; function dfs(u): mark u; for v in adj[u]: if !visited[v] dfs(v).`,
          logicAndCode: `Each vertex enqueued/pushed once, each edge examined once → O(V+E). Space: queue or stack holds at most O(V) nodes; visited O(V).`,
          example: `Problem: Number of Islands (grid of '1' and '0'; count connected components of '1').

Solution: For each cell, if '1' and not visited, run BFS or DFS to mark all connected '1', then count++. Time O(rows*cols), space O(rows*cols).`,
          additionalInfo: `LeetCode: Number of Islands, Course Schedule (topological), Clone Graph. Interview: state "BFS for shortest path, DFS for explore all"; complexity O(V+E).`,
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
    ],
  },
  {
    title: "Node.js",
    slug: "nodejs",
    description:
      "Event loop, async/await, Express, REST APIs, and backend best practices.",
    order: 2,
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
          material: `Node.js runs JavaScript on the server with a single-threaded event loop. I/O (file, network) is delegated to the system; when ready, callbacks are queued and run. **Event loop**: run one task from the queue; when the call stack is empty, take the next task. **Async patterns**: callbacks → Promises → async/await.`,
          explanation: `Blocking the event loop blocks the whole process. So we use async I/O: start the operation, pass a callback or return a Promise; when the operation completes, the callback (or .then) runs. async/await is syntax over Promises: await pauses the function until the Promise resolves.`,
          application: `Use async/await for any I/O: reading files, HTTP requests, database queries. Use Promise.all when multiple independent async operations can run in parallel.`,
          howToImplement: `(1) Prefer async/await over raw .then() for readability.
(2) Always handle errors: try/catch around await, or .catch() on the Promise.
(3) Export async route handlers in Express: (req, res) => { ... await ...; res.json(...); } and catch errors in middleware.
(4) For parallel work: const [a, b] = await Promise.all([fetchA(), fetchB()]);`,
          logicAndCode: `Event loop: one thread; queue of "tasks" (callbacks, microtasks). Run current task to completion; then run all microtasks (Promise callbacks); then next task. So await schedules the rest of the function as a microtask.`,
          example: `Problem: Read two files and merge their contents.

Solution: const [a, b] = await Promise.all([fs.promises.readFile('a.txt', 'utf8'), fs.promises.readFile('b.txt', 'utf8')]); return a + b; Use try/catch for missing files.`,
          additionalInfo: `Avoid blocking: don't use sync APIs (e.g. readFileSync) in request handlers. Use async middleware (express-async-errors or wrap in (fn) => (req, res, next) => fn(req, res, next).catch(next)).`,
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

**Prerequisites:** Event Loop & Async (Node.js); basic HTTP (from Computer Networks helps).

**By the end of this topic you will:** Build a minimal REST API with GET and POST, use express.json() and error middleware, and understand route and middleware order.`,
          material: `**Express** is a minimal web framework for Node. **Routes:** \`app.get(path, handler)\`, \`app.post(path, handler)\`; handler receives (req, res); use \`res.json(obj)\`, \`res.status(code)\`, \`res.send()\`. **Middleware:** Functions that run in order; \`next()\` passes to the next; \`express.json()\` parses request body into \`req.body\`. **REST:** Use HTTP methods (GET read, POST create, PUT replace, DELETE remove) and noun URLs (\`/api/users\`, \`/api/users/:id\`). **Error handling:** Define (err, req, res, next) middleware to return 500 and message. **Order matters:** Body parser and CORS before routes; error handler last.`,
          explanation: `Middleware runs in order; next() passes to the next middleware or route. res.json(obj) sets Content-Type and sends the body. Status codes: 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error.`,
          application: `Use Express for REST APIs, file uploads, server-rendered pages. Use middleware for auth, logging, CORS, rate limiting.`,
          howToImplement: `(1) const express = require('express'); const app = express(); app.use(express.json()).
(2) app.get('/api/items', (req, res) => res.json(items)); app.post('/api/items', (req, res) => { ...; res.status(201).json(newItem); }).
(3) app.listen(PORT, () => console.log('Listening on', PORT)); (4) Handle errors in middleware: (err, req, res, next) => res.status(500).json({ error: err.message });`,
          logicAndCode: `express.json() reads the request body and puts it in req.body. Route handlers run when the path and method match. Order of middleware matters: put body parsers and CORS before routes.`,
          example: `Problem: Expose a list of items as GET /api/items and add one via POST /api/items.

Solution: const items = []; app.get('/api/items', (req, res) => res.json(items)); app.post('/api/items', (req, res) => { const item = { id: Date.now(), ...req.body }; items.push(item); res.status(201).json(item); });`,
          additionalInfo: `Use environment variables for PORT and secrets. In production use helmet(), rate limiting, and validate input. For async handlers use express-async-errors or wrap in try/catch and next(err).`,
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
          material: `**SELECT**: choose columns; FROM table; WHERE conditions; ORDER BY; LIMIT.
**JOIN**: INNER JOIN (only matching rows), LEFT JOIN (all from left, match from right). ON condition.
**GROUP BY**: group rows by column(s); use with COUNT, SUM, AVG, MAX, MIN. HAVING filters after aggregation.
**Subquery**: use (SELECT ...) as a value or in IN / EXISTS.`,
          explanation: `JOIN connects tables by a key; INNER keeps only rows that match in both. LEFT JOIN keeps all left rows and fills NULL for right when no match. GROUP BY collapses rows into one per group; aggregates compute over each group.`,
          application: `Use JOIN for related data (users + orders). Use GROUP BY for counts and sums (orders per user, total by category). Use subqueries when you need a list or single value from another table.`,
          howToImplement: `(1) Start with FROM and JOIN to list tables; add ON.
(2) Add WHERE for filters (before grouping).
(3) Add GROUP BY columns; add SELECT aggregates and grouped columns.
(4) Add HAVING if you need to filter by aggregate.
(5) Add ORDER BY and LIMIT last.`,
          logicAndCode: `SELECT runs in logical order: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT (aggregates) → ORDER BY → LIMIT. Write in that order when building a query.`,
          example: `Problem: List users with the count of their orders.

Solution: SELECT u.id, u.name, COUNT(o.id) AS order_count FROM users u LEFT JOIN orders o ON o.user_id = u.id GROUP BY u.id, u.name;`,
          additionalInfo: `Use meaningful aliases (u, o). Prefer JOIN over multiple FROM + WHERE for clarity. Index columns used in WHERE and JOIN. In interviews, state schema and then write the query step by step.`,
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
          material: `**Index:** Data structure (usually B-tree) that lets the DB find rows by key without scanning the whole table. **When to index:** Columns in WHERE, JOIN ON, ORDER BY; primary key and foreign keys usually auto-indexed. **Composite index:** (a, b) helps WHERE a=? AND b=? or ORDER BY a, b; order of columns matters. **EXPLAIN:** Shows query plan; look for "Seq Scan" (bad) vs "Index Scan" (good). **Cost:** Indexes speed reads but slow writes (insert/update must update index). **Covering index:** Index includes all columns needed so DB doesn't touch table. **Full table scan:** When no index or index not selective; avoid on large tables.`,
          explanation: `B-tree allows O(log n) lookup by key. Without index, DB scans every row (O(n)). Composite index (a, b) can be used for "a = ?" or "a = ? AND b = ?" but not for "b = ?" alone. EXPLAIN shows which index is used.`,
          application: `Use for production DBs: index columns in frequent filters and joins; run EXPLAIN on slow queries; add index and measure. In interviews: explain why a query is slow and how you'd fix it.`,
          howToImplement: `(1) CREATE INDEX idx_users_email ON users(email); CREATE INDEX idx_orders_user_created ON orders(user_id, created_at); (2) EXPLAIN SELECT * FROM users WHERE email = 'x'; (3) If "Seq Scan", add index on email. (4) Avoid SELECT * when you need few columns; consider covering index.`,
          logicAndCode: `Query planner chooses index if it estimates lower cost. High selectivity (many distinct values) = index useful; low (e.g. boolean) = often full scan anyway. N+1: many small queries; fix with JOIN or IN (SELECT ...).`,
          example: `Problem: SELECT * FROM orders WHERE user_id = 123 AND created_at > '2024-01-01' is slow.

Solution: CREATE INDEX idx_orders_user_created ON orders(user_id, created_at); EXPLAIN shows Index Scan using idx_orders_user_created. If still slow, check if table is huge and consider partitioning by date.`,
          additionalInfo: `PostgreSQL: EXPLAIN ANALYZE runs query and shows actual time. MySQL: EXPLAIN; check "type" (ref good, ALL bad). Index types: B-tree (default), Hash (equality), GIN (array/JSON).`,
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
          material: `React is a library for building UIs with components. Each component is a function (or class) that returns JSX. JSX is syntax sugar for React.createElement(type, props, ...children). Components can receive props and render other components.`,
          explanation: `Components let you split the UI into reusable pieces. JSX looks like HTML but is JavaScript; you can embed expressions with {}. The key prop is required when rendering lists so React can track identity.`,
          application: `Use components for buttons, cards, forms, pages. Use props for configuration and data. Use key when mapping over arrays.`,
          howToImplement: `(1) Create a .jsx or .tsx file; export a function that returns JSX.
(2) Accept props as the first argument; use them inside JSX with {props.name}.
(3) For lists: array.map(item => <Item key={item.id} {...item} />).`,
          logicAndCode: `React compares the previous and current element tree (virtual DOM). When state or props change, the component re-runs and React updates the real DOM only where needed. key helps React match list items correctly.`,
          example: `Problem: Display a list of users with name and email.

Solution: const UserList = ({ users }) => ( <ul> {users.map(u => <li key={u.id}>{u.name} — {u.email}</li>)} </ul> );`,
          additionalInfo: `Use PascalCase for components, camelCase for props. Avoid mutating props. Prefer function components + hooks over class components.`,
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
          material: `**Hooks** let you use state and other React features in function components. **useState(initial)** returns [value, setter]; call setter to update and re-render. **useEffect(fn, deps)** runs fn after render; deps = [] runs once (mount), deps = [x] when x changes. Rules: only call hooks at the top level (not inside loops/conditions); only call from React function components or custom hooks.`,
          explanation: `useState keeps state across re-renders; each call to setState schedules an update. useEffect runs after the browser has painted; the cleanup (if you return a function) runs before the next effect or unmount. Custom hooks are functions that call other hooks so you can reuse logic.`,
          application: `Use useState for form fields, toggles, counters. Use useEffect for subscriptions, fetching data, syncing with DOM or external APIs. Use custom hooks to share logic (e.g. useDebounce, useLocalStorage).`,
          howToImplement: `(1) useState: const [value, setValue] = useState(initial); in event handler call setValue(newValue) or setValue(prev => prev + 1).
(2) useEffect: useEffect(() => { ...; return () => cleanup; }, [dep1, dep2]); empty deps = run once.
(3) Custom hook: function useMyHook() { const [state, setState] = useState(...); ...; return state; }`,
          logicAndCode: `React tracks hooks by call order, so you must not call them conditionally. setState is async; React batches updates. useEffect runs after commit; cleanup runs in reverse order of effect registration.`,
          example: `Problem: Counter that increments and shows document.title in sync.

Solution: const [n, setN] = useState(0); useEffect(() => { document.title = \`Count: \${n}\`; }, [n]); return <button onClick={() => setN(c => c + 1)}>{n}</button>;`,
          additionalInfo: `Other hooks: useRef (mutable ref), useContext (read context), useMemo/useCallback (memoization). Don't use hooks in class components. ESLint plugin react-hooks enforces the rules.`,
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
          material: `**Context:** Provides a value to all descendants without passing props at every level. CreateContext(default), Provider, useContext. **When to use:** Theme, locale, current user. **State management:** Local state (useState) for component-only; lift state up for sharing between siblings; Context for app-wide but not high-frequency updates; Redux/Zustand for complex global state or many subscribers. **Redux:** Single store, actions, reducers; good for predictable updates and DevTools. **Zustand:** Simpler API, less boilerplate.`,
          explanation: `Context triggers re-render of all consumers when value changes; avoid putting frequently changing data in Context (use state library instead). Context is great for "set once" or "changes rarely" data like theme or user.`,
          application: `Use Context for theme, auth user, locale. Use Redux/Zustand for cart, form state across pages, or when many components need the same data with frequent updates.`,
          howToImplement: `(1) const ThemeContext = createContext('light'); (2) Wrap tree: <ThemeContext.Provider value={theme}>; (3) In child: const theme = useContext(ThemeContext). (4) For global state: consider createContext + useReducer, or add Zustand/Redux.`,
          logicAndCode: `Provider re-renders consumers when value identity changes. So pass value={useMemo(() => ({ user, login }), [user])} to avoid unnecessary re-renders.`,
          example: `Problem: Pass theme (dark/light) to many nested components without prop drilling.

Solution: ThemeContext with default 'light'; App wraps with <ThemeContext.Provider value={theme}>; any child does const theme = useContext(ThemeContext) and uses it.`,
          additionalInfo: `Don't overuse Context for everything; it re-renders all consumers. For forms: React Hook Form or Formik. For server state: React Query or SWR.`,
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
          material: `**React Router:** Declarative routing. BrowserRouter, Routes, Route path="/" element={<Home />}, Route path="/user/:id". **Hooks:** useParams() for :id, useNavigate() for programmatic navigation, useLocation() for current path. **Data fetching:** In useEffect, call fetch() or axios; set loading true → fetch → set data and loading false; handle errors. **React Query:** useQuery(key, fetchFn) gives data, isLoading, error, refetch; caching and deduplication built-in. **SWR:** Similar; stale-while-revalidate.`,
          explanation: `Router matches first Route that fits; put specific routes before generic. Fetch in useEffect with empty deps for "on mount"; cleanup with abort controller if component unmounts. React Query avoids duplicate requests and gives cache.`,
          application: `Use Router for multi-page SPA. Use useEffect + fetch for simple cases; React Query for lists, detail pages, and when you need cache/refetch.`,
          howToImplement: `(1) <Routes><Route path="/" element={<Home />} /><Route path="/user/:id" element={<User />} /></Routes>. (2) In User: const { id } = useParams(); useEffect(() => { fetch(\`/api/users/\${id}\`).then(r=>r.json()).then(setUser); }, [id]); (3) Show loading and error in JSX.`,
          logicAndCode: `useEffect runs after paint; so you'll see loading first, then data. For React Query: data is cached by query key; same key = same cache; refetch on window focus or interval if configured.`,
          example: `Problem: User list page and user detail page; fetch user by id on detail.

Solution: Route path="/users/:id"; in component const { id } = useParams(); useEffect(() => { fetch(...).then(setUser); }, [id]); return loading ? <Spinner /> : <Profile user={user} />;`,
          additionalInfo: `React Router v6: use Routes not Switch; element not component. Lazy load routes with React.lazy and Suspense. For auth: protect routes with a wrapper that checks token and redirects.`,
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
          material: `Typical flow: (1) Clarify problem (inputs, outputs, edge cases). (2) Work through 1–2 examples. (3) Describe approach (brute force first, then optimize). (4) State time/space complexity. (5) Code clearly. (6) Test with examples and edge cases.`,
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
          additionalInfo: `Practice on LeetCode (Easy/Medium). Do mock interviews (Pramp, Interviewing.io). Review patterns: two pointers, sliding window, DP, BFS/DFS.`,
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

**Prerequisites:** System Design Basics (or equivalent); you have built or discussed at least one backend or API.

**By the end of this topic you will:** Run a system design interview (clarify, scale, diagram, deep dive) and answer behavioral questions using STAR with 3–5 prepared stories.`,
          material: `**System design flow:** (1) Clarify requirements (functional, non-functional, scale). (2) Estimate: QPS, storage, bandwidth. (3) High-level: clients, LB, app servers, DB, cache. (4) Deep dive: one component (e.g. DB schema, cache strategy). (5) Trade-offs and bottlenecks. **Behavioral (STAR):** Situation (context), Task (your goal), Action (what you did), Result (outcome, metric). Prepare stories for: conflict with teammate, missed deadline, leadership, learning something new, failure and recovery. **Common questions:** "Tell me about a time you disagreed with a colleague." "Describe a challenging project." "How do you prioritize?"`,
          explanation: `System design shows you can think at scale; no single "correct" answer. Interviewers want structure and trade-off discussion. Behavioral shows soft skills; STAR keeps answers concise and concrete.`,
          application: `Use for any senior or full-stack interview. System design: 30–45 min; practice 5–10 designs. Behavioral: 2–3 min per answer; have 5 stories that you can adapt.`,
          howToImplement: `(1) System design: Start with "Who are the users? What do they do?" Then "What's the scale?" Then draw diagram. Say "I'll focus on X next" and go deep. (2) Behavioral: Pick a story that fits; 1 min situation+task, 1–2 min action, 30 sec result. End with what you learned.`,
          logicAndCode: `Scale estimate: 1M DAU → ~100 QPS average; 1K QPS write → 86M rows/day. System design: no code unless asked; pseudocode or "we'd use a queue" is enough.`,
          example: `Problem: "Design a rate limiter."

Clarify: Per user? Per IP? Limit by requests per minute? High-level: Client → API → rate limiter (check counter) → backend. Rate limiter: sliding window or token bucket; store in Redis (key=user_id, value=count or timestamp). Deep dive: token bucket algorithm; Redis INCR + EXPIRE.`,
          additionalInfo: `Books: Designing Data-Intensive Applications. Practice: ByteByteGo, Exponent. Behavioral: use job description to predict themes; prepare 1 story per theme.`,
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

**Prerequisites:** Basic idea of client-server, databases, and APIs (from Node/Backend or Computer Networks topics).

**By the end of this topic you will:** Clarify requirements and estimate scale (QPS, storage), draw a standard high-level design, and discuss trade-offs (e.g. SQL vs NoSQL, cache strategy).`,
          material: `**Requirements:** Functional (what the system does), non-functional (latency, availability, consistency). **Scale:** QPS (queries per second), DAU, storage growth. **Components:** Load balancer (distribute traffic), app servers (stateless, scale out), database (persistence), cache (reduce DB load). **CAP:** Consistency, Availability, Partition tolerance — pick two.`,
          explanation: `Start with requirements so you don't over-engineer. Back-of-envelope: 1M DAU → ~10–100 QPS average; peak 2–3×. Load balancer + multiple app servers give horizontal scaling. Cache (e.g. Redis) for hot data reduces DB load. Replication and sharding for DB scale.`,
          application: `Use in system design interviews: clarify scope, estimate numbers, draw diagram, discuss bottlenecks and trade-offs. Common topics: URL shortener, chat, news feed, rate limiter.`,
          howToImplement: `(1) Clarify: "Is this read-heavy or write-heavy? Latency requirement? Consistency vs availability?"
(2) Estimate: QPS, storage per year, bandwidth.
(3) High-level: Client → LB → App servers → DB; add cache between app and DB if read-heavy.
(4) Deep dive: DB schema, cache invalidation, scaling strategy.`,
          logicAndCode: `Load balancer: round-robin or least connections. Cache: write-through or cache-aside. DB: primary-replica for reads; sharding by key (e.g. user_id) for write scale.`,
          example: `Problem: Design a URL shortener (e.g. bit.ly).

Solution: (1) API: POST /shorten (long URL → short code), GET /:code (redirect). (2) Short code: base62 of auto-increment ID or hash. (3) Storage: DB (id, long_url, short_code, created_at). (4) Scale: cache short_code → long_url; DB shard by id. (5) Redirect: 301 (permanent) or 302 (track clicks).`,
          additionalInfo: `Books: Designing Data-Intensive Applications. Practice: ByteByteGo, System Design Interview. Interview: state assumptions, draw clearly, discuss trade-offs.`,
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
          material: `**Cache-aside:** App checks cache; on miss, load from DB and write to cache. **Write-through:** Write to cache and DB together. **Write-behind:** Write to cache; async flush to DB (faster, risk of loss). **Replication:** Primary takes writes; replicas replicate; read from replicas to scale reads. **Sharding:** Partition data by key (e.g. user_id); each shard is a DB; scale writes. **Message queue:** Producer pushes message; consumer(s) process async. Use for: async tasks (email, image processing), decoupling, load leveling. **Kafka/RabbitMQ:** Kafka = log, multiple consumers; RabbitMQ = queues, routing. **Consistency:** Cache invalidation (invalidate on write); eventual consistency when using async replication or queues.`,
          explanation: `Cache reduces DB load for hot data; invalidation is hard (TTL or invalidate on write). Sharding spreads write load but adds complexity (cross-shard queries, rebalancing). Queues let you process in background and retry on failure.`,
          application: `Use cache for read-heavy (e.g. profile, feed). Use queue for "fire and forget" (send email, generate thumbnail). Use sharding when single DB can't handle write volume. In interviews: draw cache layer and queue in diagram; discuss consistency.`,
          howToImplement: `(1) Cache: Redis; key = entity id, value = JSON; TTL 5–60 min; on write delete key or update. (2) Queue: push job (e.g. { type: 'email', to, body }) to Redis list or RabbitMQ; worker pops and processes. (3) Sharding: choose shard by hash(user_id) % N; store mapping.`,
          logicAndCode: `Cache hit = read from cache; miss = read DB, set cache. Queue: at-least-once (ack after process; redeliver if crash) vs at-most-once. Shard key must distribute evenly; avoid hot shards.`,
          example: `Problem: Design a news feed; millions of users, each follows hundreds; feed = recent posts from followees.

Solution: (1) Write path: on new post, push to queue; worker fans out to each follower's feed cache (list in Redis). (2) Read path: get feed from Redis; if miss, rebuild from DB (or precompute). (3) Alternative: pull model — on read, get followees, fetch recent posts, merge (simpler but slower).`,
          additionalInfo: `Cache: consider cache stampede (many requests miss at once); use lock or probabilistic early expiry. Queue: idempotent consumers to handle retries. DDIA book: Part II (replication, partitioning).`,
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
      "Graphs, trees, and fundamental data structures for interviews and problem-solving.",
    order: 7,
    published: true,
    topics: [
      {
        id: "graphs-and-trees",
        title: "Graphs & Trees",
        description: "BFS, DFS, tree traversal, and when to use each.",
        order: 0,
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
          material: `**Graph:** Vertices + edges. Represent as adjacency list (list of neighbors per node) or matrix. **Tree:** Connected acyclic graph; has root. **BFS:** Queue; level-by-level; shortest path in unweighted graph. **DFS:** Stack or recursion; explore depth-first; cycles, topological order. **Tree traversal:** Inorder (left, root, right), preorder (root, left, right), postorder (left, right, root).`,
          explanation: `BFS guarantees shortest path in unweighted graphs because we visit nodes in order of distance. DFS is simpler for "visit all" or when you need to backtrack. Inorder on BST gives sorted order.`,
          application: `BFS: level-order tree, shortest path, word ladder. DFS: cycle detection, topological sort, path finding, connected components. Tree: BST operations, LCA, diameter.`,
          howToImplement: `(1) BFS: queue.push(start); while (queue) { node = queue.shift(); visit(node); for (neighbor of node) queue.push(neighbor); }
(2) DFS recursive: visit(node); for (child of node) dfs(child);
(3) DFS iterative: stack.push(start); while (stack) { node = stack.pop(); visit(node); push neighbors. }
(4) Tree inorder: if (!node) return; inorder(node.left); process(node); inorder(node.right);`,
          logicAndCode: `BFS: first-in-first-out ensures we process by level. DFS: last-in-first-out (stack) or call stack (recursion) goes deep first. Mark visited to avoid cycles in graphs.`,
          example: `Problem: Binary Tree Level Order Traversal (LeetCode #102).

Solution: BFS with queue. While queue not empty: record level size, pop that many nodes, add values to level list, push children. Push each level to result. Time O(n), space O(width).`,
          additionalInfo: `LeetCode: Number of Islands (DFS/BFS), Course Schedule (topological sort), Binary Tree Max Depth. Interview: state BFS vs DFS choice; watch for cycles (use visited set).`,
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
        order: 1,
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
          material: `**Heap:** Complete binary tree; min-heap (root = minimum) or max-heap (root = maximum). **Operations:** insert O(log n), extract-min O(log n), peek O(1). **Use:** Priority queue, top K, merge K sorted, Dijkstra. **Language:** C++ priority_queue; Python heapq; Java PriorityQueue. **Trie:** Root to leaf = string; each node has up to 26 (or 256) children. **Operations:** insert O(m), search O(m), prefix search O(m + k) for k matches. **Use:** Autocomplete, spell check, IP routing. **Other:** Segment tree (range queries), Fenwick tree (prefix sum updates), DSU (disjoint set union for connected components). **Complexity:** Heap insert/extract O(log n); trie per key O(m).`,
          explanation: `Heap keeps min/max at root; after extract, we heapify (bubble down). Top K: keep min-heap of size K; if new element > min, pop min and push new; at end heap contains K largest. Trie compresses common prefixes; good for "all keys with prefix X".`,
          application: `Heap: Kth largest, merge K lists, task scheduler (by frequency). Trie: autocomplete, word search. In CP: segment tree for range sum/min and point updates.`,
          howToImplement: `(1) Min-heap top K: heap = []; for x in arr: if len(heap) < K: heappush(heap, x); else if x > heap[0]: heapreplace(heap, x). (2) Trie: node has children dict; insert: for char in word, go to child or create; set node.is_end = True. (3) Prefix search: traverse to prefix node; DFS to collect all is_end below.`,
          logicAndCode: `Heap is stored as array; parent at i has children at 2i+1, 2i+2. Heapify: compare with children, swap with smaller (min-heap), repeat. Trie: each node = map char → next node.`,
          example: `Problem: Kth Largest Element in Stream (LeetCode #703).

Solution: Keep min-heap of size K. On add: if heap size < K, push; else if val > heap[0], pop then push val. Return heap[0] for getKthLargest. Time O(log K) per add, space O(K).`,
          additionalInfo: `LeetCode: Top K Frequent, Merge K Sorted Lists, Implement Trie, Word Search II. Interview: state "heap for top K" or "trie for prefix"; give complexity.`,
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
    order: 8,
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
          material: `**HTTP:** Application-layer protocol; request (method, URL, headers, body) and response (status, headers, body). **Methods:** GET (idempotent), POST (create), PUT (replace), DELETE. **Status:** 2xx success, 3xx redirect, 4xx client error, 5xx server error. **TCP:** Connection-oriented, reliable, ordered; three-way handshake. **UDP:** No connection, no guarantee; used for streaming, DNS. **DNS:** Resolves domain to IP; cached at OS and resolver.`,
          explanation: `When you type a URL: DNS lookup → TCP connection → HTTP request → server response → render. HTTPS adds TLS (encryption). REST uses HTTP methods and status codes to represent resources and actions.`,
          application: `Use HTTP semantics in REST APIs. Understand TCP for "why connection matters" (latency, keep-alive). DNS for caching and CDN. In interviews: explain "what happens when you hit Enter".`,
          howToImplement: `(1) REST: GET /users (list), GET /users/:id (one), POST /users (create), PUT /users/:id (update), DELETE /users/:id (delete).
(2) Return correct status: 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error.
(3) Headers: Content-Type (application/json), Authorization (Bearer token).`,
          logicAndCode: `HTTP is stateless: each request has everything needed. TCP ensures bytes arrive in order and retransmits on loss. TLS sits on top of TCP and encrypts the payload.`,
          example: `Problem: "What happens when you type https://google.com and press Enter?"

Solution: (1) DNS lookup: google.com → IP. (2) TCP 3-way handshake to IP:443. (3) TLS handshake. (4) HTTP GET / over TLS. (5) Server responds with HTML. (6) Browser parses, loads assets (CSS, JS), renders.`,
          additionalInfo: `Status codes to know: 200, 201, 204, 301, 302, 400, 401, 403, 404, 500. Idempotent: GET, PUT, DELETE (same result if repeated). Safe: GET (no side effects).`,
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
    order: 9,
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
          material: `**Process:** Independent program in execution; own memory space; created by fork/spawn; heavy (separate memory). **Thread:** Lightweight unit inside a process; shares memory with other threads; cheaper to create. **Race condition:** Result depends on order of execution; occurs when two+ threads read/write shared mutable state without synchronization. **Mutex (lock):** Only one thread holds the lock; others block until it is released; protects critical section. **Deadlock:** Two or more threads each hold a lock and wait for the other's lock → no progress. **Avoiding deadlock:** Lock ordering (always acquire A then B); timeouts; or design without circular wait. **Concurrency vs parallelism:** Concurrency = managing many tasks (e.g. async I/O); parallelism = executing at the same time (multiple cores).`,
          explanation: `Processes are isolated (crash in one doesn't kill others) but slower to create and communicate (IPC). Threads share memory so they need synchronization (locks, atomics) to avoid races. In Node.js, one thread runs JS; I/O is delegated. In Go/Java, many goroutines/threads can run concurrently.`,
          application: `Use when designing multi-threaded servers, job queues, or discussing scalability. "Horizontal scaling" often means more processes (or containers); "thread pool" means threads within one process.`,
          howToImplement: `(1) Identify shared state that multiple threads write.
(2) Protect with mutex: lock before read/write, unlock after.
(3) Avoid deadlock: always acquire locks in same order (e.g. A then B).
(4) Prefer higher-level constructs: queues, atomics, or single-threaded + async (Node).`,
          logicAndCode: `Lock ensures mutual exclusion: only one thread in critical section. If thread A holds L1 and wants L2, and thread B holds L2 and wants L1 → deadlock. Fix: both acquire L1 then L2.`,
          example: `Problem: Thread-safe counter. Multiple threads increment; final count must equal total increments.

Solution: Use a mutex. Before count++, lock(mutex); after count++, unlock(mutex). Or use atomic increment if available (e.g. atomic_int in C++, AtomicInteger in Java).`,
          additionalInfo: `Concurrency vs parallelism: concurrency = dealing with many things; parallelism = doing many things at once. Node.js: concurrent (async I/O), single-threaded for JS. Interview: explain process vs thread, when you'd use locks.`,
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
    order: 10,
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

**Prerequisites:** Basic backend (routes, database queries) and frontend (displaying user content).

**By the end of this topic you will:** Explain auth vs authz, why HTTPS and password hashing matter, and how to prevent XSS and SQL injection in code.`,
          material: `**Authentication:** Verify identity (e.g. password, OAuth). **Authorization:** Check permissions (e.g. role-based access). **HTTPS:** TLS encrypts client-server traffic; prevents eavesdropping and tampering. **XSS:** Attacker injects script into page; prevent by escaping output and Content-Security-Policy. **SQL injection:** User input in query string; prevent with parameterized queries. **Password:** Store hashed (bcrypt, argon2); never plain text. **CSRF:** Forged request from other site; prevent with SameSite cookie or CSRF token.`,
          explanation: `Auth is "login"; authorization is "can this user do X?". Hashing is one-way (can't get password from hash); use salt to avoid rainbow tables. Parameterized queries send input as data, not as part of SQL string.`,
          application: `Use in every web app: HTTPS in production, hash passwords, parameterized queries, validate and sanitize input, set secure headers (e.g. helmet in Express).`,
          howToImplement: `(1) Passwords: hash with bcrypt (cost factor 10–12); compare with bcrypt.compare(plain, hash).
(2) SQL: use parameterized queries — db.query("SELECT * FROM users WHERE id = ?", [id]).
(3) XSS: escape user content in HTML; or use framework that escapes by default (React).
(4) HTTPS: use TLS certificate; redirect HTTP to HTTPS.`,
          logicAndCode: `bcrypt hashes with salt; same password → different hashes each time; verify with compare. Parameterized query: DB driver treats input as data, not SQL. Escaping: convert < to &lt; so browser doesn't run script.`,
          example: `Problem: Prevent SQL injection when searching users by name.

Solution: Never concatenate: "SELECT * FROM users WHERE name = '" + input + "'". Use parameterized: query("SELECT * FROM users WHERE name = ?", [input]). Driver escapes input.`,
          additionalInfo: `OWASP Top 10: injection, broken auth, XSS, broken access control, security misconfiguration, etc. Interview: explain auth vs authz, how you'd secure an API, what HTTPS does.`,
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
      "OOP, SOLID, DRY, KISS, and clean code for maintainable software.",
    order: 11,
    published: true,
    topics: [
      {
        id: "oop-solid-dry-kiss",
        title: "OOP, SOLID, DRY & KISS",
        description:
          "Object-oriented design, SOLID principles, and simplicity.",
        order: 0,
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
          material: `**OOP:** Encapsulation (bundle data + methods; hide internals). Inheritance (reuse via is-a). Polymorphism (same interface, different behavior). Abstraction (hide complexity behind interface). **SOLID:** (S) One class, one reason to change. (O) Open for extension, closed for modification. (L) Subtypes must be substitutable for base. (I) Many specific interfaces better than one fat. (D) Depend on abstractions, not concretions. **DRY:** Every piece of knowledge in one place. **KISS:** Prefer simple over clever. **YAGNI:** You Aren't Gonna Need It — don't build ahead.`,
          explanation: `SOLID reduces coupling and makes code testable and changeable. DRY avoids bugs from updating in multiple places. KISS keeps code readable. Dependency injection (D) lets you swap implementations and test with mocks.`,
          application: `Use in every codebase: small classes (S), extend with new types not by editing old (O), design interfaces so callers don't depend on details (D). Refactor duplicated logic into one function or module (DRY).`,
          howToImplement: `(1) Extract small classes; name by responsibility. (2) Depend on interfaces/abstract classes; inject concrete in main or tests. (3) Replace copy-paste with shared function or component. (4) Simplify: remove unused code, split long functions.`,
          logicAndCode: `Single Responsibility: one class = one job. Dependency Inversion: high-level module imports interface; low-level implements it; inject at runtime. DRY: if you change logic in two places, extract to one.`,
          example: `Problem: Payment module has validation, API call, and email logic in one class.

Solution: Split into Validator, PaymentGateway, and Notifier; PaymentService depends on their interfaces; inject implementations. Each class has one reason to change.`,
          additionalInfo: `Books: Clean Code (Martin), Design Patterns (GoF). Interview: explain S and D with example; when you refactored for SOLID or DRY.`,
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
    ],
  },
  {
    title: "English for IELTS 8",
    slug: "english-learning",
    description:
      "Complete preparation for IELTS band 8: Listening, Reading, Writing, Speaking, vocabulary and grammar.",
    order: 12,
    published: true,
    topics: [
      {
        id: "ielts-8-complete-guide",
        title: "IELTS 8 Complete Guide",
        description:
          "Strategies and practice for Listening, Reading, Writing, Speaking to achieve band 8.",
        order: 0,
        imageKey: "english",
        contentBlocks: {
          learningFlow: [
            "Understand the four sections: Listening (4 parts), Reading (3 passages), Writing (Task 1 + 2), Speaking (3 parts).",
            "Learn band 8 criteria: fluency, coherence, lexical resource, grammatical range, pronunciation (Speaking); task response, coherence, vocabulary, grammar (Writing).",
            "Practice with official materials: do full tests under timed conditions; review answers and band descriptors.",
            "Build vocabulary (academic word list, collocations) and grammar (complex sentences, variety) for Writing and Speaking.",
          ],
          learningFlowIntro: `**Your first step:** Do one full practice test (e.g. Cambridge IELTS) under timed conditions, then read the band descriptors for Writing and Speaking to see what "8" means.

**Prerequisites:** English at roughly B2–C1 (comfortable reading and speaking); familiarity with exam format helps.

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
          additionalInfo: `Tools: SQL (PostgreSQL, BigQuery), Excel/Google Sheets, Looker Studio, Tableau. Next step: Python (pandas) for larger data and automation.`,
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
    order: 14,
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
          additionalInfo: `Sklearn: fit/predict API. Next: regularization (Ridge, Lasso), cross-validation, hyperparameter tuning (GridSearchCV). Then: deep learning (PyTorch/TensorFlow).`,
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
    order: 15,
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
          additionalInfo: `C++17: structured bindings, optional. C++20: ranges. CP: know segment tree, Fenwick, DSU. Books: Competitive Programmer's Handbook, CP-Algorithms.`,
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
          additionalInfo: `Style: PEP 8; black for format. Async: asyncio, async def. Testing: pytest. Packaging: pyproject.toml, pip install -e .`,
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
          additionalInfo: `Handbook: typescriptlang.org/docs. React: use type for props; useState<User | null>. Node: type env with process.env. Zod or io-ts for runtime validation.`,
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
    order: 16,
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

**Prerequisites:** HTTP & TCP Basics or Express & REST; you have built or used at least one API.

**By the end of this topic you will:** Design a REST API with clear resources and status codes, and document it (e.g. OpenAPI) for clients and tests.`,
          material: `**REST:** Representational State Transfer. **Resources:** URL = noun (e.g. /users, /users/1). **Methods:** GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE (remove). **Status:** 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error. **Versioning:** URL /v1/users or header Accept-Version. **Documentation:** OpenAPI (Swagger); describe paths, params, body, responses. **Errors:** JSON body { "error": "code", "message": "human message" }. **Pagination:** ?page=1&limit=20 or cursor-based. **Filtering:** ?status=active&sort=-createdAt.`,
          explanation: `REST uses HTTP semantics; clients and caches understand GET is safe and idempotent. Consistent status codes and error format make clients easier to write. OpenAPI enables codegen and testing.`,
          application: `Use for any backend API: mobile app, SPA, or service-to-service. Design first (resources and operations), then implement. Version when you break compatibility.`,
          howToImplement: `(1) GET /users → list; GET /users/:id → one; POST /users → create (body); PUT /users/:id → replace; DELETE /users/:id. (2) Return 201 for POST with Location header. (3) Validate body (e.g. Joi, Zod); return 400 with message. (4) OpenAPI: paths, components/schemas.`,
          logicAndCode: `Idempotent: GET, PUT, DELETE (same result if repeated). Safe: GET (no side effect). POST is neither. Use PUT when client sends full resource; PATCH for partial.`,
          example: `Problem: Design API for "tasks" (title, status, dueDate).

Solution: GET /tasks (list, ?status=open); GET /tasks/:id; POST /tasks (body: title, dueDate); PATCH /tasks/:id (body: status); DELETE /tasks/:id. Return 200 + body for GET/PATCH; 201 + body for POST; 204 for DELETE.`,
          additionalInfo: `GraphQL is alternative (single endpoint, client queries shape). gRPC for performance. REST is most common; know it well.`,
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
          material: `**Auth:** Register (hash password, store user); login (verify password, issue JWT or set session cookie). **JWT:** Header.payload.signature; payload has userId, exp; sign with secret; client sends in Authorization: Bearer <token>. **OAuth:** Redirect to provider (Google, GitHub); callback with code; exchange for token; create or link user. **SQL:** Relational; ACID; schema; JOIN; use for structured, transactional data. **NoSQL:** Document (MongoDB), key-value; flexible schema; scale horizontally; use for logs, catalogs. **ORM:** Map tables to classes; migrations for schema changes. **Pooling:** Reuse DB connections; limit pool size. **Indexes:** Speed up WHERE, JOIN; cost on writes. **N+1:** Loop + query per item; fix with eager load or batch.`,
          explanation: `JWT is stateless; server verifies signature. Session is stateful; store session id in cookie. SQL gives consistency and relations; NoSQL gives flexibility. ORM abstracts SQL but know the generated queries.`,
          application: `Use JWT for APIs (SPA, mobile); sessions for server-rendered. Use SQL for users, orders, reporting; NoSQL for events, feeds. Always use migrations for schema.`,
          howToImplement: `(1) JWT: on login, sign({ userId, exp }); middleware: verify token, attach user to req. (2) Prisma: schema.prisma with model; prisma migrate; prisma.client.user.findMany(). (3) Index: CREATE INDEX ON users(email); (4) Eager load: include: { posts: true } to avoid N+1.`,
          logicAndCode: `JWT verify: decode, check exp, check signature with same secret. Password: never store plain; bcrypt.hash then bcrypt.compare. Migration: versioned SQL or ORM migration; run in order.`,
          example: `Problem: Protect /api/users/me so only logged-in user gets their data.

Solution: Middleware: extract Bearer token; verify JWT; attach user to req; next(). In route: return req.user. If no token or invalid, return 401.`,
          additionalInfo: `Refresh token: long-lived, rotate; access token short-lived. Rate limit auth endpoints. DB: use connection string from env; never commit credentials.`,
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
