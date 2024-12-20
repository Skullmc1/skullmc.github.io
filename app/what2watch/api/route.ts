import { NextResponse } from "next/server";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export async function POST(request: Request): Promise<NextResponse> {
  if (!TMDB_API_KEY) {
    console.error("TMDB API key is not defined");
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    console.log("Request body:", body);

    const { page = 1, mediaType = "movie", yearRange, rating, genre } = body;

    const yearParams =
      mediaType === "movie"
        ? {
            ...(yearRange?.start && {
              "primary_release_date.gte": `${yearRange.start}-01-01`,
            }),
            ...(yearRange?.end && {
              "primary_release_date.lte": `${yearRange.end}-12-31`,
            }),
          }
        : {
            ...(yearRange?.start && {
              "first_air_date.gte": `${yearRange.start}-01-01`,
            }),
            ...(yearRange?.end && {
              "first_air_date.lte": `${yearRange.end}-12-31`,
            }),
          };

    const queryParams = new URLSearchParams({
      api_key: TMDB_API_KEY,
      language: "en-US",
      include_adult: "false",
      page: page.toString(),
      ...(genre && { with_genres: genre.toString() }),
      ...yearParams,
      ...(rating && { "vote_average.gte": rating.toString() }),
      sort_by: "popularity.desc",
    });

    const url = `${BASE_URL}/discover/${mediaType}?${queryParams.toString()}`;
    console.log("Fetching URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("TMDB API error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch from TMDB" },
        { status: response.status },
      );
    }

    const data = await response.json();

    const results = data.results.map((item: any) => ({
      id: item.id,
      title: mediaType === "movie" ? item.title : item.name,
      overview: item.overview,
      releaseDate:
        mediaType === "movie" ? item.release_date : item.first_air_date,
      posterUrl: item.poster_path
        ? `${IMAGE_BASE_URL}w500${item.poster_path}`
        : null,
      backdropUrl: item.backdrop_path
        ? `${IMAGE_BASE_URL}original${item.backdrop_path}`
        : null,
      voteAverage: item.vote_average,
      mediaType,
    }));

    return NextResponse.json({
      results,
      totalPages: data.total_pages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
