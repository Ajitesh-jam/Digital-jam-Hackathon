import fs from "fs";
import { exec } from "child_process";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { searchParams } = new URL(req.url);
    const recordHash = searchParams.get("recordHash");
    const blockHash = searchParams.get("blockHash");

    console.log("Handler called with block hash:", blockHash);
    console.log("Handler called with record hash:", recordHash);

    if (!recordHash || !blockHash) {
      return NextResponse.json({ success: false, error: "Missing parameters" });
    }

    // Convert hash strings into an array of ASCII values
    const convertToAsciiArray = (hash) => {
      return hash.split("").map((char) => char.charCodeAt(0).toString());
    };

    const recordHashArray = convertToAsciiArray(recordHash);
    const blockHashArray = convertToAsciiArray(blockHash);

    const proverTomlPath = path.join(process.cwd(), "Prover.toml");

    // Generate the Prover TOML file
    const proverContent = `
record_hash = [${recordHashArray.map((num) => `"${num}"`).join(", ")}]
stored_cid = [${blockHashArray.map((num) => `"${num}"`).join(", ")}]
    `;

    fs.writeFileSync(proverTomlPath, proverContent);

    console.log("prover.toml written successfully");

    return NextResponse.json({
      success: true,
      message: "Proof generation setup completed",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
