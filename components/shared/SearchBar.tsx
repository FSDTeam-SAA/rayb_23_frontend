"use client";
import { Input } from "@/components/ui/input";
import { Search, X, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useFilterStore } from "@/zustand/stores/search-store";
import { Button } from "../ui/button";
import { useSearchStore } from "../home/states/useSearchStore";

interface PlaceResult {
  display_name: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    state_code?: string;
  };
}

interface SearchBarProps {
  variant?: "desktop" | "mobile";
  onResultClick?: () => void;
}

const SearchBar = ({ variant = "desktop", onResultClick }: SearchBarProps) => {
  const router = useRouter();
  const { search, setSearch } = useFilterStore();
  const { location, setLocation } = useSearchStore();
  const [searchQuery, setSearchQuery] = useState<string>(search);
  const [locationInputValue, setLocationInputValue] =
    useState<string>(location);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const isSelectingRef = useRef(false); // Use ref instead of state to avoid re-renders

  // Update local state when store changes
  useEffect(() => {
    setSearchQuery(search);
  }, [search]);

  useEffect(() => {
    setLocationInputValue(location);
  }, [location]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // OpenStreetMap location suggestions
  useEffect(() => {
    // Don't fetch if we're in the middle of selecting
    if (isSelectingRef.current) {
      return;
    }

    if (!locationInputValue || locationInputValue.length < 2) {
      setLocationSuggestions([]);
      setShowLocationDropdown(false);
      return;
    }

    const fetchLocations = async () => {
      setIsLoadingLocations(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            locationInputValue,
          )}&format=json&addressdetails=1&limit=10`,
        );
        const data: PlaceResult[] = await response.json();

        const formattedResults = data
          .map((place) => {
            const city =
              place.address.city || place.address.town || place.address.village;
            let state = place.address.state_code
              ? place.address.state_code.toUpperCase()
              : "";

            if (!state && place.address.state) {
              state = place.address.state.slice(0, 2).toUpperCase();
            }

            if (!city) return "";
            return state ? `${city}, ${state}` : city;
          })
          .filter((v) => v.trim() !== "");

        const uniqueResults = Array.from(new Set(formattedResults));
        setLocationSuggestions(uniqueResults);
        setShowLocationDropdown(uniqueResults.length > 0);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLocationSuggestions([]);
      } finally {
        setIsLoadingLocations(false);
      }
    };

    const timeoutId = setTimeout(fetchLocations, 400);
    return () => clearTimeout(timeoutId);
  }, [locationInputValue]);

  const handleLocationSelect = (selected: string) => {
    // Set selecting flag to true to prevent API calls
    isSelectingRef.current = true;

    // Update values
    setLocationInputValue(selected);
    setShowLocationDropdown(false);
    locationInputRef.current?.blur();

    console.log("Location selected, value updated to:", selected);

    // Reset the flag after 1 second
    setTimeout(() => {
      isSelectingRef.current = false;
    }, 1000);
  };

  const handleSearch = () => {
    const finalSearchQuery = searchQuery.trim();
    const finalLocation = locationInputValue.trim();

    console.log("Search button clicked with:", {
      finalSearchQuery,
      finalLocation,
    });

    if (finalSearchQuery || finalLocation) {
      // Update stores
      setSearch(finalSearchQuery);
      setLocation(finalLocation);

      // Create URL with search parameters
      const searchParams = new URLSearchParams();
      if (finalSearchQuery) {
        searchParams.append("q", finalSearchQuery);
      }
      if (finalLocation) {
        searchParams.append("location", finalLocation);
      }

      // Close dropdown if open
      setShowLocationDropdown(false);

      // Navigate to search results page
      router.push(`/search-result?${searchParams.toString()}`);
      onResultClick?.();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearch("");
  };

  const clearLocation = () => {
    setLocationInputValue("");
    setLocation("");
    setLocationSuggestions([]);
    setShowLocationDropdown(false);
    isSelectingRef.current = false;
    locationInputRef.current?.focus();
  };

  const handleLocationFocus = () => {
    // Only show dropdown if there are suggestions and input is not empty and not selecting
    if (
      !isSelectingRef.current &&
      locationSuggestions.length > 0 &&
      locationInputValue.length >= 2
    ) {
      setShowLocationDropdown(true);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationInputValue(value);
    // Show dropdown only when typing (not after selection)
    if (!isSelectingRef.current && value.length >= 2) {
      setShowLocationDropdown(true);
    } else {
      setShowLocationDropdown(false);
    }
  };

  const shouldShowLocationDropdown =
    showLocationDropdown &&
    locationSuggestions.length > 0 &&
    !isSelectingRef.current;

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
              ref={locationInputRef}
              type="text"
              value={locationInputValue}
              onChange={handleLocationChange}
              onKeyDown={handleKeyPress}
              onFocus={handleLocationFocus}
              placeholder="Location"
              className={locationInputClass}
            />
            {locationInputValue && (
              <button
                onClick={clearLocation}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Location Suggestions Dropdown */}
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
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleLocationSelect(item)}
                    >
                      <div className="p-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
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
    </div>
  );
};

export default SearchBar;
