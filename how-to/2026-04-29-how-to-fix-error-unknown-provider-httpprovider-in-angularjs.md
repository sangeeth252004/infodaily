---
title: "How to Fix \"Error: Unknown provider: $httpProvider\" in AngularJS"
date: "2026-04-29T07:22:57.080Z"
slug: "how-to-fix-error-unknown-provider-httpprovider-in-angularjs"
type: "how-to"
description: "Resolve the common \"Error: Unknown provider: $httpProvider\" in AngularJS with this comprehensive guide. Learn the causes, get step-by-step solutions, and prevent future occurrences."
keywords: "AngularJS, $httpProvider, unknown provider, dependency injection, error fix, web development, JavaScript, frontend development"
---

## Problem Explanation

When working with AngularJS, you might encounter a frustrating error message in your browser's developer console: **"Error: Unknown provider: $httpProvider"**. This error typically halts your application's execution, preventing it from initializing or running correctly. You'll see this message immediately upon attempting to load your AngularJS application, indicating a fundamental issue with how your application is configured and how it attempts to access core AngularJS services. This problem often arises when you're trying to configure or extend the `$http` service, which is the standard way to make HTTP requests in AngularJS.

The presence of this error signifies that AngularJS's dependency injection system cannot find a registered provider for `$httpProvider`. The `$httpProvider` is a crucial part of AngularJS's configuration mechanism, allowing developers to customize the behavior of the `$http` service, such as setting default headers, intercepting requests or responses, and configuring timeouts. When this provider is unknown, it means that either the `$http` module itself hasn't been correctly loaded, or you're attempting to inject `$httpProvider` into a component that doesn't have access to it.

## Why It Happens

The **"Error: Unknown provider: $httpProvider"** most commonly occurs due to an issue with how AngularJS modules are defined and loaded. AngularJS applications are structured around modules, and these modules declare their dependencies on other modules. The `$http` service, along with its associated provider `$httpProvider`, is part of the core `ng` module in AngularJS. If your application module or any of its dependent modules fail to declare a dependency on the `ng` module, or if the `ng` module itself isn't correctly loaded, then `$httpProvider` will not be available for injection.

Another frequent cause is an incorrect understanding or implementation of how to configure the `$httpProvider`. Developers often try to inject `$httpProvider` directly into a controller or service that requires its configuration. However, `$httpProvider` is a *configuration object* that is typically only available during the application's configuration phase. This phase occurs before the application's run phase and before any controllers or services are instantiated. If you attempt to inject `$httpProvider` outside of this configuration phase, you will receive the "Unknown provider" error because it's simply not available in that context. You should instead inject the `$http` service itself in the run phase or within controllers and services.

## Step-by-Step Solution

This section outlines the steps to diagnose and resolve the "Error: Unknown provider: $httpProvider" in your AngularJS application.

## Step 1: Verify Module Dependencies

The first and most crucial step is to ensure that your application's main module correctly declares a dependency on the `ng` module. This is where `$httpProvider` resides.

Navigate to your main application's module definition. It typically looks something like this:

```javascript
// In your app.js or main module file
angular.module('myApp', [
  // ... other dependencies
  'ng' // Ensure 'ng' is listed here
]);
```

**Action:** Open your main AngularJS module file. If you have multiple modules, check the dependencies of the module that bootstraps your application. Make sure `'ng'` is included in the array of dependencies. If it's missing, add it.

## Step 2: Check AngularJS Script Inclusion

Ensure that the AngularJS core JavaScript files are correctly included in your `index.html` file *before* your application's script. The `ng` module is part of the core AngularJS library.

Your `index.html` should have lines similar to these in the `<head>` or before the closing `</body>` tag:

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <title>My AngularJS App</title>
  <!-- Other head elements -->
</head>
<body>

  <!-- Your application content -->

  <!-- Include AngularJS core library FIRST -->
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>

  <!-- Then include your application's modules and controllers -->
  <script src="app.js"></script>
  <script src="controllers/myController.js"></script>
  <!-- ... other script files -->

</body>
</html>
```

**Action:** Open your `index.html` file. Verify that the AngularJS library (e.g., `angular.min.js`) is present and loaded. Pay close attention to the order of script inclusion: the AngularJS core library must be loaded *before* your application's scripts.

## Step 3: Correctly Configure $httpProvider

As mentioned, `$httpProvider` is available only during the configuration phase. If you are trying to configure it, this must be done within the `.config()` block of your module.

**Incorrect Example (causing the error):**

```javascript
// This is WRONG if trying to configure $httpProvider
angular.module('myApp').controller('MyController', function($scope, $httpProvider) {
  // Trying to inject $httpProvider here will fail
});
```

**Correct Example (configuring $httpProvider):**

```javascript
// In your app.js or a config file
angular.module('myApp').config(function($httpProvider) {
  // This is the correct place to configure $httpProvider
  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  $httpProvider.interceptors.push('myHttpInterceptor'); // Example of adding an interceptor
});

