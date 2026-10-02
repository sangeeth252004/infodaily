---
title: "Fixing \"Module not found: Error: Can't resolve [module-name]\" in Webpack/React Projects"
date: "2026-10-02T23:33:28.917Z"
slug: "fixing-module-not-found-error-can-t-resolve-module-name-in-webpack-react-projects"
type: "how-to"
description: "Learn how to resolve the common \"Module not found\" error in your Webpack and React projects. This comprehensive guide provides step-by-step solutions, common pitfalls, and prevention tips."
keywords: "webpack, react, module not found, error, resolve, javascript, npm, yarn, import, build, fix, troubleshoot"
---

# Fixing "Module not found: Error: Can't resolve [module-name]" in Webpack/React Projects

You've been working on your React project, feeling good about your progress, and then it happens. You refresh your browser or try to build your project, and instead of seeing your application running, you're greeted by a cryptic error message in your console:

```
Module not found: Error: Can't resolve '[module-name]' in '/path/to/your/project/src'
```

This error is a common stumbling block for developers working with Webpack and React. It essentially means that Webpack, your build tool, couldn't find the JavaScript module (a file or package) that your code is trying to import. This can halt your development entirely, making it impossible to see your changes or deploy your application.

## Why It Happens

The "Module not found" error arises because Webpack's job is to bundle all your project's JavaScript modules into a few files that the browser can understand. When it encounters an `import` statement like `import MyComponent from './MyComponent';` or `import SomeLibrary from 'some-library';`, it looks for that specified file or package. If it can't locate it based on its configured search paths and rules, it throws this error.

The most frequent culprits are typos in file paths or package names, forgetting to install a dependency, or incorrect configuration within your `webpack.config.js` file that tells Webpack where to look for modules. Essentially, Webpack is saying, "I've been told to find this thing, but it's not where I'm looking, or I don't know where to look."

## Step-by-Step Solution

Let's systematically tackle this issue. Follow these steps to identify and resolve the "Module not found" error.

### ## Step 1: Double-Check Your Import Statements

This is the most common cause. Carefully examine the `import` statement that's causing the error.

*   **Typos in File Names or Paths:** Are you absolutely sure you've spelled the file name, directory name, or extension correctly? For instance, `import Button from './Button.jsx';` will fail if the file is actually `Button.js` or `button.jsx`. Remember that file paths are case-sensitive on many operating systems.
*   **Incorrect Relative Paths:** If you're importing a local file, ensure the relative path is correct.
    *   `./`: Refers to a file in the same directory.
    *   `../`: Refers to a file in the parent directory.
    *   `../../`: Refers to a file two directories up.
*   **Missing File Extensions:** While Webpack often handles common extensions like `.js`, `.jsx`, `.ts`, and `.tsx` automatically, it's good practice to include them for clarity or if you've configured Webpack to *not* resolve them implicitly.

**Action:** Open the file where the error originates (the path is usually shown in the error message) and meticulously review the `import` statement.

### ## Step 2: Verify Installed Dependencies

If you're importing a module from an external package (e.g., `import lodash from 'lodash';`), the issue might be that the package isn't installed or isn't installed correctly.

*   **Check `package.json`:** Look in your `package.json` file to see if the module name is listed under `dependencies` or `devDependencies`.
*   **Check `node_modules`:** Browse your `node_modules` folder to see if a directory with the module's name exists.

**Action:**
If using **npm**:
```bash
npm install [module-name]
```
If using **yarn**:
```bash
yarn add [module-name]
```
After installing, run `npm install` or `yarn install` to ensure all dependencies are properly linked. Then, restart your development server.

### ## Step 3: Clear npm/Yarn Cache and Reinstall Dependencies

Sometimes, the `node_modules` directory can become corrupted, or there might be issues with cached packages. A clean reinstall can resolve this.

**Action:**
First, delete your `node_modules` folder and your lock file (`package-lock.json` for npm, `yarn.lock` for yarn).

