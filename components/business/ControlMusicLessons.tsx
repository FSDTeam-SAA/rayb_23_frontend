import React from "react";

type OptionKey = "buy" | "sell" | "trade" | "rent" | "music";

interface PropsTypes {
  value: string;
  setValue: (val: string) => void;
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<Record<OptionKey, boolean>>
  >;
}

const ControlMusicLessons = ({
  value,
  setValue,
  setSelectedOptions,
}: PropsTypes) => {
  return (
    <div className="flex items-center space-x-4">
      <h1 className="text-xl font-semibold">Music Lessons</h1>

      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-1 text-sm text-gray-700 cursor-pointer">
          <input
            type="radio"
            name="musicLessons"
            value="yes"
            checked={value === "yes"}
            onChange={() => {
              setValue("yes");
              setSelectedOptions((prev) => ({ ...prev, music: true }));
            }}
            className="accent-teal-600"
          />
          <span>Yes</span>
        </label>

        <label className="flex items-center space-x-1 text-sm text-gray-700 cursor-pointer">
          <input
            type="radio"
            name="musicLessons"
            value="no"
            checked={value === "no"}
            onChange={() => {
              setValue("no");
              setSelectedOptions((prev) => ({ ...prev, music: false }));
            }}
            className="accent-teal-600"
          />
          <span>No</span>
        </label>
      </div>
    </div>
  );
};

export default ControlMusicLessons;
