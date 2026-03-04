---
title: "How to Resolve \"Unexpected Token <\" Error in JavaScript Applications"
date: "2026-03-04T01:57:13.246Z"
slug: "how-to-resolve-unexpected-token-error-in-javascript-applications"
type: "how-to"
description: "Learn to diagnose and fix the common \"Unexpected Token <\" JavaScript error. This guide provides clear explanations, step-by-step solutions, and preventative measures for developers."
keywords: "JavaScript error, Unexpected Token <, frontend development, debugging, web development, script loading, HTML parsing, server-side rendering, CDN issues"
---

The "Unexpected Token <" error in JavaScript is a common and often frustrating issue that developers encounter when their browser attempts to parse JavaScript code but instead finds an opening angle bracket (`<`). This typically manifests in the browser's developer console, halting script execution and preventing your web application from functioning as intended. When this error occurs, you'll likely see a message similar to: `Uncaught SyntaxError: Unexpected token '<'`. This signals that the JavaScript engine has encountered HTML content where it was expecting valid JavaScript syntax, leading to an immediate parse failure.

This error is a clear indication that the browser received something it interpreted as the start of an HTML tag when it was expecting to read JavaScript code. This can happen in various scenarios, but the core problem is a mismatch between what the browser *expects* to be JavaScript and what it *actually receives*. Understanding this fundamental misunderstanding is the first step towards resolving it.

## Why It Happens

The most frequent cause of the "Unexpected Token <" error is related to how JavaScript files are loaded or served. When a browser requests a JavaScript file, it expects to receive plain JavaScript code. However, if the server responds with an HTML page instead, or if the JavaScript file itself is corrupted and contains HTML markup (perhaps an error page or a redirect), the JavaScript engine will encounter the `<` character at the beginning of the HTML document's `<!DOCTYPE html>` or `<html>` tag and throw the `Unexpected Token <` error. This can also occur if a script tag's `src` attribute points to an incorrect URL that resolves to an HTML page.

Another common culprit is the misconfiguration of Content Delivery Networks (CDNs) or static file servers. If a CDN or server is not properly configured to serve `.js` files with the correct `Content-Type` header (which should be `application/javascript` or `text/javascript`), the browser might misinterpret the response. Furthermore, issues with Server-Side Rendering (SSR) frameworks, where JavaScript is expected to be embedded or linked correctly within the rendered HTML, can also lead to this error if the SSR process produces invalid or incomplete script injections. Finally, network interruptions or corrupted file transfers during development can also result in an incomplete or malformed JavaScript file being served.

## Step-by-Step Solution

### ## Step 1: Inspect the Network Request for the JavaScript File

The first and most critical step is to identify which JavaScript file is causing the error. Open your browser's developer tools (usually by pressing F12 or right-clicking on the page and selecting "Inspect" or "Inspect Element"). Navigate to the "Network" tab. Refresh your page. Look for requests that correspond to your JavaScript files (they often end with `.js`). Click on the failing request. Examine the "Response" or "Preview" tab. If you see HTML code (e.g., `<!DOCTYPE html>`, `<html>`, error messages from your server), this confirms that the server is not returning JavaScript but rather HTML.

### ## Step 2: Verify the `src` Attribute of Your Script Tags

If the Network tab indicates the problem, examine your HTML files where JavaScript is included. Ensure that the `src` attribute in your `<script>` tags points to the correct URL for your JavaScript files. Double-check for typos, incorrect paths (relative or absolute), or missing file extensions.

**Example:**

```html
<!-- Correct -->
<script src="/assets/js/main.js"></script>

<!-- Incorrect (e.g., typo or wrong directory) -->
<script src="/assets/js/mian.js"></script>
<script src="assets/js/main.js"></script> <!-- If expecting root -->
```

### ## Step 3: Check Server Configuration and File Serving

If the `src` attributes are correct, the issue likely lies with how your server is serving the JavaScript files.
*   **Development Servers (Webpack Dev Server, Vite, etc.):** Ensure these are running and configured correctly to serve static assets. Restarting the development server can sometimes resolve transient issues.
*   **Production Servers (Nginx, Apache, Node.js/Express):** Verify that your server is configured to serve files with the `.js` extension with the appropriate MIME type (`application/javascript` or `text/javascript`). For Nginx, this might involve checking `mime.types` or adding `types { application/javascript js; }` to your server block. For Apache, ensure `mime_module` is enabled and `.js` is associated with the correct type.
*   **Static Site Generators/Build Tools:** If you are using a build process (like Webpack, Rollup, Parcel), ensure that the build output is correctly placed and accessible at the paths specified in your HTML.

### ## Step 4: Examine Server-Side Rendering (SSR) Output

If your application uses SSR, inspect the initial HTML payload sent by the server. Ensure that any inline scripts or script tags referencing external JavaScript files are correctly generated and placed within the HTML structure. Sometimes, SSR errors can result in an HTML error page being served instead of the expected content, leading to this JavaScript error. Check your SSR logs for any rendering exceptions.

### ## Step 5: Investigate CDN or External Script Issues

If you are loading JavaScript from a CDN or an external source, verify the CDN URL. Ensure the CDN is operational and that the URL you are using is correct and hasn't been mistyped or changed by the provider. Try temporarily removing the external script to see if the error disappears, which can help isolate the issue to that specific script.

### ## Step 6: Review Recent Code Changes

Think about what code changes were made immediately before this error started appearing. A recent commit might have introduced a mistake in a script path, a server configuration, or an SSR rendering logic. Use your version control system (e.g., Git) to revert to a previous working state or to carefully review the diff for potential causes.

### ## Step 7: Analyze the Actual Response Content in the Browser

Go back to the "Network" tab in your browser's developer tools. After identifying the failing `.js` request (as in Step 1), click on it. Then, click the "Response" tab. Carefully examine the *entire* content displayed there. You are looking for any characters that are not valid JavaScript. The `<` character is the most common, but you might also see `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, or server-specific error messages like `404 Not Found` or `500 Internal Server Error` rendered as HTML. This raw response is the definitive source of truth for what the browser is actually receiving.

## Common Mistakes

A frequent mistake is to solely focus on the JavaScript code itself and overlook the network request and server response. Developers might spend hours debugging JavaScript logic when the root cause is a simple misconfiguration of the web server or an incorrect path in an HTML `<script>` tag. Another common pitfall is assuming that if a file *exists* on the server, it's being served correctly. The `Content-Type` header and the actual content of the response are paramount. Blindly trusting CDN URLs without verifying them can also lead to wasted time. Lastly, attempting to fix the error by directly editing the loaded script content in the browser's developer tools is futile, as this is a temporary change and doesn't address the underlying issue of what the server is sending.

## Prevention Tips

To prevent the "Unexpected Token <" error, adopt a robust development workflow. Always use linters and formatters for your JavaScript code to catch syntax errors early. Implement thorough testing, including end-to-end tests that simulate user interactions and verify asset loading. Maintain clear and consistent file naming conventions and directory structures for your assets. For server configurations, document and automate the process of setting correct MIME types for static files. When working with CDNs, use reliable providers and verify their documentation for correct script inclusion. Regularly review your build process and server logs to catch potential misconfigurations or errors before they impact users. Finally, employ a version control system diligently, making small, atomic commits with descriptive messages, which aids in quickly identifying and reverting problematic changes.