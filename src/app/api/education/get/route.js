// import connectToDB from "@/database";
// import Education from "@/models/Education";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   try {
//     await connectToDB();
//     const extractData = await Education.find({});

//     if (extractData) {
//       return NextResponse.json({
//         success: true,
//         data: extractData,
//       });
//     } else {
//       return NextResponse.json({
//         success: false,
//         message: "something went wrong",
//       });
//     }
//   } catch (e) {
//     return NextResponse.json({
//       success: false,
//       message: "something went wrong",
//     });
//   }
// }

import connectToDB from "@/database";
import Education from "@/models/Education";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();
    const extractData = await Education.find({});

    if (extractData.length > 0) {
      return NextResponse.json({
        success: true,
        data: extractData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No data found",
      });
    }
  } catch (e) {
    console.error("Error in GET request:", e);
    return NextResponse.json({
      success: false,
      message: "Error occurred while fetching data",
      error: e.message, // Optionally include error details for debugging
    });
  }
}
