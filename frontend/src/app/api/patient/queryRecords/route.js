import { NextResponse } from "next/server";
import { firestore } from "../../../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const field = searchParams.keys().next().value;
    const value = searchParams.get(field);

    if (!field || !value) {
      return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
    }

    const collectionRef = collection(firestore, "patient");
    const q = query(collectionRef, where(field, "==", value));
    const querySnapshot = await getDocs(q);

    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: "Error querying documents: " + error }, { status: 500 });
  }
}
