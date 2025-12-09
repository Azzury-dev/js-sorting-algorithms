export function mergeSort(arr) {
    const a = [...arr];
    const n = a.length;
    
    if (n <= 1) return arr;

    const mid = Math.floor(n / 2);
    const left = mergeSort(a.slice(0, mid));
    const right = mergeSort(a.slice(mid));

    let result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }

    return [...result, ...left.slice(i), ...right.slice(j)];
}
