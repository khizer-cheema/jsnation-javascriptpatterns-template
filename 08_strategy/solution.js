const zipCompressionStrategy = (data) => {
  console.log("Compressing using ZIP algorithm");

  return "Compressed using ZIP";
};

const gzipCompressionStrategy = (data) => {
  console.log("Compressing using GZIP algorithm");

  return "Compressed using GZIP";
};

/**
 * 
 * @param {*} strategy
 * @returns setStrategy,compress
 *  The context holds the current strategy.
 *setStrategy(newStrategy) → lets you switch the algorithm at runtime.
 *compress(data) → delegates the work to whichever strategy is active.
 *This is the Strategy Pattern essence:
👉 The context doesn’t know how compression works, it just calls the strategy function.
 */
const compressionContext = (strategy) => {
  const setStrategy = (newStrategy) => {
    strategy = newStrategy;
  };

  const compress = (data) => {
    return strategy(data);
  };

  return { setStrategy, compress };
};

// Example usage
const data = "Lorem ipsum dolor sit amet";

const context = compressionContext(zipCompressionStrategy);
console.log(context.compress(data)); // Output: Compressed using ZIP

context.setStrategy(gzipCompressionStrategy);
console.log(context.compress(data)); // Output: Compressed using GZIP
