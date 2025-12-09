const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 300;

function drawArray(arr, highlightA = -1, highlightB = -1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / arr.length;

    arr.forEach((value, index) => {
        ctx.fillStyle =
            index === highlightA || index === highlightB
                ? "#ffcc00"
                : "#6a5acd";

        const barHeight = (value / Math.max(...arr)) * canvas.height;

        ctx.fillRect(
            index * barWidth,
            canvas.height - barHeight,
            barWidth - 1,
            barHeight
        );
    });
}

async function bubbleSortVisual(arr) {
    const a = [...arr];

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
            drawArray(a, j, j + 1);
            await new Promise(res => setTimeout(res, 10));

            if (a[j] > a[j + 1]) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
            }
        }
    }

    drawArray(a);
}

export function start() {
    const array = Array.from({ length: 80 }, () =>
        Math.floor(Math.random() * 300)
    );

    bubbleSortVisual(array);
}

window.start = start;