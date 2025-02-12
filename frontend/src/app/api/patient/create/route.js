import { NextResponse } from "next/server";
import { firestore } from "../../../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const { name, phone, email, DOB, aadhar, gender, password, image, publicAddress } = await req.json();
    await setDoc(doc(firestore, "patient", aadhar), {
      publicAddress,
      name,
      phone,
      email,
      DOB,
      aadhar,
      gender,
      password,
      image,
    });
    return NextResponse.json({ message: `Medical Report written with Aadhar ID: ${aadhar}` });
  } catch (error) {
    return NextResponse.json({ error: "Error adding Record: " + error }, { status: 500 });
  }
}
