import {
    generateArray,
    bubbleSort,
    insertionSort,
    selectionSort,
    quickSort,
    mergeSort,
} from "../src/index.js";

const algorithms = {
    "Bubble Sort": bubbleSort,
    "Insertion Sort": insertionSort,
    "Selection Sort": selectionSort,
    "Quick Sort": quickSort,
    "Merge Sort": mergeSort
};

const TEST_SIZE = 1000;
const RUNS = 5000;

const color = (txt, code) => `\x1b[${code}m${txt}\x1b[0m`;

function benchmark(fn, arr) {
    const times = [];
    for (let i = 0; i < RUNS; i++) {
        const clone = [...arr];
        const start = performance.now();
        fn(clone);
        const end = performance.now();
        times.push(end - start);
    }
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    return avg;
}

function bar(value, max, length = 40) {
    const filled = Math.round((value / max) * length);
    return "█".repeat(filled) + " ".repeat(length - filled);
}

async function run() {
    console.log(color("\n🔥 JS Sorting Benchmark Visualization\n", "35"));
    console.log(color(`Dataset: ${TEST_SIZE} items — Runs per algo: ${RUNS}\n`, "36"));

    console.log(color("Generating array...", "33"));
    const array = generateArray(TEST_SIZE);

    const results = {};

    console.log(color("\nRunning benchmarks...\n", "35"));

    for (const [name, fn] of Object.entries(algorithms)) {
        console.log(color(`→ ${name}`, "32"));
        const avg = benchmark(fn, array);
        results[name] = avg;
    }

    const sorted = Object.entries(results).sort((a, b) => a[1] - b[1]);

    const maxTime = sorted[sorted.length - 1][1];

    console.log(color("\n🔥 Benchmark Results (Visualized)\n", "35"));

    for (const [name, time] of sorted) {
        const t = time.toFixed(2).padStart(8, " ");
        const barTxt = bar(time, maxTime);
        console.log(` ${name.padEnd(15)} | ${color(barTxt, "34")} ${t} ms`);
    }

    console.log(color("\nDone.\n", "36"));
}

run();