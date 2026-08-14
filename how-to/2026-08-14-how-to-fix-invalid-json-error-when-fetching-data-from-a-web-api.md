---
title: "How to Fix 'Invalid JSON' Error When Fetching Data from a Web API"
date: "2026-08-14T01:47:20.758Z"
slug: "how-to-fix-invalid-json-error-when-fetching-data-from-a-web-api"
type: "how-to"
description: "Learn how to troubleshoot and resolve the common \"Invalid JSON\" error when retrieving data from web APIs with this comprehensive step-by-step guide."
keywords: "Invalid JSON error, API error, JSON parsing, web API, data fetching, JavaScript, Python, PHP, error fixing, debugging, HTTP response"
---

You've made a request to a web API, expecting a structured data payload, but instead, your application throws an error. The message often reads something like: `Invalid JSON`, `Unexpected token < in JSON at position 0`, or `SyntaxError: JSON.parse error`. This is a frustrating but common roadblock when working with APIs. It means that the data you received from the server, which you expected to be valid JSON (JavaScript Object Notation), is actually malformed or in a completely different format. This prevents your program from processing the data as intended, leaving you with broken functionality.

This "Invalid JSON" error occurs because the data received from the API endpoint is not adhering to the strict rules of JSON syntax. JSON is a lightweight data-interchange format that uses human-readable text to transmit data objects consisting of attribute-value pairs and array data types. When the server sends back data that doesn't conform to these rules – perhaps due to missing commas, misplaced brackets, incorrect string quoting, or even an entirely different content type – your application's JSON parser will fail. This often happens when the API is returning an HTML error page (like a 404 Not Found or 500 Internal Server Error), plain text error messages, or even corrupted data.

## Step 1: Inspect the Raw Response

Before attempting any code fixes, the most crucial step is to examine the actual data you're receiving. Don't just rely on the error message your application displays. You need to see the raw response from the API.

**How to do it:**

*   **Browser Developer Tools:** If you're fetching data in a web browser using JavaScript (e.g., `fetch` or `XMLHttpRequest`), open your browser's developer tools (usually by pressing F12). Navigate to the "Network" tab. Refresh the page or trigger the API call. Find the specific request in the list, click on it, and then look for the "Response" or "Preview" tab. This will show you the exact data returned by the server.
*   **Command Line Tools:** If you're using tools like `curl` or `wget` on the command line, you can directly print the response:
    ```bash
    curl -v https://api.example.com/data
    ```
    The `-v` (verbose) flag will show you headers and the response body.
*   **API Testing Tools:** Tools like Postman or Insomnia are excellent for this. Make your request in the tool and examine the "Body" section of the response.
*   **Server-Side Code:** If you're debugging server-side code (e.g., Python with `requests`, PHP with `curl_exec`), print the raw response body before attempting to parse it.

**Example (Python):**
```python
import requests

url = "https://api.example.com/data"
response = requests.get(url)

print(f"Status Code: {response.status_code}")
print(f"Response Text:\n{response.text}")

try:
    data = response.json()
    print("Successfully parsed JSON.")
except requests.exceptions.JSONDecodeError as e:
    print(f"Failed to parse JSON: {e}")
```

## Step 2: Check the HTTP Status Code

The HTTP status code is a strong indicator of what went wrong. A successful API call typically returns a status code in the 2xx range (e.g., 200 OK). If you're getting an "Invalid JSON" error, but the status code is something like 404 Not Found, 500 Internal Server Error, 403 Forbidden, or 401 Unauthorized, it means the API didn't return the expected JSON data because an error occurred on the server.

**What to look for:**

*   **2xx codes (e.g., 200 OK):** Usually means success, but the *content* might still be invalid JSON.
*   **4xx codes (e.g., 400 Bad Request, 404 Not Found, 401 Unauthorized, 403 Forbidden):** Indicates a client-side error (e.g., incorrect URL, missing authentication) or a server-side issue related to the request. The response body is likely an HTML error page or plain text.
*   **5xx codes (e.g., 500 Internal Server Error, 503 Service Unavailable):** Indicates a server-side problem. The response body is almost certainly not JSON.

**Action:** If the status code is not 2xx, address the underlying issue indicated by the code first. This might involve correcting the API endpoint URL, providing necessary authentication tokens, or checking your request parameters.

## Step 3: Examine the Content Type Header

APIs communicate the format of their responses using the `Content-Type` HTTP header. For JSON data, this header should typically be `application/json`. If the server sends back a `Content-Type` of `text/html`, `text/plain`, or something else entirely, it's a strong hint that the response body is not JSON.

**How to check:**

*   **Browser Developer Tools:** In the "Network" tab, select the API request and look at the "Headers" section. Find the "Response Headers" and check the `Content-Type`.
*   **Command Line Tools:** Use `curl -I` or `curl -v` to see headers.
    ```bash
    curl -I https://api.example.com/data
    ```
    Look for the `Content-Type` line.

**Action:** If the `Content-Type` is not `application/json`, and you *expect* JSON, then the server is not behaving as expected. This might point to a bug in the API itself or a misconfiguration. If the `Content-Type` is `text/html`, it's highly probable you're receiving an HTML error page.

## Step 4: Validate the JSON Structure (If It Looks Like JSON)

Sometimes, the API *tries* to send JSON, but it's malformed. This is where syntax errors creep in. Even if the `Content-Type` is `application/json`, the actual content might be broken.

**Common JSON Syntax Errors:**

