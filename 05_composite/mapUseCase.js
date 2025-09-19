// ----------------- Users (Object Keys) -----------------
const user1 = { id: 1, name: "Alice" };
const user2 = { id: 2, name: "Bob" };

// The master Map: associates users -> their data (permissions, caches, etc.)
const userSystem = new Map();

// Initialize users
userSystem.set(user1, { permissions: ["read"], cache: new Map() });
userSystem.set(user2, { permissions: ["read", "write"], cache: new Map() });

// ----------------- API Simulation (Function Keys) -----------------
function fetchUserData(userId) {
  console.log(`Fetching data for user ${userId}...`);
  return { posts: [1, 2, 3], friends: ["X", "Y"] };
}

function fetchUserPermissions(userId) {
  console.log(`Fetching permissions for user ${userId}...`);
  return userId === 1 ? ["read"] : ["read", "write"];
}

// ----------------- Cache Wrapper -----------------
function cached(user, fn, arg) {
  const userData = userSystem.get(user);
  if (!userData) return null;

  // Ensure this function has a cache entry
  if (!userData.cache.has(fn)) {
    userData.cache.set(fn, new Map());
  }

  const fnCache = userData.cache.get(fn);

  if (fnCache.has(arg)) {
    console.log("Returning cached result for", fn.name, "for user", user.name);
    return fnCache.get(arg);
  }

  const result = fn(arg);
  fnCache.set(arg, result);
  return result;
}

// ----------------- Usage -----------------
console.log("=== Alice Calls ===");
console.log(cached(user1, fetchUserData, 1)); // fresh call
console.log(cached(user1, fetchUserData, 1)); // cached call
console.log(cached(user1, fetchUserPermissions, 1)); // fresh
console.log(cached(user1, fetchUserPermissions, 1)); // cached

console.log("\n=== Bob Calls ===");
console.log(cached(user2, fetchUserData, 2)); // fresh call
console.log(cached(user2, fetchUserData, 2)); // cached call
console.log(cached(user2, fetchUserPermissions, 2)); // fresh
console.log(cached(user2, fetchUserPermissions, 2)); // cached

// ----------------- Debug: Inspect Full System -----------------
console.log("\n=== System State ===");
for (const [user, details] of userSystem) {
  console.log(user.name, "->", details);
}

/**
 * we can expand this system further.some data (like user sessions or API responses) should not live forever in cache.we can set a time-to-live.
 * @param {*} user userData/keys of Map
 * @param {*} fn API call
 * @param {*} arg
 * @param {*} ttl expiry time
 * @returns value if session or API responses not expired,otherwise delete it.
 * Use Cases: API responses(e.g weather,news,currency rates)
 */
function cachedTimeBound(user, fn, arg, ttl = 5000) {
  // ttl = 5 seconds
  const userData = userSystem.get(user);
  if (!userData) return null;

  // Ensure this function has a cache entry
  if (!userData.cache.has(fn)) {
    userData.cache.set(fn, new Map());
  }
  const fnCache = userData.cache.get(fn);
  if (fnCache.has(arg)) {
    const { value, expiry } = fnCache.get(arg);
    if (Date.now() < expiry) {
      console.log("Returning cached:", value);
      return value; // still valid
    } else {
      console.log("expired, recomputing...");
      fnCache.delete(arg); // expired
    }
  }
  const result = fn(arg);
  fnCache.set(arg, { value: result, expiry: Date.now() + ttl });
  return result;
}
console.log(cachedTimeBound(user1, fetchUserData, 5));
// setTimeout(() => {
//   console.log(cachedTimeBound(user1,fetchUserData,5))
// }, 2000);
setTimeout(() => {
  console.log(cachedTimeBound(user1, fetchUserData, 5));
}, 5000);

/**LRU:
 * The idea of LRU (Least Recently Used) is:
 *We limit the number of items in the cache.
 *When cache size exceeds the limit, we remove the oldest (least recently used) entry.
 * Real-Life Use Cases of LRU Cache
 *Search suggestions → store only last N queries.
 *Web browsers → store only the last N visited pages/images.
 *APIs → limit memory by caching only recent responses.
 *Gaming apps → keep only recent player moves in memory.
 * @param {*} fn
 * @param {*} arg
 * @returns
 */

const MAX_CACHE_SIZE = 3; // keep only 3 items in cache
const cache = new Map();
function SizeCached(fn, arg) {
  if (!cache.has(fn)) {
    cache.set(fn, new Map());
  }
  const fnCache = cache.get(fn);
  // if value exists, refresh it (to make it most recently used)
  if (fnCache.has(arg)) {
    const value = fnCache.get(arg);
    fnCache.delete(arg);
    fnCache.set(arg, value); // re-inset at the end(most recent)
    console.log("cache hit:", value);
    return value;
  }
  // compute result
  const result = fn(arg);
  fnCache.set(arg, result);
  console.log("computed and cached:", result);
  // if cache exceed limit,remove least recently used
  if (fnCache.size > MAX_CACHE_SIZE) {
    const oldestKey = fnCache.keys().next().value; // first inserted key
    fnCache.delete(oldestKey);
    console.log("removed oldest key:", oldestKey);
  }
  return result;
}
function searchDatabase(query) {
  console.log("searching DB for:", query);
  return `Results for ${query}`;
}
console.log(SizeCached(searchDatabase, "banana"));

/**MRU
 * 👉 MRU (Most Recently Used) removes the newest (most recently accessed) item when cache is full.
🔹 When is MRU useful?
 *Financial systems → The latest query (e.g., “check balance”) is cheap to recompute, while older queries (like “10-year transaction history”) are expensive. Better to keep old results cached.
 *Data streaming → In some real-time apps, the latest data is volatile and changes rapidly (e.g., stock tickers). Caching old data is more useful.
 *Gaming → The most recent move can be recalculated easily, but keeping historical moves cached improves replay or rollback featu
 */

const MAX_CACHE_SIZE_MRU = 2;
const cacheMru = new Map();
function cachedMRU(fn, arg) {
  if (!cacheMru.has(fn)) {
    cacheMru.set(fn, new Map());
  }
  const fnCache = cacheMru.get(fn);
  //If value exists, return it directly
  if (fnCache.has(arg)) {
    console.log("cache hit:", fnCache.get(arg));
    return fnCache.get(arg);
  }
  //compute result
  const result = fn(arg);
  fnCache.set(arg, result);
  console.log("computed and cached:", result);
  //if cache exceed limit, remove the most recent(last inserted)
  if (fnCache.size > MAX_CACHE_SIZE_MRU) {
    //convert to array and get the last inserted key
    const keys = Array.from(fnCache.keys());
    const mostRecentKey = keys[keys.length - 1];
    fnCache.delete(mostRecentKey);
    console.log("Removed most recent key:", mostRecentKey);
  }
  return result;
}

function fetchTransactionHistory(userId) {
  console.log("Fetch history for user:", userId);
  return `Transaction of user ${userId}`;
}

console.log(cachedMRU(fetchTransactionHistory, 3));
