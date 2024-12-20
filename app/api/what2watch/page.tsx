"use client";

import { useState } from "react";
import FilterSection from "./components/FilterSection";
import ResultsList from "./components/ResultsList";
import { FilterOptions, MovieResult } from "./types";

export default function What2Watch() {
  const [results, setResults] = useState<MovieResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions | null>(
    null,
  );

  const handleSearch = async (filters: FilterOptions) => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    setCurrentFilters(filters);

    try {
      const response = await fetch("/what2watch/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...filters, page: 1 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch results");
      }

      const data = await response.json();
      setResults(data.results);
      setHasMore(data.totalPages > 1);
    } catch (error) {
      console.error("Error fetching results:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch results",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (!currentFilters || loading) return;

    const nextPage = currentPage + 1;
    setLoading(true);

    try {
      const response = await fetch("/what2watch/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...currentFilters, page: nextPage }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch more results");
      }

      const data = await response.json();
      setResults([...results, ...data.results]);
      setCurrentPage(nextPage);
      setHasMore(data.totalPages > nextPage);
    } catch (error) {
      console.error("Error fetching more results:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch more results",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 p-4 md:p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-purple-100 tracking-tight">
          What 2 Watch
        </h1>

        <FilterSection onSearch={handleSearch} />

        {error && (
          <div className="text-red-400 bg-red-900/20 border border-red-500/30 p-4 rounded-lg mt-4">
            {error}
          </div>
        )}

        {results.length > 0 && <ResultsList results={results} />}

        {hasMore && (
          <div className="flex justify-center mt-8 mb-8">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}
