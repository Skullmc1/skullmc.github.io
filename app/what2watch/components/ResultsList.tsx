import Image from "next/image";
import { MovieResult } from "../types";

interface ResultsListProps {
  results: MovieResult[];
}

export default function ResultsList({ results }: ResultsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {results.map((item) => (
        <div
          key={item.id}
          className="bg-purple-900/20 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg relative"
        >
          <div className="absolute top-2 right-2 z-10 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            {item.mediaType === "movie" ? "Movie" : "TV Show"}
          </div>

          {item.posterUrl && (
            <div className="relative h-[400px]">
              <Image
                src={item.posterUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <div className="p-4">
            <h2 className="text-xl font-bold text-purple-100 mb-2">
              {item.title}
            </h2>
            <p className="text-purple-200 text-sm mb-2">
              {item.releaseDate && new Date(item.releaseDate).getFullYear()}
            </p>
            <p className="text-purple-300 text-sm line-clamp-3">
              {item.overview}
            </p>
            <div className="mt-2 text-purple-400">
              Rating: {item.voteAverage.toFixed(1)}/10
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
