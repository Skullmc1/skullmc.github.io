export interface MovieResult {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  voteAverage: number;
  mediaType: "movie" | "tv";
}

export interface FilterOptions {
  genre?: string;
  yearRange: {
    start?: number;
    end?: number;
  };
  rating?: number;
  page: number;
  mediaType: "movie" | "tv";
}
