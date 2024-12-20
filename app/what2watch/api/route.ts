import { NextResponse } from "next/server";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

interface YearRange {
  start?: string;
  end?: string;
}

interface TMDBResponse {
  results: Array<TMDBItem>;
  total_pages: number;
}

interface TMDBItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const {
      page = 1,
      mediaType = "movie",
      yearRange,
      rating,
      genre,
    }: {
      page?: number;
      mediaType?: string;
      yearRange?: YearRange;
      rating?: number;
      genre?: string;
    } = await request.json();

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
      api_key: TMDB_API_KEY ?? "",
      language: "en-US",
      include_adult: "false",
      page: page.toString(),
      ...(genre && { with_genres: genre }),
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

    const data: TMDBResponse = await response.json();

    const results = data.results.map((item: TMDBItem) => ({
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
