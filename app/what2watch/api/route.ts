import { NextResponse } from "next/server";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export async function POST(request: Request) {
  try {
    const {
      page = 1,
      mediaType = "movie",
      yearRange,
      rating,
      ...filters
    } = await request.json();

    // Handle year range parameters based on media type
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
      api_key: TMDB_API_KEY!,
      language: "en-US",
      include_adult: "false",
      page: page.toString(),
      ...(filters.genre && { with_genres: filters.genre }),
      ...yearParams,
      ...(rating && { "vote_average.gte": rating.toString() }),
      sort_by: "popularity.desc",
    });

    const response = await fetch(
      `${BASE_URL}/discover/${mediaType}?${queryParams.toString()}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from TMDB");
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
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 },
    );
  }
}
