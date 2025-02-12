import { NextResponse } from "next/server";
import { firestore } from "../../../firebase/config";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const aadhar = searchParams.get("aadhar");
  const password = searchParams.get("password");
  const queryType = searchParams.get("type");

  try {
    if (queryType === "all") {
      const collectionRef = collection(firestore, "Doctor");
      const querySnapshot = await getDocs(collectionRef);
      const results = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return NextResponse.json(results);
    }

    const docRef = doc(firestore, "Doctor", aadhar);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    const data = snap.data();

    if (password) {
      const isPasswordMatch = await bcrypt.compare(password, data.password);
      if (!isPasswordMatch) {
        return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching record: " + error }, { status: 500 });
  }
}