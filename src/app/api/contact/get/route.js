import connectToDB from "@/database";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();
    const extractData = await Contact.find({});

    if (extractData) {
      return NextResponse.json({
        success: true,
        data: extractData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "something went wrong",
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}
