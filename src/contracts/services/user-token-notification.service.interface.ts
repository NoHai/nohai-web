import { IService } from './service.interface';
import { TokenNotificationModel } from '../models/token-notification.model';

export interface IUserTokenNotificationService extends IService<TokenNotificationModel> {
    CreateToken(userToken: string): Promise<TokenNotificationModel>;
}
