// import connectToDB from "@/database";
// import About from "@/models/About";
// import { NextResponse } from "next/server";

// export async function PUT(req) {
//   try {
//     await connectToDB();
//     const extractData = await res.json();
//     const {
//       _id,
//       aboutMe,
//       noOfProjects,
//       yearofexperience,
//       noofclients,
//       skills,
//     } = extractData;
//     const updateData = await About.findOneAndUpdate(
//       {
//         _id: _id,
//       },
//       { noOfProjects, yearofexperience, noofclients, skills },
//       { new: true }
//     );

//     if (updateData) {
//       return NextResponse.json({
//         success: true,
//         message: "update successfully",
//       });
//     } else {
//       return NextResponse.json({
//         success: false,
//         message: "something went wrong",
//       });
//     }
//   } catch (e) {
//     console.log(e);
//     return NextResponse.json({
//       success: false,
//       message: "something went wrong",
//     });
//   }
// }

import connectToDB from "@/database";
import About from "@/models/About";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectToDB();
    const extractData = await req.json(); // Changed from res.json() to req.json()
    const { _id, noOfProjects, yearofexperience, noofclients, skills } =
      extractData;

    const updateData = await About.findOneAndUpdate(
      { _id },
      { noOfProjects, yearofexperience, noofclients, skills },
      { new: true }
    );

    if (updateData) {
      return NextResponse.json({
        success: true,
        message: "Data updated successfully",
        data: updateData, // Optionally return updated data
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong while updating data",
      });
    }
  } catch (e) {
    console.error("Error in PUT request:", e); // Log error for easier debugging
    return NextResponse.json({
      success: false,
      message: "Error occurred while updating data",
    });
  }
}
