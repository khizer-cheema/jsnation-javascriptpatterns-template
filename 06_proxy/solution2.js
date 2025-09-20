class DataService {
  fetchData(key) {
    console.log(`Fetching data for key:${key}`);
    return `Data for ${key}`;
  }
}

class CacheProxy {
  constructor(dataService) {
    this.dataService = dataService;
    this.cache = {};
  }
  fetchData(key) {
    if (this.cache[key]) {
      console.log(`Returning cached data for key:${key}`);
      return this.cache[key];
    }
    const data = this.dataService.fetchData(key);
    this.cache[key] = data;
    return data;
  }
}
const dataService = new DataService();
const cacheProxy = new CacheProxy(dataService);

console.log(cacheProxy.fetchData("key1"));
console.log(cacheProxy.fetchData("key1"));
