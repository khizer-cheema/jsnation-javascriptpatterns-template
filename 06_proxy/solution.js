const fetchUserFromApi = (key) => {
  console.log(`Fetching Data with key:${key}`);
  return `Data with key:${key}`;
};

const creatCacheProxy = (dataService) => {
  const cache = {};
  return {
    fetchData: (key) => {
      if (cache[key]) {
        console.log(`cache hit for key:${key}`);
        return cache[key];
      }
      const data = dataService(key);
      cache[key] = data;
      return data;
    },
  };
};
const cacheProxy = creatCacheProxy(fetchUserFromApi);
console.log(cacheProxy.fetchData("key1"));
console.log(cacheProxy.fetchData("key1"));
