"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyzeWebsite = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Something went wrong" });
    }

    setLoading(false);
  };

  return (
    <main style={{ padding: 40, fontFamily: "Arial" }}>
      <h1 style={{ fontSize: 32, fontWeight: "bold" }}>
        Auditly AI
      </h1>

      <p>Enter a website to analyze</p>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        style={{
          padding: 10,
          width: 300,
          marginTop: 10,
          border: "1px solid #ccc",
        }}
      />

      <br />

      <button
        onClick={analyzeWebsite}
        disabled={loading}
        style={{
          marginTop: 10,
          padding: 10,
          background: "black",
          color: "white",
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      <div style={{ marginTop: 20 }}>
        {result && (
          <pre style={{ background: "#f5f5f5", padding: 10 }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}
