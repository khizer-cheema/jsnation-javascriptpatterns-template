// You are developing a file system management module where both individual files and directories need to be treated uniformly. Implement a system to represent files and directories as a single interface.

/**
 * This is a Composite Pattern use case: both Files (leaves) and Directories (composites) should be treated uniformly under a single interface.
 */
// 📄 Component Interface
class FileSystemComponent {
  constructor(name) {
    this.name = name;
  }

  showDetails() {
    throw new Error("showDetails() must be implemented.");
  }
}

// 📄 Leaf: File
class File extends FileSystemComponent {
  constructor(name, size) {
    super(name);
    this.size = size;
  }

  showDetails(indent = "") {
    console.log(`${indent}File: ${this.name} (Size: ${this.size}KB)`);
  }
}

// 📁 Composite: Directory
class Directory extends FileSystemComponent {
  constructor(name) {
    super(name);
    this.children = [];
  }

  add(component) {
    this.children.push(component);
  }

  remove(component) {
    this.children = this.children.filter((child) => child !== component);
  }

  showDetails(indent = "") {
    console.log(`${indent}Directory: ${this.name}`);
    this.children.forEach((child) => child.showDetails(indent + "  "));
  }
}

// --- 🎮 Client Code ---
const file1 = new File("resume.pdf", 120);
const file2 = new File("photo.jpg", 200);
const file3 = new File("notes.txt", 30);

const docsDir = new Directory("Documents");
docsDir.add(file1);
docsDir.add(file3);

const picsDir = new Directory("Pictures");
picsDir.add(file2);

const rootDir = new Directory("Root");
rootDir.add(docsDir);
rootDir.add(picsDir);

// Show full hierarchy
rootDir.showDetails();
