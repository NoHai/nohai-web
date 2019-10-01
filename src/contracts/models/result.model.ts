import { ResultStatusType } from '../enums/common';

export class ResultModel<T> {
  public Result!: T;
  public Message?: string;
  public Status!: ResultStatusType;
}
