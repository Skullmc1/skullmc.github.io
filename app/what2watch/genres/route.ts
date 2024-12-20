import { NextResponse } from "next/server";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(request: Request): Promise<NextResponse> {
  if (!TMDB_API_KEY) {
    console.error("TMDB API key is not defined");
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 },
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const mediaType = searchParams.get("mediaType") ?? "movie";

    const url = `${BASE_URL}/genre/${mediaType}/list?api_key=${TMDB_API_KEY}&language=en-US`;
    console.log("Fetching genres URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("TMDB API error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch genres" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching genres:", error);
    return NextResponse.json(
      { error: "Failed to fetch genres" },
      { status: 500 },
    );
  }
}
