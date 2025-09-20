// You are building an image loading library for a web application. Implement a system to create image proxies that will lazily load images from the server only when they are requested.
/**
 *This is a classic Proxy Pattern problem — instead of immediately loading heavy images, we create a proxy object that delays loading until it’s really needed.
 *Lazy Loading → Image is loaded only when display() is first called.
 */

// 🎯 Real Subject: Actual image loader
class RealImage {
  constructor(fileName) {
    this.fileName = fileName;
    this.loadFromServer(); // expensive operation
  }

  loadFromServer() {
    console.log(`Loading image: ${this.fileName} from server...`);
  }

  display() {
    console.log(`Displaying image: ${this.fileName}`);
  }
}

// 🎯 Proxy: Controls access to RealImage
class ProxyImage {
  constructor(fileName) {
    this.fileName = fileName;
    this.realImage = null;
  }

  display() {
    if (this.realImage === null) {
      // Lazy load only when needed
      this.realImage = new RealImage(this.fileName);
    }
    this.realImage.display();
  }
}

// --- 🎮 Client Code ---
const image1 = new ProxyImage("photo1.png");
const image2 = new ProxyImage("photo2.png");

// Nothing loaded yet
console.log("Images created but not loaded yet.");

// Now display them (triggers lazy loading)
image1.display();
image1.display(); // Second call won't reload, just display
image2.display();
