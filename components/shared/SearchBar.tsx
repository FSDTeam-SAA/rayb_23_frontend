"use client";
import { Input } from "@/components/ui/input";
import { Search, X, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import Image from "next/image";
import { useFilterStore } from "@/zustand/stores/search-store";
import { Button } from "../ui/button";
import { useSearchStore } from "../home/states/useSearchStore";

interface Business {
  _id: string;
  businessInfo?: {
    image?: string[];
    name?: string;
    location?: string;
  };
  services?: {
    newInstrumentName: string;
    selectedInstrumentsGroup?: string;
  }[];
}

interface PlaceResult {
  display_name: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    state_code?: string;
    country?: string;
  };
}

interface SearchBarProps {
  variant?: "desktop" | "mobile";
  onResultClick?: () => void;
}

const SearchBar = ({ variant = "desktop", onResultClick }: SearchBarProps) => {
  const router = useRouter();

  // Search functionality state
  const { search, setSearch } = useFilterStore();
  const [searchQuery, setSearchQuery] = useState<string>(search);
  const { location, setLocation } = useSearchStore();
  const [showResults, setShowResults] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<
    "search" | "location" | null
  >(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Update local state when store changes
  useEffect(() => {
    setSearchQuery(search);
  }, [search]);

  // Fetch businesses
  const fetchBusinesses = async () => {
    if (!searchQuery.trim() && !location.trim()) {
      setSearchResults([]);
      setShowResults(false);
      setActiveDropdown(null);
      return;
    }

    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchQuery.trim()) queryParams.append("search", searchQuery.trim());
      if (location.trim()) queryParams.append("location", location.trim());

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/business?${queryParams}`
      );
      const data = await response.json();
      setSearchResults(data.data || []);
      setShowResults(true);
      setActiveDropdown("search");
    } catch (error) {
      console.error("Error fetching businesses:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
        setShowLocationDropdown(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Improved OpenStreetMap location suggestions
  useEffect(() => {
    if (!location || location.length < 2) {
      setLocationSuggestions([]);
      setShowLocationDropdown(false);
      if (activeDropdown === "location") {
        setActiveDropdown(null);
      }
      return;
    }

    const fetchLocations = async () => {
      setIsLoadingLocations(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
            location
          )}&format=json&addressdetails=1&limit=10`
        );
        const data: PlaceResult[] = await response.json();

        const formattedResults = data
          .map((place) => {
            const city =
              place.address.city || place.address.town || place.address.village;

            // Try to get 2-letter state code (capitalized)
            let state = place.address.state_code
              ? place.address.state_code.toUpperCase()
              : "";

            // If no state_code, use first two letters of state name
            if (!state && place.address.state) {
              state = place.address.state.slice(0, 2).toUpperCase();
            }

            if (!city) return "";

            // Combine city and short state
            return state ? `${city}, ${state}` : city;
          })
          .filter((v) => v.trim() !== "");

        // Remove duplicates
        const uniqueResults = Array.from(new Set(formattedResults));

        setLocationSuggestions(uniqueResults);
        setShowLocationDropdown(uniqueResults.length > 0);
        if (uniqueResults.length > 0) {
          setActiveDropdown("location");
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLocationSuggestions([]);
      } finally {
        setIsLoadingLocations(false);
      }
    };

    const timeoutId = setTimeout(fetchLocations, 400);
    return () => clearTimeout(timeoutId);
  }, [location, activeDropdown]);

  const handleLocationSelect = (selected: string) => {
    setLocation(selected);
    setShowLocationDropdown(false);
    setActiveDropdown(null);
  };

  // Common handlers
  const handleSearch = () => {
    if (searchQuery.trim() || location.trim()) {
      setSearch(searchQuery.trim());
      fetchBusinesses();
    }
  };

  const handleSearchAndNavigate = () => {
    if (searchQuery.trim() || location.trim()) {
      setSearch(searchQuery.trim());
      router.push(`/search-result`);
      setShowResults(false);
      setActiveDropdown(null);
      onResultClick?.();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearch("");
    setShowResults(false);
    setSearchResults([]);
    setActiveDropdown(null);
  };

  const clearLocation = () => {
    setLocation("San Francisco, CA");
    setShowResults(false);
    setShowLocationDropdown(false);
    setActiveDropdown(null);
  };

  const handleResultClick = () => {
    setShowResults(false);
    setActiveDropdown(null);
    onResultClick?.();
  };

  const handleSearchFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
      setActiveDropdown("search");
    }
  };

  const handleLocationFocus = () => {
    if (locationSuggestions.length > 0) {
      setShowLocationDropdown(true);
      setActiveDropdown("location");
    }
  };

  // Only show one dropdown at a time
  const shouldShowSearchResults = showResults && activeDropdown === "search";
  const shouldShowLocationDropdown =
    showLocationDropdown && activeDropdown === "location";

  // Styles
  const containerClass =
    variant === "mobile"
      ? "relative"
      : "hidden md:flex flex-1 max-w-2xl mx-auto items-center relative bg-[#F7F8F8] rounded-lg";
  const inputContainerClass =
    variant === "mobile" ? "flex flex-col" : "flex items-center w-full";
  const searchInputClass =
    variant === "mobile"
      ? "flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 px-4 bg-transparent outline-none"
      : "pl-10 w-full h-[48px] focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 bg-[#F7F8F8] rounded-lg border border-gray-200 shadow-inner rounded-none rounded-l-lg border-none";
  const locationInputClass =
    variant === "mobile"
      ? "flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 px-4 bg-transparent outline-none "
      : "pl-10 w-full md:w-48 h-[48px] border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 bg-[#F7F8F8] rounded-lg shadow-inner rounded-none";
  const resultsClass =
    variant === "mobile"
      ? "absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-[300px] overflow-y-auto top-full"
      : "absolute z-50 top-14 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-[400px] overflow-y-auto";
  const locationDropdownClass =
    "absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-[200px] overflow-y-auto";

  return (
    <div className={containerClass} ref={searchRef}>
      <div className={inputContainerClass}>
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={handleSearchFocus}
              placeholder="Guitar, strings, restringing..."
              className={searchInputClass}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="h-[35px] border-r border-r-gray-300"></div>

        {/* Location Input */}
        <div className="flex-1 md:flex-none relative">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={handleLocationFocus}
              placeholder="Location"
              className={locationInputClass}
            />
            {location && (
              <button
                onClick={clearLocation}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Improved Location Suggestions Dropdown */}
          {shouldShowLocationDropdown && (
            <div className={locationDropdownClass}>
              {isLoadingLocations ? (
                <div className="p-4 text-center">Loading locations...</div>
              ) : locationSuggestions.length === 0 ? (
                <div className="p-4 text-gray-500">No locations found</div>
              ) : (
                <ul>
                  {locationSuggestions.map((item, index) => (
                    <li
                      key={index}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleLocationSelect(item)}
                    >
                      <div className="p-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{item}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Search Button */}
        <div>
          <Button className="h-[48px] -ml-1" onClick={handleSearch}>
            <Search />
          </Button>
        </div>

        {variant === "mobile" && (
          <button
            onClick={handleSearch}
            className="bg-[#00998E] text-white rounded-lg px-4 py-2 hover:bg-teal-700 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown - Only show when active */}
      {shouldShowSearchResults && (
        <div className={resultsClass}>
          {isLoading ? (
            <div className="p-4 text-center">Searching...</div>
          ) : searchResults.length === 0 && (searchQuery || location) ? (
            <div className="p-4 text-gray-500">
              No results found {location && `in ${location}`}
            </div>
          ) : (
            <ul>
              {searchResults.slice(0, 5).map((business) => (
                <Link
                  href={`/search-result/${business._id}`}
                  key={business._id}
                >
                  <li
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
                    onClick={handleResultClick}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        {business.businessInfo?.image?.[0] && (
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={business.businessInfo.image[0]}
                              alt={
                                business.businessInfo.name || "Business image"
                              }
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-medium">
                            {business.businessInfo?.name || "Unknown Business"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {business.services
                              ?.slice(0, 2)
                              .map((s) => s.newInstrumentName)
                              .join(", ")}
                          </p>
                          {business.businessInfo?.location && (
                            <p className="text-xs text-gray-500 mt-1">
                              📍 {business.businessInfo.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
              {searchResults.length > 5 && (
                <li
                  className="p-3 text-center text-sm text-blue-600 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    handleSearchAndNavigate();
                    handleResultClick();
                  }}
                >
                  View all {searchResults.length} results
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
