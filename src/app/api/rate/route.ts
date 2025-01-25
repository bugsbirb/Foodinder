import { NextResponse } from "next/server";
import { findMany, insertOne, updateOne } from "../../../../utils/mongo";

export async function POST(request: Request) {
  const { name, foodId, avatar } = await request.json();
  const rating = 1;
  try {
    const existingRating = await findMany("ratings", { name, foodId });
    if (existingRating.length > 0) {
      const UpdateRating = await updateOne(
        "ratings",
        { name, foodId },
        { $set: { rating: existingRating[0].rating + 1, avatar } }
      );
      return NextResponse.json(
        { message: "Rating updated", data: UpdateRating },
        { status: 200 }
      );
    }

    const newRating = await insertOne("ratings", {
       name,
      foodId,
      rating,
      avatar,
    });

    return NextResponse.json(
      { message: "Rating created", data: newRating },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating rating:", error);
    return NextResponse.json(
      { message: "Error creating rating" },
      { status: 500 }
    );
  }
}
