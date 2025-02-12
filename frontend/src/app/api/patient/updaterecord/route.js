import { NextResponse } from "next/server";
import { firestore } from "../../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export async function PUT(req) {
  try {
    const { aadhar, ...updates } = await req.json();

    if (!aadhar) {
      return NextResponse.json({ error: "Aadhar is required" }, { status: 400 });
    }

    const docRef = doc(firestore, "patient", aadhar);
    await updateDoc(docRef, updates);
    return NextResponse.json({ message: "Record updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error updating Record: " + error }, { status: 500 });
  }
}
