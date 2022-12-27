import { Icategory } from "./icategory";
import { Ibrand } from './ibrand';

export interface Iproduct {
  name: string;
  slug: string;
  status: string;
  category: Icategory;
  brand: Ibrand;
  _id?: string;
  
}
