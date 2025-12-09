import {
    bubbleSort,
    generateArray
} from "../src/index.js";

const algorithms = {
    "Bubble Sort": bubbleSort,
};

const TEST_SIZE = 5000;
const RUNS = 10;

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
    return avg.toFixed(2);
}

function color(text, colorCode) {
    return `\x1b[${colorCode}m${text}\x1b[0m`;
}

function printTable(results) {
    console.log(color("\n=== Sorting Algorithm Benchmark Results ===\n", "36"));

    const rows = Object.entries(results).map(([name, time]) => ({
        Algorithm: name,
        "Avg Time (ms)": time
    }));

    console.table(rows);
}

async function run() {
    console.log(color("Generating random array...", "33"));
    const array = generateArray(TEST_SIZE);

    const results = {};

    console.log(color(`\nRunning benchmarks (${RUNS} runs each)...\n`, "35"));

    for (const [name, fn] of Object.entries(algorithms)) {
        try {
            console.log(color(`→ Testing ${name}...`, "32"));
            const time = benchmark(fn, array);
            results[name] = time;
        } catch (err) {
            results[name] = "❌ Error";
        }
    }

    printTable(results);

    console.log(color("\nBenchmark complete.\n", "36"));
}

run();
