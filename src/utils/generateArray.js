export const generateArray = (size = 1000, max = 10000) =>
    Array.from({ length: size }, () => Math.floor(Math.random() * max));
