import FilterSkeleton from "@/components/shared/FilterSkeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFilterStore } from "@/zustand/stores/search-store";
import React from "react";

interface InstrumentFamilyProps {
  instrumentFamilies: { instrumentFamily: string }[];
  isLoading: boolean;
}

const InstrumentFamily: React.FC<InstrumentFamilyProps> = ({
  instrumentFamilies,
  isLoading,
}) => {
  const { setFamilyTag, familyTag } = useFilterStore();
  const familyGroupName = React.useId();
  const [showAll, setShowAll] = React.useState(false);
  const visibleInstrumentFamilies = showAll
    ? instrumentFamilies
    : instrumentFamilies.slice(0, 6);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyTag(e.target.value);
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
            Instrument Family
          </AccordionTrigger>

          {isLoading ? (
            <div className="flex flex-col pb-5 gap-2">
              {[1, 2, 3].map((_, idx) => (
                <FilterSkeleton key={idx} />
              ))}
            </div>
          ) : (
            <>
              {visibleInstrumentFamilies.map((item, index) => (
                <AccordionContent
                  key={index}
                  className="flex items-center gap-2 text-balance"
                >
                  <input
                    checked={familyTag.some(
                      (family) => family.label === item.instrumentFamily
                    )}
                    name={`family-${familyGroupName}`}
                    type="radio"
                    className="h-4 w-4 accent-primary"
                    value={item.instrumentFamily}
                    onChange={handleInputChange}
                  />
                  <h1 className="text-base">{item?.instrumentFamily}</h1>
                </AccordionContent>
              ))}

              {instrumentFamilies.length > 6 && (
                <button
                  type="button"
                  className="pb-4 text-sm font-medium text-primary"
                  onClick={() => setShowAll((current) => !current)}
                >
                  {showAll ? "See less" : "See more"}
                </button>
              )}
            </>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default InstrumentFamily;
