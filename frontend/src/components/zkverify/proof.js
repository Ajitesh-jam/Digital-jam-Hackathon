import { useState } from "react";

export default function ProofGenerator() {
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);

  // Function to compute SHA-256 hash
  async function computeSHA256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // Function to trigger proof generation
  async function generateProof() {
    setIsGenerating(true);
    setDownloadLink(null);

    try {
      const hash = await computeSHA256(inputText);
      const blockHash = "1"; // Hardcoded for now

      // Send request to API route to execute commands
      const response = await fetch("/api/generateProof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordHash: hash, blockHash }),
      });

      const data = await response.json();
      if (data.success) {
        setDownloadLink(data.downloadUrl);
      } else {
        alert("Proof generation failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }

    setIsGenerating(false);
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Generate ZK Proof</h2>
      <textarea
        placeholder="Enter medical record data"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{ width: "80%", height: "100px", marginBottom: "10px" }}
      />
      <br />
      <button onClick={generateProof} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate Proof"}
      </button>
      {downloadLink && (
        <div>
          <p>Proof Generated! <a href={downloadLink} download>Download Proof</a></p>
        </div>
      )}
    </div>
  );
}
