export interface Trip {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  nrOfRatings: number;
  verticalType: string;
  tags: string[];
  co2: number;
  thumbnailUrl: string;
  imageUrl: string;
  creationDate: string;
}

export interface TripState {
  trips: Trip[];
  tripDetail: Trip | null;
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalTrips: number;
  totalPages: number;
  sortBy: string;
  sortOrder: string;
  tripOfTheDay: Trip | null;
}
