import { PaginationBaseRequestModel } from './pagination.base.model.request';

export class FindEventRequest extends PaginationBaseRequestModel {
  sports?: string[];
  startDate?: Date;
  searchText?: string;
  status?: number;
  showHistory!: boolean;
}
