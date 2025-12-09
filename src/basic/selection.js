export function selectionSort(arr) {
    const a = [...arr];
    const n = a.length;

    for (let i = 0; i < n; i++) {
        let imin = i;

        for (let j = i + 1; j < n; j++) {
            if (a[j] < a[imin]) {
                imin = j;
            }
        }

        [a[i], a[imin]] = [a[imin], a[i]];
    }
}