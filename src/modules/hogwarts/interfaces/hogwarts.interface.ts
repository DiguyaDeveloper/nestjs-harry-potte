import { Houses } from '../models/houses';

export interface HogwartsInterface {
  getHouses(): Promise<Houses>;
}
