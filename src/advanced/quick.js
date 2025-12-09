export function quickSort(arr) {
    const a = [...arr];
    const n = a.length;

    function sort(left, right) {
        if (left >= right) return;

        const pivot = a[Math.floor((left + right) / 2)];
        let i = left;
        let j = right;

        while (i <= j) {
            while (a[i] < pivot) i++;
            while (a[j] > pivot) j--;

            if (i <= j) {
                [a[i], a[j]] = [a[j], a[i]];
                i++;
                j--;
            }
        }

        if (left < j) sort(left, j);
        if (i < right) sort(i, right);
    }

    sort(0, n - 1);
    return a;
}