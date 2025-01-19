import { Item } from "./item";

export interface FindAllItemsResponse {
  data: Item[];
  total: number;
  page: number;
  limit: number;
}
