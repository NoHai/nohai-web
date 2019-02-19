import { BaseModel } from './base.model';

export class EventModel extends BaseModel {
    public Name!: string;
    public Description?: string;
}
