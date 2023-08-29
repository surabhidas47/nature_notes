import dayjs from 'dayjs';
import { ILocation } from 'app/shared/model/location.model';
import { Adventure } from 'app/shared/model/enumerations/adventure.model';
import { Season } from 'app/shared/model/enumerations/season.model';

export interface IEntry {
  id?: number;
  tripTitle?: string | null;
  tripDate?: string | null;
  tripLength?: number | null;
  tripDescription?: string | null;
  tripPhotoContentType?: string | null;
  tripPhoto?: string | null;
  adventure?: Adventure | null;
  season?: Season | null;
  location?: ILocation | null;
}

export const defaultValue: Readonly<IEntry> = {};
