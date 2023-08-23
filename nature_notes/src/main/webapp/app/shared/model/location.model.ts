import { IEntry } from 'app/shared/model/entry.model';

export interface ILocation {
  id?: number;
  locationName?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  latLong?: string | null;
  tripLocations?: IEntry[] | null;
}

export const defaultValue: Readonly<ILocation> = {};
