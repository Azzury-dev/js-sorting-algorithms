export const isSorted = (arr) =>
    arr.every((v, i) => i === 0 || arr[i - 1] <= v);