import { useFilterStore } from "@/zustand/stores/search-store";
import { X } from "lucide-react";
import React from "react";

const TagsAndOpenNow = () => {
  const {
    familyTag,
    removeFamilyTag,
    instrumentTag,
    removeInstrumentTag,
    serviceTag,
    removeServiceTag,
    offersTag,
    removeOffersTag,
    open,
    setOpen,
  } = useFilterStore();

  // Handle Family Tag removal - removes all subsequent tags
  const handleRemoveFamilyTag = (label: string) => {
    removeFamilyTag(label);

    if (instrumentTag.length > 0) {
      instrumentTag.forEach((tag) => removeInstrumentTag(tag.label));
    }
    if (serviceTag.length > 0) {
      serviceTag.forEach((tag) => removeServiceTag(tag.label));
    }
    if (offersTag.length > 0) {
      offersTag.forEach((tag) => removeOffersTag(tag.label));
    }
  };

  // Handle Instrument Tag removal - removes service & offers tags, keeps family
  const handleRemoveInstrumentTag = (label: string) => {
    removeInstrumentTag(label);

    if (serviceTag.length > 0) {
      serviceTag.forEach((tag) => removeServiceTag(tag.label));
    }
    if (offersTag.length > 0) {
      offersTag.forEach((tag) => removeOffersTag(tag.label));
    }
  };

  // Handle Service Tag removal - removes only offers tags, keeps family & instrument
  const handleRemoveServiceTag = (label: string) => {
    removeServiceTag(label);

    if (offersTag.length > 0) {
      offersTag.forEach((tag) => removeOffersTag(tag.label));
    }
  };

  // Handle Offers Tag removal - removes only the specific offers tag
  const handleRemoveOffersTag = (label: string) => {
    removeOffersTag(label);
  };

  return (
    <div className="flex items-center justify-between mt-5">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center gap-5">
        {/* Family Tags */}
        {familyTag &&
          familyTag.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-4 text-black/75 bg-[#f7f8f8] border border-gray-200 py-2 px-3 rounded-lg"
            >
              <h1>{item.label}</h1>
              <button onClick={() => handleRemoveFamilyTag(item.label)}>
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

        {/* Instrument Tags */}
        {instrumentTag &&
          instrumentTag.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-4 text-black/75 bg-[#f7f8f8] border border-gray-200 py-2 px-3 rounded-lg"
            >
              <h1>{item.label}</h1>
              <button onClick={() => handleRemoveInstrumentTag(item.label)}>
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

        {/* Service Tags */}
        {serviceTag &&
          serviceTag.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-4 text-black/75 bg-[#f7f8f8] border border-gray-200 py-2 px-3 rounded-lg"
            >
              <h1>{item.label}</h1>
              <button onClick={() => handleRemoveServiceTag(item.label)}>
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

        {/* Offers Tags */}
        {offersTag &&
          offersTag.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-4 text-black/75 bg-[#f7f8f8] border border-gray-200 py-2 px-3 rounded-lg"
            >
              <h1>{item.label}</h1>
              <button onClick={() => handleRemoveOffersTag(item.label)}>
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={open}
          onChange={(e) => setOpen(e.target.checked)}
          className="border border-gray-500 h-4 w-4 accent-primary"
        />
        Open Now
      </div>
    </div>
  );
};

export default TagsAndOpenNow;
