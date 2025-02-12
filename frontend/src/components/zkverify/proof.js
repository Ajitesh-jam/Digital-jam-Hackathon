'use client'
import { useState } from "react";

export default function ProofGenerator(blockHash) {
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
    //  // const hash = await computeSHA256(inputText);
    //  const hash = "51cd42ae58e433bfb6c8028c41f3aa5774a103167584b6e08df8408ae4954e68";
    //   const blockHash = "51cd42ae58e433bfb6c8028c41f3aa5774a103167584b6e08df8408ae4954e68"; // Hardcoded for now
    const hash = inputText;

    console.log("Generating proof for ",blockHash.blockHash);

      // Send request to API route to execute commands
      const response = await fetch("/api/generateproof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordHash: hash, blockHash:blockHash.blockHash }),
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
      <h2>Generate ZK Proof that Record is Legitimate</h2>
      <textarea
        placeholder="Enter The hash from SHA256"
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
          <p>
            Proof Generated!{" "}
            <a href={downloadLink} download="prover.toml">
              Download Proof
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
