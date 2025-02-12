import { NextResponse } from "next/server";
import { firestore } from "@/app/firebase/config";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const { 
      name,
      phone,
      email,
      DOB, 
      aadhar,
      gender, 
      password,
      staffId,
      post,
      image,
      publicAddress
    } = await req.json();

    await setDoc(doc(firestore, "staff", publicAddress), {
      publicAddress,
      name,
      phone,
      email,
      DOB,
      aadhar,
      gender,
      password,
      image,
      staffId,
      post
    });

    return NextResponse.json({ message: `Staff record created with Aadhar ID: ${aadhar}` });
  } catch (error) {
    return NextResponse.json({ error: "Error adding record: " + error }, { status: 500 });
  }
}
