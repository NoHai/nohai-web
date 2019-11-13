import { PaginationBaseRequestModel } from './pagination.base.model.request';

export class FindEventRequest extends PaginationBaseRequestModel {
  sports?: string[];
  startDate?: string;
  searchText?: string;
  showHistory!: boolean;

  constructor() {
    super();
    this.sports = [];
    this.startDate = '';
    this.searchText = '';
  }
}
