---
question: "How does a web browser render a webpage from HTML and CSS code?"
answer: "A web browser renders a webpage by first parsing the HTML and CSS code into internal data structures called the Document Object Model (DOM) and CSS Object Model (CSSOM). It then combines these models to construct a render tree, which outlines the visual layout and styles of all visible elements. Finally, the browser performs layout calculations to determine element positions and sizes, then paints these elements as pixels onto the screen."
date: "2026-11-08T08:52:14.732Z"
slug: "how-does-a-web-browser-render-a-webpage-from-html-and-css-code"
keywords: "HTML rendering, CSS rendering, web browser, DOM, CSSOM, render tree, layout, reflow, painting, rasterization, compositing, webpage rendering, browser engine"
---

The process of rendering a webpage transforms the structural (HTML) and stylistic (CSS) instructions into the visual display seen by a user. This complex sequence involves several distinct stages.

### 1. Parsing HTML: Building the DOM Tree

The browser begins by reading the raw HTML bytes, converting them into characters, then into tokens (like `<html>`, `<p>`). These tokens are then used to create objects and arrange them into a tree structure known as the Document Object Model (DOM). The DOM represents the logical structure of the document, where each HTML element, attribute, and piece of text becomes a node in the tree. For example, `<html><body><p>Hello</p></body></html>` would create a root `html` node, with `body` as a child, and `p` as a child of `body`.

### 2. Parsing CSS: Building the CSSOM Tree

Concurrently, the browser parses the CSS, which can be embedded in `<style>` tags, linked via `<link>` tags, or defined inline. Similar to HTML, CSS bytes are converted into tokens, then into nodes, forming the CSS Object Model (CSSOM). This tree represents all the stylistic rules and how they cascade, apply, and inherit across elements. It includes properties like colors, fonts, and dimensions, resolving any conflicts based on CSS specificity and order.

### 3. Constructing the Render Tree

With both the DOM and CSSOM established, the browser merges them to create the render tree. This tree is a visual representation of the document, containing only the nodes that will be displayed on the screen (elements with `display: none` are excluded). Each node in the render tree is called a "render object" or "frame," and it includes both its associated DOM element and its fully computed style from the CSSOM.

### 4. Layout (Reflow)

The layout stage, also known as reflow, determines the precise size and position of every render object on the page. The browser traverses the render tree, starting from the root, and calculates the exact coordinates and dimensions for each element. This process is recursive; an element's size and position often depend on its children and siblings, and changes to one element can trigger recalculations for many others.

### 5. Painting (Rasterization)

After the layout is complete, the painting stage draws the pixels onto the screen. The browser takes the layout information and converts each render object into actual pixels, applying visual styles such as colors, borders, shadows, text, and images. This often involves creating multiple layers for different parts of the page, especially for elements with certain CSS properties (like `transform` or `opacity`).

### 6. Compositing

If the painting process resulted in multiple layers, the compositing stage combines these layers in the correct order to produce the final image displayed to the user. This step often leverages the graphics processing unit (GPU) for efficient merging and display, especially for animations or elements that frequently change positions or visual properties without requiring a full layout recalculation.

### Limitations and Edge Cases

*   **Progressive Rendering:** Browsers do not typically wait for all resources (like images or JavaScript files) to load before starting the rendering process. They try to render content progressively as it becomes available, enhancing perceived performance.
*   **JavaScript Impact:** JavaScript can dynamically modify the DOM and CSSOM, which can trigger repeated layout and paint operations (reflows and repaints). Excessive or poorly optimized JavaScript can significantly impact rendering performance.
*   **External Resources:** Delays in fetching external resources like web fonts or large images can pause or slow down the rendering process until they are available.