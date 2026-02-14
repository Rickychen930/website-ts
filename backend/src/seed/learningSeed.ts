/**
 * Learning Seed – Data curriculum menggunakan struktur dari learningSeedStructure.
 * Section & topic didefinisikan dengan contentBlocks; hasil akhir dibangun via buildLearningSections.
 */

import {
  buildLearningSections,
  validateLearningSeed,
  type SectionConfig,
  type TopicContentBlocks,
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
          material: `- Sorting: use built-in sort (C++ std::sort, Python sorted()) for O(n log n).
- Binary search: find position in sorted array in O(log n); maintain [lo, hi], compute mid, narrow range.
- Two pointers: two indices from both ends or same end; often O(n) on sorted arrays.`,
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
          material: `- Prefix sum: pre[i] = a[0]+...+a[i]; then sum(l..r) = pre[r+1]-pre[l] in O(1).
- Sliding window: maintain [i,j]; fixed size = move i and j together; variable size = expand j until valid, shrink i until invalid, update answer.`,
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
          material: `**Express** is a minimal web framework for Node. **Routes**: app.get(path, handler), app.post(path, handler); handler(req, res) can call res.json(), res.status(), res.send(). **Middleware**: functions that run before the route handler; express.json() parses JSON body. **REST**: use HTTP methods (GET, POST, PUT, DELETE) and meaningful URLs (/api/resources).`,
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
    ],
  },
];

validateLearningSeed(sectionConfigs, IMG);
export const learningSections = buildLearningSections(sectionConfigs, IMG);
