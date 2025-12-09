# JS Sorting Algorithms & Visualization Suite

A clean and modular collection of classic sorting algorithm implementations in JavaScript, accompanied by an interactive, animated web visualizer and a race mode that allows multiple algorithms to run and be compared in real time.

This project is designed for:
- Developers learning algorithmic fundamentals  
- Students studying sorting techniques  
- Educators requiring a visual teaching tool  
- Engineers benchmarking or comparing sorting strategies  

Everything is written in **plain JavaScript**, without external dependencies.

---

## 🚀 Features

### ✔️ Complete Sorting Algorithm Collection  
Includes clear, readable implementations of classic algorithms:
- Bubble Sort  
- Selection Sort  
- Insertion Sort  
- Quick Sort  
- Merge Sort  
(More can be added easily.)

### ✔️ Modern Animated Visualizer (Canvas-Based)  
- Real-time bar animations  
- Color-highlighted comparisons  
- Smooth rendering and transitions  
- Customizable and extensible  

### ✔️ Multi-Algorithm Race Mode  
Run **one or multiple** algorithms simultaneously on identical data sets:
- Each algorithm is displayed in its own canvas  
- All animations run in parallel  
- Enables visual side-by-side comparison  
- Useful for performance intuition and teaching  

### ✔️ Console Visualization (Optional)  
ASCII-based animations for environments without graphical support.

---

## 📂 Project Structure

```

/src
├── basic/
├── advanced/
└── utils/

visualizations/
├── web/
│    ├── index.html
│    ├── style.css
│    └── visual.js        # Race-Mode Visualizer
└── console/
├── runner.js
├── utils.js
├── bubble-visual.js
├── insertion-visual.js
└── quick-visual.js

````

The project is intentionally modular to make adding new sorting algorithms or visualization modes straightforward.

---

## 🌐 Running the Web Visualizer

Simply open the `visualizations/web/index.html` file in a local development server (VSCode Live Server, Node static server, PHP built-in, etc.).  
No build tools or dependencies are required.

Once loaded, you can:
- Select one or more algorithms  
- Press **Start Race**  
- Watch each algorithm animate and complete independently  

---

## 🧠 Example: Visual Bubble Sort

```js
async function bubbleSortVisual(arr, ctx) {
    const a = [...arr];

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
            draw(ctx, a, j, j + 1);
            await sleep(5);

            if (a[j] > a[j + 1]) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
            }
        }
    }

    draw(ctx, a);
}
````

Readable, predictable, and easy to extend.

---

## 📊 Benchmarking (Optional)

A Node-based benchmark script is included to compare algorithm performance:

```
npm run benchmark
```

Results are displayed in a readable table format, showing average execution times over multiple runs.

---

## 🛠️ Extending the Project

The structure is designed to make it simple to add:

* New sorting algorithms
* New visualization effects
* Alternative comparison metrics
* Different rendering modes (SVG, WebGL, ASCII…)

Contributions are welcome.

---

## ⭐ Support

If this project is useful to you, consider giving it a **GitHub star**.
It helps visibility and encourages future improvements.

---

## 📄 License

MIT License — free for personal and commercial use.

---

## 📘 Summary

This repository aims to offer:

* Clean and reliable JavaScript sorting implementations
* High-quality educational visualizations
* A unique side-by-side real-time race mode
* A modular, extensible codebase suitable for learning and experimentation

Whether you're a student, educator, or developer…
This suite provides a clear and modern way to explore sorting algorithms.