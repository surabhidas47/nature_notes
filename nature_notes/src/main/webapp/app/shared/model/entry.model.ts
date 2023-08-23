import { ILocation } from 'app/shared/model/location.model';
import { Adventure } from 'app/shared/model/enumerations/adventure.model';

export interface IEntry {
  id?: number;
  tripTitle?: string | null;
  tripLocation?: string | null;
  tripLength?: number | null;
  tripDescription?: string | null;
  tripPhotoContentType?: string | null;
  tripPhoto?: string | null;
  adventure?: Adventure | null;
  location?: ILocation | null;
}

export const defaultValue: Readonly<IEntry> = {};