// Example of an interceptor service
angular.module('myApp').factory('myHttpInterceptor', function() {
  return {
    request: function(config) {
      // Modify config before request is sent
      return config;
    },
    response: function(response) {
      // Modify response before it's given to the caller
      return response;
    }
  };
});
```

**Action:** Review any part of your code where you are using or trying to configure `$httpProvider`. Ensure that such configurations are placed within a `.config()` block of an AngularJS module. If you intended to use the `$http` *service* (for making requests), you should inject `$http` in the `.run()` block or within your controllers/services, not `$httpProvider`.

## Step 4: Distinguish Between $http and $httpProvider

A common point of confusion is the difference between `$http` (the service for making requests) and `$httpProvider` (the configuration object for customizing `$http`). The "Unknown provider: $httpProvider" error arises when you incorrectly try to inject `$httpProvider` into a place where only `$http` or other services are expected.

**Action:** Identify where you are injecting `$httpProvider`. If your intention is to *make HTTP requests*, you should be injecting and using the `$http` service. If your intention is to *configure default settings or add interceptors* for `$http`, then `$httpProvider` is correct, but it *must* be within a `.config()` block.

## Step 5: Check for Typographical Errors

Simple typos can also lead to this error. A misspelled module name or dependency can prevent the core AngularJS modules from loading correctly, thus making `$httpProvider` unavailable.

**Action:** Carefully review all module names and dependency strings in your application. For example, ensure you haven't written `'ng'` as `'n'` or `'Ng'`. Also, check for typos in your script file names referenced in `index.html`.

## Step 6: Examine Third-Party Module Integration

If you are using third-party AngularJS modules that rely on or modify the `$http` service, there might be an issue with how those modules are integrated or declared as dependencies. An incorrectly implemented third-party module could potentially interfere with module loading or dependency resolution.

**Action:** If the error started appearing after adding a new third-party library, temporarily remove it and see if the error persists. If it disappears, the issue likely lies with that library's integration or its own internal dependencies. Consult the library's documentation for proper setup. Ensure the third-party module's own JavaScript file is included and that its module name is correctly listed as a dependency in your `angular.module()` call.

## Common Mistakes

One of the most frequent mistakes is attempting to inject `$httpProvider` into a controller or a service's `.run()` block. Remember, `$httpProvider` is a configuration object meant to be used exclusively within the `.config()` phase of an AngularJS module. When you try to access it elsewhere, AngularJS's dependency injection system cannot find it, leading to the "Unknown provider" error. Another common pitfall is assuming that simply including the AngularJS script is enough; you must also explicitly declare `'ng'` as a dependency in your application's module definition if you intend to use any of its services, including `$http`, which indirectly relies on `$httpProvider` for its configuration.

Forgetting to add the core `'ng'` module as a dependency in your main application module is another frequent oversight. While it seems basic, many developers overlook this, especially when starting new projects or integrating modules. The `'ng'` module is foundational, and if it's not declared, core services and their providers will be unavailable. Lastly, confusing the `$http` service with the `$httpProvider` can lead to incorrect injections. If your goal is to make an API call, inject `$http`. If your goal is to set defaults or add interceptors, inject `$httpProvider` *only within a `.config()` block*.

## Prevention Tips

To prevent the "Error: Unknown provider: $httpProvider" from recurring, adhere to established best practices in AngularJS module management and configuration. Always ensure that your primary application module explicitly declares dependencies on necessary core AngularJS modules, especially `'ng'`. This establishes a clear contract for what services are available. When configuring the `$http` service's behavior (e.g., setting headers, adding interceptors), strictly use the `.config()` block of your module and inject `$httpProvider`. Avoid injecting `$httpProvider` in any other context.

Maintain a clean and organized structure for your application's script files and ensure they are correctly ordered in your `index.html`. The AngularJS core library should always be loaded first, followed by your application's modules and components. Regularly review your module dependencies and script includes, especially when refactoring code or integrating new libraries. This proactive approach will help catch potential issues before they manifest as runtime errors, ensuring a more stable and maintainable AngularJS application.