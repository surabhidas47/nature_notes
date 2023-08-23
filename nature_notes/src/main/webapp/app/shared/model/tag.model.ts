import { IEntry } from 'app/shared/model/entry.model';

export interface ITag {
  id?: number;
  camping?: string | null;
  hike?: string | null;
  roadTrip?: string | null;
  international?: string | null;
  soloTravel?: string | null;
  entries?: IEntry[] | null;
}

export const defaultValue: Readonly<ITag> = {};
