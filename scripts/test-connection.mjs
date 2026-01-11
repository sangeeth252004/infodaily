import fetch from "node-fetch"; // Ensure node-fetch is installed or use built-in fetch in Node 18+

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ Error: GEMINI_API_KEY is missing from environment variables.");
  process.exit(1);
}

async function checkConnection() {
  console.log("🔍 Diagnosing Gemini API Connection...");
  
  // 1. Check for invisible whitespace (Common GitHub Secrets bug)
  if (API_KEY.trim() !== API_KEY) {
    console.error("⚠️ WARNING: Your API Key has leading/trailing whitespace!");
    console.error("   Fix: Delete and re-add the secret in GitHub Settings, ensuring no spaces.");
  }

  // 2. Ask the API "What models do I have access to?"
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (res.ok) {
      console.log("✅ Connection Successful! Valid API Key.");
      console.log("📜 Available Models for this Key:");
      if (data.models && data.models.length > 0) {
        data.models.forEach(m => console.log(`   - ${m.name}`));
      } else {
        console.log("   ❌ No models found. This usually means the API is enabled but has no model access in this region.");
      }
    } else {
      console.error(`❌ API Error: ${res.status} ${res.statusText}`);
      console.error("   Details:", JSON.stringify(data, null, 2));
      
      if (res.status === 404) {
        console.log("\n💡 DIAGNOSIS: 404 on 'List Models' endpoint");
        console.log("   This usually means your API Key is valid, but the 'Generative Language API' is NOT enabled on your Google Cloud Project.");
        console.log("   👉 Go to: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com");
      }
    }
  } catch (error) {
    console.error("❌ Network/Fetch Error:", error.message);
  }
}

checkConnection();