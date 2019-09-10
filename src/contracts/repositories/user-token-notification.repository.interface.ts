import { IRepository } from './repository.interface';
import { TokenNotificationModel } from '../models/token-notification.model';

export interface IUserTokenNotificationRepository extends IRepository<TokenNotificationModel> {
    CreateToken(userToken: any): Promise<TokenNotificationModel>;
}
