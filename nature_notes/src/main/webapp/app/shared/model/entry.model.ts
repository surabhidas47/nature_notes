import { ITag } from 'app/shared/model/tag.model';
import { ILocation } from 'app/shared/model/location.model';

export interface IEntry {
  id?: number;
  tripTitle?: string | null;
  tripLocation?: string | null;
  tripLength?: number | null;
  tripDescription?: string | null;
  tripPhotoContentType?: string | null;
  tripPhoto?: string | null;
  tripType?: string | null;
  tags?: ITag[] | null;
  location?: ILocation | null;
}

export const defaultValue: Readonly<IEntry> = {};