```bash
# For npm
rm -rf node_modules package-lock.json
npm install

# For yarn
rm -rf node_modules yarn.lock
yarn install
```
After reinstalling, restart your development server.

### ## Step 4: Examine Webpack Configuration (`webpack.config.js`)

If you have a custom Webpack configuration, the error could stem from incorrect settings that tell Webpack where to find modules.

*   **`resolve.modules`:** This option specifies directories Webpack should search for modules. If your project's modules are located in a non-standard directory, you might need to add it here.
    ```javascript
    // webpack.config.js
    module.exports = {
      // ... other config
      resolve: {
        modules: [
          'node_modules',
          path.resolve(__dirname, 'src'), // Example: add 'src' directory
        ],
        // ... other resolve options
      },
      // ...
    };
    ```
*   **`resolve.extensions`:** This array specifies which file extensions Webpack should try to resolve if they are not explicitly provided in the import statement.
    ```javascript
    // webpack.config.js
    module.exports = {
      // ... other config
      resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'], // Make sure relevant extensions are listed
        // ...
      },
      // ...
    };
    ```
*   **`resolve.alias`:** If you're using aliases for easier imports (e.g., `@/components` instead of `../../components`), ensure they are correctly configured.
    ```javascript
    // webpack.config.js
    const path = require('path');

    module.exports = {
      // ... other config
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src/'), // Example: alias for src folder
        },
        // ...
      },
      // ...
    };
    ```

**Action:** Carefully review your `webpack.config.js` file, paying close attention to the `resolve` object and its properties. Ensure that the paths and extensions are correctly configured for your project structure.

### ## Step 5: Restart Your Development Server

After making any changes to dependencies or Webpack configuration, it's crucial to restart your development server. Many development servers cache information, and a restart ensures that they pick up the latest configurations and installed packages.

**Action:** Stop your development server (usually by pressing `Ctrl+C` in the terminal) and then restart it with its usual command (e.g., `npm start`, `yarn start`, `webpack serve`).

### ## Step 6: Check for Case Sensitivity Issues

As mentioned earlier, file systems on macOS and Linux are case-sensitive by default, while Windows is generally case-insensitive. However, the way Node.js and Webpack resolve modules can still lead to issues if there are case discrepancies between your `import` statements and the actual file names.

**Action:** Ensure the casing of your `import` statements exactly matches the casing of your file names and directory names. For example, if a file is named `MyComponent.js`, import it as `import MyComponent from './MyComponent';` and not `./mycomponent` or `./myComponent`.

### ## Step 7: Isolate the Problematic Module

If you're still stuck, try to isolate the module causing the issue.

*   Comment out the import statement that's causing the error. Does the build succeed now?
*   If you suspect a third-party library, try to uninstall it and then reinstall it to see if that helps.

**Action:** Systematically comment out or temporarily remove imports to narrow down which specific `import` statement is triggering the "Module not found" error.

## Common Mistakes

Many developers encounter this error and fall into a few common traps. One frequent mistake is **only checking the import statement without verifying if the file actually exists** at that location. Another is **forgetting to restart the development server** after making changes, leading to the illusion that the fix didn't work. Some users also **overlook the possibility of typos in the module name itself** when importing from `node_modules`, thinking that npm/yarn would have caught it. Finally, when dealing with custom Webpack configurations, **incorrectly configuring `resolve.modules`** is a common pitfall, often by forgetting to include the default `node_modules` directory.

## Prevention Tips

To prevent the "Module not found" error from recurring, adopt some best practices. Always **be meticulous with your file paths and names**; consider using a consistent casing convention across your project. **Always run `npm install` or `yarn install` after cloning a repository or adding new dependencies**. For complex projects, leveraging **alias paths in Webpack** can significantly simplify imports and reduce the chances of path-related errors. Furthermore, maintain a clean `node_modules` folder by regularly running `npm prune` or `yarn autoclean`. Regularly reviewing your `webpack.config.js` for clarity and correctness can also save you headaches down the line.