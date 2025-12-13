// import connectToDB from "@/database";
// import About from "@/models/About";

// import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

// export async function POST(req) {
//   try {
//     await connectToDB();
//     const extractData = await req.json();
//     const saveData = await About.create(extractData);
//     if (saveData) {
//       return NextResponse.json({
//         success: true,
//         message: "Data saved Successfully",
//       });
//     } else {
//       return NextResponse.json({
//         success: false,
//         message: " something went wrong",
//       });
//     }
//   } catch (e) {
//     return NextResponse.json({
//       success: false,
//       message: " something went wrong",
//     });
//   }
// }

import connectToDB from "@/database";
import About from "@/models/About";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const extractData = await req.json(); // Correct usage of req.json()
    const saveData = await About.create(extractData);

    if (saveData) {
      return NextResponse.json({
        success: true,
        message: "Data saved successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong while saving data",
      });
    }
  } catch (e) {
    console.error("Error in POST request:", e); // Add logging for errors
    return NextResponse.json({
      success: false,
      message: "Error occurred while saving data",
    });
  }
}
