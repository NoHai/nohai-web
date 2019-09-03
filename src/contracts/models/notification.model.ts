import { BaseModel } from "./base.model";

export class NotificationModel extends BaseModel {
    public EventId!: string;
    public Title!: string;
    public Body!: string;
    public NotificationType!: string;
    public AvatarUrl!: string;
    public Status!: number;
    public UserId!: string;
}
