import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { recordHash, blockHash } = await req.json();

    if (!recordHash || !blockHash) {
      return NextResponse.json({ success: false, error: "Missing parameters" });
    }

    // Convert hash strings into an array of ASCII values
    const convertToAsciiArray = (hash) => {
      return hash.split("").map((char) => char.charCodeAt(0).toString());
    };

    const recordHashArray = convertToAsciiArray(recordHash);
    const blockHashArray = convertToAsciiArray(blockHash);

    // Generate prover.toml content
    const proverContent = `
record_hash = [${recordHashArray.map((num) => `"${num}"`).join(", ")}]
stored_cid = [${blockHashArray.map((num) => `"${num}"`).join(", ")}]
    `;

    // Define file path
    const proverTomlPath = path.join(process.cwd(), "public", "Prover.toml");

    // Write the file
    fs.writeFileSync(proverTomlPath, proverContent);

    console.log("prover.toml generated successfully");

    return NextResponse.json({
      success: true,
      downloadUrl: "/prover.toml",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
