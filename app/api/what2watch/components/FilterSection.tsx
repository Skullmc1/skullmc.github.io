import { useEffect, useState } from "react";
import { FilterOptions } from "../types";

interface FilterSectionProps {
  onSearch: (filters: FilterOptions) => void;
}

export default function FilterSection({ onSearch }: FilterSectionProps) {
  const currentYear = new Date().getFullYear();

  const [filters, setFilters] = useState<FilterOptions>({
    genre: "",
    yearRange: {
      start: undefined,
      end: undefined,
    },
    rating: undefined,
    page: 1,
    mediaType: "movie",
  });

  const [genres, setGenres] = useState<Array<{ id: number; name: string }>>([]);
  const [yearInputs, setYearInputs] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `/api/what2watch/genres?mediaType=${filters.mediaType}`, // Updated path
        );
        if (response.ok) {
          const data = await response.json();
          setGenres(data.genres);
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, [filters.mediaType]);

  const handleYearChange = (type: "start" | "end", value: string) => {
    // Update the input value immediately for better UX
    setYearInputs((prev) => ({
      ...prev,
      [type]: value,
    }));

    // Convert to number and validate
    const year = value ? parseInt(value) : undefined;

    if (value && (!year || year < 1900 || year > currentYear)) {
      return; // Don't update filters if invalid
    }

    // Update filters with validated year
    setFilters((prev) => ({
      ...prev,
      yearRange: {
        ...prev.yearRange,
        [type]: year,
      },
    }));
  };

  const handleYearBlur = (type: "start" | "end") => {
    // Reset input to match filter value on blur
    setYearInputs((prev) => ({
      ...prev,
      [type]: filters.yearRange[type]?.toString() || "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate year range before submitting
    if (
      filters.yearRange.start &&
      filters.yearRange.end &&
      filters.yearRange.start > filters.yearRange.end
    ) {
      alert("Start year cannot be greater than end year");
      return;
    }
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-purple-200 mb-2">Type</label>
          <select
            value={filters.mediaType}
            onChange={(e) =>
              setFilters({
                ...filters,
                mediaType: e.target.value as "movie" | "tv",
              })
            }
            className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg px-4 py-2 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
          </select>
        </div>

        <div>
          <label className="block text-purple-200 mb-2">Genre</label>
          <select
            value={filters.genre}
            onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
            className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg px-4 py-2 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-purple-200 mb-2">Year Range</label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              value={yearInputs.start}
              onChange={(e) => handleYearChange("start", e.target.value)}
              onBlur={() => handleYearBlur("start")}
              placeholder="From"
              className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg px-4 py-2 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="text-purple-200">to</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              value={yearInputs.end}
              onChange={(e) => handleYearChange("end", e.target.value)}
              onBlur={() => handleYearBlur("end")}
              placeholder="To"
              className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg px-4 py-2 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <p className="text-purple-300 text-xs mt-1">
            Enter years between 1900 and {currentYear}
          </p>
        </div>

        <div>
          <label className="block text-purple-200 mb-2">Minimum Rating</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={filters.rating || 0}
              onChange={(e) =>
                setFilters({ ...filters, rating: Number(e.target.value) })
              }
              className="w-full accent-purple-500"
            />
            <span className="text-purple-200 min-w-[3ch]">
              {filters.rating || 0}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
