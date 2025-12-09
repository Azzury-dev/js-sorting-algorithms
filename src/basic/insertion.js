export function insertionSort(arr) {
    const a = [...arr];
    const n = a.length;

    for (let i = 1; i < n; i++) {
        let current = a[i];
        let j = i - 1;

        while (j >= 0 && a[j - 1] > current) {
            a[j + 1] = a[j];
            j--;
        }

        a[j + 1] = current;
    }
}