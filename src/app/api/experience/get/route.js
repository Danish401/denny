import connectToDB from "@/database";
import Experience from "@/models/Experience";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();
    const extractData = await Experience.find({});

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
