import { NextResponse } from "next/server";
import { firestore } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import bcrypt from "bcrypt";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const aadhar = searchParams.get("aadhar");
    const password = searchParams.get("password");

    if (!aadhar || !password) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const docRef = doc(firestore, "patient", aadhar);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    const data = snap.data();
    const isPasswordMatch = await bcrypt.compare(password, data.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ error: "Password is incorrect" }, { status: 401 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching Record: " + error }, { status: 500 });
  }
}
