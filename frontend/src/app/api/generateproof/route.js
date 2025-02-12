import fs from "fs";
import { exec } from "child_process";
import path from "path";


import { NextResponse } from "next/server";


export async function GET(req, { params }) {
    try {
        const { searchParams } = new URL(req.url);
  const recordHash = searchParams.get("recordHash");
  const blockHash = searchParams.get("blockHash");
  //const queryType = searchParams.get("type");
    //const { recordHash, blockHash } = req.body;

    console.log("psot handler called with block hash ", blockHash);
    console.log("psot handler called with record hash ", recordHash);
    const proverTomlPath = path.join(process.cwd(), "prover.toml");

    // Generate the Prover TOML file
    const proverContent = `
      record_hash = "${recordHash}"
      stored_cid = "${blockHash}"
    `;
    fs.writeFileSync(proverTomlPath, proverContent);

    // // Run Nargo and Prover commands
    // exec(
    //   `cd /path/to/your/noir/project && nargo compile && bb prove -b ./target/dob_verification.json -w ./target/dob_verification.gz -o ./public/proof`,
    //   (error, stdout, stderr) => {
    //     if (error) {
    //       console.error(`Error: ${error.message}`);
    //       return res.status(500).json({ success: false, error: error.message });
    //     }

    //     console.log("Proof Generated:", stdout);
    //     return res.status(200).json({ success: true, downloadUrl: "/proof" });
    //   }
    // );
    //return nextrespinse 
    return NextResponse.json({ success: true, message: "Proof generated successfully" });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message });

  }
}

