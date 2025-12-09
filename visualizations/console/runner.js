import readline from "readline";
import { bubbleSortConsole } from "./bubble-visual.js";
import { insertionSortConsole } from "./insertion-visual.js";
import { quickSortConsole } from "./quick-visual.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const algorithms = {
    bubble: bubbleSortConsole,
    insertion: insertionSortConsole,
    quick: quickSortConsole
};

function generateArray(size = 30) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

console.clear();
console.log("Console Sorting Visualizer");
console.log("Choose algorithm");
console.log("1) Bubble Sort");
console.log("2) Insertion Sort");
console.log("3) Quick Sort\n");

rl.question("Your choice: ", async (answer) => {
    const choices = {
        "1": "bubble",
        "2": "insertion",
        "3": "quick"
    };

    const algo = choices[answer];

    if (!algo) {
        console.log("\nInvalid choice.");
        rl.close();
        return;
    }

    const fn = algorithms[algo];
    const arr = generateArray();

    await fn(arr);
    rl.close();
});