// You are building a sorting algorithm visualization tool that allows users to choose between different sorting algorithms such as bubble sort, merge sort, and quick sort. Implement a system to encapsulate each sorting algorithm and allow users to switch between them dynamically.
/**Great use case for the Strategy Pattern
 *The sorting algorithms (BubbleSort, MergeSort, QuickSort) are different strategies,
 *The context (Sorter) uses a chosen strategy at runtime,
 *The user can dynamically switch sorting algorithms.
 */
//  Strategy Interface
class SortingStrategy {
  sort(array) {
    throw new Error("Sort method must be implemented.");
  }
}

// Concrete Strategy: Bubble Sort
class BubbleSort extends SortingStrategy {
  sort(array) {
    console.log("🔵 Using Bubble Sort...");
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

//Concrete Strategy: Merge Sort
class MergeSort extends SortingStrategy {
  sort(array) {
    console.log("🟢 Using Merge Sort...");
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = this.sort(array.slice(0, mid));
    const right = this.sort(array.slice(mid));

    return this.merge(left, right);
  }

  merge(left, right) {
    let result = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) result.push(left.shift());
      else result.push(right.shift());
    }
    return [...result, ...left, ...right];
  }
}

// Concrete Strategy: Quick Sort
class QuickSort extends SortingStrategy {
  sort(array) {
    console.log("🔴 Using Quick Sort...");
    if (array.length <= 1) return array;

    const pivot = array[array.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] < pivot) left.push(array[i]);
      else right.push(array[i]);
    }

    return [...this.sort(left), pivot, ...this.sort(right)];
  }
}

//Context
class Sorter {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  sort(array) {
    return this.strategy.sort(array);
  }
}

// --- 🎮 Client Code ---
const numbers = [5, 3, 8, 4, 2];

const sorter = new Sorter(new BubbleSort());
console.log("Result:", sorter.sort(numbers));

sorter.setStrategy(new MergeSort());
console.log("Result:", sorter.sort(numbers));

sorter.setStrategy(new QuickSort());
console.log("Result:", sorter.sort(numbers));
