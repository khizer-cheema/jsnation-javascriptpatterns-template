class compressionStrategy {
  //“Every compression strategy must provide a compress(data) method.”JavaScript doesn’t have true interfaces like Java or TypeScript.The method throws an error if not overridden → forcing child classes to implement their own version.
  compress(data) {
    throw new Error(`compression method for ${data} should be implemented.`);
  }
}
class ZipCompressionStrategy extends compressionStrategy {
  compress(data) {
    console.log(`Compressing ${data} using ZIP strategy`);
    return `Compressed ${data} using ZIP strategy`;
  }
}
class GzipCompressionStrategy extends compressionStrategy {
  compress(data) {
    console.log(`Compressing ${data} using GZIP strategy`);
    return `Compressed ${data} using GZIP strategy`;
  }
}

class CompressionContext {
  constructor(strategy) {
    this.strategy = strategy;
  }
  setStrategy(newStrategy) {
    this.strategy = newStrategy;
  }
  compress(data) {
    return this.strategy.compress(data);
  }
}
const data = " my data";
const zipStrategy = new ZipCompressionStrategy();
const gzipStrategy = new GzipCompressionStrategy();
const context = new CompressionContext(zipStrategy);
console.log(context.compress(data));
context.setStrategy(gzipStrategy);
console.log(context.compress(data));
