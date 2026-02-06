---
question: "What are the core components of a modern web browser's rendering engine?"
answer: "A modern web browser's rendering engine is primarily composed of a parsing module, a layout engine, and a rendering module. The parsing module interprets HTML and CSS to create internal data structures. The layout engine then calculates the position and size of each element, and the rendering module draws these elements onto the screen."
date: "2026-02-06T04:24:52.280Z"
slug: "what-are-the-core-components-of-a-modern-web-browser-s-rendering-engine"
keywords: "rendering engine, web browser, HTML parser, CSS parser, DOM, CSSOM, layout engine, reflow, render tree, painting, compositing"
---

### Parsing
The initial stage involves parsing the web page's content, typically HTML and CSS.

*   **HTML Parser:** This component reads the HTML document and converts it into a structured representation called the Document Object Model (DOM) tree. Each HTML tag becomes a node in this tree, representing the document's structure and content.
*   **CSS Parser:** Similarly, the CSS parser interprets the style sheets (external, embedded, or inline) and constructs a CSS Object Model (CSSOM) tree. This tree represents the styling rules that apply to the document.

### Layout (Reflow)
Once the DOM and CSSOM are built, the layout engine, also known as the reflow engine, takes over.

*   **Box Model Calculation:** It traverses the DOM tree and applies the styles from the CSSOM to determine the exact size, position, and dimensions of each element on the page. This process creates a "box model" for every visible element.
*   **Visual Tree Construction:** The output of this stage is often referred to as the render tree or frame tree, which contains only the visible elements from the DOM, along with their computed styles.

**Example:** Imagine an HTML paragraph with a specific font size and color defined in CSS. The parser creates DOM and CSSOM nodes for this paragraph and its styles. The layout engine then calculates the rectangular area that this paragraph will occupy, considering its font size, margins, and padding.

### Rendering (Repaint)
The final stage is the rendering process, where the visual representation of the web page is actually drawn onto the screen.

*   **Painting:** The rendering engine walks the render tree and paints the pixels for each element, applying background colors, borders, text, images, and other visual properties.
*   **Compositing:** In more advanced engines, compositing is used to combine layers of the page efficiently, especially for elements with complex effects like shadows or transformations. This can improve performance by only repainting necessary parts of the screen.

**Limitations and Edge Cases:**
*   **JavaScript Interaction:** JavaScript can dynamically alter the DOM and CSSOM, triggering re-parsing, re-layout, and re-rendering, which can impact performance if not managed efficiently.
*   **Complex Layouts:** Handling highly complex layouts, responsive design across various devices, and animations can be computationally intensive for the rendering engine.
*   **Vendor Prefixes:** Browser engines often implement new CSS features with vendor prefixes (e.g., `-webkit-`, `-moz-`) before they become standard, requiring careful handling.