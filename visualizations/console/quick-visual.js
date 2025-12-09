import { drawArray, sleep } from "./utils.js";

export async function quickSortConsole(arr, delay = 30) {
    const a = [...arr];

    async function qsort(left, right) {
        if (left >= right) return;

        let pivot = a[Math.floor((left + right) / 2)];
        let i = left, j = right;

        while (i <= j) {
            while (a[i] < pivot) i++;
            while (a[j] > pivot) j--;

            if (i <= j) {
                [a[i], a[j]] = [a[j], a[i]];
                drawArray(a, i, j);
                await sleep(delay);
                i++; j--;
            }
        }

        await qsort(left, j);
        await qsort(i, right);
    }

    await qsort(0, a.length - 1);
    drawArray(a);

    console.log("\n✔ Done (Quick Sort)\n");
}
