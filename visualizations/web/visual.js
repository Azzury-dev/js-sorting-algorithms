document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const algoSelect = document.getElementById("algoSelect");
    const startBtn = document.getElementById("startBtn");

    canvas.width = 900;
    canvas.height = 350;

    function sleep(ms) {
        return new Promise(res => setTimeout(res, ms));
    }

    function drawArray(arr, highlightA = -1, highlightB = -1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = canvas.width / arr.length;
        const max = Math.max(...arr);

        arr.forEach((value, index) => {
            ctx.fillStyle =
                index === highlightA || index === highlightB
                    ? "#45b5e9ff"
                    : "#14b8a6";

            const barHeight = (value / max) * canvas.height;

            ctx.fillRect(
                index * barWidth,
                canvas.height - barHeight,
                barWidth - 2,
                barHeight
            );
        });
    }

    /* ----------------- ALGORITHMS ----------------- */

    async function bubbleSortVisual(arr) {
        const a = [...arr];
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a.length - i - 1; j++) {
                drawArray(a, j, j + 1);
                await sleep(5);
                if (a[j] > a[j+1]) [a[j], a[j+1]] = [a[j+1], a[j]];
            }
        }
        drawArray(a);
    }

    async function insertionSortVisual(arr) {
        const a = [...arr];
        for (let i = 1; i < a.length; i++) {
            let current = a[i];
            let j = i - 1;

            while (j >= 0 && a[j] > current) {
                a[j + 1] = a[j];
                j--;
                drawArray(a, j, i);
                await sleep(5);
            }
            a[j + 1] = current;
        }
        drawArray(a);
    }

    async function selectionSortVisual(arr) {
        const a = [...arr];

        for (let i = 0; i < a.length; i++) {
            let min = i;

            for (let j = i + 1; j < a.length; j++) {
                drawArray(a, min, j);
                await sleep(5);
                if (a[j] < a[min]) min = j;
            }

            [a[i], a[min]] = [a[min], a[i]];
        }
        drawArray(a);
    }

    async function quickSortVisual(arr) {
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
                    await sleep(10);
                    i++; j--;
                }
            }

            await qsort(left, j);
            await qsort(i, right);
        }

        await qsort(0, a.length - 1);
        drawArray(a);
    }

    async function mergeSortVisual(arr) {
        const a = [...arr];

        async function mergeSort(start, end) {
            if (end - start <= 1) return;

            const mid = Math.floor((start + end) / 2);

            await mergeSort(start, mid);
            await mergeSort(mid, end);

            const left = a.slice(start, mid);
            const right = a.slice(mid, end);
            let i = 0, j = 0, k = start;

            while (i < left.length && j < right.length) {
                a[k++] = left[i] < right[j] ? left[i++] : right[j++];
                drawArray(a, k, mid);
                await sleep(10);
            }

            while (i < left.length) a[k++] = left[i++];
            while (j < right.length) a[k++] = right[j++];
        }

        await mergeSort(0, a.length);
        drawArray(a);
    }

    /* ----------------- START FUNCTION ----------------- */

    function generateArray(n = 80) {
        return Array.from({length: n}, () => Math.floor(Math.random() * 300));
    }

    async function start() {
        const algo = algoSelect.value;
        const array = generateArray();

        const algorithms = {
            bubble: bubbleSortVisual,
            insertion: insertionSortVisual,
            selection: selectionSortVisual,
            quick: quickSortVisual,
            merge: mergeSortVisual
        };

        await algorithms[algo](array);
    }

    startBtn.addEventListener("click", start);

    window.start = start;
});