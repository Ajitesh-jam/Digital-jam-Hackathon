import { NextResponse } from "next/server";
import { firestore } from "../../../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const aadhar = searchParams.get("aadhar");

    if (!aadhar) {
      return NextResponse.json({ error: "Aadhar is required" }, { status: 400 });
    }

    const docRef = doc(firestore, "patient", aadhar);
    await deleteDoc(docRef);
    return NextResponse.json({ message: "Document deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting document: " + error }, { status: 500 });
  }
}
