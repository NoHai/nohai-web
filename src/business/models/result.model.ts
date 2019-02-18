import { ResultStatusType } from '../enums/common';

export class ResultModel<T> {
    public Result: T | undefined;
    public Message: string | undefined;
    public Status: ResultStatusType | undefined;
}
