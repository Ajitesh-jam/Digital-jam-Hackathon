import { NextResponse } from "next/server";
import { firestore } from "../../../firebase/config";
import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, phone, email, DOB, aadhar, gender, password, image, doctorId, publicAddress } = await req.json();
    await setDoc(doc(firestore, "Doctor", aadhar), {
      publicAddress,
      name,
      phone,
      email,
      DOB,
      aadhar,
      gender,
      password,
      image,
      doctorId,
    });
    return NextResponse.json({ message: `Doctor record created with Aadhar ID: ${aadhar}` });
  } catch (error) {
    return NextResponse.json({ error: "Error adding record: " + error }, { status: 500 });
  }
}