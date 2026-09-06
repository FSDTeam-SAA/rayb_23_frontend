import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFilterStore } from "@/zustand/stores/search-store";
import React, { useEffect, useState } from "react";

const PriceRange = ({}) => {
  const { setMinPriceRange, setMaxPriceRange, minPriceRange, maxPriceRange } =
    useFilterStore();
  const [error, setError] = useState<string>("");

  const validatePrice = (minValue: string, maxValue: string): boolean => {
    setError("");

    if (!minValue && !maxValue) return true;

    const min = parseFloat(minValue);
    const max = parseFloat(maxValue);

    if ((minValue && min < 0) || (maxValue && max < 0)) {
      setError("Price cannot be negative");
      return false;
    }

    if ((minValue && isNaN(min)) || (maxValue && isNaN(max))) {
      setError("Please enter valid numbers");
      return false;
    }

    if (minValue && maxValue && min > max) {
      setError("Minimum price cannot be greater than maximum price");
      return false;
    }

    return true;
  };

  useEffect(() => {
    validatePrice(minPriceRange, maxPriceRange);
  }, [minPriceRange, maxPriceRange]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPriceRange(e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPriceRange(e.target.value);
  };

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full"
      >
        <AccordionItem className="border-none" value="item-1">
          <AccordionTrigger className="hover:no-underline text-xl gap-2 justify-normal">
            Price Range
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-2">
            <h1 className="text-gray-600 w-full text-sm">
              Pricing is an estimate and subject to change. Contact the shop for
              an accurate quote.
            </h1>

            <div className="flex items-center justify-between mt-3">
              <input
                type="number"
                min="0"
                className="border border-gray-200 focus:outline-none h-[50px] p-2 rounded-md bg-[#f7f8f8] w-[150px] lg:w-[110px]"
                placeholder="Min"
                value={minPriceRange}
                onChange={handleMinPriceChange}
              />

              <div className="border w-[25px]"></div>

              <input
                type="number"
                min="0"
                className="border border-gray-200 focus:outline-none h-[50px] p-2 rounded-md bg-[#f7f8f8] w-[150px] lg:w-[110px]"
                placeholder="Max"
                value={maxPriceRange}
                onChange={handleMaxPriceChange}
              />
            </div>

            {/* Error message display */}
            {error && (
              <div className="text-red-500 text-sm mt-2 font-medium">
                {error}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PriceRange;