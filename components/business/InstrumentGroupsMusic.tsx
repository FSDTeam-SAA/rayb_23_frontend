interface InstrumentType {
  _id: string;
  type: string;
  serviceType: string[];
}

interface Instruments {
  _id: string;
  instrumentFamily: string;
  instrumentTypes: InstrumentType[];
}

interface PropsTypes {
  allInstrument: Instruments[];
  selectedInstrumentsMusic: string[];
  setSelectedInstrumentsMusic: (instruments: string[]) => void;
}

const InstrumentGroupsMusic = ({
  allInstrument,
  selectedInstrumentsMusic,
  setSelectedInstrumentsMusic,
}: PropsTypes) => {
  const toggleInstrument = (instrument: string) => {
    if (selectedInstrumentsMusic.includes(instrument)) {
      setSelectedInstrumentsMusic(
        selectedInstrumentsMusic.filter((item: string) => item !== instrument)
      );
    } else {
      setSelectedInstrumentsMusic([...selectedInstrumentsMusic, instrument]);
    }
  };

  return (
    <div className="grid gap-x-12 gap-y-10 mt-5 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
      {allInstrument?.map((instruments) => (
        <div key={instruments._id} className="min-w-0">
          <h4 className="font-medium text-gray-900 mb-3">
            {instruments.instrumentFamily}
          </h4>

          <div className="grid gap-x-5 gap-y-3 [grid-template-columns:repeat(auto-fit,minmax(170px,1fr))]">
            {instruments.instrumentTypes.map((instrument) => (
              <label
                key={instrument._id}
                className="flex min-w-0 items-start gap-2 text-sm text-gray-800 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedInstrumentsMusic.includes(instrument.type)}
                  onChange={() => toggleInstrument(instrument.type)}
                  className="form-checkbox mt-0.5 h-4 w-4 flex-shrink-0 text-teal-600 rounded accent-[#139a8e]"
                />
                <span className="leading-5">{instrument.type}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstrumentGroupsMusic;
