import { PaginationBaseRequestModel } from './pagination.base.model.request';

export class FindEventRequest extends PaginationBaseRequestModel {
  sports?: string[];
  startDate?: string;
  searchText?: string;
  status?: number;
  showHistory!: boolean;

  constructor(){
    super();
    this.sports = [];
    this.startDate = '';
    this.searchText = '';
    this.status = 1;
  }
}
