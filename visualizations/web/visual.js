document.addEventListener("DOMContentLoaded", () => {

    function sleep(ms) {
        return new Promise(res => setTimeout(res, ms));
    }

    function draw(ctx, arr, highlightA = -1, highlightB = -1) {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;

        ctx.clearRect(0, 0, w, h);

        const barWidth = w / arr.length;
        const maxVal = Math.max(...arr);

        arr.forEach((value, index) => {
            ctx.fillStyle =
                (index === highlightA || index === highlightB)
                    ? "#e94560"
                    : "#14b8a6";

            const barHeight = (value / maxVal) * h;

            ctx.fillRect(
                index * barWidth,
                h - barHeight,
                barWidth - 2,
                barHeight
            );
        });
    }

    function generateArray(n = 80) {
        return Array.from({ length: n }, () => Math.floor(Math.random() * 300));
    }

    /* ----------------- ALGORITHMS ----------------- */

    async function bubbleSortVisual(arr, ctx) {
        const a = [...arr];
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a.length - i - 1; j++) {
                draw(ctx, a, j, j + 1);
                await sleep(5);
                if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
            }
        }
        draw(ctx, a);
    }

    async function insertionSortVisual(arr, ctx) {
        const a = [...arr];
        for (let i = 1; i < a.length; i++) {
            let current = a[i];
            let j = i - 1;

            while (j >= 0 && a[j] > current) {
                a[j + 1] = a[j];
                j--;
                draw(ctx, a, j, i);
                await sleep(5);
            }
            a[j + 1] = current;
        }
        draw(ctx, a);
    }

    async function selectionSortVisual(arr, ctx) {
        const a = [...arr];

        for (let i = 0; i < a.length; i++) {
            let min = i;

            for (let j = i + 1; j < a.length; j++) {
                draw(ctx, a, min, j);
                await sleep(5);
                if (a[j] < a[min]) min = j;
            }

            [a[i], a[min]] = [a[min], a[i]];
        }
        draw(ctx, a);
    }

    async function quickSortVisual(arr, ctx) {
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
                    draw(ctx, a, i, j);
                    await sleep(10);
                    i++; j--;
                }
            }

            await qsort(left, j);
            await qsort(i, right);
        }

        await qsort(0, a.length - 1);
        draw(ctx, a);
    }

    async function mergeSortVisual(arr, ctx) {
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
                draw(ctx, a, k, mid);
                await sleep(10);
            }

            while (i < left.length) a[k++] = left[i++];
            while (j < right.length) a[k++] = right[j++];
        }

        await mergeSort(0, a.length);
        draw(ctx, a);
    }

    /* ----------------- START FUNCTION ----------------- */

    const algorithms = {
        bubble: { name: "Bubble Sort", fn: bubbleSortVisual },
        insertion: { name: "Insertion Sort", fn: insertionSortVisual },
        selection: { name: "Selection Sort", fn: selectionSortVisual },
        quick: { name: "Quick Sort", fn: quickSortVisual },
        merge: { name: "Merge Sort", fn: mergeSortVisual }
    };

    document.getElementById("startBtn").addEventListener("click", async () => {
        const checked = [...document.querySelectorAll("#algoList input:checked")];

        if (checked.length === 0) {
            alert("Choose at least one algorithm!");
            return;
        }

        const arena = document.getElementById("arena");
        arena.innerHTML = "";

        const baseArray = generateArray();

        const tasks = [];

        checked.forEach(cb => {
            const algoId = cb.value;
            const algo = algorithms[algoId];

            const box = document.createElement("div");
            box.className = "sortBox";

            const canvas = document.createElement("canvas");
            canvas.width = 900;
            canvas.height = 350;
            const ctx = canvas.getContext("2d");

            const label = document.createElement("div");
            label.className = "sortLabel";
            label.textContent = algo.name;

            box.appendChild(canvas);
            box.appendChild(label);
            arena.appendChild(box);

            tasks.push(algo.fn([...baseArray], ctx));
        });

        await Promise.all(tasks);

        console.log("🔥 All sorting finished!");
    });
});