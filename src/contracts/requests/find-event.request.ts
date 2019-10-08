import { PaginationBaseRequestModel } from './pagination.base.model.request';

export class FindEventRequest extends PaginationBaseRequestModel {
  showHistory!: boolean;
}
