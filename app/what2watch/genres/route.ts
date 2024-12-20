import { NextResponse } from "next/server";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface GenreResponse {
  genres: Array<{ id: number; name: string }>;
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const mediaType = searchParams.get("mediaType") ?? "movie";

    const url = `${BASE_URL}/genre/${mediaType}/list?api_key=${TMDB_API_KEY}&language=en-US`;
    console.log("Fetching genres URL:", url); // Add this line

    const response = await fetch(url);

    if (!response.ok) {
      console.error("TMDB API error:", await response.text()); // Add this line
      throw new Error("Failed to fetch genres");
    }

    const data: GenreResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Detailed genres error:", error); // Add this line
    return NextResponse.json(
      { error: "Failed to fetch genres" },
      { status: 500 },
    );
  }
}
