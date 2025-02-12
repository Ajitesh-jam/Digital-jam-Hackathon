import { NextResponse } from "next/server";
import { firestore } from "../../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const collectionRef = collection(firestore, "patient");
    const querySnapshot = await getDocs(collectionRef);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching all patients: " + error }, { status: 500 });
  }
}
