import { message } from "antd";

export default class MessageHelper{

    static showError(error: string){
       return  message.error(error);
    }

    static showInfor(info: string){
        return message.info(info);
    }

    static showWarning(warning: string){
       return message.warning(warning);
    }

    static showSuccess(success: string){
         message.success(success);
    }
}