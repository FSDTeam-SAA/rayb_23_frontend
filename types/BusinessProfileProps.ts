// Create this in a new file like @/types/business.ts
interface Review {
  _id: string;
  rating: number;
  feedback: string;
  image: string[];
  status: string;
  user: {
    _id: string;
    name: string;
    email: string;
  } | null;
  business: string;
  googlePlaceId: string;
  createdAt: string;
  updatedAt: string;
  report: {
    isReported: boolean;
    reportMessage: string;
  };
}

interface Service {
  newInstrumentName: string;
  pricingType: string;
  price: string;
  minPrice: string;
  maxPrice: string;
  selectedInstrumentsGroup: string;
  instrumentFamily: string;
}

interface MusicLesson {
  newInstrumentName: string;
  pricingType: string;
  price: string;
  minPrice: string;
  maxPrice: string;
  selectedInstrumentsGroupMusic: string;
}

interface BusinessHour {
  day: string;
  startTime: string;
  startMeridiem: string;
  endTime: string;
  endMeridiem: string;
  enabled: boolean;
}

export interface BusinessProfileProps {
  singleBusiness: {
    _id: string;
    businessInfo: {
      name: string;
      image: string[];
      address: string;
      phone: string;
      email: string;
      website: string;
      description: string;
    };
    user: {
      _id: string;
      name: string;
      email: string;
    };
    services: Service[];
    musicLessons: MusicLesson[];
    businessHours: BusinessHour[];
    buyInstruments: boolean;
    sellInstruments: boolean;
    offerMusicLessons: boolean;
    rentInstruments: boolean;
    review: Review[];
    isVerified: boolean;
    isClaimed: boolean;
    status: string;
    images: string[];
  };
}