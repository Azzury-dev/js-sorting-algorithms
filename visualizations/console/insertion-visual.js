import { drawArray, sleep } from "./utils.js";

export async function insertionSortConsole(arr, delay = 40) {
    const a = [...arr];

    for (let i = 1; i < a.length; i++) {
        let current = a[i];
        let j = i - 1;

        while (j >= 0 && a[j] > current) {
            a[j + 1] = a[j];
            j--;
            drawArray(a, j, i);
            await sleep(delay);
        }

        a[j + 1] = current;
    }

    drawArray(a);
    console.log("\n✔ Done (Insertion Sort)\n");
}