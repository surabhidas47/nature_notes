export interface ILocation {
  id?: number;
  locationName?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  latLong?: string | null;
}

export const defaultValue: Readonly<ILocation> = {};