*   **Trailing commas:** A comma after the last element in an object or array.
    *   **Invalid:** `{"key": "value",}` or `["item1", "item2",]`
    *   **Valid:** `{"key": "value"}` or `["item1", "item2"]`
*   **Unquoted keys:** JSON keys (property names) must be enclosed in double quotes.
    *   **Invalid:** `{key: "value"}`
    *   **Valid:** `{"key": "value"}`
*   **Single quotes:** JSON requires double quotes for strings and keys.
    *   **Invalid:** `{'key': 'value'}`
    *   **Valid:** `{"key": "value"}`
*   **Unescaped special characters:** Characters like double quotes (`"`) or backslashes (`\`) within strings must be escaped with a backslash (`\`).
    *   **Invalid:** `{"message": "He said "Hello"."}`
    *   **Valid:** `{"message": "He said \"Hello\"."}`
*   **Incorrect bracket/brace usage:** Mismatched or missing curly braces `{}` for objects or square brackets `[]` for arrays.
*   **Comments:** JSON does not support comments.

**How to validate:**

*   **Online JSON Validators:** Copy and paste the raw JSON response into a free online validator like JSONLint, JSONFormatter, or others. These tools will highlight syntax errors and tell you exactly where they are.
*   **Code Editor Plugins:** Many code editors have plugins that can validate JSON as you type or format it.

**Action:** If you find syntax errors, you have a few options:
    *   **Report to API Provider:** If this is a third-party API, report the malformed JSON to the API provider.
    *   **Server-Side Fix:** If you control the API server, fix the code that generates the JSON.
    *   **Client-Side Workaround (Use with Caution):** In rare cases, if you absolutely cannot get the API fixed and the errors are consistent and minor (e.g., a trailing comma), you *might* be able to write client-side code to "clean" the JSON string before parsing. However, this is fragile and generally not recommended.

## Step 5: Handle Non-JSON Responses Gracefully

Not all API endpoints will always return JSON. Some might return HTML for errors, plain text for simple messages, or binary data. Your code should be prepared for this. Instead of directly calling `.json()` (or equivalent) without checking, first verify the `Content-Type` or attempt a lenient parse.

**Example (JavaScript using `fetch`):**
```javascript
fetch('https://api.example.com/data')
  .then(response => {
    // Check for HTTP errors first
    if (!response.ok) {
      // It's likely an HTML or plain text error page
      return response.text().then(text => {
        throw new Error(`HTTP error ${response.status}: ${text}`);
      });
    }
    // Check Content-Type if available and expected
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') === -1) {
      return response.text().then(text => {
        throw new Error(`Expected JSON, but received ${contentType}: ${text}`);
      });
    }
    // If all checks pass, attempt to parse as JSON
    return response.json();
  })
  .then(data => {
    console.log('Successfully fetched and parsed data:', data);
  })
  .catch(error => {
    console.error('Error fetching or parsing data:', error);
  });
```

**Example (Python):**
```python
import requests

url = "https://api.example.com/data"
try:
    response = requests.get(url)
    response.raise_for_status() # Raise an exception for bad status codes (4xx or 5xx)

    # Check Content-Type before parsing
    content_type = response.headers.get('content-type', '')
    if 'application/json' in content_type:
        data = response.json()
        print("Successfully parsed JSON:", data)
    else:
        print(f"Received non-JSON content type: {content_type}. Response text: {response.text}")

except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")
except requests.exceptions.JSONDecodeError as e:
    print(f"JSON decoding failed: {e}. Response text: {response.text}")
```

## Step 6: Debugging Specific Frameworks/Libraries

If you're using a framework or library (like Axios in JavaScript, Retrofit in Android, etc.), they often have their own error handling mechanisms. Consult their documentation for how to access the raw response or specific error details. For instance, Axios might provide error details in `error.response` which could contain status codes, headers, and the response data.

**Action:** Familiarize yourself with the error handling patterns of the tools you use. This often involves checking specific properties on the error object passed to your `.catch()` block or `except` clause.

## Step 7: Test with a Known Good Endpoint

If you're having trouble with a specific API endpoint, try fetching data from a known, reliable JSON API (e.g., `https://jsonplaceholder.typicode.com/posts/1`). If this known-good endpoint works correctly, it strongly suggests the problem lies with the specific API you were originally trying to access, rather than your general setup or JSON parsing logic.

**Action:** Use this to isolate the problem. If the known-good endpoint works, focus your debugging efforts on the problematic API's documentation, potential server-side issues, or your specific request parameters for that API.

**Common Mistakes:**

A frequent pitfall is assuming the response will *always* be valid JSON. Developers often directly call `response.json()` without first checking the HTTP status code or the `Content-Type` header. This leads to the "Invalid JSON" error when the response is, for example, an HTML error page. Another mistake is not using robust error handling, failing to catch exceptions during JSON parsing, which can crash an application. Lastly, developers might spend too much time trying to "fix" malformed JSON on the client-side when the root cause is actually a server-side bug that should be reported or fixed.

**Prevention Tips:**

The best way to prevent "Invalid JSON" errors is to write defensive code. Always check the HTTP status code. Verify the `Content-Type` header before attempting to parse JSON. Implement comprehensive error handling using `try-catch` blocks or `.catch()` methods to gracefully manage unexpected responses. Document your API interactions clearly, noting the expected response format and status codes. Regularly test your API integrations, especially after any updates to the API or your own codebase. If you control the API, ensure your JSON serialization logic is robust and always returns valid JSON, even in error scenarios (perhaps using a standard error JSON format).