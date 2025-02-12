import { NextResponse } from "next/server";
import { firestore } from "@/app/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";

export async function GET(req, { params }) {
  try {
    const { publicAddress, password } = params;
    
    const docRef = doc(firestore, "staff", publicAddress);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    const data = snap.data();
    
    if (!data.password) {
      return NextResponse.json({ error: "No password set for this record" }, { status: 400 });
    }

    const isPasswordMatch = await bcrypt.compare(password, data.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ error: "Password is incorrect" }, { status: 401 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching record: " + error }, { status: 500 });
  }
}
