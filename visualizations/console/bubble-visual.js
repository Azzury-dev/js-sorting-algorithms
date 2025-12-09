import { drawArray, sleep} from "./utils.js"

export async function bubbleSortConsole(arr, delay = 40) {
    const a = [...arr];
    const n = a.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            drawArray(a, j, j + 1);
            await sleep(delay);

            if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
        }
    }

    drawArray(a);
    console.log("\n✔ Done (Bubble Sort)\n")
}