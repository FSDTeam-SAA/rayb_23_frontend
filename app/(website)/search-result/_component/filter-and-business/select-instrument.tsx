import FilterSkeleton from "@/components/shared/FilterSkeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFilterStore } from "@/zustand/stores/search-store";
import React from "react";

interface InstrumentType {
  type: string;
  _id: string;
}

interface InstrumentFamilyItem {
  _id: string;
  instrumentFamily: string;
  instrumentTypes: InstrumentType[];
}

interface InstrumentFamilyProps {
  instrumentFamilies: InstrumentFamilyItem[];
  isLoading: boolean;
}

const SelectInstrument: React.FC<InstrumentFamilyProps> = ({
  instrumentFamilies,
  isLoading,
}) => {
  const { setInstrumentTag, instrumentTag, instrument } = useFilterStore();
  const instrumentGroupName = React.useId();
  const [showAll, setShowAll] = React.useState(false);

  const filteredInstrument = instrumentFamilies.filter(
    (item) => item.instrumentFamily === instrument
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstrumentTag(e.target.value);
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
            Select Instrument
          </AccordionTrigger>

          {isLoading ? (
            <div className="flex flex-col gap-2 mt-2">
              {[1, 2, 3].map((_, idx) => (
                <FilterSkeleton key={idx} />
              ))}
            </div>
          ) : (
            filteredInstrument.map((family) => (
              <AccordionContent
                key={family._id}
                className="flex flex-col gap-2 text-balance"
              >
                {/* Instrument types */}
                <div className="flex flex-col gap-4">
                  {(showAll
                    ? family.instrumentTypes
                    : family.instrumentTypes.slice(0, 6)
                  ).map((type) => (
                    <div key={type._id} className="flex items-center gap-2">
                      <label
                        key={type._id}
                        className="flex items-center gap-2"
                      >
                        <input
                          checked={instrumentTag.some(
                            (instrument) => instrument.label === type.type
                          )}
                          type="radio"
                          name={`instrument-${instrumentGroupName}`}
                          value={type.type}
                          className="h-4 w-4 accent-primary"
                          onChange={handleInputChange}
                        />
                        <span className="text-base">{type.type}</span>
                      </label>
                    </div>
                  ))}

                  {family.instrumentTypes.length > 6 && (
                    <button
                      type="button"
                      className="self-start text-sm font-medium text-primary"
                      onClick={() => setShowAll((current) => !current)}
                    >
                      {showAll ? "See less" : "See more"}
                    </button>
                  )}
                </div>
              </AccordionContent>
            ))
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SelectInstrument;
