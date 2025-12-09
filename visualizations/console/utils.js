export const sleep = (ms) => new Promise(res => setTimeout(res, ms));

export function clear() {
    process.stdout.write("\x1Bc");
}

export function drawArray(arr, highlighA = -1, highlighB = -1) {
    clear();

    console.log("Sorting Visualization (Console Mode)\n");

    const max = Math.max(...arr);

    for (let i = 0; i < arr.length; i++) {
        const barLength = Math.floor((arr[i] / max) * 40);

        let bar = "█".repeat(barLength);

        if (i === highlighA || i === highlighB) {
            bar = `\x1b[33m${bar}\x1b[0m`;
        }

        console.log(bar);
    }
}